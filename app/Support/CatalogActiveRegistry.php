<?php

namespace App\Support;

use Illuminate\Support\Facades\Cache;

class CatalogActiveRegistry
{
    private const CACHE_PREFIX = 'catalog.inactive.';

    public static function isActive(string $catalog, string $code): bool
    {
        return ! in_array($code, self::inactiveCodes($catalog), true);
    }

    public static function setActive(string $catalog, string $code, bool $active): void
    {
        $inactive = self::inactiveCodes($catalog);

        if ($active) {
            $inactive = array_values(array_filter($inactive, fn (string $item): bool => $item !== $code));
        } elseif (! in_array($code, $inactive, true)) {
            $inactive[] = $code;
        }

        Cache::forever(self::CACHE_PREFIX . $catalog, $inactive);
    }

    /**
     * @return list<string>
     */
    private static function inactiveCodes(string $catalog): array
    {
        $codes = Cache::get(self::CACHE_PREFIX . $catalog, []);

        return is_array($codes) ? array_values($codes) : [];
    }
}
