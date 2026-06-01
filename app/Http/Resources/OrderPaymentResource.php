<?php

namespace App\Http\Resources;

use App\Enums\Banks;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderPaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'order_number' => $this->order_id,
            'order' => $this->whenLoaded('order', function () {
                return [
                    'id' => $this->order->id,
                    'user_name' => $this->order->user?->name . ' ' . $this->order->user?->last_name,
                    'status' => $this->order->status,
                    'total' => $this->order->total,
                    'currency' => $this->order->currency,
                    'order_date' => $this->order->order_date,
                ];
            }),
            'method' => $this->method?->value,
            'method_label' => $this->method?->label(),
            'status' => $this->status?->value,
            'status_label' => $this->status?->label(),
            'currency' => $this->currency?->value,
            'currency_label' => $this->currency?->label(),
            'currency_symbol' => $this->currency?->symbol(),
            'amount' => $this->amount,
            'exchange_rate' => $this->exchange_rate,
            'source_bank_code' => $this->source_bank_code,
            'source_bank_name' => $this->bankName($this->source_bank_code),
            'destination_bank_code' => $this->destination_bank_code,
            'destination_bank_name' => $this->bankName($this->destination_bank_code),
            'reference_number' => $this->reference_number,
            'payer_identification' => $this->payer_identification,
            'payer_phone' => $this->payer_phone,
            'payer_email' => $this->payer_email,
            'account_identifier' => $this->account_identifier,
            'account_holder_name' => $this->account_holder_name,
            'transaction_id' => $this->transaction_id,
            'card_last_four' => $this->card_last_four,
            'card_network' => $this->card_network,
            'proof_image_path' => $this->proof_image_path,
            'payment_details' => $this->payment_details,
            'paid_at' => $this->paid_at,
            'paid_at_formatted' => $this->paid_at?->format('d/m/Y H:i'),
            'confirmed_at' => $this->confirmed_at,
            'confirmed_at_formatted' => $this->confirmed_at?->format('d/m/Y H:i'),
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    private function bankName(?string $code): ?string
    {
        return $code ? Banks::tryFrom($code)?->label() : null;
    }
}
