<?php

use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\OrderPaymentController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rutas públicas de autenticación
Route::post('/login', [ApiAuthController::class, 'login']);
Route::post('/register', [ApiAuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [ApiAuthController::class, 'logout']);
    Route::get('/me', [ApiAuthController::class, 'me']);

    // Rutas de recursos CRUD (Para que Refine las consuma vía JSON)
    Route::apiResource('users', UserController::class);
    Route::apiResource('branches', BranchController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('employees', EmployeeController::class);
    Route::apiResource('evaluations', EvaluationController::class);
    Route::apiResource('order-details', OrderDetailController::class);
    Route::apiResource('orders', OrderController::class);
    Route::apiResource('order-payments', OrderPaymentController::class);
    Route::apiResource('payment-methods', PaymentMethodController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('banks', BankController::class);
});
