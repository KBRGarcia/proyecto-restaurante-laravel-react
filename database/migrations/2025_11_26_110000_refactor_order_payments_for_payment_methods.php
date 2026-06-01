<?php

use App\Enums\PaymentCurrency;
use App\Enums\PaymentMethod;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('physical_payment_orders');

        Schema::table('order_payments', function (Blueprint $table) {
            $table->enum('method', PaymentMethod::values())->change();
            $table->enum('currency', PaymentCurrency::values())->change();

            if (!Schema::hasColumn('order_payments', 'source_bank_code')) {
                $table->char('source_bank_code', 4)->nullable()->after('exchange_rate')->index('order_payments_source_bank_idx');
            }

            if (!Schema::hasColumn('order_payments', 'destination_bank_code')) {
                $table->char('destination_bank_code', 4)->nullable()->after('source_bank_code')->index('order_payments_destination_bank_idx');
            }

            if (!Schema::hasColumn('order_payments', 'payer_email')) {
                $table->string('payer_email')->nullable()->after('payer_phone');
            }

            if (!Schema::hasColumn('order_payments', 'account_identifier')) {
                $table->string('account_identifier', 100)->nullable()->after('payer_email');
            }

            if (!Schema::hasColumn('order_payments', 'account_holder_name')) {
                $table->string('account_holder_name', 120)->nullable()->after('account_identifier');
            }

            if (!Schema::hasColumn('order_payments', 'transaction_id')) {
                $table->string('transaction_id', 120)->nullable()->after('account_holder_name');
            }

            if (!Schema::hasColumn('order_payments', 'card_last_four')) {
                $table->string('card_last_four', 4)->nullable()->after('transaction_id');
            }

            if (!Schema::hasColumn('order_payments', 'card_network')) {
                $table->string('card_network', 30)->nullable()->after('card_last_four');
            }

            if (!Schema::hasColumn('order_payments', 'payment_details')) {
                $table->json('payment_details')->nullable()->after('proof_image_path');
            }
        });

        if (Schema::hasColumn('order_payments', 'bank_code')) {
            DB::table('order_payments')
                ->whereNull('source_bank_code')
                ->update(['source_bank_code' => DB::raw('bank_code')]);

            Schema::table('order_payments', function (Blueprint $table) {
                $table->dropIndex('order_payments_bank_code_idx');
                $table->dropColumn('bank_code');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('physical_payment_orders', function (Blueprint $table) {
            $table->id()->comment('identificador de la orden de pago físico');
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete()->comment('identificador de la orden');
            $table->timestamp('limit_date')->comment('fecha límite para el pago');
            $table->enum('status', ['pending', 'confirmed', 'canceled'])->default('pending')->comment('estado de la orden de pago');
            $table->timestamp('creation_date')->useCurrent()->comment('fecha de creación');
            $table->timestamp('update_date')->useCurrent()->useCurrentOnUpdate()->comment('fecha de actualización');
            $table->timestamps();

            $table->index('limit_date', 'idx_limit_date');
            $table->index('status', 'idx_status');
        });

        Schema::table('order_payments', function (Blueprint $table) {
            if (!Schema::hasColumn('order_payments', 'bank_code')) {
                $table->char('bank_code', 4)->nullable()->after('exchange_rate')->index('order_payments_bank_code_idx');
            }
        });

        if (Schema::hasColumn('order_payments', 'source_bank_code')) {
            DB::table('order_payments')
                ->whereNull('bank_code')
                ->update(['bank_code' => DB::raw('source_bank_code')]);
        }

        Schema::table('order_payments', function (Blueprint $table) {
            foreach ([
                'source_bank_code',
                'destination_bank_code',
                'payer_email',
                'account_identifier',
                'account_holder_name',
                'transaction_id',
                'card_last_four',
                'card_network',
                'payment_details',
            ] as $column) {
                if (Schema::hasColumn('order_payments', $column)) {
                    $table->dropColumn($column);
                }
            }

            $table->enum('method', [
                'pago_movil',
                'tarjeta_nacional',
                'efectivo',
                'transferencia',
                'tarjeta_credito',
                'binance',
                'paypal',
                'zinli',
                'zelle',
                'wally',
            ])->change();
        });
    }
};
