<?php

use App\Enums\PaymentCurrency;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Enums\UserRole;
use App\Models\Order;
use App\Models\OrderPayment;
use App\Models\User;
use App\Services\OrderPaymentBalanceService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('rejects payment amount that exceeds order remaining balance', function () {
    $admin = User::factory()->create([
        'role' => UserRole::Admin->value,
        'status' => 'active',
    ]);

    $order = Order::create([
        'user_id' => $admin->id,
        'status' => Order::STATUS_PENDING,
        'service_type' => Order::SERVICE_TYPE_PICKUP,
        'subtotal' => 100,
        'taxes' => 0,
        'total' => 100,
        'currency' => PaymentCurrency::International->value,
        'order_date' => now(),
    ]);

    OrderPayment::create([
        'order_id' => $order->id,
        'method' => PaymentMethod::InternationalCash->value,
        'status' => PaymentStatus::Confirmed->value,
        'currency' => PaymentCurrency::International->value,
        'amount' => 60,
    ]);

    Sanctum::actingAs($admin);

    $response = $this->postJson('/api/order-payments', [
        'order_id' => $order->id,
        'method' => PaymentMethod::InternationalCash->value,
        'status' => PaymentStatus::Pending->value,
        'currency' => PaymentCurrency::International->value,
        'amount' => 50,
    ]);

    $response->assertStatus(422)->assertJsonValidationErrors(['amount']);
});

it('allows payment within remaining balance', function () {
    $admin = User::factory()->create([
        'role' => UserRole::Admin->value,
        'status' => 'active',
    ]);

    $order = Order::create([
        'user_id' => $admin->id,
        'status' => Order::STATUS_PENDING,
        'service_type' => Order::SERVICE_TYPE_PICKUP,
        'subtotal' => 100,
        'taxes' => 0,
        'total' => 100,
        'currency' => PaymentCurrency::International->value,
        'order_date' => now(),
    ]);

    Sanctum::actingAs($admin);

    $response = $this->postJson('/api/order-payments', [
        'order_id' => $order->id,
        'method' => PaymentMethod::InternationalCash->value,
        'status' => PaymentStatus::Pending->value,
        'currency' => PaymentCurrency::International->value,
        'amount' => 100,
    ]);

    $response->assertCreated();
    expect((float) app(OrderPaymentBalanceService::class)->remainingBalance($order->fresh()))->toBe(0.0);
});

it('forbids client role from admin api resources', function () {
    $client = User::factory()->create([
        'role' => UserRole::Client->value,
        'status' => 'active',
    ]);

    Sanctum::actingAs($client);

    $this->getJson('/api/products')->assertForbidden();
});

it('allows employee to list products but not create users', function () {
    $employee = User::factory()->create([
        'role' => UserRole::Employee->value,
        'status' => 'active',
    ]);

    Sanctum::actingAs($employee);

    $this->getJson('/api/products')->assertOk();
    $this->postJson('/api/users', [
        'name' => 'Test',
        'last_name' => 'User',
        'email' => 'new-user@example.com',
        'password' => 'password123',
        'role' => 'employee',
        'status' => 'active',
    ])->assertForbidden();
});

it('can create product branch assignment', function () {
    $admin = User::factory()->create([
        'role' => UserRole::Admin->value,
        'status' => 'active',
    ]);

    $categoryId = \App\Models\Category::create([
        'name' => 'Bebidas',
        'status' => 'active',
        'order_show' => 1,
    ])->id;

    $productId = \App\Models\Product::create([
        'name' => 'Jugo',
        'price' => 5.5,
        'category_id' => $categoryId,
        'status' => 'active',
        'preparation_time' => 5,
    ])->id;

    $branchId = \App\Models\Branch::create([
        'name' => 'Centro',
        'address' => 'Calle 1',
        'city' => 'Caracas',
        'state' => 'DC',
        'phone' => '04141234567',
        'active' => true,
    ])->id;

    Sanctum::actingAs($admin);

    $response = $this->postJson('/api/product-branches', [
        'product_id' => $productId,
        'branch_id' => $branchId,
        'available' => true,
        'special_price' => 4.5,
    ]);

    $response->assertCreated()
        ->assertJsonPath('product_id', $productId)
        ->assertJsonPath('branch_id', $branchId);
});
