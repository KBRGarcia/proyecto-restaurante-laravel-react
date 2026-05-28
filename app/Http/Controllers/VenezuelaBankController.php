<?php

namespace App\Http\Controllers;

use App\Enums\VenezuelaBank;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VenezuelaBankController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $venezuelaBanks = collect(VenezuelaBank::toArrayList());

        if ($request->filled('search') || $request->filled('q')) {
            $search = mb_strtolower($request->get('search', $request->get('q')));
            $venezuelaBanks = $venezuelaBanks->filter(
                fn (array $bank): bool => str_contains(mb_strtolower($bank['code']), $search)
                    || str_contains(mb_strtolower($bank['name']), $search)
                    || str_contains(mb_strtolower($bank['system_data']['slug']), $search)
            );
        }

        if ($request->filled('active')) {
            $active = filter_var($request->active, FILTER_VALIDATE_BOOLEAN);
            $venezuelaBanks = $venezuelaBanks->where('active', $active);
        }

        $sortBy = $request->get('sort_by');
        $sortOrder = $request->get('sort_order');
        if (!$sortBy && $request->filled('_sort')) {
            $sortBy = $request->get('_sort');
            $sortOrder = $request->get('_order', 'asc');
        }
        $sortBy = $sortBy ?: 'code';
        $sortOrder = $sortOrder ?: 'asc';
        $venezuelaBanks = $venezuelaBanks
            ->sortBy($sortBy, SORT_REGULAR, strtolower((string) $sortOrder) === 'desc')
            ->values();

        $start = $request->get('_start', 0);
        $end = $request->get('_end', 10);
        $total = $venezuelaBanks->count();
        $venezuelaBanks = $venezuelaBanks->slice($start, $end - $start)->values();

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
        return response()->json([
            'message' => 'Los bancos de Venezuela son un catalogo estatico definido en App\\Enums\\VenezuelaBank.',
        ], 405);
    }

    /**
     * Display the specified resource.
     */
    public function show(string|int $venezuela_bank): JsonResponse
    {
        $bank = VenezuelaBank::tryFromIdentifier($venezuela_bank);

        abort_if($bank === null, 404, 'Banco no encontrado.');

        return response()->json(VenezuelaBank::toArrayList()[$bank->id() - 1] ?? null);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string|int $venezuela_bank)
    {
        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string|int $venezuela_bank)
    {
        return response()->json([
            'message' => 'Los bancos de Venezuela son un catalogo estatico definido en App\\Enums\\VenezuelaBank.',
        ], 405);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string|int $venezuela_bank)
    {
        return response()->json([
            'message' => 'Los bancos de Venezuela son un catalogo estatico definido en App\\Enums\\VenezuelaBank.',
        ], 405);
    }
}
