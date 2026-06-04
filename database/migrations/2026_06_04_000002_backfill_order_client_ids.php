<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('orders')
            ->join('clients', 'clients.user_id', '=', 'orders.user_id')
            ->whereNull('orders.client_id')
            ->update([
                'orders.client_id' => DB::raw('clients.id'),
            ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
