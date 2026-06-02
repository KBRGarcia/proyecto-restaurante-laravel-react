<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'name' => $this->name,
            'description' => $this->description,
            'image' => $this->image,
            'status' => $this->status,
            'status_label' => $this->getStatusLabel(),
            'order_show' => $this->order_show,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }

    /**
     * Get the status label in Spanish.
     *
     * @return string
     */
    private function getStatusLabel(): string
    {
        return match ($this->status) {
            'active' => 'Activo',
            'inactive' => 'Inactivo',
            default => 'Desconocido',
        };
    }

    public static function tableColumns(): array
    {
        return [
            [
                'key' => 'id',
                'label' => 'ID',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'name',
                'label' => 'Nombre',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'description',
                'label' => 'Descripción',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'image',
                'label' => 'Imagen',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'status_label',
                'label' => 'Estado',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'order_show',
                'label' => 'Orden',
                'sortable' => true,
                'visible' => true,
            ],
        ];
    }

    public static function formFields(): array
    {
        return [
            [
                'name' => 'name',
                'label' => 'Nombre',
                'type' => 'text',
                'placeholder' => 'Ingrese el nombre',
                'required' => true,
                'validation' => 'required|string|max:255',
                'grid_cols' => 6,
            ],
            [
                'name' => 'description',
                'label' => 'Descripción',
                'type' => 'textarea',
                'placeholder' => 'Ingrese la descripción',
                'required' => false,
                'validation' => 'nullable|string',
                'grid_cols' => 6,
                'rows' => 3,
            ],
            [
                'name' => 'image',
                'label' => 'Imagen',
                'type' => 'file',
                'placeholder' => 'Seleccione una imagen',
                'required' => false,
                'validation' => 'nullable|string',
                'grid_cols' => 6,
            ],
            [
                'name' => 'status',
                'label' => 'Estado',
                'type' => 'switch',
                'placeholder' => '',
                'required' => true,
                'validation' => 'required|in:active,inactive',
                'help_text' => 'Activa o desactiva la categoría',
                'default' => 'active',
                'grid_cols' => 6,
            ],
            [
                'name' => 'order_show',
                'label' => 'Orden de Visualización',
                'type' => 'number',
                'placeholder' => 'Ingrese el orden de visualización',
                'required' => true,
                'validation' => 'required|integer|min:0',
                'grid_cols' => 6,
            ],
        ];
    }

    public static function filterFields(): array
    {
        return [
            [
                'name' => 'search',
                'label' => 'Buscar',
                'type' => 'text',
                'placeholder' => 'Buscar por nombre o descripción...',
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
