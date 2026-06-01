<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clients = [
            [
                'user_email' => 'juan@example.com',
                'first_name' => 'Juan',
                'last_name' => 'Perez',
                'identity_document' => 'V-12345678',
                'email' => 'juan@example.com',
                'phone' => '+58 414-1000001',
                'address' => 'Calle Principal, Caracas',
                'birth_date' => '1990-02-15',
                'origin' => 'online',
                'first_purchase_at' => '2024-01-20 12:30:00',
                'last_purchase_at' => '2024-10-05 19:45:00',
                'total_orders' => 8,
                'total_spent' => 326.50,
                'status' => 'active',
                'notes' => 'Cliente frecuente de pedidos online.',
            ],
            [
                'user_email' => 'maria@example.com',
                'first_name' => 'Maria',
                'last_name' => 'Gonzalez',
                'identity_document' => 'V-17894562',
                'email' => 'maria@example.com',
                'phone' => '+58 424-1000002',
                'address' => 'Avenida Las Flores, Caracas',
                'birth_date' => '1988-07-09',
                'origin' => 'mixed',
                'first_purchase_at' => '2024-02-25 13:00:00',
                'last_purchase_at' => '2024-10-10 20:15:00',
                'total_orders' => 12,
                'total_spent' => 584.75,
                'status' => 'active',
                'notes' => 'Compra tanto en sucursal como por delivery.',
            ],
            [
                'user_email' => null,
                'first_name' => 'Roberto',
                'last_name' => 'Salazar',
                'identity_document' => 'V-20456987',
                'email' => 'roberto.salazar@example.com',
                'phone' => '+58 412-1000003',
                'address' => 'Sector La Lago, Maracaibo',
                'birth_date' => '1979-11-21',
                'origin' => 'physical',
                'first_purchase_at' => '2024-04-12 18:45:00',
                'last_purchase_at' => '2024-09-18 21:10:00',
                'total_orders' => 5,
                'total_spent' => 213.40,
                'status' => 'active',
                'notes' => 'Cliente registrado desde compras fisicas.',
            ],
            [
                'user_email' => 'ana@example.com',
                'first_name' => 'Ana',
                'last_name' => 'Martinez',
                'identity_document' => 'V-15678321',
                'email' => 'ana@example.com',
                'phone' => '+58 414-1000004',
                'address' => 'Las Mercedes, Caracas',
                'birth_date' => '1995-05-30',
                'origin' => 'online',
                'first_purchase_at' => '2024-05-01 11:25:00',
                'last_purchase_at' => '2024-10-12 14:20:00',
                'total_orders' => 6,
                'total_spent' => 289.90,
                'status' => 'active',
                'notes' => null,
            ],
            [
                'user_email' => null,
                'first_name' => 'Patricia',
                'last_name' => 'Mendoza',
                'identity_document' => 'V-11222333',
                'email' => 'patricia.mendoza@example.com',
                'phone' => '+58 426-1000005',
                'address' => 'Av. Bolivar Norte, Valencia',
                'birth_date' => '1984-09-18',
                'origin' => 'physical',
                'first_purchase_at' => '2024-06-03 15:00:00',
                'last_purchase_at' => '2024-08-22 16:35:00',
                'total_orders' => 3,
                'total_spent' => 147.25,
                'status' => 'inactive',
                'notes' => 'Cliente fisico inactivo temporalmente.',
            ],
        ];

        foreach ($clients as $client) {
            $userEmail = $client['user_email'];
            unset($client['user_email']);

            $client['user_id'] = $userEmail
                ? User::where('email', $userEmail)->value('id')
                : null;

            Client::updateOrCreate(
                ['identity_document' => $client['identity_document']],
                $client
            );
        }
    }
}
