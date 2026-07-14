<?php

namespace Database\Seeders;

use App\Enums\PaymentMethod;
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
        $methods = [
            PaymentMethod::InternationalCash->value,
            PaymentMethod::CreditCard->value,
            PaymentMethod::NationalCash->value,
            PaymentMethod::BankTransfer->value,
        ];

        Order::query()->each(function (Order $order, int $index) use ($methods): void {
            $method = $methods[$index % count($methods)];

            // Alinear moneda con el método (nacional vs internacional)
            $currency = in_array($method, [
                PaymentMethod::BankTransfer->value,
                PaymentMethod::MobilePayment->value,
                PaymentMethod::NationalCash->value,
                PaymentMethod::NationalCard->value,
            ], true)
                ? Order::CURRENCY_NACIONAL
                : Order::CURRENCY_INTERNACIONAL;

            OrderPayment::updateOrCreate(
                [
                    'order_id' => $order->id,
                    'reference_number' => 'seed-' . $order->id,
                ],
                [
                    'method' => $method,
                    'status' => $order->status === Order::STATUS_CANCELED
                        ? PaymentStatus::Rejected->value
                        : PaymentStatus::Confirmed->value,
                    'currency' => $currency,
                    'amount' => max((float) $order->total, 0.01),
                    'paid_at' => $order->order_date,
                    'confirmed_at' => $order->delivered_date ?? $order->updated_at,
                ]
            );
        });
    }
}
