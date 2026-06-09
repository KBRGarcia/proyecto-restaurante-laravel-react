<?php

namespace App\Models;

use App\Enums\EmployeePosition;
use App\Enums\PersonStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Validation\Rule;

class Employee extends Model
{
    protected $table = 'employees';

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'identity_document',
        'email',
        'phone',
        'address',
        'birth_date',
        'hire_date',
        'status',
        'notes',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'hire_date' => 'date',
        'status' => PersonStatus::class,
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(EmployeeBranchAssignment::class);
    }

    public function branches(): BelongsToMany
    {
        return $this->belongsToMany(Branch::class, 'employee_branch_assignments')
            ->withPivot('position', 'start_date', 'end_date', 'active')
            ->withTimestamps();
    }

    /**
     * Get active assignments for a specific position.
     */
    public function activeAssignmentsForPosition(EmployeePosition $position): HasMany
    {
        return $this->assignments()
            ->where('position', $position)
            ->where('active', true);
    }

    /**
     * Check if the employee is an active general manager in any branch.
     */
    public function isActiveGeneralManager(): bool
    {
        return $this->activeAssignmentsForPosition(EmployeePosition::GeneralManager)->exists();
    }

    /**
     * Check if the employee is an active branch manager in any branch.
     */
    public function isActiveBranchManager(): bool
    {
        return $this->activeAssignmentsForPosition(EmployeePosition::BranchManager)->exists();
    }

    /**
     * Get the branch where this employee is an active branch manager, if any.
     */
    public function activeBranchManagerBranch(): ?Branch
    {
        return $this->activeAssignmentsForPosition(EmployeePosition::BranchManager)
            ->with('branch')
            ->first()
            ?->branch;
    }

    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function ($q) use ($search) {
            $q->where('first_name', 'like', "%{$search}%")
                ->orWhere('last_name', 'like', "%{$search}%")
                ->orWhere('identity_document', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('phone', 'like', "%{$search}%");
        });
    }

    public function getFullNameAttribute(): string
    {
        return trim($this->first_name . ' ' . $this->last_name);
    }

    /**
     * @return array<string, mixed>
     */
    public static function rules(bool $isUpdate = false, ?int $id = null): array
    {
        $uniqueEmployee = fn (string $column) => Rule::unique('employees', $column)->ignore($id);

        return [
            'user_id' => ['nullable', 'exists:users,id', $uniqueEmployee('user_id')],
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'identity_document' => ['nullable', 'string', 'max:30', $uniqueEmployee('identity_document')],
            'email' => ['nullable', 'email', 'max:100', $uniqueEmployee('email')],
            'phone' => ['nullable', 'string', 'regex:' . \App\Enums\PhoneAreaCode::validationPattern()],
            'address' => ['nullable', 'string'],
            'birth_date' => ['nullable', 'date', 'before:today'],
            'hire_date' => [$isUpdate ? 'sometimes' : 'required', 'date'],
            'status' => ['required', Rule::in(PersonStatus::values())],
            'notes' => ['nullable', 'string'],
            'assignments' => ['nullable', 'array'],
            'assignments.*.branch_id' => ['required_with:assignments', 'exists:branches,id'],
            'assignments.*.position' => ['required_with:assignments', Rule::in(EmployeePosition::values())],
            'assignments.*.start_date' => ['nullable', 'date'],
            'assignments.*.end_date' => ['nullable', 'date'],
            'assignments.*.active' => ['nullable', 'boolean'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function messages(): array
    {
        return [
            'first_name.required' => 'El nombre del empleado es obligatorio.',
            'last_name.required' => 'El apellido del empleado es obligatorio.',
            'identity_document.unique' => 'Este documento de identidad ya esta registrado.',
            'email.email' => 'Debe indicar un correo valido.',
            'email.unique' => 'Este correo ya esta registrado.',
            'user_id.unique' => 'Este usuario ya esta asociado a otro empleado.',
            'hire_date.required' => 'La fecha de contratacion es obligatoria.',
            'status.required' => 'El estado del empleado es obligatorio.',
            'status.in' => 'El estado seleccionado no es valido.',
            'assignments.*.branch_id.exists' => 'Una de las sucursales seleccionadas no existe.',
            'assignments.*.position.in' => 'Uno de los cargos seleccionados no es valido.',
            'phone.regex' => 'El teléfono debe incluir un código válido y 7 dígitos.',
        ];
    }
}
