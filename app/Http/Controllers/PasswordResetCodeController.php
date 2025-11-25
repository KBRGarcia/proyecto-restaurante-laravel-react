<?php

namespace App\Http\Controllers;

use App\Models\PasswordResetCode;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetCodeController extends Controller
{
    /**
     * Display a listing of password reset codes.
     */
    public function index(Request $request): Response
    {
        $query = PasswordResetCode::query()->latest();

        // Búsqueda por email
        if ($request->filled('search')) {
            $query->where('mail', 'like', "%{$request->search}%");
        }

        // Filtro por estado (usado/no usado)
        if ($request->filled('used')) {
            $query->where('used', $request->boolean('used'));
        }

        // Filtro por expirados
        if ($request->filled('expired')) {
            if ($request->boolean('expired')) {
                $query->expired();
            } else {
                $query->valid();
            }
        }

        $codes = $query->paginate($request->get('per_page', 15));

        return Inertia::render('PasswordResetCodes/Index', [
            'codes' => $codes->through(fn ($code) => [
                'id' => $code->id,
                'mail' => $code->mail,
                'code' => $code->code,
                'expires_at' => $code->expires_at?->format('Y-m-d H:i:s'),
                'expires_at_formatted' => $code->expires_at?->format('d/m/Y H:i:s'),
                'used' => $code->used,
                'is_expired' => $code->isExpired(),
                'is_valid' => $code->isValid(),
                'created_at' => $code->created_at?->format('Y-m-d H:i:s'),
                'created_at_formatted' => $code->created_at?->format('d/m/Y H:i:s'),
            ]),
            'filters' => $request->only(['search', 'used', 'expired']),
        ]);
    }

    /**
     * Show the form for creating a new password reset code.
     */
    public function create(): Response
    {
        return Inertia::render('PasswordResetCodes/Create');
    }

    /**
     * Generate a password reset code for an email.
     */
    public function store(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'mail' => ['required', 'email', 'max:100'],
            'expiration_minutes' => ['nullable', 'integer', 'min:1', 'max:1440'], // Máximo 24 horas
        ], [
            'mail.required' => 'El correo electrónico es obligatorio.',
            'mail.email' => 'Debe proporcionar un correo electrónico válido.',
            'mail.max' => 'El correo electrónico no debe exceder los 100 caracteres.',
            'expiration_minutes.integer' => 'Los minutos de expiración deben ser un número entero.',
            'expiration_minutes.min' => 'Los minutos de expiración deben ser al menos 1.',
            'expiration_minutes.max' => 'Los minutos de expiración no deben exceder 1440 (24 horas).',
        ])->validate();

        // Verificar que el usuario existe
        $user = User::where('email', $validated['mail'])->first();
        if (!$user) {
            return back()->withErrors([
                'mail' => 'No se encontró un usuario con este correo electrónico.',
            ]);
        }

        $expirationMinutes = $validated['expiration_minutes'] ?? 15;
        $resetCode = PasswordResetCode::createForEmail($validated['mail'], $expirationMinutes);

        return back()->with('success', [
            'message' => 'Código de recuperación generado exitosamente.',
            'code' => $resetCode->code, // Solo para desarrollo/testing, eliminar en producción
        ]);
    }

    /**
     * Display the specified password reset code.
     */
    public function show(PasswordResetCode $passwordResetCode): Response
    {
        return Inertia::render('PasswordResetCodes/Show', [
            'code' => [
                'id' => $passwordResetCode->id,
                'mail' => $passwordResetCode->mail,
                'code' => $passwordResetCode->code,
                'expires_at' => $passwordResetCode->expires_at?->format('Y-m-d H:i:s'),
                'expires_at_formatted' => $passwordResetCode->expires_at?->format('d/m/Y H:i:s'),
                'used' => $passwordResetCode->used,
                'is_expired' => $passwordResetCode->isExpired(),
                'is_valid' => $passwordResetCode->isValid(),
                'created_at' => $passwordResetCode->created_at?->format('Y-m-d H:i:s'),
                'created_at_formatted' => $passwordResetCode->created_at?->format('d/m/Y H:i:s'),
                'updated_at' => $passwordResetCode->updated_at?->format('Y-m-d H:i:s'),
                'updated_at_formatted' => $passwordResetCode->updated_at?->format('d/m/Y H:i:s'),
            ],
        ]);
    }

    /**
     * Verify a password reset code.
     */
    public function verify(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'mail' => ['required', 'email'],
            'code' => ['required', 'string', 'size:6', 'regex:/^\d{6}$/'],
        ], [
            'mail.required' => 'El correo electrónico es obligatorio.',
            'mail.email' => 'Debe proporcionar un correo electrónico válido.',
            'code.required' => 'El código es obligatorio.',
            'code.size' => 'El código debe tener exactamente 6 dígitos.',
            'code.regex' => 'El código debe contener solo números.',
        ])->validate();

        $resetCode = PasswordResetCode::verify($validated['mail'], $validated['code']);

        if (!$resetCode) {
            return back()->withErrors([
                'code' => 'El código proporcionado es inválido, ha expirado o ya fue utilizado.',
            ]);
        }

        return back()->with('success', [
            'message' => 'Código verificado correctamente.',
            'reset_code_id' => $resetCode->id,
        ]);
    }

    /**
     * Reset password using a verified code.
     */
    public function resetPassword(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'mail' => ['required', 'email'],
            'code' => ['required', 'string', 'size:6', 'regex:/^\d{6}$/'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ], [
            'mail.required' => 'El correo electrónico es obligatorio.',
            'mail.email' => 'Debe proporcionar un correo electrónico válido.',
            'code.required' => 'El código es obligatorio.',
            'code.size' => 'El código debe tener exactamente 6 dígitos.',
            'code.regex' => 'El código debe contener solo números.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'password.confirmed' => 'Las contraseñas no coinciden.',
        ])->validate();

        // Verificar el código
        $resetCode = PasswordResetCode::verify($validated['mail'], $validated['code']);

        if (!$resetCode) {
            return back()->withErrors([
                'code' => 'El código proporcionado es inválido, ha expirado o ya fue utilizado.',
            ]);
        }

        // Buscar el usuario
        $user = User::where('email', $validated['mail'])->first();
        if (!$user) {
            return back()->withErrors([
                'mail' => 'No se encontró un usuario con este correo electrónico.',
            ]);
        }

        // Actualizar la contraseña
        $user->password = Hash::make($validated['password']);
        $user->save();

        // Marcar el código como usado
        $resetCode->markAsUsed();

        return back()->with('success', [
            'message' => 'Contraseña restablecida exitosamente.',
        ]);
    }

    /**
     * Remove the specified password reset code from storage.
     */
    public function destroy(PasswordResetCode $passwordResetCode)
    {
        $passwordResetCode->delete();

        return redirect()->route('password-reset-codes.index')
            ->with('success', 'Código de recuperación eliminado exitosamente.');
    }
}
