<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductBranchResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'branch_id' => $this->branch_id,
            'available' => (bool) $this->available,
            'special_price' => $this->special_price,
            'effective_price' => $this->getEffectivePrice(),
            'assignment_date' => $this->assignment_date,
            'product' => $this->whenLoaded('product', function () {
                return [
                    'id' => $this->product->id,
                    'name' => $this->product->name,
                    'price' => $this->product->price,
                    'status' => $this->product->status,
                ];
            }),
            'product_name' => $this->product?->name,
            'product_price' => $this->product?->price,
            'branch' => $this->whenLoaded('branch', function () {
                return [
                    'id' => $this->branch->id,
                    'name' => $this->branch->name,
                    'city' => $this->branch->city,
                    'active' => $this->branch->active,
                ];
            }),
            'branch_name' => $this->branch?->name,
            'branch_city' => $this->branch?->city,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
