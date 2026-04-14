<?php

namespace App\Http\Controllers;

use App\Http\Resources\VenezuelaBankResource;
use App\Models\VenezuelaBank;
use Illuminate\Http\Request;

class VenezuelaBankController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = VenezuelaBank::query();

        // Búsqueda general
        if ($request->filled('search')) {
            $search = $request->search;
            $query->search($search);
        }

        // Filtro por estado activo
        if ($request->filled('active')) {
            $active = filter_var($request->active, FILTER_VALIDATE_BOOLEAN);
            if ($active) {
                $query->active();
            } else {
                $query->inactive();
            }
        }

        // Ordenamiento
        $sortBy = $request->get('sort_by', 'code');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        // Paginación
        // Paginación para Refine
        $start = $request->get('_start', 0);
        $end = $request->get('_end', 10);
        $total = $query->count();
        $venezuelaBanks = $query->offset($start)->limit($end - $start)->get();

        return response()->json($venezuelaBanks)->header('x-total-count', $total);
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
        $validated = $request->validate(
            VenezuelaBank::rules(),
            VenezuelaBank::messages()
        );

        // Convertir active a boolean si viene como string
        if (isset($validated['active'])) {
            $validated['active'] = filter_var($validated['active'], FILTER_VALIDATE_BOOLEAN);
        }

        // Convertir creation_date a timestamp si viene
        if (isset($validated['creation_date'])) {
            $validated['creation_date'] = \Carbon\Carbon::parse($validated['creation_date']);
        }

        $bank = VenezuelaBank::create($validated);

        return response()->json($venezuelaBank, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(VenezuelaBank $venezuelaBank)
    {
        return response()->json($venezuelaBank);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VenezuelaBank $venezuelaBank)
    {
        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VenezuelaBank $venezuelaBank)
    {
        $validated = $request->validate(
            VenezuelaBank::rules($venezuelaBank->id),
            VenezuelaBank::messages()
        );

        // Convertir active a boolean si viene como string
        if (isset($validated['active'])) {
            $validated['active'] = filter_var($validated['active'], FILTER_VALIDATE_BOOLEAN);
        }

        // Convertir creation_date a timestamp si viene
        if (isset($validated['creation_date'])) {
            $validated['creation_date'] = \Carbon\Carbon::parse($validated['creation_date']);
        }

        $venezuelaBank->update($validated);

        return response()->json($venezuelaBank, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VenezuelaBank $venezuelaBank)
    {
        $venezuelaBank->delete();

        return response()->json(null, 204);
    }
}
