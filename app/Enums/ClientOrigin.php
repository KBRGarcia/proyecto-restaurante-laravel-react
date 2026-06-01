<?php

namespace App\Enums;

enum ClientOrigin: string
{
    case Online = 'online';
    case Physical = 'physical';
    case Mixed = 'mixed';

    public function label(): string
    {
        return match ($this) {
            self::Online => 'Online',
            self::Physical => 'Fisico',
            self::Mixed => 'Fisico y Online',
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
