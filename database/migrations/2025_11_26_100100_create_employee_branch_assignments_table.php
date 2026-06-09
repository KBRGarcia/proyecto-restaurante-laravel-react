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

            // Un solo gerente general activo por sucursal.
            $table->unsignedBigInteger('active_general_manager_branch_id')
                ->nullable()
                ->storedAs("CASE WHEN `position` = 'general_manager' AND `active` = 1 THEN `branch_id` ELSE NULL END");
            $table->unique('active_general_manager_branch_id', 'employee_branch_active_gm_unique');

            // Un empleado solo puede ser gerente de sucursal activo en una sucursal.
            $table->unsignedBigInteger('active_branch_manager_employee_id')
                ->nullable()
                ->storedAs("CASE WHEN `position` = 'branch_manager' AND `active` = 1 THEN `employee_id` ELSE NULL END");
            $table->unique('active_branch_manager_employee_id', 'employee_branch_active_bm_employee_unique');

            // Una sucursal solo puede tener un gerente de sucursal activo.
            $table->unsignedBigInteger('active_branch_manager_branch_id')
                ->nullable()
                ->storedAs("CASE WHEN `position` = 'branch_manager' AND `active` = 1 THEN `branch_id` ELSE NULL END");
            $table->unique('active_branch_manager_branch_id', 'employee_branch_active_bm_branch_unique');
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
