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
        Schema::create('users', function (Blueprint $table) {
            $table->id()->comment('identificador del usuario');
            $table->string('name', 100)->comment('nombre del usuario');
            $table->string('last_name', 100)->comment('apellido del usuario');
            $table->string('email', 100)->unique()->comment('email del usuario');
            $table->timestamp('email_verified_at')->nullable()->comment('fecha de verificación del email');
            $table->string('password')->comment('contraseña del usuario');
            $table->text('two_factor_secret')->nullable()->comment('secreto de autenticación de dos factores');
            $table->text('two_factor_recovery_codes')->nullable()->comment('códigos de recuperación 2FA');
            $table->timestamp('two_factor_confirmed_at')->nullable()->comment('fecha de confirmación 2FA');
            $table->string('phone_number', 11)->nullable()->comment('número de teléfono del usuario (código + 7 dígitos)');
            $table->text('address')->nullable()->comment('dirección del usuario');
            $table->longText('profile_picture')->nullable()->comment('imagen de perfil del usuario en formato base64');
            $table->enum('role', ['admin', 'employee', 'client'])->default('client')->comment('rol del usuario');
            $table->enum('status', ['active', 'inactive'])->default('active')->comment('estado del usuario');
            $table->timestamp('registration_date')->useCurrent()->comment('fecha de registro del usuario');
            $table->timestamp('last_connection')->nullable()->comment('fecha de última conexión del usuario');
            $table->string('remember_token', 100)->nullable()->comment('token de recuerdo del usuario');
            $table->timestamp('created_at')->nullable()->comment('fecha de creación del registro');
            $table->timestamp('updated_at')->nullable()->comment('fecha de última actualización del registro');
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary()->comment('email del usuario');
            $table->string('token')->comment('token de restablecimiento de contraseña');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary()->comment('identificador de la sesión');
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable()->comment('dirección IP de la sesión');
            $table->text('user_agent')->nullable()->comment('agente de usuario de la sesión');
            $table->longText('payload')->comment('payload de la sesión');
            $table->integer('last_activity')->index()->comment('fecha de última actividad de la sesión');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
