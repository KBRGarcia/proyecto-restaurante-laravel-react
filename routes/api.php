<?php

use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\PhysicalPaymentOrdersController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\VenezuelaBankController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rutas públicas de autenticación
Route::post('/login', [ApiAuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [ApiAuthController::class, 'logout']);
    Route::get('/me', [ApiAuthController::class, 'me']);

    // Rutas de recursos CRUD (Para que Refine las consuma vía JSON)
    Route::apiResource('users', UserController::class);
    Route::apiResource('branches', BranchController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('evaluations', EvaluationController::class);
    Route::apiResource('order-details', OrderDetailController::class);
    Route::apiResource('orders', OrderController::class);
    Route::apiResource('payment-methods', PaymentMethodController::class);
    Route::apiResource('physical-payment-orders', PhysicalPaymentOrdersController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('venezuela-banks', VenezuelaBankController::class);
});
