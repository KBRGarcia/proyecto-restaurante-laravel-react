<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Ejecutar los seeders en el orden correcto
        // Importante: CategorySeeder debe ejecutarse antes que ProductSeeder
        // UserSeeder debe ejecutarse antes que ClientSeeder, EmployeeSeeder y OrderSeeder
        // OrderSeeder y ProductSeeder deben ejecutarse antes que OrderDetailSeeder
        // ProductSeeder y BranchSeeder deben ejecutarse antes que ProductBranchSeeder
        // debido a las relaciones de foreign key
        $this->call([
            UserSeeder::class,
            ClientSeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
            BranchSeeder::class,
            EmployeeSeeder::class,
            OrderSeeder::class,
            OrderPaymentSeeder::class,
            OrderDetailSeeder::class,
            ProductBranchSeeder::class,
        ]);
    }
}
