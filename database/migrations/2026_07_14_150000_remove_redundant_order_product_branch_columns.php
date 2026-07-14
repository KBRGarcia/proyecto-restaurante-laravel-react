<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Unifica fuentes de verdad:
     * - Pagos: solo en order_payments (elimina payment_method / national_payment_data de orders)
     * - Fechas: created_at / updated_at (elimina creation_date / update_date redundantes)
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (Schema::hasColumn('orders', 'payment_method')) {
                $table->dropColumn('payment_method');
            }
            if (Schema::hasColumn('orders', 'national_payment_data')) {
                $table->dropColumn('national_payment_data');
            }
        });

        Schema::table('products', function (Blueprint $table) {
            if (Schema::hasColumn('products', 'creation_date')) {
                $table->dropColumn('creation_date');
            }
        });

        Schema::table('branches', function (Blueprint $table) {
            $columns = [];
            if (Schema::hasColumn('branches', 'creation_date')) {
                $columns[] = 'creation_date';
            }
            if (Schema::hasColumn('branches', 'update_date')) {
                $columns[] = 'update_date';
            }
            if ($columns !== []) {
                $table->dropColumn($columns);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (! Schema::hasColumn('orders', 'payment_method')) {
                $table->string('payment_method', 50)->nullable()->after('special_notes');
            }
            if (! Schema::hasColumn('orders', 'national_payment_data')) {
                $table->json('national_payment_data')->nullable()->after('currency');
            }
        });

        Schema::table('products', function (Blueprint $table) {
            if (! Schema::hasColumn('products', 'creation_date')) {
                $table->timestamp('creation_date')->nullable()->after('is_special');
            }
        });

        Schema::table('branches', function (Blueprint $table) {
            if (! Schema::hasColumn('branches', 'creation_date')) {
                $table->timestamp('creation_date')->nullable()->after('opening_date');
            }
            if (! Schema::hasColumn('branches', 'update_date')) {
                $table->timestamp('update_date')->nullable()->after('creation_date');
            }
        });
    }
};
