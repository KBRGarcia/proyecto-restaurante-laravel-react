<?php

namespace App\Enums;

enum Banks: string
{
    case BancoDeVenezuela = '0102';
    case VenezolanoDeCredito = '0104';
    case Mercantil = '0105';
    case Provincial = '0108';
    case Banesco = '0134';
    case BancoNacionalDeCredito = '0191';

    public function label(): string
    {
        return match ($this) {
            self::BancoDeVenezuela => 'Banco de Venezuela',
            self::VenezolanoDeCredito => 'Venezolano de Credito',
            self::Mercantil => 'Banco Mercantil',
            self::Provincial => 'BBVA Banco Provincial',
            self::Banesco => 'Banesco',
            self::BancoNacionalDeCredito => 'Banco Nacional de Credito',
        };
    }

    public function slug(): string
    {
        return match ($this) {
            self::BancoDeVenezuela => 'bdv',
            self::VenezolanoDeCredito => 'venezolano',
            self::Mercantil => 'mercantil',
            self::Provincial => 'provincial',
            self::Banesco => 'banesco',
            self::BancoNacionalDeCredito => 'bnc',
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
            fn (self $bank, int $index): array => [
                'id' => $bank->id(),
                'code' => $bank->value,
                'name' => $bank->label(),
                'active' => true,
                'active_label' => 'Activo',
                'system_data' => [
                    'slug' => $bank->slug(),
                ],
                'creation_date' => null,
                'creation_date_formatted' => null,
                'created_at' => null,
                'updated_at' => null,
            ],
            self::cases(),
            array_keys(self::cases())
        );
    }

    public static function tryFromIdentifier(string|int $identifier): ?self
    {
        $banks = self::cases();

        if (is_int($identifier) || ctype_digit($identifier)) {
            return $banks[((int) $identifier) - 1] ?? self::tryFrom(str_pad((string) $identifier, 4, '0', STR_PAD_LEFT));
        }

        foreach ($banks as $bank) {
            if ($bank->slug() === $identifier) {
                return $bank;
            }
        }

        return self::tryFrom($identifier);
    }
}
