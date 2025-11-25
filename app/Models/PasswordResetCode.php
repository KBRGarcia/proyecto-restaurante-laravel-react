<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class PasswordResetCode extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'password_reset_codes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'mail',
        'code',
        'expires_at',
        'used',
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
        'expires_at' => 'datetime',
        'used' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include unused codes.
     */
    public function scopeUnused(Builder $query): Builder
    {
        return $query->where('used', false);
    }

    /**
     * Scope a query to only include used codes.
     */
    public function scopeUsed(Builder $query): Builder
    {
        return $query->where('used', true);
    }

    /**
     * Scope a query to only include valid (not expired) codes.
     */
    public function scopeValid(Builder $query): Builder
    {
        return $query->where('expires_at', '>', now());
    }

    /**
     * Scope a query to only include expired codes.
     */
    public function scopeExpired(Builder $query): Builder
    {
        return $query->where('expires_at', '<=', now());
    }

    /**
     * Scope a query to filter by email.
     */
    public function scopeByEmail(Builder $query, string $email): Builder
    {
        return $query->where('mail', $email);
    }

    /**
     * Scope a query to filter by code.
     */
    public function scopeByCode(Builder $query, string $code): Builder
    {
        return $query->where('code', $code);
    }

    /**
     * Scope a query to get valid and unused codes for an email.
     */
    public function scopeValidForEmail(Builder $query, string $email): Builder
    {
        return $query->byEmail($email)
            ->unused()
            ->valid();
    }

    /**
     * Check if the code is expired.
     */
    public function isExpired(): bool
    {
        return $this->expires_at <= now();
    }

    /**
     * Check if the code is used.
     */
    public function isUsed(): bool
    {
        return $this->used === true;
    }

    /**
     * Check if the code is valid (not expired and not used).
     */
    public function isValid(): bool
    {
        return !$this->isExpired() && !$this->isUsed();
    }

    /**
     * Mark the code as used.
     */
    public function markAsUsed(): bool
    {
        return $this->update(['used' => true]);
    }

    /**
     * Generate a random 6-digit code.
     */
    public static function generateCode(): string
    {
        return str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    }

    /**
     * Create a new password reset code for an email.
     *
     * @param string $email The email address
     * @param int $expirationMinutes Minutes until expiration (default: 15)
     * @return self
     */
    public static function createForEmail(string $email, int $expirationMinutes = 15): self
    {
        // Invalidar códigos anteriores para el mismo email
        static::byEmail($email)
            ->unused()
            ->update(['used' => true]);

        return static::create([
            'mail' => $email,
            'code' => static::generateCode(),
            'expires_at' => now()->addMinutes($expirationMinutes),
            'used' => false,
        ]);
    }

    /**
     * Verify a code for an email.
     *
     * @param string $email The email address
     * @param string $code The code to verify
     * @return self|null
     */
    public static function verify(string $email, string $code): ?self
    {
        $resetCode = static::validForEmail($email)
            ->byCode($code)
            ->first();

        return $resetCode && $resetCode->isValid() ? $resetCode : null;
    }

    /**
     * Get the validation rules for the PasswordResetCode model.
     *
     * @param bool $isUpdate Whether the validation is for an update operation
     * @return array<string, string|array>
     */
    public static function rules(bool $isUpdate = false): array
    {
        return [
            'mail' => ['required', 'email', 'max:100'],
            'code' => ['required', 'string', 'size:6', 'regex:/^\d{6}$/'],
            'expires_at' => ['required', 'date', 'after:now'],
            'used' => ['nullable', 'boolean'],
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
            'mail.required' => 'El correo electrónico es obligatorio.',
            'mail.email' => 'Debe proporcionar un correo electrónico válido.',
            'mail.max' => 'El correo electrónico no debe exceder los 100 caracteres.',
            'code.required' => 'El código es obligatorio.',
            'code.string' => 'El código debe ser una cadena de texto.',
            'code.size' => 'El código debe tener exactamente 6 dígitos.',
            'code.regex' => 'El código debe contener solo números.',
            'expires_at.required' => 'La fecha de expiración es obligatoria.',
            'expires_at.date' => 'La fecha de expiración debe ser una fecha válida.',
            'expires_at.after' => 'La fecha de expiración debe ser posterior a la fecha actual.',
            'used.boolean' => 'El campo usado debe ser verdadero o falso.',
        ];
    }
}
