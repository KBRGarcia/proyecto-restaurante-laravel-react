<?php

namespace App\Http\Controllers;

use App\Enums\ClientOrigin;
use App\Http\Resources\UserResource;
use App\Models\Client;
use App\Models\Employee;
use App\Models\User;
use App\Services\ClientPurchaseStatsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function __construct(
        private readonly ClientPurchaseStatsService $purchaseStatsService,
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::query();

        // Búsqueda general
        if ($request->filled('search') || $request->filled('q')) {
            $search = $request->get('search', $request->get('q'));
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
        $sortBy = $request->get('sort_by');
        $sortOrder = $request->get('sort_order');
        if (!$sortBy && $request->filled('_sort')) {
            $sortBy = $request->get('_sort');
            $sortOrder = $request->get('_order', 'asc');
        }
        $sortBy = $sortBy ?: 'id';
        $sortOrder = $sortOrder ?: 'desc';
        if (str_contains($sortBy, ',')) {
            $sortFields = explode(',', $sortBy);
            $sortOrders = explode(',', (string) $sortOrder);
            foreach ($sortFields as $index => $field) {
                $order = $sortOrders[$index] ?? $sortOrders[0] ?? 'asc';
                $query->orderBy($field, $order);
            }
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }

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

        // Manejar la foto de perfil si se proporciona
        if ($request->hasFile('profile_picture')) {
            $image = $request->file('profile_picture');
            $imageData = base64_encode(file_get_contents($image->getRealPath()));
            $validated['profile_picture'] = 'data:' . $image->getMimeType() . ';base64,' . $imageData;
        } elseif ($request->filled('profile_picture') && str_starts_with($request->profile_picture, 'data:image')) {
            $validated['profile_picture'] = $request->profile_picture;
        }

        // Establecer fecha de registro
        $validated['registration_date'] = now();

        $user = DB::transaction(function () use ($validated) {
            $user = User::create($validated);
            $this->createRelatedProfile($user);

            return $user->load(['client', 'employee']);
        });

        return response()->json($user, 201);
    }

    /**
     * Crea el perfil de cliente o empleado vinculado al usuario según su rol.
     */
    private function createRelatedProfile(User $user): void
    {
        $profileData = [
            'user_id' => $user->id,
            'first_name' => $user->name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'phone' => $user->phone_number,
            'address' => $user->address,
            'status' => $user->status,
        ];

        match ($user->role) {
            'client' => tap(Client::create([
                ...$profileData,
                'origin' => ClientOrigin::Online->value,
            ]), fn (Client $client) => $this->purchaseStatsService->sync($client)),
            'employee' => Employee::create([
                ...$profileData,
                'hire_date' => now()->toDateString(),
            ]),
            default => null,
        };
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load(['client', 'employee']);

        return response()->json([
            ...$user->toArray(),
            'identity_document' => $user->client?->identity_document
                ?? $user->employee?->identity_document,
        ]);
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

        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        // Manejar la foto de perfil si se proporciona
        if ($request->hasFile('profile_picture')) {
            $image = $request->file('profile_picture');
            $imageData = base64_encode(file_get_contents($image->getRealPath()));
            $validated['profile_picture'] = 'data:' . $image->getMimeType() . ';base64,' . $imageData;
        } elseif ($request->filled('profile_picture') && str_starts_with($request->profile_picture, 'data:image')) {
            $validated['profile_picture'] = $request->profile_picture;
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

