<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\Client;
use App\Models\User;
use App\Services\RoleAuthorizationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ApiAuthController extends Controller
{
    public function __construct(
        private readonly RoleAuthorizationService $roleAuthorization,
    ) {}

    /**
     * Handle an authentication attempt.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales proporcionadas son incorrectas.'],
            ]);
        }

        if ($user->status !== 'active') {
            throw ValidationException::withMessages([
                'email' => ['Esta cuenta está inactiva.'],
            ]);
        }

        $role = UserRole::tryFrom((string) $user->role);
        if ($role === null || ! $role->canAccessAdminPanel()) {
            throw ValidationException::withMessages([
                'email' => ['Esta cuenta no tiene acceso al panel administrativo.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'permissions' => $this->roleAuthorization->permissionsFor($user),
        ]);
    }

    /**
     * Handle user registration.
     *
     * El registro público crea un cliente (sin acceso al panel admin).
     * Los empleados/admins se crean desde el módulo de usuarios.
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => UserRole::Client->value,
            'status' => 'active',
            'registration_date' => now(),
        ]);

        Client::create([
            'user_id' => $user->id,
            'first_name' => $user->name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'origin' => 'online',
            'status' => 'active',
        ]);

        return response()->json([
            'message' => 'Registro exitoso. Esta cuenta es de cliente y no tiene acceso al panel administrativo. Un administrador puede gestionar el acceso desde Usuarios.',
            'user' => $user,
        ], 201);
    }

    /**
     * Log the user out of the application.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }

    /**
     * Get current user.
     */
    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            ...$user->toArray(),
            'permissions' => $this->roleAuthorization->permissionsFor($user),
        ]);
    }
}
