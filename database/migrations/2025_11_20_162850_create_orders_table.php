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
        Schema::create('orders', function (Blueprint $table) {
            $table->id()->comment('identificador de la orden');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->comment('identificador del usuario');
            $table->enum('status', ['pending', 'preparing', 'ready', 'on_the_way', 'delivered', 'canceled'])->default('pending')->comment('estado de la orden');
            $table->enum('service_type', ['delivery', 'pickup'])->comment('tipo de servicio');
            $table->decimal('subtotal', 10, 2)->comment('subtotal de la orden');
            $table->decimal('taxes', 10, 2)->default(0)->comment('impuestos de la orden');
            $table->decimal('total', 10, 2)->comment('total de la orden');
            $table->text('delivery_address')->nullable()->comment('dirección de entrega');
            $table->string('contact_phone', 20)->nullable()->comment('teléfono de contacto');
            $table->text('special_notes')->nullable()->comment('notas especiales');
            $table->string('payment_method', 50)->nullable()->comment('método de pago');
            $table->enum('currency', ['nacional', 'internacional'])->default('internacional')->comment('moneda de la orden');
            $table->json('national_payment_data')->nullable()->comment('datos de pago nacional');
            $table->timestamp('order_date')->useCurrent()->comment('fecha de la orden');
            $table->timestamp('estimated_delivery_date')->nullable()->comment('fecha de entrega estimada');
            $table->foreignId('assigned_employee_id')->nullable()->constrained('users')->onDelete('set null')->comment('identificador del empleado asignado');
            // Timestamps de seguimiento de estados
            $table->timestamp('pending_date')->nullable()->comment('fecha de creación de la orden');
            $table->timestamp('preparing_date')->nullable()->comment('fecha de inicio de la preparación');
            $table->timestamp('ready_date')->nullable()->comment('fecha de finalización de la preparación');
            $table->timestamp('on_the_way_date')->nullable()->comment('fecha de salida para entrega');
            $table->timestamp('delivered_date')->nullable()->comment('fecha de entrega');
            $table->timestamp('canceled_date')->nullable()->comment('fecha de cancelación');
            $table->timestamps();

            $table->index(['status', 'order_date'], 'orders_status_order_date_idx');
            $table->index(['user_id', 'order_date'], 'orders_user_order_date_idx');
            $table->index(['service_type', 'order_date'], 'orders_service_type_order_date_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
