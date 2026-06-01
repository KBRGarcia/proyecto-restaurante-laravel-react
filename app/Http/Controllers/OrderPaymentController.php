<?php

namespace App\Http\Controllers;

use App\Enums\PaymentCurrency;
use App\Enums\PaymentMethod;
use App\Http\Resources\OrderPaymentResource;
use App\Models\OrderPayment;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class OrderPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = OrderPayment::with(['order.user']);

        if ($request->filled('search') || $request->filled('q')) {
            $search = $request->get('search', $request->get('q'));
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                    ->orWhere('reference_number', 'like', "%{$search}%")
                    ->orWhere('payer_identification', 'like', "%{$search}%")
                    ->orWhere('payer_phone', 'like', "%{$search}%")
                    ->orWhere('payer_email', 'like', "%{$search}%")
                    ->orWhereHas('order', fn ($orderQuery) => $orderQuery->where('id', 'like', "%{$search}%"));
            });
        }

        foreach (['order_id', 'method', 'status', 'currency'] as $field) {
            if ($request->filled($field)) {
                $query->where($field, $request->get($field));
            }
        }

        $sortBy = $request->get('sort_by');
        $sortOrder = $request->get('sort_order');
        if (!$sortBy && $request->filled('_sort')) {
            $sortBy = $request->get('_sort');
            $sortOrder = $request->get('_order', 'asc');
        }
        $sortBy = $sortBy ?: 'created_at';
        $sortOrder = $sortOrder ?: 'desc';

        if (str_contains($sortBy, ',')) {
            $sortFields = explode(',', $sortBy);
            $sortOrders = explode(',', (string) $sortOrder);
            foreach ($sortFields as $index => $field) {
                $query->orderBy($field, $sortOrders[$index] ?? $sortOrders[0] ?? 'asc');
            }
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }

        $start = $request->get('_start', 0);
        $end = $request->get('_end', 10);
        $total = $query->count();
        $payments = $query->offset($start)->limit($end - $start)->get();

        return response()
            ->json(OrderPaymentResource::collection($payments)->resolve())
            ->header('x-total-count', $total);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $this->validatedPaymentData($request);

        $payment = OrderPayment::create($validated);

        return response()->json((new OrderPaymentResource($payment->load('order.user')))->resolve(), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderPayment $orderPayment)
    {
        return response()->json((new OrderPaymentResource($orderPayment->load('order.user')))->resolve());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrderPayment $orderPayment)
    {
        $validated = $this->validatedPaymentData($request, true);

        $orderPayment->update($validated);

        return response()->json((new OrderPaymentResource($orderPayment->load('order.user')))->resolve());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderPayment $orderPayment)
    {
        $orderPayment->delete();

        return response()->json(null, 204);
    }

    /**
     * @return array<string, mixed>
     */
    private function validatedPaymentData(Request $request, bool $isUpdate = false): array
    {
        $validated = $request->validate([
            ...OrderPayment::rules($isUpdate),
            'proof_image' => ['nullable', 'image', 'max:2048'],
        ]);

        unset($validated['proof_image']);

        if ($request->hasFile('proof_image')) {
            $validated['proof_image_path'] = $request->file('proof_image')->store('payment-proofs', 'public');
        }

        $method = PaymentMethod::tryFrom((string) ($validated['method'] ?? $request->input('method')));
        $currency = PaymentCurrency::tryFrom((string) ($validated['currency'] ?? $request->input('currency')));

        if ($method && $currency && $method->currency() !== $currency) {
            throw ValidationException::withMessages([
                'method' => 'El metodo de pago seleccionado no corresponde a la moneda indicada.',
            ]);
        }

        return $validated;
    }
}
