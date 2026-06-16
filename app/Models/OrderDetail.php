<?php

namespace App\Models;

use App\Enums\PaymentCurrency;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Validation\Rule;

class OrderDetail extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'order_details';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'unit_price',
        'subtotal',
        'product_notes',
    ];

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [
        'id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'integer',
        'unit_price' => 'decimal:2',
        'subtotal' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the order that owns the order detail.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the product that owns the order detail.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Scope a query to filter by order.
     */
    public function scopeByOrder(Builder $query, int $orderId): Builder
    {
        return $query->where('order_id', $orderId);
    }

    /**
     * Scope a query to filter by product.
     */
    public function scopeByProduct(Builder $query, int $productId): Builder
    {
        return $query->where('product_id', $productId);
    }

    /**
     * Calculate subtotal based on quantity and unit price.
     */
    public function calculateSubtotal(): float
    {
        return $this->quantity * $this->unit_price;
    }

    /**
     * Boot method to handle model events.
     */
    protected static function boot()
    {
        parent::boot();

        // Calcular automáticamente el subtotal antes de guardar
        static::saving(function ($orderDetail) {
            if ($orderDetail->quantity && $orderDetail->unit_price) {
                $orderDetail->subtotal = $orderDetail->quantity * $orderDetail->unit_price;
            }
        });
    }

    /**
     * Get the validation rules for batch order detail operations.
     *
     * @return array<string, string|array>
     */
    public static function batchRules(): array
    {
        return [
            'order_id' => ['required', 'exists:orders,id'],
            'currency' => ['required', 'string', Rule::in(PaymentCurrency::values())],
            'taxes' => ['nullable', 'numeric', 'min:0', 'max:100', 'regex:/^\d+(\.\d{1,2})?$/'],
            'delivery_address' => ['nullable', 'string'],
            'subtotal' => ['nullable', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,2})?$/'],
            'total' => ['nullable', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,2})?$/'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.id' => ['nullable', 'integer', 'exists:order_details,id'],
            'items.*.product_id' => ['required', 'integer', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'items.*.unit_price' => ['required', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,2})?$/'],
            'items.*.subtotal' => ['nullable', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,2})?$/'],
            'items.*.product_notes' => ['nullable', 'string'],
        ];
    }

    /**
     * Get custom validation messages for batch operations.
     *
     * @return array<string, string>
     */
    public static function batchMessages(): array
    {
        return [
            ...self::messages(),
            'items.required' => 'Debe agregar al menos un producto.',
            'items.min' => 'Debe agregar al menos un producto.',
            'items.*.product_id.required' => 'El producto es obligatorio.',
            'items.*.product_id.exists' => 'El producto seleccionado no existe.',
            'items.*.quantity.required' => 'La cantidad es obligatoria.',
            'items.*.quantity.min' => 'La cantidad debe ser al menos 1.',
            'items.*.unit_price.required' => 'El precio unitario es obligatorio.',
            'currency.required' => 'La moneda es obligatoria.',
            'currency.in' => 'La moneda seleccionada no es válida.',
            'taxes.max' => 'El porcentaje de impuestos no debe exceder 100.',
        ];
    }

    /**
     * Get the validation rules for the OrderDetail model.
     *
     * @param bool $isUpdate Whether the validation is for an update operation
     * @return array<string, string|array>
     */
    public static function rules(bool $isUpdate = false): array
    {
        return [
            'order_id' => ['required', 'exists:orders,id'],
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
            'unit_price' => ['required', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,2})?$/'],
            'subtotal' => ['nullable', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,2})?$/'],
            'product_notes' => ['nullable', 'string'],
        ];
    }

    /**
     * Get custom validation messages.
     *
     * @return array<string, string>
     */
    public static function messages(): array
    {
        return [
            'order_id.required' => 'La orden es obligatoria.',
            'order_id.exists' => 'La orden seleccionada no existe.',
            'product_id.required' => 'El producto es obligatorio.',
            'product_id.exists' => 'El producto seleccionado no existe.',
            'quantity.required' => 'La cantidad es obligatoria.',
            'quantity.integer' => 'La cantidad debe ser un número entero.',
            'quantity.min' => 'La cantidad debe ser al menos 1.',
            'unit_price.required' => 'El precio unitario es obligatorio.',
            'unit_price.numeric' => 'El precio unitario debe ser un número.',
            'unit_price.min' => 'El precio unitario debe ser mayor o igual a 0.',
            'unit_price.regex' => 'El precio unitario debe tener como máximo 2 decimales.',
            'subtotal.numeric' => 'El subtotal debe ser un número.',
            'subtotal.min' => 'El subtotal debe ser mayor o igual a 0.',
            'subtotal.regex' => 'El subtotal debe tener como máximo 2 decimales.',
            'product_notes.string' => 'Las notas del producto deben ser una cadena de texto.',
        ];
    }
}
