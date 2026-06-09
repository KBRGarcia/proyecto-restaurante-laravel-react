<?php

use App\Enums\PersonStatus;
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
        Schema::create('employees', function (Blueprint $table) {
            $table->id()->comment('identificador del empleado');
            $table->foreignId('user_id')->nullable()->unique()->constrained('users')->nullOnDelete()->comment('usuario del sistema asociado, si existe');
            $table->string('first_name', 100)->comment('nombre del empleado');
            $table->string('last_name', 100)->comment('apellido del empleado');
            $table->string('identity_document', 30)->nullable()->unique()->comment('cedula o documento de identidad');
            $table->string('email', 100)->nullable()->unique()->comment('correo de contacto laboral');
            $table->string('phone', 11)->nullable()->comment('telefono de contacto (código + 7 dígitos)');
            $table->text('address')->nullable()->comment('direccion del empleado');
            $table->date('birth_date')->nullable()->comment('fecha de nacimiento');
            $table->date('hire_date')->comment('fecha de contratacion');
            $table->enum('status', PersonStatus::values())->default(PersonStatus::Active->value)->comment('estado laboral');
            $table->text('notes')->nullable()->comment('notas internas');
            $table->timestamps();

            $table->index(['status', 'hire_date'], 'employees_status_hire_date_idx');
            $table->index(['first_name', 'last_name'], 'employees_name_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
