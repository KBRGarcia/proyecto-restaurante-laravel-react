<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource grouped by order.
     */
    public function index(Request $request)
    {
        $query = Order::query()
            ->with(['user', 'orderDetails'])
            ->whereHas('orderDetails');

        if ($request->filled('search') || $request->filled('q')) {
            $search = $request->get('search', $request->get('q'));
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                    ->orWhere('delivery_address', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('last_name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    })
                    ->orWhereHas('orderDetails.product', function ($productQuery) use ($search) {
                        $productQuery->where('name', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->filled('order_id')) {
            $query->where('id', $request->order_id);
        }

        $sortBy = $request->get('sort_by');
        $sortOrder = $request->get('sort_order');
        if (! $sortBy && $request->filled('_sort')) {
            $sortBy = $request->get('_sort');
            $sortOrder = $request->get('_order', 'asc');
        }
        $sortBy = $sortBy ?: 'id';
        $sortOrder = $sortOrder ?: 'desc';

        if (! in_array($sortBy, ['id', 'order_date', 'total', 'subtotal', 'created_at'], true)) {
            $sortBy = 'id';
        }

        $query->orderBy($sortBy, $sortOrder);

        $start = $request->get('_start', 0);
        $end = $request->get('_end', 10);
        $total = $query->count();
        $orders = $query->offset($start)->limit($end - $start)->get();

        $data = $orders->map(fn (Order $order) => $this->formatOrderSummary($order));

        return response()->json($data)->header('x-total-count', $total);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Store order details for an order in a single request.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(
            OrderDetail::batchRules(),
            OrderDetail::batchMessages(),
        );

        $this->validateDeliveryAddress($validated);

        $order = Order::findOrFail($validated['order_id']);

        if ($order->orderDetails()->exists()) {
            throw ValidationException::withMessages([
                'order_id' => 'La orden seleccionada ya tiene detalles registrados. Utilice editar en su lugar.',
            ]);
        }

        DB::transaction(function () use ($order, $validated) {
            $this->syncItems($order, $validated['items']);
            $this->updateOrderFinancials($order, $validated);
        });

        return response()->json($this->formatOrderDetails($order->fresh(['user', 'orderDetails.product'])), 201);
    }

    /**
     * Display all details for the given order.
     */
    public function show(int $order_detail)
    {
        $order = Order::with(['user', 'orderDetails.product'])->findOrFail($order_detail);

        if ($order->orderDetails->isEmpty()) {
            abort(404);
        }

        return response()->json($this->formatOrderDetails($order));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $order_detail)
    {
        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Update all order details for the given order.
     */
    public function update(Request $request, int $order_detail)
    {
        $order = Order::with('orderDetails')->findOrFail($order_detail);

        $validated = $request->validate(
            OrderDetail::batchRules(),
            OrderDetail::batchMessages(),
        );

        if ((int) $validated['order_id'] !== $order->id) {
            throw ValidationException::withMessages([
                'order_id' => 'No se puede cambiar la orden de un detalle existente.',
            ]);
        }

        $this->validateDeliveryAddress($validated, $order);

        DB::transaction(function () use ($order, $validated) {
            $this->syncItems($order, $validated['items']);
            $this->updateOrderFinancials($order, $validated);
        });

        return response()->json($this->formatOrderDetails($order->fresh(['user', 'orderDetails.product'])));
    }

    /**
     * Remove all order details for the given order.
     */
    public function destroy(int $order_detail)
    {
        $order = Order::with('orderDetails')->findOrFail($order_detail);

        DB::transaction(function () use ($order) {
            $order->orderDetails()->delete();
            $order->update([
                'subtotal' => 0,
                'total' => 0,
                'taxes' => 0,
                'delivery_address' => $order->isPickup() ? null : $order->delivery_address,
            ]);
        });

        return response()->json(null, 204);
    }

    /**
     * @param  array<string, mixed>  $validated
     */
    private function validateDeliveryAddress(array $validated, ?Order $order = null): void
    {
        $serviceType = $order?->service_type;

        if ($serviceType === null && isset($validated['order_id'])) {
            $serviceType = Order::query()->whereKey($validated['order_id'])->value('service_type');
        }

        if ($serviceType === Order::SERVICE_TYPE_DELIVERY && empty($validated['delivery_address'])) {
            throw ValidationException::withMessages([
                'delivery_address' => 'La dirección de entrega es obligatoria para pedidos a domicilio.',
            ]);
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $items
     */
    private function syncItems(Order $order, array $items): void
    {
        $existingIds = $order->orderDetails()->pluck('id')->all();
        $keptIds = [];

        foreach ($items as $item) {
            $payload = [
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'subtotal' => $item['subtotal'] ?? ($item['quantity'] * $item['unit_price']),
                'product_notes' => $item['product_notes'] ?? null,
            ];

            if (! empty($item['id'])) {
                $detail = $order->orderDetails()->whereKey($item['id'])->first();

                if ($detail) {
                    $detail->update($payload);
                    $keptIds[] = $detail->id;

                    continue;
                }
            }

            $created = $order->orderDetails()->create($payload);
            $keptIds[] = $created->id;
        }

        $idsToDelete = array_diff($existingIds, $keptIds);

        if ($idsToDelete !== []) {
            OrderDetail::query()->whereIn('id', $idsToDelete)->delete();
        }
    }

    /**
     * @param  array<string, mixed>  $validated
     */
    private function updateOrderFinancials(Order $order, array $validated): void
    {
        $subtotal = OrderDetail::query()
            ->where('order_id', $order->id)
            ->sum('subtotal');

        $taxes = (float) ($validated['taxes'] ?? $order->taxes ?? 0);
        $total = Order::calculateTotal($subtotal, $taxes);

        $order->update([
            'currency' => $validated['currency'],
            'taxes' => $taxes,
            'subtotal' => $subtotal,
            'total' => $total,
            'delivery_address' => $order->service_type === Order::SERVICE_TYPE_DELIVERY
                ? ($validated['delivery_address'] ?? null)
                : null,
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function formatOrderSummary(Order $order): array
    {
        return [
            'id' => $order->id,
            'order_id' => $order->id,
            'service_type' => $order->service_type,
            'currency' => $order->currency,
            'subtotal' => $order->subtotal,
            'taxes' => $order->taxes,
            'total' => $order->total,
            'delivery_address' => $order->delivery_address,
            'items_count' => $order->orderDetails->count(),
            'user' => $order->user ? [
                'id' => $order->user->id,
                'name' => $order->user->name,
                'last_name' => $order->user->last_name,
            ] : null,
            'created_at' => $order->created_at,
            'updated_at' => $order->updated_at,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatOrderDetails(Order $order): array
    {
        return [
            'id' => $order->id,
            'order_id' => $order->id,
            'service_type' => $order->service_type,
            'currency' => $order->currency,
            'taxes' => $order->taxes,
            'subtotal' => $order->subtotal,
            'total' => $order->total,
            'delivery_address' => $order->delivery_address,
            'items' => $order->orderDetails->map(fn (OrderDetail $detail) => [
                'id' => $detail->id,
                'product_id' => $detail->product_id,
                'quantity' => $detail->quantity,
                'unit_price' => $detail->unit_price,
                'subtotal' => $detail->subtotal,
                'product_notes' => $detail->product_notes,
                'product' => $detail->relationLoaded('product') && $detail->product ? [
                    'id' => $detail->product->id,
                    'name' => $detail->product->name,
                    'description' => $detail->product->description,
                    'price' => $detail->product->price,
                ] : null,
            ])->values()->all(),
            'user' => $order->user ? [
                'id' => $order->user->id,
                'name' => $order->user->name,
                'last_name' => $order->user->last_name,
            ] : null,
            'created_at' => $order->created_at,
            'updated_at' => $order->updated_at,
        ];
    }
}
