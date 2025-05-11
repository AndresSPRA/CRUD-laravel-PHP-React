<?php

use App\Http\Controllers\Api\DatosController;
use Illuminate\Support\Facades\Route;

//Aqui van los endpoints de la api (SIN CORS)

Route::get('/users/{id?}',[DatosController::class, 'getUsers']);
Route::post('/users/create', [DatosController::class, 'createUser']);
Route::patch('/users/edit/{id}', [DatosController::class, 'editUser']);
Route::delete('/users/delete/{id}', [DatosController::class, 'deleteUser']);
