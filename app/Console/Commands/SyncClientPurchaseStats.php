<?php

namespace App\Console\Commands;

use App\Models\Client;
use App\Services\ClientPurchaseStatsService;
use Illuminate\Console\Command;

class SyncClientPurchaseStats extends Command
{
    /**
     * @var string
     */
    protected $signature = 'clients:sync-purchase-stats';

    /**
     * @var string
     */
    protected $description = 'Recalcula el historial de compras de todos los clientes desde la tabla orders';

    public function handle(ClientPurchaseStatsService $purchaseStatsService): int
    {
        $total = Client::query()->count();

        $this->info("Sincronizando estadísticas de compra para {$total} clientes...");

        Client::query()
            ->orderBy('id')
            ->each(function (Client $client) use ($purchaseStatsService) {
                $purchaseStatsService->sync($client);
            });

        $this->info('Sincronización completada.');

        return self::SUCCESS;
    }
}
