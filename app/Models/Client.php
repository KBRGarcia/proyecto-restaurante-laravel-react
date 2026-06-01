<?php

namespace App\Models;

use App\Enums\ClientOrigin;
use App\Enums\PersonStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Validation\Rule;

class Client extends Model
{
    protected $table = 'clients';

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'identity_document',
        'email',
        'phone',
        'address',
        'birth_date',
        'origin',
        'first_purchase_at',
        'last_purchase_at',
        'total_orders',
        'total_spent',
        'status',
        'notes',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'origin' => ClientOrigin::class,
        'first_purchase_at' => 'datetime',
        'last_purchase_at' => 'datetime',
        'total_orders' => 'integer',
        'total_spent' => 'decimal:2',
        'status' => PersonStatus::class,
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function ($q) use ($search) {
            $q->where('first_name', 'like', "%{$search}%")
                ->orWhere('last_name', 'like', "%{$search}%")
                ->orWhere('identity_document', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('phone', 'like', "%{$search}%");
        });
    }

    public function getFullNameAttribute(): string
    {
        return trim($this->first_name . ' ' . $this->last_name);
    }

    /**
     * @return array<string, mixed>
     */
    public static function rules(bool $isUpdate = false, ?int $id = null): array
    {
        $uniqueClient = fn (string $column) => Rule::unique('clients', $column)->ignore($id);

        return [
            'user_id' => ['nullable', 'exists:users,id', $uniqueClient('user_id')],
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'identity_document' => ['nullable', 'string', 'max:30', $uniqueClient('identity_document')],
            'email' => ['nullable', 'email', 'max:100', $uniqueClient('email')],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string'],
            'birth_date' => ['nullable', 'date', 'before:today'],
            'origin' => ['required', Rule::in(ClientOrigin::values())],
            'first_purchase_at' => ['nullable', 'date'],
            'last_purchase_at' => ['nullable', 'date', 'after_or_equal:first_purchase_at'],
            'total_orders' => ['nullable', 'integer', 'min:0'],
            'total_spent' => ['nullable', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,2})?$/'],
            'status' => ['required', Rule::in(PersonStatus::values())],
            'notes' => ['nullable', 'string'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function messages(): array
    {
        return [
            'first_name.required' => 'El nombre del cliente es obligatorio.',
            'last_name.required' => 'El apellido del cliente es obligatorio.',
            'identity_document.unique' => 'Este documento de identidad ya esta registrado.',
            'email.email' => 'Debe indicar un correo valido.',
            'email.unique' => 'Este correo ya esta registrado.',
            'user_id.unique' => 'Este usuario ya esta asociado a otro cliente.',
            'origin.required' => 'El origen del cliente es obligatorio.',
            'origin.in' => 'El origen seleccionado no es valido.',
            'status.required' => 'El estado del cliente es obligatorio.',
            'status.in' => 'El estado seleccionado no es valido.',
        ];
    }
}
