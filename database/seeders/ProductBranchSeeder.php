<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Product;
use App\Models\ProductBranch;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductBranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener todos los productos
        $products = Product::all();

        if ($products->isEmpty()) {
            $this->command->warn('No hay productos disponibles. Ejecuta ProductSeeder primero.');
            return;
        }

        // Obtener la sucursal principal
        $mainBranch = Branch::main()->first();

        if (!$mainBranch) {
            $this->command->warn('No se encontró la sucursal principal. Ejecuta BranchSeeder primero.');
            return;
        }

        // Asignar todos los productos a la sucursal principal
        $this->command->info("Asignando todos los productos a la sucursal principal: {$mainBranch->name}");

        foreach ($products as $product) {
            ProductBranch::updateOrCreate(
                [
                    'product_id' => $product->id,
                    'branch_id' => $mainBranch->id,
                ],
                [
                    'available' => true,
                    'special_price' => null,
                    'assignment_date' => now(),
                ]
            );
        }

        $this->command->info("✓ {$products->count()} productos asignados a la sucursal principal.");

        // Obtener las demás sucursales (no principales)
        $otherBranches = Branch::where('is_main', false)->get();

        if ($otherBranches->isEmpty()) {
            $this->command->info('No hay otras sucursales para asignar productos.');
            return;
        }

        // Asignar productos aleatoriamente a las demás sucursales
        foreach ($otherBranches as $branch) {
            $this->command->info("Asignando productos aleatoriamente a: {$branch->name}");

            // Mezclar los productos para asignación aleatoria
            $shuffledProducts = $products->shuffle();

            // Determinar cuántos productos asignar (entre 50% y 100% de los productos)
            $minProducts = max(1, (int) ceil($products->count() * 0.5));
            $maxProducts = $products->count();
            $numberOfProducts = rand($minProducts, $maxProducts);

            // Seleccionar productos aleatorios
            $selectedProducts = $shuffledProducts->take($numberOfProducts);

            $assignedCount = 0;
            foreach ($selectedProducts as $product) {
                // Calcular precio especial basado en el precio del producto (±20%)
                $specialPrice = null;
                if (rand(0, 10) > 7) { // 30% de probabilidad de precio especial
                    $priceVariation = rand(-20, 20) / 100; // Variación de ±20%
                    $specialPrice = round((float) $product->price * (1 + $priceVariation), 2);
                    // Asegurar que el precio especial sea positivo
                    $specialPrice = max(0.01, $specialPrice);
                }

                ProductBranch::updateOrCreate(
                    [
                        'product_id' => $product->id,
                        'branch_id' => $branch->id,
                    ],
                    [
                        'available' => (bool) rand(0, 1), // Disponibilidad aleatoria
                        'special_price' => $specialPrice,
                        'assignment_date' => now(),
                    ]
                );
                $assignedCount++;
            }

            $this->command->info("✓ {$assignedCount} productos asignados a {$branch->name}.");
        }

        $this->command->info('✓ ProductBranchSeeder completado exitosamente.');
    }
}
