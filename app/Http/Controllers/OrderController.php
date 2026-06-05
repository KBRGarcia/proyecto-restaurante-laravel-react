<?php

namespace App\Http\Controllers;

use App\Http\Concerns\NormalizesOrderClientLinks;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\User;
use App\Services\ClientOrderResolverService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    use NormalizesOrderClientLinks;

    public function __construct(
        private readonly ClientOrderResolverService $clientOrderResolver,
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Order::with(['user', 'client', 'branch', 'assignedEmployee']);

        // Búsqueda general
        if ($request->filled('search') || $request->filled('q')) {
            $search = $request->get('search', $request->get('q'));
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

        // Filtro por cliente del restaurante
        if ($request->filled('client_id')) {
            $query->where('client_id', $request->client_id);
        }

        // Filtro por sucursal
        if ($request->filled('branch_id')) {
            $query->where('branch_id', $request->branch_id);
        }

        // Filtro por empleado asignado
        if ($request->filled('assigned_employee_id')) {
            $query->where('assigned_employee_id', $request->assigned_employee_id);
        }

        // Ordenamiento
        $sortBy = $request->get('sort_by');
        $sortOrder = $request->get('sort_order');
        if (!$sortBy && $request->filled('_sort')) {
            $sortBy = $request->get('_sort');
            $sortOrder = $request->get('_order', 'asc');
        }
        $sortBy = $sortBy ?: 'order_date';
        $sortOrder = $sortOrder ?: 'desc';
        if (str_contains($sortBy, ',')) {
            $sortFields = explode(',', $sortBy);
            $sortOrders = explode(',', (string) $sortOrder);
            foreach ($sortFields as $index => $field) {
                $order = $sortOrders[$index] ?? $sortOrders[0] ?? 'asc';
                $query->orderBy($field, $order);
            }
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }

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
        $clientPayload = $validated['client'] ?? null;
        unset($validated['client']);

        $validated = $this->normalizeOrderClientLinks($validated);

        $order = DB::transaction(function () use ($validated, $clientPayload) {
            $client = $this->clientOrderResolver->resolveForOrder($validated, $clientPayload);
            $validated['client_id'] = $client->id;

            if ($client->user_id !== null) {
                $validated['user_id'] = $client->user_id;
            }

            if (! isset($validated['order_date'])) {
                $validated['order_date'] = now();
            }

            if ($validated['status'] === 'pending') {
                $validated['pending_date'] = now();
            }

            if (! isset($validated['total'])) {
                $validated['total'] = $validated['subtotal'] + ($validated['taxes'] ?? 0);
            }

            return Order::create($validated);
        });

        return response()->json($order->load(['user', 'client']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['user', 'client', 'branch', 'assignedEmployee', 'orderPayments', 'orderDetails.product']);

        return response()->json($order);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        $order->load(['user', 'client', 'branch', 'assignedEmployee']);

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
        $clientPayload = $validated['client'] ?? null;
        unset($validated['client']);

        $validated['client_id'] = $validated['client_id'] ?? $order->client_id;
        $validated['user_id'] = $validated['user_id'] ?? $order->user_id;

        $this->ensureOrderClientReference($validated, $clientPayload);

        $validated = $this->normalizeOrderClientLinks($validated);

        $validated['client_id'] = $validated['client_id'] ?? $order->client_id;
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
                case 'on_the_way':
                    $validated['on_the_way_date'] = now();
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

        $order = DB::transaction(function () use ($order, $validated, $clientPayload) {
            $client = $this->clientOrderResolver->resolveForOrder($validated, $clientPayload);
            $validated['client_id'] = $client->id;

            if ($client->user_id !== null) {
                $validated['user_id'] = $client->user_id;
            }

            $order->update($validated);

            return $order->fresh(['user', 'client']);
        });

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

    /**
     * @param  array<string, mixed>  $validated
     * @param  array<string, mixed>|null  $clientPayload
     */
    private function ensureOrderClientReference(array $validated, ?array $clientPayload): void
    {
        if (! empty($validated['client_id']) || ! empty($validated['user_id'])) {
            return;
        }

        $hasClientPayload = $clientPayload !== null && (
            ! empty($clientPayload['phone'])
            || ! empty($clientPayload['email'])
            || ! empty($clientPayload['identity_document'])
            || (! empty($clientPayload['first_name']) && ! empty($clientPayload['last_name']))
        );

        if ($hasClientPayload) {
            return;
        }

        throw ValidationException::withMessages([
            'client_id' => 'Debe indicar un cliente existente o los datos del comprador.',
        ]);
    }
}
