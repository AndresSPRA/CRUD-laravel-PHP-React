<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/Test/{info}', function ($info) {
    return "Esto es un test y esta es la info {$info}";
});
