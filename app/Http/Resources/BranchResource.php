<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BranchResource extends JsonResource
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
            'address' => $this->address,
            'city' => $this->city,
            'state' => $this->state,
            'postal_code' => $this->postal_code,
            'phone' => $this->phone,
            'email' => $this->email,
            'opening_time' => $this->opening_time,
            'opening_time_formatted' => $this->opening_time ? (strlen($this->opening_time) >= 5 ? substr($this->opening_time, 0, 5) : $this->opening_time) : null,
            'closing_time' => $this->closing_time,
            'closing_time_formatted' => $this->closing_time ? (strlen($this->closing_time) >= 5 ? substr($this->closing_time, 0, 5) : $this->closing_time) : null,
            'operation_days' => $this->operation_days,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'is_main' => $this->is_main,
            'is_main_label' => $this->getIsMainLabel(),
            'has_delivery' => $this->has_delivery,
            'has_delivery_label' => $this->getHasDeliveryLabel(),
            'has_parking' => $this->has_parking,
            'has_parking_label' => $this->getHasParkingLabel(),
            'capacity_people' => $this->capacity_people,
            'image' => $this->image,
            'description' => $this->description,
            'active' => $this->active,
            'active_label' => $this->getActiveLabel(),
            'opening_date' => $this->opening_date,
            'opening_date_formatted' => $this->opening_date ? $this->opening_date->format('d/m/Y') : null,
            'manager' => $this->manager,
            'full_address' => $this->getFullAddress(),
            'creation_date' => $this->creation_date,
            'creation_date_formatted' => $this->creation_date ? $this->creation_date->format('d/m/Y H:i') : null,
            'update_date' => $this->update_date,
            'update_date_formatted' => $this->update_date ? $this->update_date->format('d/m/Y H:i') : null,
            'created_at' => $this->created_at,
            'created_at_formatted' => $this->created_at ? $this->created_at->format('d/m/Y H:i') : null,
            'updated_at' => $this->updated_at,
            'updated_at_formatted' => $this->updated_at ? $this->updated_at->format('d/m/Y H:i') : null,
        ];
    }

    /**
     * Get the active label.
     */
    private function getActiveLabel(): string
    {
        return $this->active ? 'Activa' : 'Inactiva';
    }

    /**
     * Get the is_main label.
     */
    private function getIsMainLabel(): string
    {
        return $this->is_main ? 'Sí' : 'No';
    }

    /**
     * Get the has_delivery label.
     */
    private function getHasDeliveryLabel(): string
    {
        return $this->has_delivery ? 'Sí' : 'No';
    }

    /**
     * Get the has_parking label.
     */
    private function getHasParkingLabel(): string
    {
        return $this->has_parking ? 'Sí' : 'No';
    }

    /**
     * Get table columns configuration for frontend.
     *
     * @return array<string, mixed>
     */
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
                'key' => 'city',
                'label' => 'Ciudad',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'state',
                'label' => 'Estado',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'phone',
                'label' => 'Teléfono',
                'sortable' => false,
                'visible' => true,
            ],
            [
                'key' => 'manager',
                'label' => 'Gerente',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'is_main_label',
                'label' => 'Principal',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'active_label',
                'label' => 'Estado',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'actions',
                'label' => 'Acciones',
                'sortable' => false,
                'visible' => true,
            ],
        ];
    }

    /**
     * Get filter fields configuration for frontend.
     *
     * @return array<string, mixed>
     */
    public static function filterFields(): array
    {
        return [
            [
                'name' => 'active',
                'label' => 'Estado',
                'type' => 'select',
                'options' => [
                    ['value' => '1', 'label' => 'Activa'],
                    ['value' => '0', 'label' => 'Inactiva'],
                ],
            ],
            [
                'name' => 'is_main',
                'label' => 'Sucursal Principal',
                'type' => 'select',
                'options' => [
                    ['value' => '1', 'label' => 'Sí'],
                    ['value' => '0', 'label' => 'No'],
                ],
            ],
            [
                'name' => 'has_delivery',
                'label' => 'Con Delivery',
                'type' => 'select',
                'options' => [
                    ['value' => '1', 'label' => 'Sí'],
                    ['value' => '0', 'label' => 'No'],
                ],
            ],
            [
                'name' => 'has_parking',
                'label' => 'Con Estacionamiento',
                'type' => 'select',
                'options' => [
                    ['value' => '1', 'label' => 'Sí'],
                    ['value' => '0', 'label' => 'No'],
                ],
            ],
        ];
    }

    /**
     * Get form fields configuration for frontend.
     *
     * @return array<string, mixed>
     */
    public static function formFields(): array
    {
        return [
            [
                'name' => 'name',
                'label' => 'Nombre de la Sucursal',
                'type' => 'text',
                'placeholder' => 'Ej: Sabor & Tradición - Centro',
                'required' => true,
                'validation' => 'required|max:100',
                'grid_cols' => 6,
                'help_text' => 'Nombre identificativo de la sucursal',
            ],
            [
                'name' => 'phone',
                'label' => 'Teléfono',
                'type' => 'text',
                'placeholder' => 'Ej: 0212-555-1234',
                'required' => true,
                'validation' => 'required|max:20',
                'grid_cols' => 6,
                'help_text' => 'Teléfono de contacto',
            ],
            [
                'name' => 'email',
                'label' => 'Correo Electrónico',
                'type' => 'email',
                'placeholder' => 'Ej: sucursal@sabortradicion.com',
                'required' => false,
                'validation' => 'nullable|email|max:100',
                'grid_cols' => 6,
                'help_text' => 'Correo electrónico de la sucursal',
            ],
            [
                'name' => 'manager',
                'label' => 'Gerente',
                'type' => 'text',
                'placeholder' => 'Ej: Juan Pérez',
                'required' => false,
                'validation' => 'nullable|max:100',
                'grid_cols' => 6,
                'help_text' => 'Nombre del gerente responsable',
            ],
            [
                'name' => 'address',
                'label' => 'Dirección',
                'type' => 'textarea',
                'placeholder' => 'Ej: Av. Principal, Edificio Centro Plaza, Local 5',
                'required' => true,
                'validation' => 'required|max:255',
                'grid_cols' => 12,
                'help_text' => 'Dirección completa de la sucursal',
                'rows' => 2,
            ],
            [
                'name' => 'city',
                'label' => 'Ciudad',
                'type' => 'text',
                'placeholder' => 'Ej: Caracas',
                'required' => true,
                'validation' => 'required|max:100',
                'grid_cols' => 4,
            ],
            [
                'name' => 'state',
                'label' => 'Estado/Provincia',
                'type' => 'text',
                'placeholder' => 'Ej: Distrito Capital',
                'required' => true,
                'validation' => 'required|max:100',
                'grid_cols' => 4,
            ],
            [
                'name' => 'postal_code',
                'label' => 'Código Postal',
                'type' => 'text',
                'placeholder' => 'Ej: 1010',
                'required' => false,
                'validation' => 'nullable|max:20',
                'grid_cols' => 4,
            ],
            [
                'name' => 'opening_time',
                'label' => 'Hora de Apertura',
                'type' => 'time',
                'placeholder' => '09:00',
                'required' => true,
                'validation' => 'required',
                'grid_cols' => 4,
                'default' => '09:00:00',
            ],
            [
                'name' => 'closing_time',
                'label' => 'Hora de Cierre',
                'type' => 'time',
                'placeholder' => '22:00',
                'required' => true,
                'validation' => 'required|after:opening_time',
                'grid_cols' => 4,
                'default' => '22:00:00',
            ],
            [
                'name' => 'operation_days',
                'label' => 'Días de Operación',
                'type' => 'text',
                'placeholder' => 'Ej: Lunes a Domingo',
                'required' => false,
                'validation' => 'nullable|max:100',
                'grid_cols' => 4,
                'default' => 'Monday to Sunday',
            ],
            [
                'name' => 'capacity_people',
                'label' => 'Capacidad de Personas',
                'type' => 'number',
                'placeholder' => 'Ej: 100',
                'required' => false,
                'validation' => 'nullable|integer|min:0',
                'grid_cols' => 4,
                'min' => 0,
            ],
            [
                'name' => 'opening_date',
                'label' => 'Fecha de Apertura',
                'type' => 'date',
                'placeholder' => '',
                'required' => false,
                'validation' => 'nullable|date',
                'grid_cols' => 4,
            ],
            [
                'name' => 'latitude',
                'label' => 'Latitud',
                'type' => 'number',
                'placeholder' => 'Ej: 10.506348',
                'required' => false,
                'validation' => 'nullable|numeric|between:-90,90',
                'grid_cols' => 3,
                'step' => 0.00000001,
                'help_text' => 'Coordenada GPS (-90 a 90)',
            ],
            [
                'name' => 'longitude',
                'label' => 'Longitud',
                'type' => 'number',
                'placeholder' => 'Ej: -66.914623',
                'required' => false,
                'validation' => 'nullable|numeric|between:-180,180',
                'grid_cols' => 3,
                'step' => 0.00000001,
                'help_text' => 'Coordenada GPS (-180 a 180)',
            ],
            [
                'name' => 'is_main',
                'label' => '¿Es Sucursal Principal?',
                'type' => 'select',
                'placeholder' => 'Seleccione una opción',
                'required' => false,
                'validation' => 'nullable|boolean',
                'grid_cols' => 3,
                'options' => [
                    ['value' => '1', 'label' => 'Sí'],
                    ['value' => '0', 'label' => 'No'],
                ],
                'default' => '0',
            ],
            [
                'name' => 'has_delivery',
                'label' => '¿Tiene Servicio de Delivery?',
                'type' => 'select',
                'placeholder' => 'Seleccione una opción',
                'required' => false,
                'validation' => 'nullable|boolean',
                'grid_cols' => 3,
                'options' => [
                    ['value' => '1', 'label' => 'Sí'],
                    ['value' => '0', 'label' => 'No'],
                ],
                'default' => '1',
            ],
            [
                'name' => 'has_parking',
                'label' => '¿Tiene Estacionamiento?',
                'type' => 'select',
                'placeholder' => 'Seleccione una opción',
                'required' => false,
                'validation' => 'nullable|boolean',
                'grid_cols' => 3,
                'options' => [
                    ['value' => '1', 'label' => 'Sí'],
                    ['value' => '0', 'label' => 'No'],
                ],
                'default' => '0',
            ],
            [
                'name' => 'active',
                'label' => '¿Sucursal Activa?',
                'type' => 'select',
                'placeholder' => 'Seleccione una opción',
                'required' => false,
                'validation' => 'nullable|boolean',
                'grid_cols' => 3,
                'options' => [
                    ['value' => '1', 'label' => 'Activa'],
                    ['value' => '0', 'label' => 'Inactiva'],
                ],
                'default' => '1',
            ],
            [
                'name' => 'image',
                'label' => 'URL de la Imagen',
                'type' => 'text',
                'placeholder' => 'Ej: https://ejemplo.com/imagen.jpg',
                'required' => false,
                'validation' => 'nullable|max:255',
                'grid_cols' => 12,
                'help_text' => 'URL de la imagen de la sucursal',
            ],
            [
                'name' => 'description',
                'label' => 'Descripción',
                'type' => 'textarea',
                'placeholder' => 'Descripción detallada de la sucursal...',
                'required' => false,
                'validation' => 'nullable',
                'grid_cols' => 12,
                'rows' => 4,
                'help_text' => 'Descripción completa de la sucursal y sus características',
            ],
        ];
    }
}
