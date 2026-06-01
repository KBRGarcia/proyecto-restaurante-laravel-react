<?php

namespace App\Http\Controllers;

use App\Enums\Banks;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BankController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $banks = collect(Banks::toArrayList());

        if ($request->filled('search') || $request->filled('q')) {
            $search = mb_strtolower($request->get('search', $request->get('q')));
            $banks = $banks->filter(
                fn (array $bank): bool => str_contains(mb_strtolower($bank['code']), $search)
                    || str_contains(mb_strtolower($bank['name']), $search)
                    || str_contains(mb_strtolower($bank['system_data']['slug']), $search)
            );
        }

        if ($request->filled('active')) {
            $active = filter_var($request->active, FILTER_VALIDATE_BOOLEAN);
            $banks = $banks->where('active', $active);
        }

        $sortBy = $request->get('sort_by');
        $sortOrder = $request->get('sort_order');
        if (!$sortBy && $request->filled('_sort')) {
            $sortBy = $request->get('_sort');
            $sortOrder = $request->get('_order', 'asc');
        }
        $sortBy = $sortBy ?: 'code';
        $sortOrder = $sortOrder ?: 'asc';
        $banks = $banks
            ->sortBy($sortBy, SORT_REGULAR, strtolower((string) $sortOrder) === 'desc')
            ->values();

        $start = $request->get('_start', 0);
        $end = $request->get('_end', 10);
        $total = $banks->count();
        $banks = $banks->slice($start, $end - $start)->values();

        return response()->json($banks)->header('x-total-count', $total);
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
            'message' => 'Los bancos son un catalogo estatico definido en App\\Enums\\Banks.',
        ], 405);
    }

    /**
     * Display the specified resource.
     */
    public function show(string|int $bank): JsonResponse
    {
        $bankEnum = Banks::tryFromIdentifier($bank);

        abort_if($bankEnum === null, 404, 'Banco no encontrado.');

        return response()->json(Banks::toArrayList()[$bankEnum->id() - 1] ?? null);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string|int $bank)
    {
        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string|int $bank)
    {
        return response()->json([
            'message' => 'Los bancos son un catalogo estatico definido en App\\Enums\\Banks.',
        ], 405);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string|int $bank)
    {
        return response()->json([
            'message' => 'Los bancos son un catalogo estatico definido en App\\Enums\\Banks.',
        ], 405);
    }
}
