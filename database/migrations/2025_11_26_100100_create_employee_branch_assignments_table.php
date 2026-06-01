<?php

use App\Enums\EmployeePosition;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employee_branch_assignments', function (Blueprint $table) {
            $table->id()->comment('identificador de la asignacion empleado-sucursal');
            $table->foreignId('employee_id')->constrained('employees')->cascadeOnDelete()->comment('empleado asignado');
            $table->foreignId('branch_id')->constrained('branches')->cascadeOnDelete()->comment('sucursal donde trabaja');
            $table->enum('position', EmployeePosition::values())->comment('cargo ocupado en la sucursal');
            $table->date('start_date')->nullable()->comment('fecha de inicio en la sucursal');
            $table->date('end_date')->nullable()->comment('fecha de fin de la asignacion');
            $table->boolean('active')->default(true)->comment('asignacion activa');
            $table->timestamps();

            $table->unique(['employee_id', 'branch_id', 'position'], 'employee_branch_position_unique');
            $table->index(['branch_id', 'position', 'active'], 'employee_branch_position_active_idx');
            $table->index(['employee_id', 'active'], 'employee_assignment_active_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_branch_assignments');
    }
};
