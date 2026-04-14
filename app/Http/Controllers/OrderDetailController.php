<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderDetailResource;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = OrderDetail::with(['order.user', 'product.category']);

        // Búsqueda general
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                    ->orWhere('product_notes', 'like', "%{$search}%")
                    ->orWhereHas('product', function ($productQuery) use ($search) {
                        $productQuery->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('order', function ($orderQuery) use ($search) {
                        $orderQuery->where('id', 'like', "%{$search}%");
                    });
            });
        }

        // Filtro por orden
        if ($request->filled('order_id')) {
            $query->where('order_id', $request->order_id);
        }

        // Filtro por producto
        if ($request->filled('product_id')) {
            $query->where('product_id', $request->product_id);
        }

        // Ordenamiento
        $sortBy = $request->get('sort_by', 'id');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Paginación
        // Paginación para Refine
        $start = $request->get('_start', 0);
        $end = $request->get('_end', 10);
        $total = $query->count();
        $orderDetails = $query->offset($start)->limit($end - $start)->get();

        return response()->json($orderDetails)->header('x-total-count', $total);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validación
        $validated = $request->validate(
            OrderDetail::rules(),
            OrderDetail::messages()
        );

        // El subtotal se calcula automáticamente en el modelo
        // pero si viene en la petición, lo respetamos
        if (!isset($validated['subtotal']) && isset($validated['quantity']) && isset($validated['unit_price'])) {
            $validated['subtotal'] = $validated['quantity'] * $validated['unit_price'];
        }

        // Crear el detalle de orden
        $orderDetail = OrderDetail::create($validated);

        // Actualizar los totales de la orden
        $this->updateOrderTotals($orderDetail->order_id);

        return response()->json($orderDetail, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderDetail $orderDetail)
    {
        $orderDetail->load(['order.user', 'product.category']);

        return response()->json($orderDetail);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderDetail $orderDetail)
    {
        $orderDetail->load(['order', 'product']);

        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrderDetail $orderDetail)
    {
        // Validación
        $validated = $request->validate(
            OrderDetail::rules(true),
            OrderDetail::messages()
        );

        // El subtotal se calcula automáticamente en el modelo
        // pero si viene en la petición, lo respetamos
        if (!isset($validated['subtotal']) && isset($validated['quantity']) && isset($validated['unit_price'])) {
            $validated['subtotal'] = $validated['quantity'] * $validated['unit_price'];
        }

        // Guardar el order_id anterior por si cambia
        $previousOrderId = $orderDetail->order_id;

        // Actualizar el detalle de orden
        $orderDetail->update($validated);

        // Actualizar los totales de la orden actual
        $this->updateOrderTotals($orderDetail->order_id);

        // Si cambió la orden, actualizar también la anterior
        if ($previousOrderId !== $orderDetail->order_id) {
            $this->updateOrderTotals($previousOrderId);
        }

        return response()->json($orderDetail, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderDetail $orderDetail)
    {
        $orderId = $orderDetail->order_id;

        // Eliminar el detalle
        $orderDetail->delete();

        // Actualizar los totales de la orden
        $this->updateOrderTotals($orderId);

        return response()->json(null, 204);
    }

    /**
     * Update the totals of an order based on its details.
     *
     * @param int $orderId
     * @return void
     */
    private function updateOrderTotals(int $orderId): void
    {
        $order = Order::find($orderId);

        if (!$order) {
            return;
        }

        // Calcular el subtotal sumando todos los detalles
        $subtotal = OrderDetail::where('order_id', $orderId)->sum('subtotal');

        // Calcular el total (subtotal + impuestos)
        $total = $subtotal + ($order->taxes ?? 0);

        // Actualizar la orden
        $order->update([
            'subtotal' => $subtotal,
            'total' => $total,
        ]);
    }
}
