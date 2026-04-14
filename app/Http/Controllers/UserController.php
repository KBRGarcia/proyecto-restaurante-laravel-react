<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::query();

        // Búsqueda general
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filtro por rol
        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        // Filtro por estado
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Ordenamiento
        $sortBy = $request->get('sort_by', 'id');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Paginación
        // Paginación para Refine
        $start = $request->get('_start', 0);
        $end = $request->get('_end', 10);
        $total = $query->count();
        $users = $query->offset($start)->limit($end - $start)->get();

        return response()->json($users)->header('x-total-count', $total);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(User::rules(), User::messages());

        // Hash de la contraseña
        $validated['password'] = Hash::make($validated['password']);

        // Manejar la foto de perfil si se proporciona
        if ($request->hasFile('profile_picture')) {
            $image = $request->file('profile_picture');
            $imageData = base64_encode(file_get_contents($image->getRealPath()));
            $validated['profile_picture'] = 'data:' . $image->getMimeType() . ';base64,' . $imageData;
        }

        // Establecer fecha de registro
        $validated['registration_date'] = now();

        $user = User::create($validated);

        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $rules = User::rules(true);
        
        // Agregar validación de email único excepto el usuario actual
        $rules['email'] = ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)];

        $validated = $request->validate($rules, User::messages());

        // Si se proporciona contraseña, hashearla
        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            // Si no se proporciona, remover del array
            unset($validated['password']);
        }

        // Manejar la foto de perfil si se proporciona
        if ($request->hasFile('profile_picture')) {
            $image = $request->file('profile_picture');
            $imageData = base64_encode(file_get_contents($image->getRealPath()));
            $validated['profile_picture'] = 'data:' . $image->getMimeType() . ';base64,' . $imageData;
        }

        $user->update($validated);

        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(null, 204);
    }

    /**
     * Get form configuration.
     */
    public function getFormConfig()
    {
        return response()->json([
            'fields' => UserResource::formFields(),
        ]);
    }

    /**
     * Get table configuration.
     */
    public function getTableConfig()
    {
        return response()->json([
            'columns' => UserResource::tableColumns(),
            'filters' => UserResource::filterFields(),
        ]);
    }
}

