<?php

namespace App\Observers;

use App\Models\Order;
use App\Services\ClientPurchaseStatsService;
use Illuminate\Support\Collection;

class OrderObserver
{
    /** @var Collection<int, int>|null */
    private ?Collection $previousClientIds = null;

    public function __construct(
        private readonly ClientPurchaseStatsService $purchaseStatsService,
    ) {}

    public function updating(Order $order): void
    {
        if (! $order->exists) {
            return;
        }

        $this->previousClientIds = $this->purchaseStatsService->resolveAffectedClientIds([
            'client_id' => $order->getOriginal('client_id'),
            'user_id' => $order->getOriginal('user_id'),
        ]);
    }

    public function saved(Order $order): void
    {
        $this->purchaseStatsService->syncClientsAffectedByOrder($order, $this->previousClientIds);
        $this->previousClientIds = null;
    }

    public function deleted(Order $order): void
    {
        $this->purchaseStatsService->syncClientsAffectedByOrder($order);
    }
}
