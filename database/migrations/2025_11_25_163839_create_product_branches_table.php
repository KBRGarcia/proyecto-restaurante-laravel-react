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
        Schema::create('product_branches', function (Blueprint $table) {
            $table->id()->comment('identificador de la asignación producto-sucursal');
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade')->comment('identificador del producto');
            $table->foreignId('branch_id')->constrained('branches')->onDelete('cascade')->comment('identificador de la sucursal');
            $table->boolean('available')->default(true)->comment('producto disponible en la sucursal');
            $table->decimal('special_price', 10, 2)->nullable()->comment('precio especial para esta sucursal (opcional)');
            $table->timestamp('assignment_date')->useCurrent()->comment('fecha de asignación');
            $table->timestamps();

            // Índices
            $table->unique(['product_id', 'branch_id'], 'unique_product_branch');
            $table->index('product_id', 'idx_product_id');
            $table->index('branch_id', 'idx_branch_id');
            $table->index('available', 'idx_available');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_branches');
    }
};
