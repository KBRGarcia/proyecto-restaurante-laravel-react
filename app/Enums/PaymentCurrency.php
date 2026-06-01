<?php

namespace App\Enums;

enum PaymentCurrency: string
{
    case National = 'nacional';
    case International = 'internacional';

    public function label(): string
    {
        return match ($this) {
            self::National => 'Nacional',
            self::International => 'Internacional',
        };
    }

    public function symbol(): string
    {
        return match ($this) {
            self::National => 'Bs.',
            self::International => '$',
        };
    }

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
