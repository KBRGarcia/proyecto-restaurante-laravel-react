<?php

namespace App\Http\Concerns;

use App\Models\Client;

trait NormalizesOrderClientLinks
{
    /**
     * Vincula user_id y client_id de forma coherente según el perfil del cliente.
     *
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    protected function normalizeOrderClientLinks(array $validated): array
    {
        if (! empty($validated['client_id'])) {
            $client = Client::query()->find($validated['client_id']);

            if ($client?->user_id !== null) {
                $validated['user_id'] = $client->user_id;
            } else {
                unset($validated['user_id']);
            }

            return $validated;
        }

        if (! empty($validated['user_id'])) {
            $clientId = Client::query()
                ->where('user_id', $validated['user_id'])
                ->value('id');

            if ($clientId !== null) {
                $validated['client_id'] = $clientId;
            }
        }

        return $validated;
    }
}
