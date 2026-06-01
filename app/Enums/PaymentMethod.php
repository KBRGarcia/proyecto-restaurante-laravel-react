<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case BankTransfer = 'transferencia_bancaria';
    case MobilePayment = 'pago_movil';
    case NationalCash = 'efectivo_nacional';
    case NationalCard = 'tarjeta_nacional';
    case Paypal = 'paypal';
    case Zelle = 'zelle';
    case Zinli = 'zinli';
    case Wally = 'wally';
    case CreditCard = 'tarjeta_credito';
    case Binance = 'binance';
    case InternationalCash = 'efectivo_internacional';

    public function label(): string
    {
        return match ($this) {
            self::BankTransfer => 'Transferencia Bancaria',
            self::MobilePayment => 'Pago Movil',
            self::NationalCash => 'Efectivo Nacional',
            self::NationalCard => 'Tarjeta Nacional',
            self::Paypal => 'PayPal',
            self::Zelle => 'Zelle',
            self::Zinli => 'Zinli',
            self::Wally => 'Wally',
            self::CreditCard => 'Tarjeta de Credito',
            self::Binance => 'Binance',
            self::InternationalCash => 'Efectivo Internacional',
        };
    }

    public function currency(): PaymentCurrency
    {
        return match ($this) {
            self::BankTransfer,
            self::NationalCard,
            self::NationalCash,
            self::MobilePayment => PaymentCurrency::National,
            self::Paypal,
            self::Zelle,
            self::Zinli,
            self::Wally,
            self::CreditCard,
            self::Binance,
            self::InternationalCash => PaymentCurrency::International,
        };
    }

    public function currencyType(): string
    {
        return $this->currency()->value;
    }

    public function configuration(): array
    {
        return match ($this) {
            self::BankTransfer => [
                'required_fields' => [
                    'payer_identification',
                    'reference_number',
                    'source_bank_code',
                    'destination_bank_code',
                    'paid_at',
                    'amount',
                ],
                'optional_fields' => ['proof_image_path', 'notes'],
                'bank_fields' => ['source_bank_code', 'destination_bank_code'],
            ],
            self::MobilePayment => [
                'required_fields' => [
                    'payer_identification',
                    'payer_phone',
                    'source_bank_code',
                    'reference_number',
                    'amount',
                ],
                'optional_fields' => ['proof_image_path', 'paid_at', 'notes'],
                'bank_fields' => ['source_bank_code'],
            ],
            self::NationalCash,
            self::InternationalCash => [
                'required_fields' => ['amount'],
                'optional_fields' => ['paid_at', 'notes'],
            ],
            self::NationalCard => [
                'required_fields' => ['amount', 'reference_number'],
                'optional_fields' => ['card_last_four', 'card_network', 'paid_at', 'notes'],
            ],
            self::CreditCard => [
                'required_fields' => ['amount', 'reference_number'],
                'optional_fields' => ['payer_email', 'card_last_four', 'card_network', 'paid_at', 'notes'],
            ],
            self::Paypal => [
                'required_fields' => ['amount', 'payer_email', 'reference_number'],
                'optional_fields' => ['paid_at', 'proof_image_path', 'notes'],
            ],
            self::Zelle => [
                'required_fields' => ['amount', 'payer_email', 'reference_number'],
                'optional_fields' => ['account_holder_name', 'paid_at', 'proof_image_path', 'notes'],
            ],
            self::Zinli,
            self::Wally => [
                'required_fields' => ['amount', 'account_identifier', 'reference_number'],
                'optional_fields' => ['payer_phone', 'payer_email', 'paid_at', 'proof_image_path', 'notes'],
            ],
            self::Binance => [
                'required_fields' => ['amount', 'transaction_id'],
                'optional_fields' => ['account_identifier', 'paid_at', 'proof_image_path', 'notes'],
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
                'currency_type_label' => $method->currency()->label(),
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
