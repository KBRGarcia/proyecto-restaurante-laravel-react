<?php

namespace App\Services;

use App\Enums\UserRole;
use App\Models\User;

class RoleAuthorizationService
{
    /**
     * Acciones CRUD estándar + extras del panel.
     *
     * @var list<string>
     */
    public const ACTIONS = ['index', 'show', 'store', 'update', 'destroy', 'validate-assignment'];

    /**
     * Matriz recurso => rol => acciones permitidas ("*" = todas).
     *
     * @var array<string, array<string, list<string>|string>>
     */
    private const PERMISSIONS = [
        'users' => [
            'admin' => '*',
            'employee' => ['index', 'show', 'update'],
            'client' => [],
        ],
        'clients' => [
            'admin' => '*',
            'employee' => '*',
            'client' => [],
        ],
        'employees' => [
            'admin' => '*',
            'employee' => '*',
            'client' => [],
        ],
        'branches' => [
            'admin' => '*',
            'employee' => '*',
            'client' => [],
        ],
        'categories' => [
            'admin' => '*',
            'employee' => '*',
            'client' => [],
        ],
        'products' => [
            'admin' => '*',
            'employee' => '*',
            'client' => [],
        ],
        'product-branches' => [
            'admin' => '*',
            'employee' => '*',
            'client' => [],
        ],
        'orders' => [
            'admin' => '*',
            'employee' => '*',
            'client' => [],
        ],
        'order-details' => [
            'admin' => '*',
            'employee' => '*',
            'client' => [],
        ],
        'order-payments' => [
            'admin' => '*',
            'employee' => '*',
            'client' => [],
        ],
        'evaluations' => [
            'admin' => '*',
            'employee' => '*',
            'client' => [],
        ],
        'payment-methods' => [
            'admin' => '*',
            'employee' => ['index', 'show', 'update'],
            'client' => [],
        ],
        'banks' => [
            'admin' => '*',
            'employee' => ['index', 'show', 'update'],
            'client' => [],
        ],
    ];

    public function allows(User $user, string $resource, string $action, ?int $targetUserId = null): bool
    {
        $role = UserRole::tryFrom((string) $user->role);

        if ($role === null) {
            return false;
        }

        if (! $role->canAccessAdminPanel()) {
            return false;
        }

        $permissions = self::PERMISSIONS[$resource][$role->value] ?? [];

        if ($permissions === '*') {
            return true;
        }

        if (! is_array($permissions) || ! in_array($action, $permissions, true)) {
            return false;
        }

        // Empleados solo pueden actualizar su propio usuario
        if ($resource === 'users' && $action === 'update' && $role === UserRole::Employee) {
            return $targetUserId !== null && $targetUserId === $user->id;
        }

        // Empleados no pueden eliminar usuarios
        if ($resource === 'users' && $action === 'destroy' && $role === UserRole::Employee) {
            return false;
        }

        return true;
    }

    /**
     * @return array<string, bool>
     */
    public function permissionsFor(User $user): array
    {
        $result = [];

        foreach (array_keys(self::PERMISSIONS) as $resource) {
            foreach (self::ACTIONS as $action) {
                $result["{$resource}.{$action}"] = $this->allows($user, $resource, $action, $user->id);
            }
        }

        return $result;
    }
}
