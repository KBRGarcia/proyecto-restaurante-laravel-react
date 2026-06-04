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
        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('client_id')
                ->nullable()
                ->after('user_id')
                ->constrained('clients')
                ->nullOnDelete()
                ->comment('cliente del restaurante (con o sin usuario del sistema)');

            $table->index(['client_id', 'order_date'], 'orders_client_order_date_idx');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['client_id']);
            $table->dropIndex('orders_client_order_date_idx');
            $table->dropColumn('client_id');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable(false)->change();
        });
    }
};
