<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Client::with('user');

        if ($request->filled('search') || $request->filled('q')) {
            $query->search($request->get('search', $request->get('q')));
        }

        if ($request->filled('origin')) {
            $query->where('origin', $request->origin);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $sortBy = $request->get('sort_by');
        $sortOrder = $request->get('sort_order');
        if (!$sortBy && $request->filled('_sort')) {
            $sortBy = $request->get('_sort');
            $sortOrder = $request->get('_order', 'asc');
        }
        $sortBy = $sortBy ?: 'id';
        $sortOrder = $sortOrder ?: 'desc';
        if (!in_array($sortBy, ['id', 'first_name', 'last_name', 'identity_document', 'email', 'phone', 'origin', 'total_orders', 'total_spent', 'status', 'created_at'], true)) {
            $sortBy = 'id';
        }
        $query->orderBy($sortBy, $sortOrder);

        $start = $request->get('_start', 0);
        $end = $request->get('_end', 10);
        $total = $query->count();
        $clients = $query->offset($start)->limit($end - $start)->get();

        $data = $clients->map(fn (Client $client) => (new ClientResource($client))->resolve($request));

        return response()->json($data)->header('x-total-count', $total);
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
        $validated = $request->validate(Client::rules(), Client::messages());
        $validated['total_orders'] = $validated['total_orders'] ?? 0;
        $validated['total_spent'] = $validated['total_spent'] ?? 0;

        $client = Client::create($validated);

        return response()->json((new ClientResource($client->load('user')))->resolve($request), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client, Request $request)
    {
        return response()->json((new ClientResource($client->load('user')))->resolve($request));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        $validated = $request->validate(Client::rules(true, $client->id), Client::messages());
        $client->update($validated);

        return response()->json((new ClientResource($client->load('user')))->resolve($request));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $client->delete();

        return response()->json(null, 204);
    }

    /**
     * Get table configuration.
     */
    public function getTableConfig()
    {
        return response()->json([
            'columns' => ClientResource::tableColumns(),
            'filters' => ClientResource::filterFields(),
        ]);
    }
}
