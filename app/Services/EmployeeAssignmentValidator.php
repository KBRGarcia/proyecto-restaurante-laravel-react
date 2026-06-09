<?php

namespace App\Services;

use App\Enums\EmployeePosition;
use App\Models\EmployeeBranchAssignment;
use Illuminate\Support\Collection;
use Illuminate\Validation\ValidationException;

class EmployeeAssignmentValidator
{
    /**
     * @param  array<int, array{branch_id: int, position: string, active?: bool}>  $assignments
     */
    public function validate(?int $employeeId, array $assignments): void
    {
        $activeAssignments = collect($assignments)
            ->filter(fn (array $assignment): bool => $this->isActive($assignment));

        $this->validateWithinEmployee($activeAssignments);
        $this->validateAgainstDatabase($employeeId, $activeAssignments);
    }

    /**
     * @param  array<int, array{branch_id?: int|null, position?: string|null, active?: bool}>  $formAssignments
     * @return array{valid: bool, message?: string}
     */
    public function validateAssignment(
        ?int $employeeId,
        int $branchId,
        string $position,
        array $formAssignments,
        ?int $assignmentIndex = null,
    ): array {
        $assignments = collect($formAssignments)->values()->all();

        if ($assignmentIndex !== null) {
            $assignments[$assignmentIndex] = array_merge($assignments[$assignmentIndex] ?? [], [
                'branch_id' => $branchId,
                'position' => $position,
                'active' => $assignments[$assignmentIndex]['active'] ?? true,
            ]);
        }

        $completeAssignments = collect($assignments)
            ->filter(fn (array $assignment): bool => ! empty($assignment['branch_id']) && ! empty($assignment['position']))
            ->map(fn (array $assignment): array => [
                'branch_id' => (int) $assignment['branch_id'],
                'position' => (string) $assignment['position'],
                'active' => $this->isActive($assignment),
            ])
            ->values()
            ->all();

        try {
            $this->validate($employeeId, $completeAssignments);

            return ['valid' => true];
        } catch (ValidationException $exception) {
            return [
                'valid' => false,
                'message' => collect($exception->errors())->flatten()->first(),
            ];
        }
    }

    /**
     * @param  Collection<int, array{branch_id: int, position: string, active?: bool}>  $assignments
     */
    private function validateWithinEmployee(Collection $assignments): void
    {
        $this->validateUniquePositionPerBranch(
            $assignments,
            EmployeePosition::GeneralManager,
            'Solo puede haber un gerente general activo por sucursal.',
        );

        $this->validateUniquePositionPerBranch(
            $assignments,
            EmployeePosition::BranchManager,
            'Solo puede haber un gerente de sucursal activo por sucursal.',
        );

        $branchManagerCount = $assignments
            ->filter(fn (array $assignment): bool => $assignment['position'] === EmployeePosition::BranchManager->value)
            ->count();

        if ($branchManagerCount > 1) {
            throw ValidationException::withMessages([
                'assignments' => 'Un empleado solo puede ser gerente de sucursal en una sucursal.',
            ]);
        }

        $hasGeneralManager = $assignments->contains(
            fn (array $assignment): bool => $assignment['position'] === EmployeePosition::GeneralManager->value
        );

        if ($hasGeneralManager) {
            $hasOtherPosition = $assignments->contains(
                fn (array $assignment): bool => $assignment['position'] !== EmployeePosition::GeneralManager->value
            );

            if ($hasOtherPosition) {
                throw ValidationException::withMessages([
                    'assignments' => 'Un gerente general solo puede tener asignaciones con cargo de gerente general.',
                ]);
            }
        }
    }

    /**
     * @param  Collection<int, array{branch_id: int, position: string, active?: bool}>  $assignments
     */
    private function validateAgainstDatabase(?int $employeeId, Collection $assignments): void
    {
        foreach ($assignments as $assignment) {
            if ($assignment['position'] === EmployeePosition::GeneralManager->value) {
                $this->assertNoOtherActiveAssignmentAtBranch(
                    $assignment['branch_id'],
                    EmployeePosition::GeneralManager,
                    $employeeId,
                    'Esta sucursal ya tiene un gerente general asignado.',
                );
            }

            if ($assignment['position'] === EmployeePosition::BranchManager->value) {
                $this->assertNoOtherActiveAssignmentAtBranch(
                    $assignment['branch_id'],
                    EmployeePosition::BranchManager,
                    $employeeId,
                    'Esta sucursal ya tiene un gerente de sucursal asignado.',
                );
            }
        }
    }

    /**
     * @param  Collection<int, array{branch_id: int, position: string, active?: bool}>  $assignments
     */
    private function validateUniquePositionPerBranch(
        Collection $assignments,
        EmployeePosition $position,
        string $message,
    ): void {
        $assignmentsByBranch = $assignments
            ->filter(fn (array $assignment): bool => $assignment['position'] === $position->value)
            ->groupBy('branch_id');

        foreach ($assignmentsByBranch as $group) {
            if ($group->count() > 1) {
                throw ValidationException::withMessages([
                    'assignments' => $message,
                ]);
            }
        }
    }

    private function assertNoOtherActiveAssignmentAtBranch(
        int $branchId,
        EmployeePosition $position,
        ?int $employeeId,
        string $message,
    ): void {
        $exists = EmployeeBranchAssignment::query()
            ->where('branch_id', $branchId)
            ->where('position', $position)
            ->where('active', true)
            ->when(
                $employeeId,
                fn ($query) => $query->where('employee_id', '!=', $employeeId)
            )
            ->exists();

        if ($exists) {
            throw ValidationException::withMessages([
                'assignments' => $message,
            ]);
        }
    }

    /**
     * @param  array{active?: bool}  $assignment
     */
    private function isActive(array $assignment): bool
    {
        return filter_var($assignment['active'] ?? true, FILTER_VALIDATE_BOOLEAN);
    }
}
