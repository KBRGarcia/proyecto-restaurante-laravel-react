<?php

namespace App\Http\Controllers;

use App\Http\Resources\PhysicalPaymentOrdersResource;
use App\Models\Order;
use App\Models\PhysicalPaymentOrders;
use Illuminate\Http\Request;

class PhysicalPaymentOrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = PhysicalPaymentOrders::with(['order.user']);

        // Búsqueda general
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                    ->orWhereHas('order', function ($orderQuery) use ($search) {
                        $orderQuery->where('id', 'like', "%{$search}%");
                    });
            });
        }

        // Filtro por estado
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filtro por orden
        if ($request->filled('order_id')) {
            $query->where('order_id', $request->order_id);
        }

        // Ordenamiento
        $sortBy = $request->get('sort_by', 'limit_date');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        // Paginación
        // Paginación para Refine
        $start = $request->get('_start', 0);
        $end = $request->get('_end', 10);
        $total = $query->count();
        $physicalPaymentOrderss = $query->offset($start)->limit($end - $start)->get();

        return response()->json($physicalPaymentOrderss)->header('x-total-count', $total);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Obtener órdenes pendientes o en preparación que no tengan ya una orden de pago físico
        $orders = Order::whereIn('status', ['pending', 'preparing'])
            ->whereDoesntHave('physicalPaymentOrders', function ($query) {
                $query->where('status', 'pending');
            })
            ->with('user')
            ->orderBy('order_date', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'value' => $order->id,
                    'label' => "Orden #{$order->id} - {$order->user->name} {$order->user->last_name} - Total: " . number_format($order->total, 2) . " " . ($order->currency === 'nacional' ? 'Bs.' : '$'),
                ];
            });

        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(PhysicalPaymentOrders::rules(), PhysicalPaymentOrders::messages());

        // Establecer creation_date si no se proporciona
        if (!isset($validated['creation_date'])) {
            $validated['creation_date'] = now();
        }

        // Establecer update_date si no se proporciona
        if (!isset($validated['update_date'])) {
            $validated['update_date'] = now();
        }

        $physicalPaymentOrder = PhysicalPaymentOrders::create($validated);

        return response()->json($physicalPaymentOrders, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(PhysicalPaymentOrders $physicalPaymentOrder)
    {
        $physicalPaymentOrder->load(['order.user']);

        return response()->json($physicalPaymentOrders);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PhysicalPaymentOrders $physicalPaymentOrder)
    {
        $physicalPaymentOrder->load(['order.user']);

        // Obtener órdenes pendientes o en preparación
        $orders = Order::whereIn('status', ['pending', 'preparing'])
            ->with('user')
            ->orderBy('order_date', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'value' => $order->id,
                    'label' => "Orden #{$order->id} - {$order->user->name} {$order->user->last_name} - Total: " . number_format($order->total, 2) . " " . ($order->currency === 'nacional' ? 'Bs.' : '$'),
                ];
            });

        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PhysicalPaymentOrders $physicalPaymentOrder)
    {
        $validated = $request->validate(PhysicalPaymentOrders::rules(true), PhysicalPaymentOrders::messages());

        // Actualizar update_date automáticamente
        $validated['update_date'] = now();

        $physicalPaymentOrder->update($validated);

        return response()->json($physicalPaymentOrders, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PhysicalPaymentOrders $physicalPaymentOrder)
    {
        $physicalPaymentOrder->delete();

        return response()->json(null, 204);
    }
}
