<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('venezuela_banks');
        Schema::dropIfExists('payment_methods');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Static catalogs now live in App\Enums and are intentionally not recreated as tables.
    }
};
