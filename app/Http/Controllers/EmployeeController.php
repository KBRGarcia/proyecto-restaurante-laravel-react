<?php

namespace App\Http\Controllers;

use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Employee::with(['user', 'assignments.branch']);

        if ($request->filled('search') || $request->filled('q')) {
            $query->search($request->get('search', $request->get('q')));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('branch_id')) {
            $query->whereHas('assignments', fn ($q) => $q->where('branch_id', $request->branch_id));
        }

        $sortBy = $request->get('sort_by');
        $sortOrder = $request->get('sort_order');
        if (!$sortBy && $request->filled('_sort')) {
            $sortBy = $request->get('_sort');
            $sortOrder = $request->get('_order', 'asc');
        }
        $sortBy = $sortBy ?: 'id';
        $sortOrder = $sortOrder ?: 'desc';
        if (!in_array($sortBy, ['id', 'first_name', 'last_name', 'identity_document', 'email', 'phone', 'hire_date', 'status', 'created_at'], true)) {
            $sortBy = 'id';
        }
        $query->orderBy($sortBy, $sortOrder);

        $start = $request->get('_start', 0);
        $end = $request->get('_end', 10);
        $total = $query->count();
        $employees = $query->offset($start)->limit($end - $start)->get();

        $data = $employees->map(fn (Employee $employee) => (new EmployeeResource($employee))->resolve($request));

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
        $validated = $request->validate(Employee::rules(), Employee::messages());
        $assignments = $validated['assignments'] ?? [];
        unset($validated['assignments']);

        $employee = DB::transaction(function () use ($validated, $assignments) {
            $employee = Employee::create($validated);
            $this->syncAssignments($employee, $assignments);

            return $employee;
        });

        return response()->json((new EmployeeResource($employee->load(['user', 'assignments.branch'])))->resolve($request), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee, Request $request)
    {
        return response()->json((new EmployeeResource($employee->load(['user', 'assignments.branch'])))->resolve($request));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return response()->json(['message' => 'Not used in API']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate(Employee::rules(true, $employee->id), Employee::messages());
        $assignments = $validated['assignments'] ?? null;
        unset($validated['assignments']);

        DB::transaction(function () use ($employee, $validated, $assignments) {
            $employee->update($validated);

            if (is_array($assignments)) {
                $this->syncAssignments($employee, $assignments);
            }
        });

        return response()->json((new EmployeeResource($employee->load(['user', 'assignments.branch'])))->resolve($request));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return response()->json(null, 204);
    }

    /**
     * Get form configuration.
     */
    public function getFormConfig()
    {
        return response()->json(EmployeeResource::formFields());
    }

    /**
     * Get table configuration.
     */
    public function getTableConfig()
    {
        return response()->json([
            'columns' => EmployeeResource::tableColumns(),
            'filters' => EmployeeResource::filterFields(),
        ]);
    }

    private function syncAssignments(Employee $employee, array $assignments): void
    {
        $employee->assignments()->delete();

        foreach ($assignments as $assignment) {
            $employee->assignments()->create([
                'branch_id' => $assignment['branch_id'],
                'position' => $assignment['position'],
                'start_date' => $assignment['start_date'] ?? null,
                'end_date' => $assignment['end_date'] ?? null,
                'active' => filter_var($assignment['active'] ?? true, FILTER_VALIDATE_BOOLEAN),
            ]);
        }
    }
}
