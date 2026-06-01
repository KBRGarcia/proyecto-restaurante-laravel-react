<?php

namespace App\Models;

use App\Enums\EmployeePosition;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmployeeBranchAssignment extends Model
{
    protected $table = 'employee_branch_assignments';

    protected $fillable = [
        'employee_id',
        'branch_id',
        'position',
        'start_date',
        'end_date',
        'active',
    ];

    protected $casts = [
        'position' => EmployeePosition::class,
        'start_date' => 'date',
        'end_date' => 'date',
        'active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }
}
