<?php

namespace App\Http\Middleware;

use App\Services\RoleAuthorizationService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureRolePermission
{
    public function __construct(
        private readonly RoleAuthorizationService $authorization,
    ) {}

    /**
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user === null) {
            abort(401, 'No autenticado.');
        }

        $routeName = $request->route()?->getName();

        if ($routeName === null) {
            return $next($request);
        }

        // Rutas auth: logout, me — no requieren permiso de recurso
        if (in_array($routeName, ['logout', 'me'], true) || str_ends_with($routeName, '.logout') || str_ends_with($routeName, '.me')) {
            return $next($request);
        }

        [$resource, $action] = $this->resolveResourceAction($request, $routeName);

        if ($resource === null || $action === null) {
            return $next($request);
        }

        $targetUserId = null;
        if ($resource === 'users' && in_array($action, ['show', 'update', 'destroy'], true)) {
            $param = $request->route('user');
            $targetUserId = is_object($param) ? (int) $param->id : (int) $param;
        }

        if (! $this->authorization->allows($user, $resource, $action, $targetUserId)) {
            abort(403, 'No tiene permisos para realizar esta acción.');
        }

        return $next($request);
    }

    /**
     * @return array{0: ?string, 1: ?string}
     */
    private function resolveResourceAction(Request $request, string $routeName): array
    {
        // employees.validate-assignment
        if ($routeName === 'employees.validate-assignment') {
            return ['employees', 'validate-assignment'];
        }

        $parts = explode('.', $routeName);

        if (count($parts) < 2) {
            return [null, null];
        }

        $action = array_pop($parts);
        $resource = implode('.', $parts);

        // apiResource names: users.index, product-branches.store, etc.
        $resource = str_replace('api.', '', $resource);

        return [$resource, $action];
    }
}
