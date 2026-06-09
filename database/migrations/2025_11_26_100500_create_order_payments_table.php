<?php

use App\Enums\PaymentCurrency;
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
            $table->enum('currency', PaymentCurrency::values())->comment('moneda usada en el pago');
            $table->decimal('amount', 12, 2)->comment('monto pagado');
            $table->decimal('exchange_rate', 12, 4)->nullable()->comment('tasa de cambio aplicada cuando corresponda');
            $table->char('source_bank_code', 4)->nullable()->comment('codigo SUDEBAN del banco origen');
            $table->char('destination_bank_code', 4)->nullable()->comment('codigo SUDEBAN del banco destino');
            $table->string('reference_number', 100)->nullable()->comment('numero de referencia o comprobante');
            $table->string('payer_identification', 30)->nullable()->comment('cedula/RIF del pagador');
            $table->string('payer_phone', 11)->nullable()->comment('telefono asociado al pago (código + 7 dígitos)');
            $table->string('payer_email')->nullable()->comment('correo asociado al pago internacional');
            $table->string('account_identifier', 100)->nullable()->comment('identificador de cuenta/billetera');
            $table->string('account_holder_name', 120)->nullable()->comment('titular reportado del pago');
            $table->string('transaction_id', 120)->nullable()->comment('identificador de transaccion externa');
            $table->string('card_last_four', 4)->nullable()->comment('ultimos cuatro digitos de la tarjeta');
            $table->string('card_network', 30)->nullable()->comment('red o marca de tarjeta');
            $table->string('proof_image_path')->nullable()->comment('ruta del comprobante de pago');
            $table->json('payment_details')->nullable()->comment('datos especificos del metodo no normalizados');
            $table->timestamp('paid_at')->nullable()->comment('fecha reportada del pago');
            $table->timestamp('confirmed_at')->nullable()->comment('fecha de confirmacion administrativa');
            $table->text('notes')->nullable()->comment('notas internas del pago');
            $table->timestamps();

            $table->index(['order_id', 'status'], 'order_payments_order_status_idx');
            $table->index(['method', 'status'], 'order_payments_method_status_idx');
            $table->index('source_bank_code', 'order_payments_source_bank_idx');
            $table->index('destination_bank_code', 'order_payments_destination_bank_idx');
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
