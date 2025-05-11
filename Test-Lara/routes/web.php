<?php

use App\Http\Controllers\Api\DatosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Aqui van las rutas que usan VISTAS

Route::get('/', function () {
    return view('welcome');
});

Route::get('/Test/{info}', function ($info) {
    return "Esto es un test y esta es la info {$info}";
});


