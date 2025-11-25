<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Branch extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'branches';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'address',
        'city',
        'state',
        'postal_code',
        'phone',
        'email',
        'opening_time',
        'closing_time',
        'operation_days',
        'latitude',
        'longitude',
        'is_main',
        'has_delivery',
        'has_parking',
        'capacity_people',
        'image',
        'description',
        'active',
        'opening_date',
        'manager',
        'creation_date',
        'update_date',
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
        'opening_time' => 'string',
        'closing_time' => 'string',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'is_main' => 'boolean',
        'has_delivery' => 'boolean',
        'has_parking' => 'boolean',
        'capacity_people' => 'integer',
        'active' => 'boolean',
        'opening_date' => 'date',
        'creation_date' => 'datetime',
        'update_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active branches.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('active', true);
    }

    /**
     * Scope a query to only include inactive branches.
     */
    public function scopeInactive(Builder $query): Builder
    {
        return $query->where('active', false);
    }

    /**
     * Scope a query to filter by city.
     */
    public function scopeByCity(Builder $query, string $city): Builder
    {
        return $query->where('city', $city);
    }

    /**
     * Scope a query to filter by state.
     */
    public function scopeByState(Builder $query, string $state): Builder
    {
        return $query->where('state', $state);
    }

    /**
     * Scope a query to only include main branch.
     */
    public function scopeMain(Builder $query): Builder
    {
        return $query->where('is_main', true);
    }

    /**
     * Scope a query to only include branches with delivery.
     */
    public function scopeWithDelivery(Builder $query): Builder
    {
        return $query->where('has_delivery', true);
    }

    /**
     * Scope a query to only include branches with parking.
     */
    public function scopeWithParking(Builder $query): Builder
    {
        return $query->where('has_parking', true);
    }

    /**
     * Scope a query to search branches by name, city, or address.
     */
    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
                ->orWhere('city', 'like', "%{$search}%")
                ->orWhere('address', 'like', "%{$search}%")
                ->orWhere('manager', 'like', "%{$search}%");
        });
    }

    /**
     * Get the products that are available in this branch.
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_branches')
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
     * Check if the branch is active.
     */
    public function isActive(): bool
    {
        return $this->active === true;
    }

    /**
     * Check if the branch is the main branch.
     */
    public function isMain(): bool
    {
        return $this->is_main === true;
    }

    /**
     * Check if the branch has delivery service.
     */
    public function hasDeliveryService(): bool
    {
        return $this->has_delivery === true;
    }

    /**
     * Check if the branch has parking.
     */
    public function hasParking(): bool
    {
        return $this->has_parking === true;
    }

    /**
     * Get the full address.
     */
    public function getFullAddress(): string
    {
        $parts = array_filter([
            $this->address,
            $this->city,
            $this->state,
            $this->postal_code,
        ]);

        return implode(', ', $parts);
    }

    /**
     * Get the validation rules for the Branch model.
     *
     * @param bool $isUpdate Whether the validation is for an update operation
     * @return array<string, string|array>
     */
    public static function rules(bool $isUpdate = false): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'address' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:100'],
            'state' => ['required', 'string', 'max:100'],
            'postal_code' => ['nullable', 'string', 'max:20'],
            'phone' => ['required', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:100'],
            'opening_time' => ['required', 'date_format:H:i:s'],
            'closing_time' => ['required', 'date_format:H:i:s', 'after:opening_time'],
            'operation_days' => ['nullable', 'string', 'max:100'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'is_main' => ['nullable', 'boolean'],
            'has_delivery' => ['nullable', 'boolean'],
            'has_parking' => ['nullable', 'boolean'],
            'capacity_people' => ['nullable', 'integer', 'min:0'],
            'image' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'active' => ['nullable', 'boolean'],
            'opening_date' => ['nullable', 'date'],
            'manager' => ['nullable', 'string', 'max:100'],
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
            'name.required' => 'El nombre de la sucursal es obligatorio.',
            'name.max' => 'El nombre no debe exceder los 100 caracteres.',
            'address.required' => 'La dirección es obligatoria.',
            'address.max' => 'La dirección no debe exceder los 255 caracteres.',
            'city.required' => 'La ciudad es obligatoria.',
            'city.max' => 'La ciudad no debe exceder los 100 caracteres.',
            'state.required' => 'El estado/provincia es obligatorio.',
            'state.max' => 'El estado/provincia no debe exceder los 100 caracteres.',
            'postal_code.max' => 'El código postal no debe exceder los 20 caracteres.',
            'phone.required' => 'El teléfono es obligatorio.',
            'phone.max' => 'El teléfono no debe exceder los 20 caracteres.',
            'email.email' => 'Debe proporcionar un correo electrónico válido.',
            'email.max' => 'El correo electrónico no debe exceder los 100 caracteres.',
            'opening_time.required' => 'La hora de apertura es obligatoria.',
            'opening_time.date_format' => 'La hora de apertura debe tener el formato HH:mm:ss.',
            'closing_time.required' => 'La hora de cierre es obligatoria.',
            'closing_time.date_format' => 'La hora de cierre debe tener el formato HH:mm:ss.',
            'closing_time.after' => 'La hora de cierre debe ser posterior a la hora de apertura.',
            'operation_days.max' => 'Los días de operación no deben exceder los 100 caracteres.',
            'latitude.numeric' => 'La latitud debe ser un número.',
            'latitude.between' => 'La latitud debe estar entre -90 y 90.',
            'longitude.numeric' => 'La longitud debe ser un número.',
            'longitude.between' => 'La longitud debe estar entre -180 y 180.',
            'is_main.boolean' => 'El campo sucursal principal debe ser verdadero o falso.',
            'has_delivery.boolean' => 'El campo tiene servicio de entrega debe ser verdadero o falso.',
            'has_parking.boolean' => 'El campo tiene estacionamiento debe ser verdadero o falso.',
            'capacity_people.integer' => 'La capacidad de personas debe ser un número entero.',
            'capacity_people.min' => 'La capacidad de personas debe ser mayor o igual a 0.',
            'image.max' => 'La imagen no debe exceder los 255 caracteres.',
            'active.boolean' => 'El campo activo debe ser verdadero o falso.',
            'opening_date.date' => 'La fecha de apertura debe ser una fecha válida.',
            'manager.max' => 'El gerente no debe exceder los 100 caracteres.',
        ];
    }
}
