<?php

use Illuminate\Support\Facades\Route;

// Cualquier ruta es capturada por React Router y Refine.
// El middleware web simplemente levanta la sesión (si fuera necesaria) y carga la vista Blade vacía.
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
