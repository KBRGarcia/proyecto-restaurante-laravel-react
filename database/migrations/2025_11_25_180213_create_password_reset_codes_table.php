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
        Schema::create('password_reset_codes', function (Blueprint $table) {
            $table->id()->comment('identificador del código de recuperación');
            $table->string('mail', 100)->comment('correo electrónico del usuario');
            $table->string('code', 6)->comment('código de 6 dígitos para recuperación');
            $table->timestamp('expires_at')->comment('fecha y hora de expiración del código');
            $table->boolean('used')->default(false)->comment('indica si el código ya fue utilizado');
            $table->timestamps();

            // Índices
            $table->index('mail', 'email_idx');
            $table->index('code', 'idx_code');
            $table->index('expires_at', 'idx_expires');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('password_reset_codes');
    }
};
