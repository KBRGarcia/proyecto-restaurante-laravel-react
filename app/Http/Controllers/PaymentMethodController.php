<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaymentMethodResource;
use App\Models\PaymentMethod;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Validator;

class PaymentMethodController extends Controller
{
    /**
     * Display a listing of the payment methods.
     */
    public function index(Request $request)
    {
        $query = PaymentMethod::query();

        // Búsqueda
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%");
            });
        }

        // Filtro por tipo de moneda
        if ($request->has('currency_type') && !empty($request->currency_type)) {
            $query->where('currency_type', $request->currency_type);
        }

        // Filtro por estado
        if ($request->has('active') && $request->active !== '') {
            $query->where('active', $request->active);
        }

        // Ordenamiento
        $sortBy = $request->get('sort_by', 'id');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        // Paginación para Refine
        $start = $request->get('_start', 0);
        $end = $request->get('_end', 10);
        $total = $query->count();
        $paymentMethods = $query->offset($start)->limit($end - $start)->get();

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
        $validator = Validator::make(
            $request->all(),
            PaymentMethod::rules(),
            PaymentMethod::messages()
        );

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Procesar configuración JSON si viene como string
        $data = $validator->validated();
        if (isset($data['configuration']) && is_string($data['configuration'])) {
            $data['configuration'] = json_decode($data['configuration'], true);
        }

        $paymentMethod = PaymentMethod::create($data);

        return response()->json([
            'message' => 'Método de pago creado exitosamente',
            'data' => new PaymentMethodResource($paymentMethod),
        ], 201);
    }

    /**
     * Display the specified payment method.
     */
    public function show(PaymentMethod $paymentMethod)
    {
        return response()->json($paymentMethod);
    }

    /**
     * Show the form for editing the specified payment method.
     */
    public function edit(PaymentMethod $paymentMethod)
    {
        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Update the specified payment method in storage.
     */
    public function update(Request $request, PaymentMethod $paymentMethod): JsonResponse
    {
        $validator = Validator::make(
            $request->all(),
            PaymentMethod::rules(true, $paymentMethod->id),
            PaymentMethod::messages()
        );

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Procesar configuración JSON si viene como string
        $data = $validator->validated();
        if (isset($data['configuration']) && is_string($data['configuration'])) {
            $data['configuration'] = json_decode($data['configuration'], true);
        }

        $paymentMethod->update($data);

        return response()->json([
            'message' => 'Método de pago actualizado exitosamente',
            'data' => new PaymentMethodResource($paymentMethod),
        ], 200);
    }

    /**
     * Remove the specified payment method from storage.
     */
    public function destroy(PaymentMethod $paymentMethod): JsonResponse
    {
        $paymentMethod->delete();

        return response()->json([
            'message' => 'Método de pago eliminado exitosamente',
        ], 200);
    }

    /**
     * Get all active payment methods.
     */
    public function getActive(): AnonymousResourceCollection
    {
        $paymentMethods = PaymentMethod::active()->get();

        return PaymentMethodResource::collection($paymentMethods);
    }

    /**
     * Get payment methods by currency type.
     */
    public function getByCurrencyType(string $currencyType): AnonymousResourceCollection
    {
        $paymentMethods = PaymentMethod::where('currency_type', $currencyType)
            ->active()
            ->get();

        return PaymentMethodResource::collection($paymentMethods);
    }
}
