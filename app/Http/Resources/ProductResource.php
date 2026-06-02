<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'price' => $this->price,
            'category_id' => $this->category_id,
            'category_name' => $this->category?->name,
            'image' => $this->image,
            'status' => $this->status,
            'status_label' => $this->getStatusLabel(),
            'preparation_time' => $this->preparation_time,
            'ingredients' => $this->ingredients,
            'is_special' => $this->is_special,
            'creation_date' => $this->creation_date?->format('Y-m-d H:i:s'),
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
            'out of stock' => 'Agotado',
            default => 'Desconocido',
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
                'key' => 'name',
                'label' => 'Nombre',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'price',
                'label' => 'Precio',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'category_name',
                'label' => 'Categoría',
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
                'key' => 'preparation_time',
                'label' => 'Tiempo de Preparación',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'is_special',
                'label' => 'Especial',
                'sortable' => true,
                'visible' => false,
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
                'label' => 'Nombre',
                'type' => 'text',
                'placeholder' => 'Ingrese el nombre del producto',
                'required' => true,
                'validation' => 'required|string|max:100',
                'grid_cols' => 6,
            ],
            [
                'name' => 'price',
                'label' => 'Precio',
                'type' => 'number',
                'placeholder' => 'Ingrese el precio',
                'required' => true,
                'validation' => 'required|numeric|min:0',
                'grid_cols' => 6,
                'step' => '0.01',
            ],
            [
                'name' => 'description',
                'label' => 'Descripción',
                'type' => 'textarea',
                'placeholder' => 'Ingrese la descripción del producto',
                'required' => false,
                'validation' => 'nullable|string',
                'grid_cols' => 12,
                'rows' => 3,
            ],
            [
                'name' => 'category_id',
                'label' => 'Categoría',
                'type' => 'select',
                'placeholder' => 'Seleccione una categoría',
                'required' => false,
                'validation' => 'nullable|exists:categories,id',
                'options' => [], // Se debe cargar dinámicamente desde el controlador
                'grid_cols' => 6,
            ],
            [
                'name' => 'status',
                'label' => 'Estado',
                'type' => 'select',
                'placeholder' => 'Seleccione el estado',
                'required' => true,
                'validation' => 'required|in:active,inactive,out of stock',
                'options' => [
                    ['value' => 'active', 'label' => 'Activo'],
                    ['value' => 'inactive', 'label' => 'Inactivo'],
                    ['value' => 'out of stock', 'label' => 'Agotado'],
                ],
                'default' => 'active',
                'grid_cols' => 6,
            ],
            [
                'name' => 'preparation_time',
                'label' => 'Tiempo de Preparación (minutos)',
                'type' => 'number',
                'placeholder' => 'Ingrese el tiempo de preparación',
                'required' => true,
                'validation' => 'required|integer|min:1',
                'default' => 15,
                'grid_cols' => 6,
            ],
            [
                'name' => 'is_special',
                'label' => 'Producto Especial',
                'type' => 'checkbox',
                'required' => false,
                'validation' => 'nullable|boolean',
                'default' => false,
                'grid_cols' => 6,
            ],
            [
                'name' => 'ingredients',
                'label' => 'Ingredientes',
                'type' => 'textarea',
                'placeholder' => 'Ingrese los ingredientes del producto',
                'required' => false,
                'validation' => 'nullable|string',
                'grid_cols' => 12,
                'rows' => 3,
            ],
            [
                'name' => 'image',
                'label' => 'Imagen',
                'type' => 'file',
                'placeholder' => 'Seleccione una imagen',
                'required' => false,
                'validation' => 'nullable|string',
                'help_text' => 'Formatos permitidos: JPG, PNG, GIF. Tamaño máximo: 2MB',
                'accept' => 'image/*',
                'grid_cols' => 12,
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
                'placeholder' => 'Buscar por nombre o descripción...',
            ],
            [
                'name' => 'category_id',
                'label' => 'Categoría',
                'type' => 'select',
                'placeholder' => 'Todas las categorías',
                'options' => [], // Se debe cargar dinámicamente desde el controlador
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
                    ['value' => 'out of stock', 'label' => 'Agotado'],
                ],
            ],
            [
                'name' => 'is_special',
                'label' => 'Especiales',
                'type' => 'select',
                'placeholder' => 'Todos los productos',
                'options' => [
                    ['value' => '', 'label' => 'Todos'],
                    ['value' => '1', 'label' => 'Solo especiales'],
                    ['value' => '0', 'label' => 'No especiales'],
                ],
            ],
        ];
    }
}
