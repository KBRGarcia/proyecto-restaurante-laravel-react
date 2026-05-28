<?php

namespace App\Models;

use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Enums\VenezuelaBank;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Validation\Rule;

class OrderPayment extends Model
{
    protected $table = 'order_payments';

    protected $fillable = [
        'order_id',
        'method',
        'status',
        'currency',
        'amount',
        'exchange_rate',
        'bank_code',
        'reference_number',
        'payer_identification',
        'payer_phone',
        'proof_image_path',
        'paid_at',
        'confirmed_at',
        'notes',
    ];

    protected $casts = [
        'method' => PaymentMethod::class,
        'status' => PaymentStatus::class,
        'amount' => 'decimal:2',
        'exchange_rate' => 'decimal:4',
        'paid_at' => 'datetime',
        'confirmed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * @return array<string, mixed>
     */
    public static function rules(bool $isUpdate = false): array
    {
        $required = $isUpdate ? 'sometimes' : 'required';

        return [
            'order_id' => [$required, 'exists:orders,id'],
            'method' => [$required, Rule::in(PaymentMethod::values())],
            'status' => ['sometimes', Rule::in(PaymentStatus::values())],
            'currency' => [$required, 'string', 'in:nacional,internacional'],
            'amount' => [$required, 'numeric', 'min:0.01', 'regex:/^\d+(\.\d{1,2})?$/'],
            'exchange_rate' => ['nullable', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,4})?$/'],
            'bank_code' => ['nullable', Rule::in(VenezuelaBank::values())],
            'reference_number' => ['nullable', 'string', 'max:100'],
            'payer_identification' => ['nullable', 'string', 'max:30'],
            'payer_phone' => ['nullable', 'string', 'max:20'],
            'proof_image_path' => ['nullable', 'string', 'max:255'],
            'paid_at' => ['nullable', 'date'],
            'confirmed_at' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
