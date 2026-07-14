<?php

namespace App\Enums;

enum UserRole: string
{
    case Admin = 'admin';
    case Employee = 'employee';
    case Client = 'client';

    public function label(): string
    {
        return match ($this) {
            self::Admin => 'Administrador',
            self::Employee => 'Empleado',
            self::Client => 'Cliente',
        };
    }

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public function canAccessAdminPanel(): bool
    {
        return $this === self::Admin || $this === self::Employee;
    }
}
