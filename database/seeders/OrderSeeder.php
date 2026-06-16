<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orders = [
            [
                'user_id' => 2,
                'status' => 'delivered',
                'service_type' => 'delivery',
                'contact_phone' => '04141010002',
                'payment_method' => 'efectivo_internacional',
                'order_date' => Carbon::create(2024, 9, 5, 12, 30, 0),
                'delivered_date' => Carbon::create(2024, 9, 5, 13, 15, 0),
                'created_at' => Carbon::create(2024, 9, 5, 12, 30, 0),
                'updated_at' => Carbon::create(2024, 9, 5, 13, 15, 0),
            ],
            [
                'user_id' => 3,
                'status' => 'delivered',
                'service_type' => 'pickup',
                'contact_phone' => '04241010003',
                'payment_method' => 'tarjeta_credito',
                'order_date' => Carbon::create(2024, 9, 8, 14, 15, 0),
                'delivered_date' => Carbon::create(2024, 9, 8, 15, 0, 0),
                'created_at' => Carbon::create(2024, 9, 8, 14, 15, 0),
                'updated_at' => Carbon::create(2024, 9, 8, 15, 0, 0),
            ],
            [
                'user_id' => 4,
                'status' => 'delivered',
                'service_type' => 'delivery',
                'contact_phone' => '04161010004',
                'payment_method' => 'efectivo_internacional',
                'order_date' => Carbon::create(2024, 9, 12, 18, 45, 0),
                'delivered_date' => Carbon::create(2024, 9, 12, 19, 45, 0),
                'created_at' => Carbon::create(2024, 9, 12, 18, 45, 0),
                'updated_at' => Carbon::create(2024, 9, 12, 19, 45, 0),
            ],
            [
                'user_id' => 5,
                'status' => 'delivered',
                'service_type' => 'pickup',
                'contact_phone' => '04221010005',
                'payment_method' => 'tarjeta_credito',
                'order_date' => Carbon::create(2024, 9, 15, 11, 20, 0),
                'delivered_date' => Carbon::create(2024, 9, 15, 11, 50, 0),
                'created_at' => Carbon::create(2024, 9, 15, 11, 20, 0),
                'updated_at' => Carbon::create(2024, 9, 15, 11, 50, 0),
            ],
            [
                'user_id' => 6,
                'status' => 'delivered',
                'service_type' => 'delivery',
                'contact_phone' => '04261010006',
                'payment_method' => 'efectivo_internacional',
                'order_date' => Carbon::create(2024, 9, 18, 19, 30, 0),
                'delivered_date' => Carbon::create(2024, 9, 18, 20, 30, 0),
                'created_at' => Carbon::create(2024, 9, 18, 19, 30, 0),
                'updated_at' => Carbon::create(2024, 9, 18, 20, 30, 0),
            ],
            [
                'user_id' => 2,
                'status' => 'delivered',
                'service_type' => 'delivery',
                'contact_phone' => '04141010002',
                'payment_method' => 'tarjeta_credito',
                'order_date' => Carbon::create(2024, 10, 2, 13, 0, 0),
                'delivered_date' => Carbon::create(2024, 10, 2, 14, 0, 0),
                'created_at' => Carbon::create(2024, 10, 2, 13, 0, 0),
                'updated_at' => Carbon::create(2024, 10, 2, 14, 0, 0),
            ],
            [
                'user_id' => 4,
                'status' => 'delivered',
                'service_type' => 'pickup',
                'contact_phone' => '04161010004',
                'payment_method' => 'efectivo_internacional',
                'order_date' => Carbon::create(2024, 10, 3, 17, 15, 0),
                'delivered_date' => Carbon::create(2024, 10, 3, 18, 0, 0),
                'created_at' => Carbon::create(2024, 10, 3, 17, 15, 0),
                'updated_at' => Carbon::create(2024, 10, 3, 18, 0, 0),
            ],
            [
                'user_id' => 5,
                'status' => 'delivered',
                'service_type' => 'delivery',
                'contact_phone' => '04221010005',
                'payment_method' => 'tarjeta_credito',
                'order_date' => Carbon::create(2024, 10, 4, 20, 0, 0),
                'delivered_date' => Carbon::create(2024, 10, 4, 21, 15, 0),
                'created_at' => Carbon::create(2024, 10, 4, 20, 0, 0),
                'updated_at' => Carbon::create(2024, 10, 4, 21, 15, 0),
            ],
            [
                'user_id' => 6,
                'status' => 'delivered',
                'service_type' => 'pickup',
                'contact_phone' => '04261010006',
                'payment_method' => 'efectivo_internacional',
                'order_date' => Carbon::create(2024, 10, 5, 12, 45, 0),
                'delivered_date' => Carbon::create(2024, 10, 5, 13, 15, 0),
                'created_at' => Carbon::create(2024, 10, 5, 12, 45, 0),
                'updated_at' => Carbon::create(2024, 10, 5, 13, 15, 0),
            ],
            [
                'user_id' => 7,
                'status' => 'delivered',
                'service_type' => 'delivery',
                'contact_phone' => '04121010007',
                'payment_method' => 'tarjeta_credito',
                'order_date' => Carbon::create(2024, 10, 6, 15, 30, 0),
                'delivered_date' => Carbon::create(2024, 10, 6, 16, 45, 0),
                'created_at' => Carbon::create(2024, 10, 6, 15, 30, 0),
                'updated_at' => Carbon::create(2024, 10, 6, 16, 45, 0),
            ],
            [
                'user_id' => 2,
                'status' => 'delivered',
                'service_type' => 'delivery',
                'contact_phone' => '04141010002',
                'payment_method' => 'efectivo_internacional',
                'order_date' => Carbon::today()->setTime(10, 0, 0),
                'delivered_date' => Carbon::today()->setTime(11, 15, 0),
                'created_at' => Carbon::today()->setTime(10, 0, 0),
                'updated_at' => Carbon::today()->setTime(11, 15, 0),
            ],
            [
                'user_id' => 8,
                'status' => 'ready',
                'service_type' => 'pickup',
                'contact_phone' => '04141010008',
                'payment_method' => 'tarjeta_credito',
                'order_date' => Carbon::today()->setTime(11, 30, 0),
                'ready_date' => Carbon::today()->setTime(12, 15, 0),
                'created_at' => Carbon::today()->setTime(11, 30, 0),
                'updated_at' => Carbon::today()->setTime(12, 15, 0),
            ],
            [
                'user_id' => 9,
                'status' => 'preparing',
                'service_type' => 'delivery',
                'contact_phone' => '04241010009',
                'payment_method' => 'efectivo_internacional',
                'order_date' => Carbon::today()->setTime(12, 0, 0),
                'preparing_date' => Carbon::today()->setTime(12, 10, 0),
                'created_at' => Carbon::today()->setTime(12, 0, 0),
                'updated_at' => Carbon::today()->setTime(12, 10, 0),
            ],
            [
                'user_id' => 10,
                'status' => 'pending',
                'service_type' => 'pickup',
                'contact_phone' => '04221010010',
                'payment_method' => 'tarjeta_credito',
                'order_date' => Carbon::today()->setTime(13, 0, 0),
                'pending_date' => Carbon::today()->setTime(13, 0, 0),
                'created_at' => Carbon::today()->setTime(13, 0, 0),
                'updated_at' => Carbon::today()->setTime(13, 0, 0),
            ],
        ];

        foreach ($orders as $order) {
            if (! empty($order['user_id'])) {
                $order['client_id'] = Client::query()
                    ->where('user_id', $order['user_id'])
                    ->value('id');
            }

            Order::create($order);
        }
    }
}
