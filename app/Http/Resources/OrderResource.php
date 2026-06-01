<?php

namespace App\Http\Resources;

use App\Enums\PaymentMethod;
use App\Enums\PaymentCurrency;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'branch_id' => $this->branch_id,
            'branch_name' => $this->branch?->name,
            'branch' => $this->whenLoaded('branch', function () {
                return [
                    'id' => $this->branch->id,
                    'name' => $this->branch->name,
                    'city' => $this->branch->city,
                    'state' => $this->branch->state,
                ];
            }),
            'user_name' => $this->user?->full_name ?? $this->user?->name . ' ' . $this->user?->last_name ?? 'Usuario no encontrado',
            'user' => $this->whenLoaded('user', function () {
                return [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'last_name' => $this->user->last_name,
                    'full_name' => $this->user->name . ' ' . $this->user->last_name,
                    'email' => $this->user->email,
                    'phone_number' => $this->user->phone_number,
                ];
            }),
            'status' => $this->status,
            'status_label' => $this->getStatusLabel(),
            'service_type' => $this->service_type,
            'service_type_label' => $this->getServiceTypeLabel(),
            'subtotal' => $this->subtotal,
            'taxes' => $this->taxes,
            'total' => $this->total,
            'delivery_address' => $this->delivery_address,
            'contact_phone' => $this->contact_phone,
            'special_notes' => $this->special_notes,
            'payment_method' => $this->payment_method,
            'currency' => $this->currency,
            'currency_label' => $this->getCurrencyLabel(),
            'national_payment_data' => $this->national_payment_data,
            'order_date' => $this->order_date,
            'order_date_formatted' => $this->order_date ? $this->order_date->format('d/m/Y H:i') : null,
            'estimated_delivery_date' => $this->estimated_delivery_date,
            'estimated_delivery_date_formatted' => $this->estimated_delivery_date ? $this->estimated_delivery_date->format('d/m/Y H:i') : null,
            'assigned_employee_id' => $this->assigned_employee_id,
            'assigned_employee_name' => $this->assignedEmployee?->full_name ?? $this->assignedEmployee?->name . ' ' . $this->assignedEmployee?->last_name ?? null,
            'assigned_employee' => $this->whenLoaded('assignedEmployee', function () {
                return [
                    'id' => $this->assignedEmployee->id,
                    'name' => $this->assignedEmployee->name,
                    'last_name' => $this->assignedEmployee->last_name,
                    'full_name' => $this->assignedEmployee->name . ' ' . $this->assignedEmployee->last_name,
                    'email' => $this->assignedEmployee->email,
                ];
            }),
            'pending_date' => $this->pending_date,
            'preparing_date' => $this->preparing_date,
            'ready_date' => $this->ready_date,
            'on_the_way_date' => $this->on_the_way_date,
            'delivered_date' => $this->delivered_date,
            'canceled_date' => $this->canceled_date,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    /**
     * Get the status label.
     */
    private function getStatusLabel(): string
    {
        return match ($this->status) {
            'pending' => 'Pendiente',
            'preparing' => 'En Preparación',
            'ready' => 'Listo',
            'on_the_way' => 'En Camino',
            'delivered' => 'Entregado',
            'canceled' => 'Cancelado',
            default => ucfirst($this->status),
        };
    }

    /**
     * Get the service type label.
     */
    private function getServiceTypeLabel(): string
    {
        return match ($this->service_type) {
            'delivery' => 'Domicilio',
            'pickup' => 'Recoger',
            default => ucfirst($this->service_type),
        };
    }

    /**
     * Get the currency label.
     */
    private function getCurrencyLabel(): string
    {
        return match ($this->currency) {
            'nacional' => 'Nacional',
            'internacional' => 'Internacional',
            default => ucfirst($this->currency),
        };
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
                'key' => 'user_name',
                'label' => 'Cliente',
                'sortable' => false,
                'visible' => true,
            ],
            [
                'key' => 'status_label',
                'label' => 'Estado',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'service_type_label',
                'label' => 'Tipo de Servicio',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'total',
                'label' => 'Total',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'currency_label',
                'label' => 'Moneda',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'order_date_formatted',
                'label' => 'Fecha de Orden',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'assigned_employee_name',
                'label' => 'Empleado Asignado',
                'sortable' => false,
                'visible' => false,
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
                'name' => 'search',
                'label' => 'Buscar',
                'type' => 'text',
                'placeholder' => 'Buscar por ID, cliente, teléfono...',
            ],
            [
                'name' => 'status',
                'label' => 'Estado',
                'type' => 'select',
                'placeholder' => 'Todos los estados',
                'options' => [
                    ['value' => 'pending', 'label' => 'Pendiente'],
                    ['value' => 'preparing', 'label' => 'En Preparación'],
                    ['value' => 'ready', 'label' => 'Listo'],
                    ['value' => 'on_the_way', 'label' => 'En Camino'],
                    ['value' => 'delivered', 'label' => 'Entregado'],
                    ['value' => 'canceled', 'label' => 'Cancelado'],
                ],
            ],
            [
                'name' => 'service_type',
                'label' => 'Tipo de Servicio',
                'type' => 'select',
                'placeholder' => 'Todos los tipos',
                'options' => [
                    ['value' => 'delivery', 'label' => 'Domicilio'],
                    ['value' => 'pickup', 'label' => 'Recoger'],
                ],
            ],
            [
                'name' => 'currency',
                'label' => 'Moneda',
                'type' => 'select',
                'placeholder' => 'Todas las monedas',
                'options' => [
                    ['value' => 'nacional', 'label' => 'Nacional'],
                    ['value' => 'internacional', 'label' => 'Internacional'],
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
                'name' => 'user_id',
                'label' => 'Cliente',
                'type' => 'select',
                'placeholder' => 'Seleccione un cliente',
                'required' => true,
                'validation' => 'required|exists:users,id',
                'grid_cols' => 6,
            ],
            [
                'name' => 'branch_id',
                'label' => 'Sucursal',
                'type' => 'select',
                'placeholder' => 'Seleccione una sucursal (opcional)',
                'required' => false,
                'validation' => 'nullable|exists:branches,id',
                'grid_cols' => 6,
            ],
            [
                'name' => 'assigned_employee_id',
                'label' => 'Empleado Asignado',
                'type' => 'select',
                'placeholder' => 'Seleccione un empleado (opcional)',
                'required' => false,
                'validation' => 'nullable|exists:users,id',
                'grid_cols' => 6,
            ],
            [
                'name' => 'status',
                'label' => 'Estado',
                'type' => 'select',
                'placeholder' => 'Seleccione el estado',
                'required' => true,
                'validation' => 'required|in:pending,preparing,ready,on_the_way,delivered,canceled',
                'grid_cols' => 4,
                'options' => [
                    ['value' => 'pending', 'label' => 'Pendiente'],
                    ['value' => 'preparing', 'label' => 'En Preparación'],
                    ['value' => 'ready', 'label' => 'Listo'],
                    ['value' => 'on_the_way', 'label' => 'En Camino'],
                    ['value' => 'delivered', 'label' => 'Entregado'],
                    ['value' => 'canceled', 'label' => 'Cancelado'],
                ],
                'default' => 'pending',
            ],
            [
                'name' => 'service_type',
                'label' => 'Tipo de Servicio',
                'type' => 'select',
                'placeholder' => 'Seleccione el tipo',
                'required' => true,
                'validation' => 'required|in:delivery,pickup',
                'grid_cols' => 4,
                'options' => [
                    ['value' => 'delivery', 'label' => 'Domicilio'],
                    ['value' => 'pickup', 'label' => 'Recoger'],
                ],
            ],
            [
                'name' => 'currency',
                'label' => 'Moneda',
                'type' => 'select',
                'placeholder' => 'Seleccione la moneda',
                'required' => true,
                'validation' => 'required|in:' . implode(',', PaymentCurrency::values()),
                'grid_cols' => 4,
                'options' => [
                    ['value' => 'nacional', 'label' => 'Nacional'],
                    ['value' => 'internacional', 'label' => 'Internacional'],
                ],
                'default' => 'internacional',
            ],
            [
                'name' => 'subtotal',
                'label' => 'Subtotal',
                'type' => 'number',
                'placeholder' => '0.00',
                'required' => true,
                'validation' => 'required|numeric|min:0',
                'grid_cols' => 4,
                'step' => '0.01',
            ],
            [
                'name' => 'taxes',
                'label' => 'Impuestos',
                'type' => 'number',
                'placeholder' => '0.00',
                'required' => false,
                'validation' => 'nullable|numeric|min:0',
                'grid_cols' => 4,
                'default' => '0',
                'step' => '0.01',
            ],
            [
                'name' => 'total',
                'label' => 'Total',
                'type' => 'number',
                'placeholder' => '0.00',
                'required' => true,
                'validation' => 'required|numeric|min:0',
                'grid_cols' => 4,
                'step' => '0.01',
            ],
            [
                'name' => 'delivery_address',
                'label' => 'Dirección de Entrega',
                'type' => 'textarea',
                'placeholder' => 'Ingrese la dirección de entrega (requerido para domicilio)',
                'required' => false,
                'validation' => 'nullable|string|required_if:service_type,delivery',
                'grid_cols' => 12,
                'rows' => 2,
            ],
            [
                'name' => 'contact_phone',
                'label' => 'Teléfono de Contacto',
                'type' => 'text',
                'placeholder' => '+1 555-0100',
                'required' => false,
                'validation' => 'nullable|string|max:20',
                'grid_cols' => 6,
            ],
            [
                'name' => 'payment_method',
                'label' => 'Método de Pago',
                'type' => 'select',
                'placeholder' => 'Seleccione el método de pago',
                'required' => false,
                'validation' => 'nullable|in:' . implode(',', PaymentMethod::values()),
                'grid_cols' => 6,
                'options' => array_map(
                    fn (PaymentMethod $method): array => [
                        'value' => $method->value,
                        'label' => $method->label(),
                    ],
                    PaymentMethod::cases()
                ),
            ],
            [
                'name' => 'special_notes',
                'label' => 'Notas Especiales',
                'type' => 'textarea',
                'placeholder' => 'Ingrese notas especiales (opcional)',
                'required' => false,
                'validation' => 'nullable|string',
                'grid_cols' => 12,
                'rows' => 3,
            ],
            [
                'name' => 'estimated_delivery_date',
                'label' => 'Fecha de Entrega Estimada',
                'type' => 'datetime-local',
                'placeholder' => '',
                'required' => false,
                'validation' => 'nullable|date',
                'grid_cols' => 6,
            ],
        ];
    }
}
