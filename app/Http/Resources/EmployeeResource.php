<?php

namespace App\Http\Resources;

use App\Enums\EmployeePosition;
use App\Enums\PersonStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
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
            'hire_date' => $this->hire_date?->format('Y-m-d'),
            'hire_date_formatted' => $this->hire_date?->format('d/m/Y'),
            'status' => $this->status instanceof PersonStatus ? $this->status->value : $this->status,
            'status_label' => $this->status instanceof PersonStatus ? $this->status->label() : ucfirst((string) $this->status),
            'notes' => $this->notes,
            'assignments' => $this->whenLoaded('assignments', fn () => $this->assignments->map(fn ($assignment) => [
                'id' => $assignment->id,
                'branch_id' => $assignment->branch_id,
                'branch_name' => $assignment->branch?->name,
                'position' => $assignment->position instanceof EmployeePosition ? $assignment->position->value : $assignment->position,
                'position_label' => $assignment->position instanceof EmployeePosition ? $assignment->position->label() : ucfirst((string) $assignment->position),
                'start_date' => $assignment->start_date?->format('Y-m-d'),
                'end_date' => $assignment->end_date?->format('Y-m-d'),
                'active' => $assignment->active,
            ])),
            'branches_summary' => $this->whenLoaded('assignments', fn () => $this->assignments
                ->map(fn ($assignment) => $assignment->branch?->name . ' (' . ($assignment->position instanceof EmployeePosition ? $assignment->position->label() : $assignment->position) . ')')
                ->filter()
                ->join(', ')),
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
            ['key' => 'full_name', 'label' => 'Empleado', 'sortable' => true, 'visible' => true],
            ['key' => 'identity_document', 'label' => 'Documento', 'sortable' => true, 'visible' => true],
            ['key' => 'phone', 'label' => 'Telefono', 'sortable' => false, 'visible' => true],
            ['key' => 'branches_summary', 'label' => 'Sucursales y Cargos', 'sortable' => false, 'visible' => true],
            ['key' => 'status_label', 'label' => 'Estado', 'sortable' => true, 'visible' => true],
            ['key' => 'hire_date_formatted', 'label' => 'Contratacion', 'sortable' => true, 'visible' => true],
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
            [
                'name' => 'branch_id',
                'label' => 'Sucursal',
                'type' => 'select',
                'placeholder' => 'Todas las sucursales',
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public static function formFields(): array
    {
        return [
            'positions' => EmployeePosition::options(),
        ];
    }
}
