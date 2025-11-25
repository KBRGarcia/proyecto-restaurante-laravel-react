<?php

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
        Schema::create('branches', function (Blueprint $table) {
            $table->id()->comment('identificador de la sucursal');
            $table->string('name', 100)->comment('nombre de la sucursal');
            $table->string('address', 255)->comment('dirección de la sucursal');
            $table->string('city', 100)->comment('ciudad');
            $table->string('state', 100)->comment('estado/provincia');
            $table->string('postal_code', 20)->nullable()->comment('código postal');
            $table->string('phone', 20)->comment('teléfono de contacto');
            $table->string('email', 100)->nullable()->comment('correo electrónico');
            $table->time('opening_time')->default('09:00:00')->comment('hora de apertura');
            $table->time('closing_time')->default('22:00:00')->comment('hora de cierre');
            $table->string('operation_days', 100)->default('Monday to Sunday')->comment('días de operación');
            $table->decimal('latitude', 10, 8)->nullable()->comment('latitud GPS');
            $table->decimal('longitude', 11, 8)->nullable()->comment('longitud GPS');
            $table->boolean('is_main')->default(false)->comment('es sucursal principal');
            $table->boolean('has_delivery')->default(true)->comment('tiene servicio de entrega');
            $table->boolean('has_parking')->default(false)->comment('tiene estacionamiento');
            $table->integer('capacity_people')->nullable()->comment('capacidad de personas');
            $table->string('image', 255)->nullable()->comment('imagen de la sucursal');
            $table->text('description')->nullable()->comment('descripción de la sucursal');
            $table->boolean('active')->default(true)->comment('sucursal activa');
            $table->date('opening_date')->nullable()->comment('fecha de apertura');
            $table->string('manager', 100)->nullable()->comment('gerente de la sucursal');
            $table->timestamp('creation_date')->useCurrent()->comment('fecha de creación');
            $table->timestamp('update_date')->useCurrent()->useCurrentOnUpdate()->comment('fecha de actualización');
            $table->timestamps();

            // Índices
            $table->index('city', 'idx_city');
            $table->index('active', 'idx_active');
            $table->index('is_main', 'idx_is_main');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branches');
    }
};
