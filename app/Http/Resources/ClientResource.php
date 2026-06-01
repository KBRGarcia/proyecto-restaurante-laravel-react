<?php

namespace App\Http\Resources;

use App\Enums\ClientOrigin;
use App\Enums\PersonStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'user' => $this->whenLoaded('user', fn () => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'last_name' => $this->user->last_name,
                'email' => $this->user->email,
            ]),
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'full_name' => $this->full_name,
            'identity_document' => $this->identity_document,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'birth_date' => $this->birth_date?->format('Y-m-d'),
            'birth_date_formatted' => $this->birth_date?->format('d/m/Y'),
            'origin' => $this->origin instanceof ClientOrigin ? $this->origin->value : $this->origin,
            'origin_label' => $this->origin instanceof ClientOrigin ? $this->origin->label() : ucfirst((string) $this->origin),
            'first_purchase_at' => $this->first_purchase_at?->format('Y-m-d\TH:i'),
            'first_purchase_at_formatted' => $this->first_purchase_at?->format('d/m/Y H:i'),
            'last_purchase_at' => $this->last_purchase_at?->format('Y-m-d\TH:i'),
            'last_purchase_at_formatted' => $this->last_purchase_at?->format('d/m/Y H:i'),
            'total_orders' => $this->total_orders,
            'total_spent' => $this->total_spent,
            'status' => $this->status instanceof PersonStatus ? $this->status->value : $this->status,
            'status_label' => $this->status instanceof PersonStatus ? $this->status->label() : ucfirst((string) $this->status),
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public static function tableColumns(): array
    {
        return [
            ['key' => 'id', 'label' => 'ID', 'sortable' => true, 'visible' => true],
            ['key' => 'full_name', 'label' => 'Cliente', 'sortable' => true, 'visible' => true],
            ['key' => 'identity_document', 'label' => 'Documento', 'sortable' => true, 'visible' => true],
            ['key' => 'phone', 'label' => 'Telefono', 'sortable' => false, 'visible' => true],
            ['key' => 'origin_label', 'label' => 'Origen', 'sortable' => true, 'visible' => true],
            ['key' => 'total_orders', 'label' => 'Ordenes', 'sortable' => true, 'visible' => true],
            ['key' => 'total_spent', 'label' => 'Total Comprado', 'sortable' => true, 'visible' => true],
            ['key' => 'status_label', 'label' => 'Estado', 'sortable' => true, 'visible' => true],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public static function filterFields(): array
    {
        return [
            [
                'name' => 'search',
                'label' => 'Buscar',
                'type' => 'text',
                'placeholder' => 'Buscar por nombre, documento, correo o telefono...',
            ],
            [
                'name' => 'origin',
                'label' => 'Origen',
                'type' => 'select',
                'placeholder' => 'Todos los origenes',
                'options' => [
                    ['value' => '', 'label' => 'Todos'],
                    ['value' => 'online', 'label' => 'Online'],
                    ['value' => 'physical', 'label' => 'Fisico'],
                    ['value' => 'mixed', 'label' => 'Fisico y Online'],
                ],
            ],
            [
                'name' => 'status',
                'label' => 'Estado',
                'type' => 'select',
                'placeholder' => 'Todos los estados',
                'options' => [
                    ['value' => '', 'label' => 'Todos'],
                    ['value' => 'active', 'label' => 'Activo'],
                    ['value' => 'inactive', 'label' => 'Inactivo'],
                ],
            ],
        ];
    }
}
