<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Validation\Rule;

class Evaluation extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'evaluations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'client_id',
        'order_id',
        'product_id',
        'rating',
        'comment',
        'evaluation_date',
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
        'rating' => 'integer',
        'evaluation_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the evaluation.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the client that owns the evaluation.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * Get the order associated with the evaluation.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the product associated with the evaluation.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the validation rules for the Evaluation model.
     *
     * @param bool $isUpdate Whether the validation is for an update operation
     * @return array<string, string|array>
     */
    public static function rules(bool $isUpdate = false): array
    {
        return [
            'user_id' => [
                'nullable',
                'exists:users,id',
                'required_without:client_id',
                Rule::prohibitedIf(fn () => request()->filled('client_id')),
            ],
            'client_id' => [
                'nullable',
                'exists:clients,id',
                'required_without:user_id',
                Rule::prohibitedIf(fn () => request()->filled('user_id')),
            ],
            'order_id' => ['nullable', 'exists:orders,id'],
            'product_id' => ['nullable', 'exists:products,id'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string'],
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
            'user_id.required_without' => 'Debe seleccionar un usuario o un cliente.',
            'user_id.exists' => 'El usuario seleccionado no existe.',
            'user_id.prohibited' => 'No puede seleccionar usuario y cliente a la vez.',
            'client_id.required_without' => 'Debe seleccionar un usuario o un cliente.',
            'client_id.exists' => 'El cliente seleccionado no existe.',
            'client_id.prohibited' => 'No puede seleccionar usuario y cliente a la vez.',
            'order_id.exists' => 'El pedido seleccionado no existe.',
            'product_id.exists' => 'El producto seleccionado no existe.',
            'rating.required' => 'La calificación es obligatoria.',
            'rating.integer' => 'La calificación debe ser un número entero.',
            'rating.min' => 'La calificación debe ser al menos 1.',
            'rating.max' => 'La calificación no debe exceder 5.',
            'comment.string' => 'El comentario debe ser una cadena de texto.',
        ];
    }
}
