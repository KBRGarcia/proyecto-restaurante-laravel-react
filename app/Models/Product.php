<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    /**
     * Status constants.
     */
    public const STATUS_ACTIVE = 'active';
    public const STATUS_INACTIVE = 'inactive';
    public const STATUS_OUT_OF_STOCK = 'out of stock';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'category_id',
        'image',
        'status',
        'preparation_time',
        'ingredients',
        'is_special',
        'creation_date',
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
        'price' => 'decimal:2',
        'preparation_time' => 'integer',
        'is_special' => 'boolean',
        'creation_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the category that owns the product.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the order details for the product.
     */
    public function orderDetails(): HasMany
    {
        return $this->hasMany(OrderDetail::class);
    }

    /**
     * Get the evaluations for the product.
     */
    public function evaluations(): HasMany
    {
        return $this->hasMany(Evaluation::class);
    }

    /**
     * Get the branches that have this product.
     */
    public function branches(): BelongsToMany
    {
        return $this->belongsToMany(Branch::class, 'product_branches')
            ->withPivot('available', 'special_price', 'assignment_date')
            ->withTimestamps();
    }

    /**
     * Get the product branches (pivot table records).
     */
    public function productBranches(): HasMany
    {
        return $this->hasMany(ProductBranch::class);
    }

    /**
     * Scope a query to only include active products.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    /**
     * Scope a query to only include inactive products.
     */
    public function scopeInactive(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_INACTIVE);
    }

    /**
     * Scope a query to only include out of stock products.
     */
    public function scopeOutOfStock(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_OUT_OF_STOCK);
    }

    /**
     * Scope a query to only include special products.
     */
    public function scopeSpecial(Builder $query): Builder
    {
        return $query->where('is_special', true);
    }

    /**
     * Scope a query to only include products from a specific category.
     */
    public function scopeByCategory(Builder $query, int $categoryId): Builder
    {
        return $query->where('category_id', $categoryId);
    }

    /**
     * Scope a query to order products by price.
     */
    public function scopeOrderByPrice(Builder $query, string $direction = 'asc'): Builder
    {
        return $query->orderBy('price', $direction);
    }

    /**
     * Scope a query to order products by preparation time.
     */
    public function scopeOrderByPreparationTime(Builder $query, string $direction = 'asc'): Builder
    {
        return $query->orderBy('preparation_time', $direction);
    }

    /**
     * Check if the product is active.
     */
    public function isActive(): bool
    {
        return $this->status === self::STATUS_ACTIVE;
    }

    /**
     * Check if the product is inactive.
     */
    public function isInactive(): bool
    {
        return $this->status === self::STATUS_INACTIVE;
    }

    /**
     * Check if the product is out of stock.
     */
    public function isOutOfStock(): bool
    {
        return $this->status === self::STATUS_OUT_OF_STOCK;
    }

    /**
     * Check if the product is special.
     */
    public function isSpecial(): bool
    {
        return $this->is_special;
    }

    /**
     * Get the validation rules for the Product model.
     *
     * @param bool $isUpdate Whether the validation is for an update operation
     * @return array<string, string|array>
     */
    public static function rules(bool $isUpdate = false): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,2})?$/'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'image' => ['nullable', 'image', 'max:2048'], // 2MB max
            'status' => ['required', 'string', 'in:active,inactive,out of stock'],
            'preparation_time' => ['required', 'integer', 'min:1'],
            'ingredients' => ['nullable', 'string'],
            'is_special' => ['nullable', 'boolean'],
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
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no debe exceder los 100 caracteres.',
            'description.string' => 'La descripción debe ser una cadena de texto.',
            'price.required' => 'El precio es obligatorio.',
            'price.numeric' => 'El precio debe ser un número.',
            'price.min' => 'El precio debe ser mayor o igual a 0.',
            'price.regex' => 'El precio debe tener como máximo 2 decimales.',
            'category_id.exists' => 'La categoría seleccionada no existe.',
            'image.image' => 'La imagen debe ser un archivo de imagen válido.',
            'image.max' => 'La imagen no debe exceder los 2MB.',
            'status.required' => 'El estado es obligatorio.',
            'status.in' => 'El estado seleccionado no es válido.',
            'preparation_time.required' => 'El tiempo de preparación es obligatorio.',
            'preparation_time.integer' => 'El tiempo de preparación debe ser un número entero.',
            'preparation_time.min' => 'El tiempo de preparación debe ser al menos 1 minuto.',
            'ingredients.string' => 'Los ingredientes deben ser una cadena de texto.',
            'is_special.boolean' => 'El campo especial debe ser verdadero o falso.',
        ];
    }
}
