<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductBranchResource;
use App\Models\ProductBranch;
use Illuminate\Http\Request;

class ProductBranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ProductBranch::with(['product', 'branch']);

        if ($request->filled('search') || $request->filled('q')) {
            $search = $request->get('search', $request->get('q'));
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                    ->orWhereHas('product', function ($productQuery) use ($search) {
                        $productQuery->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('branch', function ($branchQuery) use ($search) {
                        $branchQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('city', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->filled('product_id')) {
            $query->where('product_id', $request->product_id);
        }

        if ($request->filled('branch_id')) {
            $query->where('branch_id', $request->branch_id);
        }

        if ($request->filled('available')) {
            $query->where('available', filter_var($request->available, FILTER_VALIDATE_BOOLEAN));
        }

        $sortBy = $request->get('sort_by');
        $sortOrder = $request->get('sort_order');
        if (! $sortBy && $request->filled('_sort')) {
            $sortBy = $request->get('_sort');
            $sortOrder = $request->get('_order', 'asc');
        }
        $sortBy = $sortBy ?: 'id';
        $sortOrder = $sortOrder ?: 'desc';

        if (str_contains($sortBy, ',')) {
            $sortFields = explode(',', $sortBy);
            $sortOrders = explode(',', (string) $sortOrder);
            foreach ($sortFields as $index => $field) {
                $query->orderBy($field, $sortOrders[$index] ?? $sortOrders[0] ?? 'asc');
            }
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }

        $start = $request->get('_start', 0);
        $end = $request->get('_end', 10);
        $total = $query->count();
        $items = $query->offset($start)->limit($end - $start)->get();

        return response()
            ->json(ProductBranchResource::collection($items)->resolve())
            ->header('x-total-count', $total);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(
            ProductBranch::rules(false, null, $request->integer('branch_id') ?: null),
            ProductBranch::messages()
        );

        $validated['available'] = filter_var($validated['available'] ?? true, FILTER_VALIDATE_BOOLEAN);
        $validated['assignment_date'] = $validated['assignment_date'] ?? now();

        $productBranch = ProductBranch::create($validated);

        return response()->json(
            (new ProductBranchResource($productBranch->load(['product', 'branch'])))->resolve(),
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductBranch $productBranch)
    {
        return response()->json(
            (new ProductBranchResource($productBranch->load(['product', 'branch'])))->resolve()
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductBranch $productBranch)
    {
        $branchId = $request->integer('branch_id') ?: $productBranch->branch_id;

        $validated = $request->validate(
            ProductBranch::rules(true, $productBranch->id, $branchId),
            ProductBranch::messages()
        );

        if (array_key_exists('available', $validated)) {
            $validated['available'] = filter_var($validated['available'], FILTER_VALIDATE_BOOLEAN);
        }

        $productBranch->update($validated);

        return response()->json(
            (new ProductBranchResource($productBranch->load(['product', 'branch'])))->resolve()
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductBranch $productBranch)
    {
        $productBranch->delete();

        return response()->json(null, 204);
    }
}
