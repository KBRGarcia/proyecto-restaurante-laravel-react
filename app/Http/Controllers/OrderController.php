<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Order::with(['user', 'assignedEmployee']);

        // Búsqueda general
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                    ->orWhere('contact_phone', 'like', "%{$search}%")
                    ->orWhere('delivery_address', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('last_name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        // Filtro por estado
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filtro por tipo de servicio
        if ($request->filled('service_type')) {
            $query->where('service_type', $request->service_type);
        }

        // Filtro por moneda
        if ($request->filled('currency')) {
            $query->where('currency', $request->currency);
        }

        // Filtro por usuario
        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        // Filtro por empleado asignado
        if ($request->filled('assigned_employee_id')) {
            $query->where('assigned_employee_id', $request->assigned_employee_id);
        }

        // Ordenamiento
        $sortBy = $request->get('sort_by', 'order_date');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Paginación
        // Paginación para Refine
        $start = $request->get('_start', 0);
        $end = $request->get('_end', 10);
        $total = $query->count();
        $orders = $query->offset($start)->limit($end - $start)->get();

        return response()->json($orders)->header('x-total-count', $total);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Obtener usuarios activos (clientes)
        $users = User::where('status', 'active')
            ->where('role', 'client')
            ->orderBy('name')
            ->get()
            ->map(function ($user) {
                return [
                    'value' => $user->id,
                    'label' => $user->name . ' ' . $user->last_name . ' (' . $user->email . ')',
                ];
            });

        // Obtener empleados activos
        $employees = User::where('status', 'active')
            ->whereIn('role', ['admin', 'employee'])
            ->orderBy('name')
            ->get()
            ->map(function ($user) {
                return [
                    'value' => $user->id,
                    'label' => $user->name . ' ' . $user->last_name,
                ];
            });

        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(Order::rules(), Order::messages());

        // Establecer la fecha de orden si no se proporciona
        if (!isset($validated['order_date'])) {
            $validated['order_date'] = now();
        }

        // Establecer pending_date según el estado
        if ($validated['status'] === 'pending') {
            $validated['pending_date'] = now();
        }

        // Calcular el total si no se proporciona
        if (!isset($validated['total'])) {
            $validated['total'] = $validated['subtotal'] + ($validated['taxes'] ?? 0);
        }

        $order = Order::create($validated);

        return response()->json($order, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['user', 'assignedEmployee']);

        return response()->json($order);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        $order->load(['user', 'assignedEmployee']);

        // Obtener usuarios activos (clientes)
        $users = User::where('status', 'active')
            ->where('role', 'client')
            ->orderBy('name')
            ->get()
            ->map(function ($user) {
                return [
                    'value' => $user->id,
                    'label' => $user->name . ' ' . $user->last_name . ' (' . $user->email . ')',
                ];
            });

        // Obtener empleados activos
        $employees = User::where('status', 'active')
            ->whereIn('role', ['admin', 'employee'])
            ->orderBy('name')
            ->get()
            ->map(function ($user) {
                return [
                    'value' => $user->id,
                    'label' => $user->name . ' ' . $user->last_name,
                ];
            });

        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $validated = $request->validate(Order::rules(true), Order::messages());

        // Actualizar timestamps según el cambio de estado
        if (isset($validated['status']) && $validated['status'] !== $order->status) {
            switch ($validated['status']) {
                case 'pending':
                    $validated['pending_date'] = now();
                    break;
                case 'preparing':
                    $validated['preparing_date'] = now();
                    break;
                case 'ready':
                    $validated['ready_date'] = now();
                    break;
                case 'delivered':
                    $validated['delivered_date'] = now();
                    break;
                case 'canceled':
                    $validated['canceled_date'] = now();
                    break;
            }
        }

        // Recalcular el total si cambian subtotal o taxes
        if (isset($validated['subtotal']) || isset($validated['taxes'])) {
            $subtotal = $validated['subtotal'] ?? $order->subtotal;
            $taxes = $validated['taxes'] ?? $order->taxes;
            $validated['total'] = $subtotal + $taxes;
        }

        $order->update($validated);

        return response()->json($order, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return response()->json(null, 204);
    }
}
