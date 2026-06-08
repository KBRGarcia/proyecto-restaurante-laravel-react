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
        Schema::create('products', function (Blueprint $table) {
            $table->id()->comment('identificador del producto');
            $table->string('name', 100)->comment('nombre del producto');
            $table->text('description')->nullable()->comment('descripción del producto');
            $table->decimal('price', 10, 2)->comment('precio del producto');
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null')->comment('identificador de la categoría');
            $table->longText('image')->nullable()->comment('imagen del producto en formato base64');
            $table->enum('status', ['active', 'inactive', 'out of stock'])->default('active')->comment('estado del producto');
            $table->integer('preparation_time')->default(15)->comment('tiempo de preparación en minutos');
            $table->text('ingredients')->nullable()->comment('ingredientes del producto');
            $table->boolean('is_special')->default(false)->comment('indica si el producto es especial');
            $table->timestamp('creation_date')->useCurrent()->comment('fecha de creación del producto');
            $table->timestamp('created_at')->nullable()->comment('fecha de creación del registro');
            $table->timestamp('updated_at')->nullable()->comment('fecha de última actualización del registro');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
