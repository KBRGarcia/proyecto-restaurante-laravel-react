<?php

namespace Database\Seeders;

use App\Enums\PaymentStatus;
use App\Models\Order;
use App\Models\OrderPayment;
use Illuminate\Database\Seeder;

class OrderPaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Order::query()->each(function (Order $order): void {
            OrderPayment::updateOrCreate(
                [
                    'order_id' => $order->id,
                    'reference_number' => 'seed-' . $order->id,
                ],
                [
                    'method' => $order->payment_method ?? 'efectivo',
                    'status' => $order->status === Order::STATUS_CANCELED
                        ? PaymentStatus::Rejected->value
                        : PaymentStatus::Confirmed->value,
                    'currency' => $order->currency,
                    'amount' => $order->total,
                    'paid_at' => $order->order_date,
                    'confirmed_at' => $order->delivered_date ?? $order->updated_at,
                ]
            );
        });
    }
}
