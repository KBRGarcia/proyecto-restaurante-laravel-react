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
        Schema::create('order_details', function (Blueprint $table) {
            $table->id()->comment('identificador del detalle de la orden');
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade')->comment('identificador de la orden');
            $table->foreignId('product_id')->constrained('products')->comment('identificador del producto');
            $table->integer('quantity')->comment('cantidad del producto');
            $table->decimal('unit_price', 10, 2)->comment('precio unitario del producto');
            $table->decimal('subtotal', 10, 2)->comment('subtotal del detalle');
            $table->text('product_notes')->nullable()->comment('notas del producto');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
