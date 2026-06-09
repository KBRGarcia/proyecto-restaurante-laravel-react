<?php

namespace App\Models;

use App\Enums\PaymentMethod;
use App\Enums\PaymentCurrency;
use App\Enums\PaymentStatus;
use App\Enums\Banks;
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
        'source_bank_code',
        'destination_bank_code',
        'reference_number',
        'payer_identification',
        'payer_phone',
        'payer_email',
        'account_identifier',
        'account_holder_name',
        'transaction_id',
        'card_last_four',
        'card_network',
        'proof_image_path',
        'payment_details',
        'paid_at',
        'confirmed_at',
        'notes',
    ];

    protected $casts = [
        'method' => PaymentMethod::class,
        'currency' => PaymentCurrency::class,
        'status' => PaymentStatus::class,
        'amount' => 'decimal:2',
        'exchange_rate' => 'decimal:4',
        'payment_details' => 'array',
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
        $method = PaymentMethod::tryFrom((string) request()->input('method'));
        $requiredFields = $method?->configuration()['required_fields'] ?? [];
        $fieldRequirement = fn (string $field): string => in_array($field, $requiredFields, true) ? $required : 'nullable';

        return [
            'order_id' => [$required, 'exists:orders,id'],
            'method' => [$required, Rule::in(PaymentMethod::values())],
            'status' => ['sometimes', Rule::in(PaymentStatus::values())],
            'currency' => [$required, 'string', Rule::in(PaymentCurrency::values())],
            'amount' => [$required, 'numeric', 'min:0.01', 'regex:/^\d+(\.\d{1,2})?$/'],
            'exchange_rate' => ['nullable', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,4})?$/'],
            'source_bank_code' => [$fieldRequirement('source_bank_code'), Rule::in(Banks::values())],
            'destination_bank_code' => [$fieldRequirement('destination_bank_code'), Rule::in(Banks::values())],
            'reference_number' => [$fieldRequirement('reference_number'), 'string', 'max:100'],
            'payer_identification' => [$fieldRequirement('payer_identification'), 'string', 'max:30'],
            'payer_phone' => [$fieldRequirement('payer_phone'), 'string', 'regex:' . \App\Enums\PhoneAreaCode::validationPattern()],
            'payer_email' => [$fieldRequirement('payer_email'), 'email', 'max:255'],
            'account_identifier' => [$fieldRequirement('account_identifier'), 'string', 'max:100'],
            'account_holder_name' => [$fieldRequirement('account_holder_name'), 'string', 'max:120'],
            'transaction_id' => [$fieldRequirement('transaction_id'), 'string', 'max:120'],
            'card_last_four' => ['nullable', 'digits:4'],
            'card_network' => ['nullable', 'string', 'max:30'],
            'proof_image_path' => ['nullable', 'string', 'max:255'],
            'payment_details' => ['nullable', 'array'],
            'paid_at' => [$fieldRequirement('paid_at'), 'date'],
            'confirmed_at' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
