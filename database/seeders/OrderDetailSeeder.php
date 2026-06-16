<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Database\Seeder;

class OrderDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orderDetails = [
            ['order_id' => 1, 'product_id' => 1, 'quantity' => 2, 'unit_price' => 12.99],
            ['order_id' => 1, 'product_id' => 5, 'quantity' => 1, 'unit_price' => 22.99, 'delivery_address' => 'Avenida 2 #456'],
            ['order_id' => 2, 'product_id' => 4, 'quantity' => 1, 'unit_price' => 16.99],
            ['order_id' => 2, 'product_id' => 10, 'quantity' => 1, 'unit_price' => 2.99],
            ['order_id' => 3, 'product_id' => 6, 'quantity' => 2, 'unit_price' => 18.99, 'delivery_address' => 'Calle 4 #321'],
            ['order_id' => 3, 'product_id' => 8, 'quantity' => 1, 'unit_price' => 8.99],
            ['order_id' => 4, 'product_id' => 7, 'quantity' => 1, 'unit_price' => 15.99],
            ['order_id' => 4, 'product_id' => 11, 'quantity' => 1, 'unit_price' => 4.99],
            ['order_id' => 5, 'product_id' => 2, 'quantity' => 3, 'unit_price' => 10.99, 'delivery_address' => 'Boulevard 6 #987'],
            ['order_id' => 5, 'product_id' => 12, 'quantity' => 2, 'unit_price' => 3.99],
            ['order_id' => 6, 'product_id' => 1, 'quantity' => 1, 'unit_price' => 12.99, 'delivery_address' => 'Avenida 2 #456'],
            ['order_id' => 6, 'product_id' => 3, 'quantity' => 2, 'unit_price' => 14.50],
            ['order_id' => 7, 'product_id' => 4, 'quantity' => 2, 'unit_price' => 16.99],
            ['order_id' => 7, 'product_id' => 9, 'quantity' => 1, 'unit_price' => 4.92],
            ['order_id' => 8, 'product_id' => 6, 'quantity' => 2, 'unit_price' => 18.99, 'delivery_address' => 'Avenida 5 #654'],
            ['order_id' => 8, 'product_id' => 5, 'quantity' => 1, 'unit_price' => 22.99],
            ['order_id' => 9, 'product_id' => 7, 'quantity' => 1, 'unit_price' => 15.99],
            ['order_id' => 9, 'product_id' => 10, 'quantity' => 2, 'unit_price' => 2.99],
            ['order_id' => 10, 'product_id' => 8, 'quantity' => 3, 'unit_price' => 8.99, 'delivery_address' => 'Calle 7 #159'],
            ['order_id' => 10, 'product_id' => 11, 'quantity' => 2, 'unit_price' => 4.99],
            ['order_id' => 11, 'product_id' => 2, 'quantity' => 2, 'unit_price' => 10.99, 'delivery_address' => 'Avenida 2 #456'],
            ['order_id' => 11, 'product_id' => 12, 'quantity' => 3, 'unit_price' => 3.99],
            ['order_id' => 12, 'product_id' => 3, 'quantity' => 1, 'unit_price' => 14.50],
            ['order_id' => 12, 'product_id' => 10, 'quantity' => 2, 'unit_price' => 2.99],
            ['order_id' => 13, 'product_id' => 6, 'quantity' => 2, 'unit_price' => 18.99, 'delivery_address' => 'Boulevard 9 #951'],
            ['order_id' => 13, 'product_id' => 1, 'quantity' => 1, 'unit_price' => 12.99],
            ['order_id' => 14, 'product_id' => 4, 'quantity' => 1, 'unit_price' => 16.99],
            ['order_id' => 14, 'product_id' => 11, 'quantity' => 2, 'unit_price' => 4.99],
        ];

        $deliveryAddresses = [];

        foreach ($orderDetails as $detail) {
            if (isset($detail['delivery_address'])) {
                $deliveryAddresses[$detail['order_id']] = $detail['delivery_address'];
            }

            unset($detail['delivery_address']);
            $detail['subtotal'] = round($detail['quantity'] * $detail['unit_price'], 2);

            OrderDetail::create($detail);
        }

        Order::query()->each(function (Order $order) use ($deliveryAddresses) {
            $subtotal = OrderDetail::query()->where('order_id', $order->id)->sum('subtotal');
            $taxes = 16;
            $total = Order::calculateTotal($subtotal, $taxes);

            $order->update([
                'subtotal' => $subtotal,
                'taxes' => $taxes,
                'total' => $total,
                'currency' => Order::CURRENCY_INTERNACIONAL,
                'delivery_address' => $order->service_type === Order::SERVICE_TYPE_DELIVERY
                    ? ($deliveryAddresses[$order->id] ?? 'Dirección de entrega pendiente')
                    : null,
            ]);
        });
    }
}
