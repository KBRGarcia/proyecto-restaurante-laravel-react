<?php

namespace App\Models;

use App\Enums\PaymentMethod;
use App\Enums\PaymentCurrency;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Validation\Rule;

class Order extends Model
{
    /**
     * Status constants.
     */
    public const STATUS_PENDING = 'pending';
    public const STATUS_PREPARING = 'preparing';
    public const STATUS_READY = 'ready';
    public const STATUS_ON_THE_WAY = 'on_the_way';
    public const STATUS_DELIVERED = 'delivered';
    public const STATUS_CANCELED = 'canceled';

    /**
     * Service type constants.
     */
    public const SERVICE_TYPE_DELIVERY = 'delivery';
    public const SERVICE_TYPE_PICKUP = 'pickup';

    /**
     * Currency constants.
     */
    public const CURRENCY_NACIONAL = 'nacional';
    public const CURRENCY_INTERNACIONAL = 'internacional';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'orders';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'client_id',
        'branch_id',
        'status',
        'service_type',
        'subtotal',
        'taxes',
        'total',
        'delivery_address',
        'contact_phone',
        'special_notes',
        'payment_method',
        'currency',
        'national_payment_data',
        'order_date',
        'estimated_delivery_date',
        'assigned_employee_id',
        'pending_date',
        'preparing_date',
        'ready_date',
        'on_the_way_date',
        'delivered_date',
        'canceled_date',
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
        'subtotal' => 'decimal:2',
        'taxes' => 'decimal:2',
        'total' => 'decimal:2',
        'national_payment_data' => 'array',
        'order_date' => 'datetime',
        'estimated_delivery_date' => 'datetime',
        'pending_date' => 'datetime',
        'preparing_date' => 'datetime',
        'ready_date' => 'datetime',
        'on_the_way_date' => 'datetime',
        'delivered_date' => 'datetime',
        'canceled_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user (customer) that owns the order.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the restaurant client associated with the order.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * Get the branch that prepares or dispatches the order.
     */
    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class, 'branch_id');
    }

    /**
     * Get the employee assigned to the order.
     */
    public function assignedEmployee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_employee_id');
    }

    /**
     * Get the order details for the order.
     */
    public function orderDetails(): HasMany
    {
        return $this->hasMany(OrderDetail::class);
    }

    /**
     * Get the evaluations for the order.
     */
    public function evaluations(): HasMany
    {
        return $this->hasMany(Evaluation::class);
    }

    /**
     * Get payment records for the order.
     */
    public function orderPayments(): HasMany
    {
        return $this->hasMany(OrderPayment::class);
    }

    /**
     * Scope a query to only include pending orders.
     */
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    /**
     * Scope a query to only include preparing orders.
     */
    public function scopePreparing(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_PREPARING);
    }

    /**
     * Scope a query to only include ready orders.
     */
    public function scopeReady(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_READY);
    }

    /**
     * Scope a query to only include orders on the way.
     */
    public function scopeOnTheWay(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_ON_THE_WAY);
    }

    /**
     * Scope a query to only include delivered orders.
     */
    public function scopeDelivered(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_DELIVERED);
    }

    /**
     * Scope a query to only include canceled orders.
     */
    public function scopeCanceled(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_CANCELED);
    }

    /**
     * Scope a query to only include delivery orders.
     */
    public function scopeDelivery(Builder $query): Builder
    {
        return $query->where('service_type', self::SERVICE_TYPE_DELIVERY);
    }

    /**
     * Scope a query to only include pickup orders.
     */
    public function scopePickup(Builder $query): Builder
    {
        return $query->where('service_type', self::SERVICE_TYPE_PICKUP);
    }

    /**
     * Scope a query to filter by user.
     */
    public function scopeByUser(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to filter by assigned employee.
     */
    public function scopeByEmployee(Builder $query, int $employeeId): Builder
    {
        return $query->where('assigned_employee_id', $employeeId);
    }

    /**
     * Scope a query to filter by order date range.
     */
    public function scopeByDateRange(Builder $query, string $startDate, string $endDate): Builder
    {
        return $query->whereBetween('order_date', [$startDate, $endDate]);
    }

    /**
     * Scope a query to order by order date.
     */
    public function scopeOrderByDate(Builder $query, string $direction = 'desc'): Builder
    {
        return $query->orderBy('order_date', $direction);
    }

    /**
     * Check if the order is pending.
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Check if the order is preparing.
     */
    public function isPreparing(): bool
    {
        return $this->status === self::STATUS_PREPARING;
    }

    /**
     * Check if the order is ready.
     */
    public function isReady(): bool
    {
        return $this->status === self::STATUS_READY;
    }

    /**
     * Check if the order is on the way.
     */
    public function isOnTheWay(): bool
    {
        return $this->status === self::STATUS_ON_THE_WAY;
    }

    /**
     * Check if the order is delivered.
     */
    public function isDelivered(): bool
    {
        return $this->status === self::STATUS_DELIVERED;
    }

    /**
     * Check if the order is canceled.
     */
    public function isCanceled(): bool
    {
        return $this->status === self::STATUS_CANCELED;
    }

    /**
     * Check if the order is delivery type.
     */
    public function isDelivery(): bool
    {
        return $this->service_type === self::SERVICE_TYPE_DELIVERY;
    }

    /**
     * Check if the order is pickup type.
     */
    public function isPickup(): bool
    {
        return $this->service_type === self::SERVICE_TYPE_PICKUP;
    }

    /**
     * Get the validation rules for the Order model.
     *
     * @param bool $isUpdate Whether the validation is for an update operation
     * @return array<string, string|array>
     */
    public static function rules(bool $isUpdate = false): array
    {
        return [
            'user_id' => ['nullable', 'exists:users,id'],
            'client_id' => ['nullable', 'exists:clients,id'],
            'branch_id' => ['nullable', 'exists:branches,id'],
            'status' => ['required', 'string', 'in:pending,preparing,ready,on_the_way,delivered,canceled'],
            'service_type' => ['required', 'string', 'in:delivery,pickup'],
            'subtotal' => ['required', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,2})?$/'],
            'taxes' => ['nullable', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,2})?$/'],
            'total' => ['required', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,2})?$/'],
            'delivery_address' => ['nullable', 'string', 'required_if:service_type,delivery'],
            'contact_phone' => ['nullable', 'string', 'regex:' . \App\Enums\PhoneAreaCode::validationPattern()],
            'special_notes' => ['nullable', 'string'],
            'payment_method' => ['nullable', 'string', 'max:50', Rule::in(PaymentMethod::values())],
            'currency' => ['required', 'string', Rule::in(PaymentCurrency::values())],
            'national_payment_data' => ['nullable', 'array'],
            'estimated_delivery_date' => ['nullable', 'date'],
            'assigned_employee_id' => ['nullable', 'exists:users,id'],
            'client' => ['nullable', 'array'],
            'client.first_name' => ['nullable', 'string', 'max:100'],
            'client.last_name' => ['nullable', 'string', 'max:100'],
            'client.identity_document' => ['nullable', 'string', 'max:30'],
            'client.email' => ['nullable', 'email', 'max:100'],
            'client.phone' => ['nullable', 'string', 'regex:' . \App\Enums\PhoneAreaCode::validationPattern()],
            'client.address' => ['nullable', 'string'],
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
            'user_id.exists' => 'El usuario seleccionado no existe.',
            'client_id.exists' => 'El cliente seleccionado no existe.',
            'branch_id.exists' => 'La sucursal seleccionada no existe.',
            'status.required' => 'El estado es obligatorio.',
            'status.in' => 'El estado seleccionado no es válido.',
            'service_type.required' => 'El tipo de servicio es obligatorio.',
            'service_type.in' => 'El tipo de servicio seleccionado no es válido.',
            'subtotal.required' => 'El subtotal es obligatorio.',
            'subtotal.numeric' => 'El subtotal debe ser un número.',
            'subtotal.min' => 'El subtotal debe ser mayor o igual a 0.',
            'subtotal.regex' => 'El subtotal debe tener como máximo 2 decimales.',
            'taxes.numeric' => 'Los impuestos deben ser un número.',
            'taxes.min' => 'Los impuestos deben ser mayor o igual a 0.',
            'taxes.regex' => 'Los impuestos deben tener como máximo 2 decimales.',
            'total.required' => 'El total es obligatorio.',
            'total.numeric' => 'El total debe ser un número.',
            'total.min' => 'El total debe ser mayor o igual a 0.',
            'total.regex' => 'El total debe tener como máximo 2 decimales.',
            'delivery_address.string' => 'La dirección de entrega debe ser una cadena de texto.',
            'delivery_address.required_if' => 'La dirección de entrega es obligatoria para pedidos a domicilio.',
            'contact_phone.string' => 'El teléfono de contacto debe ser una cadena de texto.',
            'contact_phone.regex' => 'El teléfono de contacto debe incluir un código válido y 7 dígitos.',
            'special_notes.string' => 'Las notas especiales deben ser una cadena de texto.',
            'payment_method.string' => 'El método de pago debe ser una cadena de texto.',
            'payment_method.max' => 'El método de pago no debe exceder los 50 caracteres.',
            'payment_method.in' => 'El método de pago seleccionado no es válido.',
            'currency.required' => 'La moneda es obligatoria.',
            'currency.in' => 'La moneda seleccionada no es válida.',
            'national_payment_data.array' => 'Los datos de pago nacional deben ser un arreglo.',
            'estimated_delivery_date.date' => 'La fecha de entrega estimada debe ser una fecha válida.',
            'assigned_employee_id.exists' => 'El empleado asignado seleccionado no existe.',
        ];
    }
}
