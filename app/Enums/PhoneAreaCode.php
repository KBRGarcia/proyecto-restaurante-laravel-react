<?php

namespace App\Enums;

enum PhoneAreaCode: string
{
    case Movistar0412 = '0412';
    case Digitel0414 = '0414';
    case Movistar0416 = '0416';
    case Digitel0422 = '0422';
    case Movilnet0424 = '0424';
    case Movilnet0426 = '0426';

    public function label(): string
    {
        return $this->value;
    }

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * @return list<array{value: string, label: string}>
     */
    public static function options(): array
    {
        return array_map(
            fn (self $code) => ['value' => $code->value, 'label' => $code->value],
            self::cases()
        );
    }

    public static function validationPattern(): string
    {
        return '/^(' . implode('|', self::values()) . ')\d{7}$/';
    }

    /**
     * @return array{code: string, line: string}|null
     */
    public static function split(?string $phone): ?array
    {
        if ($phone === null || $phone === '') {
            return null;
        }

        if (! preg_match(self::validationPattern(), $phone, $matches)) {
            return null;
        }

        return [
            'code' => $matches[1],
            'line' => substr($phone, 4),
        ];
    }

    public static function combine(string $code, string $line): string
    {
        return $code . $line;
    }
}
