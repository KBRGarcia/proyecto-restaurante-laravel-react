<?php

namespace App\Services;

use App\Enums\ClientOrigin;
use App\Enums\PersonStatus;
use App\Models\Client;
use App\Models\User;

class ClientOrderResolverService
{
    /**
     * Busca o crea el cliente asociado a una orden y devuelve el registro actualizado.
     *
     * @param  array<string, mixed>  $orderData
     * @param  array<string, mixed>|null  $clientPayload
     */
    public function resolveForOrder(array $orderData, ?array $clientPayload = null): Client
    {
        if (! empty($orderData['client_id'])) {
            $client = Client::query()->findOrFail($orderData['client_id']);

            return $this->updateFromOrder($client, $orderData, $clientPayload);
        }

        if (! empty($orderData['user_id'])) {
            $client = Client::query()->where('user_id', $orderData['user_id'])->first();

            if ($client !== null) {
                return $this->updateFromOrder($client, $orderData, $clientPayload);
            }

            return $this->updateFromOrder(
                $this->createFromUser((int) $orderData['user_id']),
                $orderData,
                $clientPayload,
            );
        }

        $existingClient = $this->findByIdentifiers($orderData, $clientPayload);

        if ($existingClient !== null) {
            return $this->updateFromOrder($existingClient, $orderData, $clientPayload);
        }

        return $this->createFromPayload($orderData, $clientPayload);
    }

    /**
     * @param  array<string, mixed>  $orderData
     * @param  array<string, mixed>|null  $clientPayload
     */
    private function findByIdentifiers(array $orderData, ?array $clientPayload): ?Client
    {
        if (! empty($clientPayload['identity_document'])) {
            $client = Client::query()
                ->where('identity_document', $clientPayload['identity_document'])
                ->first();

            if ($client !== null) {
                return $client;
            }
        }

        $phone = $clientPayload['phone'] ?? $orderData['contact_phone'] ?? null;

        if (! empty($phone)) {
            $client = Client::query()->where('phone', $phone)->first();

            if ($client !== null) {
                return $client;
            }
        }

        if (! empty($clientPayload['email'])) {
            return Client::query()->where('email', $clientPayload['email'])->first();
        }

        return null;
    }

    private function createFromUser(int $userId): Client
    {
        $user = User::query()->findOrFail($userId);

        return Client::query()->create([
            'user_id' => $user->id,
            'first_name' => $user->name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'phone' => $user->phone_number,
            'address' => $user->address,
            'origin' => ClientOrigin::Online->value,
            'status' => PersonStatus::Active->value,
        ]);
    }

    /**
     * @param  array<string, mixed>  $orderData
     * @param  array<string, mixed>|null  $clientPayload
     */
    private function createFromPayload(array $orderData, ?array $clientPayload): Client
    {
        $firstName = $clientPayload['first_name'] ?? 'Cliente';
        $lastName = $clientPayload['last_name'] ?? 'Invitado';

        return Client::query()->create([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'identity_document' => $clientPayload['identity_document'] ?? null,
            'email' => $clientPayload['email'] ?? null,
            'phone' => $clientPayload['phone'] ?? $orderData['contact_phone'] ?? null,
            'address' => $clientPayload['address'] ?? $orderData['delivery_address'] ?? null,
            'origin' => ! empty($orderData['user_id']) ? ClientOrigin::Online->value : ClientOrigin::Physical->value,
            'status' => PersonStatus::Active->value,
        ]);
    }

    /**
     * @param  array<string, mixed>  $orderData
     * @param  array<string, mixed>|null  $clientPayload
     */
    private function updateFromOrder(Client $client, array $orderData, ?array $clientPayload): Client
    {
        $updates = array_filter([
            'phone' => $clientPayload['phone'] ?? $orderData['contact_phone'] ?? null,
            'address' => $clientPayload['address'] ?? $orderData['delivery_address'] ?? null,
            'email' => $clientPayload['email'] ?? null,
            'identity_document' => $clientPayload['identity_document'] ?? null,
            'first_name' => $clientPayload['first_name'] ?? null,
            'last_name' => $clientPayload['last_name'] ?? null,
        ], fn ($value) => $value !== null && $value !== '');

        if ($updates !== []) {
            $client->fill($updates);
            $client->save();
        }

        return $client->fresh();
    }
}
