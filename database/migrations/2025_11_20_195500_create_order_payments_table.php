<?php

use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
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
        Schema::create('order_payments', function (Blueprint $table) {
            $table->id()->comment('identificador del registro de pago');
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete()->comment('orden asociada al pago');
            $table->enum('method', PaymentMethod::values())->comment('metodo de pago utilizado');
            $table->enum('status', PaymentStatus::values())->default(PaymentStatus::Pending->value)->comment('estado del pago');
            $table->enum('currency', ['nacional', 'internacional'])->comment('moneda usada en el pago');
            $table->decimal('amount', 12, 2)->comment('monto pagado');
            $table->decimal('exchange_rate', 12, 4)->nullable()->comment('tasa de cambio aplicada cuando corresponda');
            $table->char('bank_code', 4)->nullable()->comment('codigo SUDEBAN del banco venezolano');
            $table->string('reference_number', 100)->nullable()->comment('numero de referencia o comprobante');
            $table->string('payer_identification', 30)->nullable()->comment('cedula/RIF del pagador');
            $table->string('payer_phone', 20)->nullable()->comment('telefono asociado al pago');
            $table->string('proof_image_path')->nullable()->comment('ruta del comprobante de pago');
            $table->timestamp('paid_at')->nullable()->comment('fecha reportada del pago');
            $table->timestamp('confirmed_at')->nullable()->comment('fecha de confirmacion administrativa');
            $table->text('notes')->nullable()->comment('notas internas del pago');
            $table->timestamps();

            $table->index(['order_id', 'status'], 'order_payments_order_status_idx');
            $table->index(['method', 'status'], 'order_payments_method_status_idx');
            $table->index('bank_code', 'order_payments_bank_code_idx');
            $table->unique(['order_id', 'reference_number'], 'order_payments_order_reference_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_payments');
    }
};
