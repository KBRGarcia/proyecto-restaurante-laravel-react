<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case MobilePayment = 'pago_movil';
    case NationalCard = 'tarjeta_nacional';
    case Cash = 'efectivo';
    case BankTransfer = 'transferencia';
    case CreditCard = 'tarjeta_credito';
    case Binance = 'binance';
    case Paypal = 'paypal';
    case Zinli = 'zinli';
    case Zelle = 'zelle';
    case Wally = 'wally';

    public function label(): string
    {
        return match ($this) {
            self::MobilePayment => 'Pago Movil',
            self::NationalCard => 'Tarjeta',
            self::Cash => 'Efectivo',
            self::BankTransfer => 'Transferencia Bancaria',
            self::CreditCard => 'Tarjeta de Credito',
            self::Binance => 'Binance',
            self::Paypal => 'PayPal',
            self::Zinli => 'Zinli',
            self::Zelle => 'Zelle',
            self::Wally => 'Wally',
        };
    }

    public function currencyType(): string
    {
        return match ($this) {
            self::MobilePayment,
            self::NationalCard,
            self::Cash,
            self::BankTransfer => 'nacional',
            self::CreditCard,
            self::Binance,
            self::Paypal,
            self::Zinli,
            self::Zelle,
            self::Wally => 'internacional',
        };
    }

    public function configuration(): array
    {
        return match ($this) {
            self::MobilePayment,
            self::BankTransfer => [
                'requires_identification' => true,
                'requires_reference' => true,
                'available_banks' => VenezuelaBank::values(),
            ],
            self::NationalCard => [
                'types' => ['debit', 'credit'],
                'requires_terminal' => true,
            ],
            self::Cash => [
                'requires_admin_confirmation' => true,
            ],
            self::CreditCard => [
                'types' => ['visa', 'mastercard'],
                'requires_cvv' => true,
            ],
            self::Binance => [
                'requires_transaction_id' => true,
            ],
            self::Paypal => [
                'redirect' => true,
                'requires_password' => true,
            ],
            self::Zinli => [
                'requires_pin' => true,
                'pin_length' => 4,
            ],
            self::Zelle => [
                'requires_full_name' => true,
            ],
            self::Wally => [
                'requires_account_identifier' => true,
            ],
        };
    }

    public function id(): int
    {
        return array_search($this, self::cases(), true) + 1;
    }

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * @return list<array<string, mixed>>
     */
    public static function toArrayList(): array
    {
        return array_map(
            fn (self $method, int $index): array => [
                'id' => $method->id(),
                'code' => $method->value,
                'name' => $method->label(),
                'currency_type' => $method->currencyType(),
                'currency_type_label' => $method->currencyType() === 'nacional' ? 'Nacional' : 'Internacional',
                'active' => true,
                'active_label' => 'Activo',
                'configuration' => $method->configuration(),
                'creation_date' => null,
                'update_date' => null,
                'created_at' => null,
                'updated_at' => null,
            ],
            self::cases(),
            array_keys(self::cases())
        );
    }

    public static function tryFromIdentifier(string|int $identifier): ?self
    {
        $methods = self::cases();

        if (is_int($identifier) || ctype_digit($identifier)) {
            return $methods[((int) $identifier) - 1] ?? null;
        }

        return self::tryFrom((string) $identifier);
    }
}
