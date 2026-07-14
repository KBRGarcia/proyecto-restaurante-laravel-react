<?php

namespace App\Services;

use App\Enums\PaymentStatus;
use App\Models\Order;
use App\Models\OrderPayment;
use Illuminate\Validation\ValidationException;

class OrderPaymentBalanceService
{
    /**
     * Estados que consumen saldo pendiente de la orden.
     *
     * @return list<string>
     */
    public function countableStatuses(): array
    {
        return [
            PaymentStatus::Pending->value,
            PaymentStatus::Confirmed->value,
        ];
    }

    public function paidAmount(Order $order, ?int $excludePaymentId = null): float
    {
        $query = $order->orderPayments()
            ->whereIn('status', $this->countableStatuses());

        if ($excludePaymentId !== null) {
            $query->where('id', '!=', $excludePaymentId);
        }

        return round((float) $query->sum('amount'), 2);
    }

    public function remainingBalance(Order $order, ?int $excludePaymentId = null): float
    {
        return round(max(0, (float) $order->total - $this->paidAmount($order, $excludePaymentId)), 2);
    }

    /**
     * @throws ValidationException
     */
    public function assertAmountFits(Order $order, float $amount, ?int $excludePaymentId = null): void
    {
        $orderTotal = round((float) $order->total, 2);

        if ($orderTotal <= 0) {
            throw ValidationException::withMessages([
                'order_id' => 'La orden no tiene un total válido. Agregue detalles antes de registrar pagos.',
            ]);
        }

        $remaining = $this->remainingBalance($order, $excludePaymentId);

        if (round($amount, 2) > $remaining) {
            throw ValidationException::withMessages([
                'amount' => sprintf(
                    'El monto (%.2f) excede el saldo pendiente de la orden (%.2f). Total de la orden: %.2f.',
                    $amount,
                    $remaining,
                    $orderTotal
                ),
            ]);
        }
    }

    public function assertPaymentFits(OrderPayment $payment, float $amount): void
    {
        $order = $payment->order ?? Order::query()->findOrFail($payment->order_id);
        $this->assertAmountFits($order, $amount, $payment->id);
    }
}
