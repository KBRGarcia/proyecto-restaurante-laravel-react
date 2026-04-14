<?php

namespace App\Http\Controllers;

use App\Http\Resources\BranchResource;
use App\Models\Branch;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Branch::query();

        // Búsqueda general usando el scope search del modelo
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        // Filtro por estado (activa/inactiva)
        if ($request->filled('active')) {
            $query->where('active', $request->active);
        }

        // Filtro por sucursal principal
        if ($request->filled('is_main')) {
            $query->where('is_main', $request->is_main);
        }

        // Filtro por servicio de delivery
        if ($request->filled('has_delivery')) {
            $query->where('has_delivery', $request->has_delivery);
        }

        // Filtro por estacionamiento
        if ($request->filled('has_parking')) {
            $query->where('has_parking', $request->has_parking);
        }

        // Filtro por ciudad
        if ($request->filled('city')) {
            $query->byCity($request->city);
        }

        // Filtro por estado/provincia
        if ($request->filled('state')) {
            $query->byState($request->state);
        }

        // Ordenamiento
        $sortBy = $request->get('sort_by', 'name');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        // Paginación
        // Paginación para Refine
        $start = $request->get('_start', 0);
        $end = $request->get('_end', 10);
        $total = $query->count();
        $branches = $query->offset($start)->limit($end - $start)->get();

        return response()->json($branches)->header('x-total-count', $total);
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
        $validated = $request->validate(Branch::rules(), Branch::messages());

        // Convertir valores de boolean que vienen como string
        $validated['is_main'] = filter_var($validated['is_main'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $validated['has_delivery'] = filter_var($validated['has_delivery'] ?? true, FILTER_VALIDATE_BOOLEAN);
        $validated['has_parking'] = filter_var($validated['has_parking'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $validated['active'] = filter_var($validated['active'] ?? true, FILTER_VALIDATE_BOOLEAN);

        // Agregar los segundos a las horas si no están presentes
        if (isset($validated['opening_time']) && strlen($validated['opening_time']) === 5) {
            $validated['opening_time'] .= ':00';
        }
        if (isset($validated['closing_time']) && strlen($validated['closing_time']) === 5) {
            $validated['closing_time'] .= ':00';
        }

        // Establecer creation_date si no se proporciona
        if (!isset($validated['creation_date'])) {
            $validated['creation_date'] = now();
        }

        // Establecer update_date
        $validated['update_date'] = now();

        Branch::create($validated);

        return response()->json($branch, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Branch $branch)
    {
        return response()->json($branch);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Branch $branch)
    {
        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Branch $branch)
    {
        $validated = $request->validate(Branch::rules(true), Branch::messages());

        // Convertir valores de boolean que vienen como string
        $validated['is_main'] = filter_var($validated['is_main'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $validated['has_delivery'] = filter_var($validated['has_delivery'] ?? true, FILTER_VALIDATE_BOOLEAN);
        $validated['has_parking'] = filter_var($validated['has_parking'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $validated['active'] = filter_var($validated['active'] ?? true, FILTER_VALIDATE_BOOLEAN);

        // Agregar los segundos a las horas si no están presentes
        if (isset($validated['opening_time']) && strlen($validated['opening_time']) === 5) {
            $validated['opening_time'] .= ':00';
        }
        if (isset($validated['closing_time']) && strlen($validated['closing_time']) === 5) {
            $validated['closing_time'] .= ':00';
        }

        // Actualizar update_date
        $validated['update_date'] = now();

        $branch->update($validated);

        return response()->json($branch, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Branch $branch)
    {
        $branch->delete();

        return response()->json(null, 204);
    }
}
