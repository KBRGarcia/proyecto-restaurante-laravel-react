<?php

namespace Database\Seeders;

use App\Models\Branch;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $branches = [
            // Sucursal 1 - Principal
            [
                'name' => 'Sabor & Tradición - Centro',
                'address' => 'Av. Principal, Edificio Centro Plaza, Local 5',
                'city' => 'Caracas',
                'state' => 'Distrito Capital',
                'postal_code' => '1010',
                'phone' => '0212-555-1234',
                'email' => 'centro@sabortradicion.com',
                'opening_time' => '09:00:00',
                'closing_time' => '23:00:00',
                'operation_days' => 'Lunes a Domingo',
                'latitude' => 10.50634800,
                'longitude' => -66.91462300,
                'is_main' => true,
                'has_delivery' => true,
                'has_parking' => true,
                'capacity_people' => 120,
                'image' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
                'description' => 'Nuestra sucursal principal ubicada en el corazón de Caracas. Cuenta con amplios espacios, estacionamiento y servicio de delivery. Perfecta para reuniones familiares y eventos especiales.',
                'active' => true,
                'opening_date' => '2020-01-15',
                'manager' => 'María Rodríguez',
            ],

            // Sucursal 2 - Las Mercedes
            [
                'name' => 'Sabor & Tradición - Las Mercedes',
                'address' => 'Calle París con Av. Principal de Las Mercedes, C.C. Plaza Las Mercedes',
                'city' => 'Caracas',
                'state' => 'Distrito Capital',
                'postal_code' => '1060',
                'phone' => '0212-555-2345',
                'email' => 'lasmercedes@sabortradicion.com',
                'opening_time' => '11:00:00',
                'closing_time' => '23:30:00',
                'operation_days' => 'Lunes a Domingo',
                'latitude' => 10.49504000,
                'longitude' => -66.85743000,
                'is_main' => false,
                'has_delivery' => true,
                'has_parking' => true,
                'capacity_people' => 80,
                'image' => 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
                'description' => 'Ubicada en la exclusiva zona de Las Mercedes, esta sucursal ofrece un ambiente elegante y sofisticado. Ideal para cenas románticas y encuentros de negocios.',
                'active' => true,
                'opening_date' => '2021-03-20',
                'manager' => 'Carlos Méndez',
            ],

            // Sucursal 3 - Altamira
            [
                'name' => 'Sabor & Tradición - Altamira',
                'address' => 'Av. San Juan Bosco con 2da Transversal de Altamira',
                'city' => 'Caracas',
                'state' => 'Distrito Capital',
                'postal_code' => '1062',
                'phone' => '0212-555-3456',
                'email' => 'altamira@sabortradicion.com',
                'opening_time' => '10:00:00',
                'closing_time' => '22:00:00',
                'operation_days' => 'Lunes a Sábado',
                'latitude' => 10.49677000,
                'longitude' => -66.85371000,
                'is_main' => false,
                'has_delivery' => true,
                'has_parking' => false,
                'capacity_people' => 60,
                'image' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
                'description' => 'Nuestra sucursal boutique en Altamira combina tradición con modernidad. Ambiente acogedor perfecto para almuerzos de trabajo y reuniones casuales.',
                'active' => true,
                'opening_date' => '2021-07-10',
                'manager' => 'Ana Fernández',
            ],

            // Sucursal 4 - Valencia
            [
                'name' => 'Sabor & Tradición - Valencia',
                'address' => 'Av. Bolívar Norte, Centro Comercial Metrópolis, Nivel 2',
                'city' => 'Valencia',
                'state' => 'Carabobo',
                'postal_code' => '2001',
                'phone' => '0241-555-4567',
                'email' => 'valencia@sabortradicion.com',
                'opening_time' => '10:00:00',
                'closing_time' => '22:00:00',
                'operation_days' => 'Lunes a Domingo',
                'latitude' => 10.16277000,
                'longitude' => -68.00779000,
                'is_main' => false,
                'has_delivery' => true,
                'has_parking' => true,
                'capacity_people' => 100,
                'image' => 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
                'description' => 'Primera sucursal fuera de Caracas. Ubicada en el moderno Centro Comercial Metrópolis de Valencia, ofrece toda la tradición de nuestros sabores con amplias instalaciones.',
                'active' => true,
                'opening_date' => '2022-05-15',
                'manager' => 'José Ramírez',
            ],

            // Sucursal 5 - Maracaibo
            [
                'name' => 'Sabor & Tradición - Maracaibo',
                'address' => 'Av. 5 de Julio con Calle 72, Sector La Lago',
                'city' => 'Maracaibo',
                'state' => 'Zulia',
                'postal_code' => '4001',
                'phone' => '0261-555-5678',
                'email' => 'maracaibo@sabortradicion.com',
                'opening_time' => '11:00:00',
                'closing_time' => '23:00:00',
                'operation_days' => 'Martes a Domingo',
                'latitude' => 10.66667000,
                'longitude' => -71.61667000,
                'is_main' => false,
                'has_delivery' => true,
                'has_parking' => true,
                'capacity_people' => 90,
                'image' => 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
                'description' => 'Nuestra más reciente apertura en la ciudad del sol amado. Diseño moderno con toques tradicionales, ofreciendo las mejores vistas del Lago de Maracaibo.',
                'active' => true,
                'opening_date' => '2023-02-28',
                'manager' => 'Luis Pérez',
            ],
        ];

        foreach ($branches as $branch) {
            Branch::updateOrCreate(
                ['name' => $branch['name']], // Buscar por nombre
                $branch // Actualizar o crear con estos datos
            );
        }
    }
}
