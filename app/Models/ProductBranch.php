<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductBranch extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'product_branches';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'product_id',
        'branch_id',
        'available',
        'special_price',
        'assignment_date',
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
        'available' => 'boolean',
        'special_price' => 'decimal:2',
        'assignment_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the product that owns the product branch.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the branch that owns the product branch.
     */
    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    /**
     * Scope a query to only include available product branches.
     */
    public function scopeAvailable(Builder $query): Builder
    {
        return $query->where('available', true);
    }

    /**
     * Scope a query to only include unavailable product branches.
     */
    public function scopeUnavailable(Builder $query): Builder
    {
        return $query->where('available', false);
    }

    /**
     * Scope a query to filter by product.
     */
    public function scopeByProduct(Builder $query, int $productId): Builder
    {
        return $query->where('product_id', $productId);
    }

    /**
     * Scope a query to filter by branch.
     */
    public function scopeByBranch(Builder $query, int $branchId): Builder
    {
        return $query->where('branch_id', $branchId);
    }

    /**
     * Scope a query to filter by product and branch.
     */
    public function scopeByProductAndBranch(Builder $query, int $productId, int $branchId): Builder
    {
        return $query->where('product_id', $productId)->where('branch_id', $branchId);
    }

    /**
     * Check if the product is available in the branch.
     */
    public function isAvailable(): bool
    {
        return $this->available === true;
    }

    /**
     * Check if the product has a special price in the branch.
     */
    public function hasSpecialPrice(): bool
    {
        return $this->special_price !== null && $this->special_price > 0;
    }

    /**
     * Get the effective price (special price if available, otherwise product price).
     */
    public function getEffectivePrice(): float
    {
        if ($this->hasSpecialPrice()) {
            return (float) $this->special_price;
        }

        return $this->product ? (float) $this->product->price : 0.0;
    }

    /**
     * Get the validation rules for the ProductBranch model.
     *
     * @param bool $isUpdate Whether the validation is for an update operation
     * @param int|null $id The ID of the current record (for update operations)
     * @return array<string, string|array>
     */
    public static function rules(bool $isUpdate = false, ?int $id = null): array
    {
        $rules = [
            'product_id' => ['required', 'exists:products,id'],
            'branch_id' => ['required', 'exists:branches,id'],
            'available' => ['nullable', 'boolean'],
            'special_price' => ['nullable', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,2})?$/'],
        ];

        // En creación, validar que la combinación product_id + branch_id sea única
        if (!$isUpdate) {
            $rules['product_id'][] = 'unique:product_branches,product_id,NULL,id,branch_id,' . request()->input('branch_id');
        } else {
            // En actualización, excluir el registro actual de la validación unique
            if ($id) {
                $rules['product_id'][] = "unique:product_branches,product_id,{$id},id,branch_id," . request()->input('branch_id');
            }
        }

        return $rules;
    }

    /**
     * Get custom validation messages.
     *
     * @return array<string, string>
     */
    public static function messages(): array
    {
        return [
            'product_id.required' => 'El producto es obligatorio.',
            'product_id.exists' => 'El producto seleccionado no existe.',
            'product_id.unique' => 'Este producto ya está asignado a esta sucursal.',
            'branch_id.required' => 'La sucursal es obligatoria.',
            'branch_id.exists' => 'La sucursal seleccionada no existe.',
            'available.boolean' => 'El campo disponible debe ser verdadero o falso.',
            'special_price.numeric' => 'El precio especial debe ser un número.',
            'special_price.min' => 'El precio especial debe ser mayor o igual a 0.',
            'special_price.regex' => 'El precio especial debe tener como máximo 2 decimales.',
        ];
    }
}
