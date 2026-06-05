<?php

use App\Enums\ClientOrigin;
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
        Schema::create('clients', function (Blueprint $table) {
            $table->id()->comment('identificador del cliente');
            $table->foreignId('user_id')->nullable()->unique()->constrained('users')->nullOnDelete()->comment('usuario del sistema asociado, si existe');
            $table->string('first_name', 100)->comment('nombre del cliente');
            $table->string('last_name', 100)->comment('apellido del cliente');
            $table->string('identity_document', 30)->nullable()->unique()->comment('cedula/RIF o documento de identidad');
            $table->string('email', 100)->nullable()->unique()->comment('correo de contacto');
            $table->string('phone', 20)->nullable()->comment('telefono de contacto');
            $table->text('address')->nullable()->comment('direccion principal');
            $table->date('birth_date')->nullable()->comment('fecha de nacimiento');
            $table->enum('origin', ClientOrigin::values())->default(ClientOrigin::Online->value)->comment('origen del cliente');
            $table->enum('status', PersonStatus::values())->default(PersonStatus::Active->value)->comment('estado del cliente');
            $table->text('notes')->nullable()->comment('notas internas');
            $table->timestamps();

            $table->index(['status'], 'clients_status_idx');
            $table->index(['origin', 'status'], 'clients_origin_status_idx');
            $table->index(['first_name', 'last_name'], 'clients_name_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
