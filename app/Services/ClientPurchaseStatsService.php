<?php

namespace App\Services;

use App\Models\Client;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class ClientPurchaseStatsService
{
    /**
     * Estados de orden que cuentan como compra completada.
     *
     * @var list<string>
     */
    public const COUNTABLE_STATUSES = [
        Order::STATUS_DELIVERED,
    ];

    /**
     * @return Builder<Order>
     */
    public function ordersQueryForClient(Client $client): Builder
    {
        return Order::query()
            ->where(function (Builder $query) use ($client) {
                $query->where('client_id', $client->id);

                if ($client->user_id !== null) {
                    $query->orWhere('user_id', $client->user_id);
                }
            })
            ->whereIn('status', self::COUNTABLE_STATUSES);
    }

    /**
     * @return array{
     *     first_purchase_at: ?\Illuminate\Support\Carbon,
     *     last_purchase_at: ?\Illuminate\Support\Carbon,
     *     total_orders: int,
     *     total_spent: string
     * }
     */
    public function calculateForClient(Client $client): array
    {
        return $this->aggregateOrderStats($this->ordersQueryForClient($client));
    }

    /**
     * Calcula estadísticas desde orders por user_id (y perfil cliente si existe).
     *
     * @return array{
     *     first_purchase_at: ?\Illuminate\Support\Carbon,
     *     last_purchase_at: ?\Illuminate\Support\Carbon,
     *     total_orders: int,
     *     total_spent: string
     * }
     */
    public function calculateForUserId(int $userId): array
    {
        $client = Client::query()->where('user_id', $userId)->first();

        if ($client !== null) {
            return $this->calculateForClient($client);
        }

        return $this->aggregateOrderStats(
            Order::query()
                ->where('user_id', $userId)
                ->whereIn('status', self::COUNTABLE_STATUSES),
        );
    }

    /**
     * @return array{
     *     first_purchase_at_formatted: string|null,
     *     last_purchase_at_formatted: string|null,
     *     total_orders: int,
     *     total_spent: string
     * }
     */
    public function formatForApi(array $stats): array
    {
        $firstPurchaseAt = $stats['first_purchase_at'] ?? null;
        $lastPurchaseAt = $stats['last_purchase_at'] ?? null;

        if ($firstPurchaseAt !== null && ! $firstPurchaseAt instanceof Carbon) {
            $firstPurchaseAt = Carbon::parse($firstPurchaseAt);
        }

        if ($lastPurchaseAt !== null && ! $lastPurchaseAt instanceof Carbon) {
            $lastPurchaseAt = Carbon::parse($lastPurchaseAt);
        }

        return [
            'first_purchase_at_formatted' => $firstPurchaseAt?->format('d/m/Y H:i'),
            'last_purchase_at_formatted' => $lastPurchaseAt?->format('d/m/Y H:i'),
            'total_orders' => (int) ($stats['total_orders'] ?? 0),
            'total_spent' => (string) ($stats['total_spent'] ?? '0.00'),
        ];
    }

    /**
     * @return array{
     *     first_purchase_at: ?\Illuminate\Support\Carbon,
     *     last_purchase_at: ?\Illuminate\Support\Carbon,
     *     total_orders: int,
     *     total_spent: string
     * }
     */
    private function aggregateOrderStats(Builder $query): array
    {
        $stats = (clone $query)
            ->selectRaw('COUNT(*) as total_orders')
            ->selectRaw('COALESCE(SUM(total), 0) as total_spent')
            ->selectRaw('MIN(order_date) as first_purchase_at')
            ->selectRaw('MAX(order_date) as last_purchase_at')
            ->first();

        return [
            'first_purchase_at' => $stats?->first_purchase_at,
            'last_purchase_at' => $stats?->last_purchase_at,
            'total_orders' => (int) ($stats?->total_orders ?? 0),
            'total_spent' => number_format((float) ($stats?->total_spent ?? 0), 2, '.', ''),
        ];
    }

    public function sync(Client $client): void
    {
        $stats = $this->calculateForClient($client);

        Client::query()
            ->whereKey($client->id)
            ->update([
                ...$stats,
                'updated_at' => now(),
            ]);

        $client->refresh();
    }

    /**
     * @param  Collection<int, int>|null  $previousClientIds
     */
    public function syncClientsAffectedByOrder(Order $order, ?Collection $previousClientIds = null): void
    {
        $clientIds = $this->resolveAffectedClientIds([
            'client_id' => $order->client_id,
            'user_id' => $order->user_id,
        ]);

        if ($previousClientIds !== null) {
            $clientIds = $clientIds->merge($previousClientIds);
        }

        $clientIds
            ->unique()
            ->filter()
            ->each(function (int $clientId) {
                $client = Client::query()->find($clientId);

                if ($client !== null) {
                    $this->sync($client);
                }
            });
    }

    /**
     * @param  array<string, mixed>  $snapshot
     * @return Collection<int, int>
     */
    public function resolveAffectedClientIds(array $snapshot): Collection
    {
        $clientIds = collect();

        if (! empty($snapshot['client_id'])) {
            $clientIds->push((int) $snapshot['client_id']);
        }

        if (! empty($snapshot['user_id'])) {
            $linkedClientId = Client::query()
                ->where('user_id', $snapshot['user_id'])
                ->value('id');

            if ($linkedClientId !== null) {
                $clientIds->push((int) $linkedClientId);
            }
        }

        return $clientIds;
    }
}
