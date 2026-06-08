<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EvaluationResource extends JsonResource
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
            'user_name' => $this->user ? $this->user->full_name : null,
            'client_id' => $this->client_id,
            'client_name' => $this->client ? $this->client->full_name : null,
            'evaluator_name' => $this->user
                ? $this->user->full_name
                : ($this->client ? $this->client->full_name : null),
            'order_id' => $this->order_id,
            'order_number' => $this->order_id,
            'product_id' => $this->product_id,
            'product_name' => $this->product ? $this->product->name : null,
            'rating' => $this->rating,
            'comment' => $this->comment,
            'evaluation_date' => $this->evaluation_date?->format('Y-m-d H:i:s'),
            'evaluation_date_formatted' => $this->evaluation_date?->format('d/m/Y H:i'),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
            
            // Relaciones
            'user' => new UserResource($this->whenLoaded('user')),
            'client' => new ClientResource($this->whenLoaded('client')),
            'order' => new OrderResource($this->whenLoaded('order')),
            'product' => new ProductResource($this->whenLoaded('product')),
        ];
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
                'label' => 'Evaluador',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'product_name',
                'label' => 'Producto',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'order_number',
                'label' => 'Orden #',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'rating',
                'label' => 'Calificación',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'comment',
                'label' => 'Comentario',
                'sortable' => false,
                'visible' => true,
            ],
            [
                'key' => 'evaluation_date_formatted',
                'label' => 'Fecha de Evaluación',
                'sortable' => true,
                'visible' => true,
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
                'label' => 'Usuario',
                'type' => 'select',
                'placeholder' => 'Seleccione un usuario',
                'required' => false,
                'validation' => 'nullable|exists:users,id|required_without:client_id',
                'options' => [], // Se llena dinámicamente
                'grid_cols' => 6,
            ],
            [
                'name' => 'client_id',
                'label' => 'Cliente',
                'type' => 'select',
                'placeholder' => 'Seleccione un cliente',
                'required' => false,
                'validation' => 'nullable|exists:clients,id|required_without:user_id',
                'options' => [], // Se llena dinámicamente
                'grid_cols' => 6,
            ],
            [
                'name' => 'product_id',
                'label' => 'Producto',
                'type' => 'select',
                'placeholder' => 'Seleccione un producto (opcional)',
                'required' => false,
                'validation' => 'nullable|exists:products,id',
                'options' => [], // Se llena dinámicamente
                'grid_cols' => 6,
            ],
            [
                'name' => 'order_id',
                'label' => 'Orden',
                'type' => 'select',
                'placeholder' => 'Seleccione una orden (opcional)',
                'required' => false,
                'validation' => 'nullable|exists:orders,id',
                'options' => [], // Se llena dinámicamente
                'grid_cols' => 6,
            ],
            [
                'name' => 'rating',
                'label' => 'Calificación',
                'type' => 'select',
                'placeholder' => 'Seleccione una calificación',
                'required' => true,
                'validation' => 'required|integer|min:1|max:5',
                'options' => [
                    ['value' => '1', 'label' => '⭐ (1 estrella)'],
                    ['value' => '2', 'label' => '⭐⭐ (2 estrellas)'],
                    ['value' => '3', 'label' => '⭐⭐⭐ (3 estrellas)'],
                    ['value' => '4', 'label' => '⭐⭐⭐⭐ (4 estrellas)'],
                    ['value' => '5', 'label' => '⭐⭐⭐⭐⭐ (5 estrellas)'],
                ],
                'default' => '5',
                'grid_cols' => 6,
            ],
            [
                'name' => 'comment',
                'label' => 'Comentario',
                'type' => 'textarea',
                'placeholder' => 'Ingrese un comentario sobre la experiencia',
                'required' => false,
                'validation' => 'nullable|string',
                'grid_cols' => 12,
                'rows' => 4,
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
                'placeholder' => 'Buscar por usuario, producto o comentario...',
            ],
            [
                'name' => 'rating',
                'label' => 'Calificación',
                'type' => 'select',
                'placeholder' => 'Todas las calificaciones',
                'options' => [
                    ['value' => '', 'label' => 'Todas'],
                    ['value' => '5', 'label' => '⭐⭐⭐⭐⭐ (5 estrellas)'],
                    ['value' => '4', 'label' => '⭐⭐⭐⭐ (4 estrellas)'],
                    ['value' => '3', 'label' => '⭐⭐⭐ (3 estrellas)'],
                    ['value' => '2', 'label' => '⭐⭐ (2 estrellas)'],
                    ['value' => '1', 'label' => '⭐ (1 estrella)'],
                ],
            ],
        ];
    }
}
