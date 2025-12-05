<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Deshabilitar restricciones de foreign keys temporalmente
        Schema::disableForeignKeyConstraints();

        // Limpiar la tabla antes de insertar
        Product::query()->delete();

        // Resetear el auto-increment (solo para MySQL/MariaDB)
        if (DB::getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE products AUTO_INCREMENT = 1');
        }

        // Crear los productos usando el modelo Eloquent
        $products = [
            // Entradas
            [
                'name' => 'Alitas Buffalo',
                'description' => 'Alitas de pollo con salsa picante buffalo',
                'price' => 12.99,
                'category_id' => 1,
                'image' => null,
                'status' => Product::STATUS_ACTIVE,
                'preparation_time' => 15,
                'ingredients' => null,
                'is_special' => false,
            ],
            [
                'name' => 'Nachos Supremos',
                'description' => 'Nachos con queso, guacamole, crema y jalapeños',
                'price' => 10.99,
                'category_id' => 1,
                'image' => null,
                'status' => Product::STATUS_ACTIVE,
                'preparation_time' => 10,
                'ingredients' => null,
                'is_special' => false,
            ],
            [
                'name' => 'Calamares Fritos',
                'description' => 'Anillos de calamar empanizados con salsa marinara',
                'price' => 14.99,
                'category_id' => 1,
                'image' => null,
                'status' => Product::STATUS_ACTIVE,
                'preparation_time' => 12,
                'ingredients' => null,
                'is_special' => false,
            ],
            // Platos Principales
            [
                'name' => 'Hamburguesa Clásica',
                'description' => 'Carne de res, lechuga, tomate, cebolla y papas fritas',
                'price' => 16.99,
                'category_id' => 2,
                'image' => null,
                'status' => Product::STATUS_ACTIVE,
                'preparation_time' => 20,
                'ingredients' => null,
                'is_special' => false,
            ],
            [
                'name' => 'Filete de Salmón',
                'description' => 'Salmón a la plancha con vegetales y arroz',
                'price' => 22.99,
                'category_id' => 2,
                'image' => null,
                'status' => Product::STATUS_ACTIVE,
                'preparation_time' => 25,
                'ingredients' => null,
                'is_special' => true,
            ],
            [
                'name' => 'Pasta Alfredo',
                'description' => 'Fettuccine con salsa alfredo y pollo',
                'price' => 18.99,
                'category_id' => 2,
                'image' => null,
                'status' => Product::STATUS_ACTIVE,
                'preparation_time' => 18,
                'ingredients' => null,
                'is_special' => false,
            ],
            [
                'name' => 'Pizza Margherita',
                'description' => 'Pizza tradicional con tomate, mozzarella y albahaca',
                'price' => 15.99,
                'category_id' => 2,
                'image' => null,
                'status' => Product::STATUS_ACTIVE,
                'preparation_time' => 20,
                'ingredients' => null,
                'is_special' => false,
            ],
            // Postres
            [
                'name' => 'Cheesecake',
                'description' => 'Pastel de queso con frutos rojos',
                'price' => 8.99,
                'category_id' => 3,
                'image' => null,
                'status' => Product::STATUS_ACTIVE,
                'preparation_time' => 5,
                'ingredients' => null,
                'is_special' => false,
            ],
            [
                'name' => 'Brownie con Helado',
                'description' => 'Brownie de chocolate caliente con helado de vainilla',
                'price' => 7.99,
                'category_id' => 3,
                'image' => null,
                'status' => Product::STATUS_ACTIVE,
                'preparation_time' => 8,
                'ingredients' => null,
                'is_special' => false,
            ],
            [
                'name' => 'Tiramisú',
                'description' => 'Postre italiano con café y mascarpone',
                'price' => 9.99,
                'category_id' => 3,
                'image' => null,
                'status' => Product::STATUS_ACTIVE,
                'preparation_time' => 5,
                'ingredients' => null,
                'is_special' => true,
            ],
            // Bebidas
            [
                'name' => 'Coca Cola',
                'description' => 'Refresco de cola 355ml',
                'price' => 2.99,
                'category_id' => 4,
                'image' => null,
                'status' => Product::STATUS_ACTIVE,
                'preparation_time' => 2,
                'ingredients' => null,
                'is_special' => false,
            ],
            [
                'name' => 'Jugo de Naranja Natural',
                'description' => 'Jugo fresco de naranja 300ml',
                'price' => 4.99,
                'category_id' => 4,
                'image' => null,
                'status' => Product::STATUS_ACTIVE,
                'preparation_time' => 3,
                'ingredients' => null,
                'is_special' => false,
            ],
            [
                'name' => 'Café Americano',
                'description' => 'Café negro recién preparado',
                'price' => 3.99,
                'category_id' => 4,
                'image' => null,
                'status' => Product::STATUS_ACTIVE,
                'preparation_time' => 5,
                'ingredients' => null,
                'is_special' => false,
            ],
            [
                'name' => 'Smoothie de Fresa',
                'description' => 'Batido de fresa con yogurt',
                'price' => 6.99,
                'category_id' => 4,
                'image' => null,
                'status' => Product::STATUS_ACTIVE,
                'preparation_time' => 5,
                'ingredients' => null,
                'is_special' => false,
            ],
            // Especialidades
            [
                'name' => 'Paella Marinera',
                'description' => 'Arroz con mariscos frescos (para 2 personas)',
                'price' => 35.99,
                'category_id' => 5,
                'image' => null,
                'status' => Product::STATUS_ACTIVE,
                'preparation_time' => 45,
                'ingredients' => null,
                'is_special' => true,
            ],
            [
                'name' => 'Ceviche Peruano',
                'description' => 'Pescado fresco marinado en limón',
                'price' => 19.99,
                'category_id' => 5,
                'image' => null,
                'status' => Product::STATUS_ACTIVE,
                'preparation_time' => 15,
                'ingredients' => null,
                'is_special' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }

        // Rehabilitar restricciones de foreign keys
        Schema::enableForeignKeyConstraints();
    }
}
