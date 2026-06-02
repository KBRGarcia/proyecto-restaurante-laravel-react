<?php

namespace App\Http\Controllers;

use App\Enums\PaymentMethod;
use App\Support\CatalogActiveRegistry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    /**
     * Display a listing of the payment methods.
     */
    public function index(Request $request)
    {
        $paymentMethods = collect(PaymentMethod::toArrayList());

        if ($request->filled('search') || $request->filled('q')) {
            $search = mb_strtolower($request->get('search', $request->get('q')));
            $paymentMethods = $paymentMethods->filter(
                fn (array $method): bool => str_contains(mb_strtolower($method['code']), $search)
                    || str_contains(mb_strtolower($method['name']), $search)
            );
        }

        if ($request->has('currency_type') && !empty($request->currency_type)) {
            $paymentMethods = $paymentMethods->where('currency_type', $request->currency_type);
        }

        if ($request->has('active') && $request->active !== '') {
            $active = filter_var($request->active, FILTER_VALIDATE_BOOLEAN);
            $paymentMethods = $paymentMethods->where('active', $active);
        }

        $sortBy = $request->get('sort_by');
        $sortOrder = $request->get('sort_order');
        if (!$sortBy && $request->filled('_sort')) {
            $sortBy = $request->get('_sort');
            $sortOrder = $request->get('_order', 'asc');
        }
        $sortBy = $sortBy ?: 'id';
        $sortOrder = $sortOrder ?: 'asc';
        $paymentMethods = $paymentMethods
            ->sortBy($sortBy, SORT_REGULAR, strtolower((string) $sortOrder) === 'desc')
            ->values();

        $start = $request->get('_start', 0);
        $end = $request->get('_end', 10);
        $total = $paymentMethods->count();
        $paymentMethods = $paymentMethods->slice($start, $end - $start)->values();

        return response()->json($paymentMethods)->header('x-total-count', $total);
    }

    /**
     * Show the form for creating a new payment method.
     */
    public function create()
    {
        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Store a newly created payment method in storage.
     */
    public function store(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Los metodos de pago son un catalogo estatico definido en App\\Enums\\PaymentMethod.',
        ], 405);
    }

    /**
     * Display the specified payment method.
     */
    public function show(string|int $payment_method): JsonResponse
    {
        $method = PaymentMethod::tryFromIdentifier($payment_method);

        abort_if($method === null, 404, 'Metodo de pago no encontrado.');

        return response()->json(PaymentMethod::toArrayList()[$method->id() - 1] ?? null);
    }

    /**
     * Show the form for editing the specified payment method.
     */
    public function edit(string|int $payment_method)
    {
        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Update the specified payment method in storage.
     */
    public function update(Request $request, string|int $payment_method): JsonResponse
    {
        $method = PaymentMethod::tryFromIdentifier($payment_method);

        abort_if($method === null, 404, 'Metodo de pago no encontrado.');

        $validated = $request->validate([
            'active' => ['required', 'boolean'],
        ]);

        CatalogActiveRegistry::setActive(
            'payment_methods',
            $method->value,
            filter_var($validated['active'], FILTER_VALIDATE_BOOLEAN),
        );

        $item = collect(PaymentMethod::toArrayList())->firstWhere('id', $method->id());

        return response()->json($item);
    }

    /**
     * Remove the specified payment method from storage.
     */
    public function destroy(string|int $payment_method): JsonResponse
    {
        return response()->json([
            'message' => 'Los metodos de pago son un catalogo estatico definido en App\\Enums\\PaymentMethod.',
        ], 405);
    }

    /**
     * Get all active payment methods.
     */
    public function getActive(): JsonResponse
    {
        return response()->json(PaymentMethod::toArrayList());
    }

    /**
     * Get payment methods by currency type.
     */
    public function getByCurrencyType(string $currencyType): JsonResponse
    {
        $paymentMethods = collect(PaymentMethod::toArrayList())
            ->where('currency_type', $currencyType)
            ->values();

        return response()->json($paymentMethods);
    }
}
