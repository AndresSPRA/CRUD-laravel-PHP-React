<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;



class DatosController extends Controller
{

    // Metodo para obtener lo usuarios
    public function getUsers($id = null) {
        if ($id) {
            
            $usuario = User::findOrFail($id);
            

            return response()->json([
            'success' => true,
            'message' => 'Usuario encontrado correctamente',
            'data' => [
                'nombre' => $usuario->name,
                'correo' => $usuario->email
            ]
        ], 200);
        }else {

            $users = User::all();

            return response()->json([
            'success' => true,
            'message' => 'Usuarios obtenidos correctamente',
            'data' => $users

        ], 200);
        }
    }

    //Metodo para crear usuarios
    public function createUser (Request $request) {

        // Se validan los datos
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8'
        ]);

        try {

            // Se crea un nuevo usuario
            $usuario = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password'))
            ]);

            // Se guarda el usuario
            $usuario->save();

            return response()->json([
                'success' => true,
                'message' => 'Usuario creado correctamente',
                    'data' => $usuario
            ], 201);

            
        } catch (QueryException $queryException) {
            
            Log::error('Error al crear usuario: '.$queryException->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Error al crear el usuario'
            ], 500);
        }

    }

    //Metodo para editar usuarios
   public function editUser(Request $request, $id){

        try {
            // Buscar el usuario por ID desde la URL
            $usuario = User::findOrFail($id);

            // Actualizar campos si vienen en la request
            if ($request->has('name')) {
                $usuario->name = $request->input('name');
            }

            if ($request->has('email')) {
                $usuario->email = $request->input('email');
            }

            $usuario->save();

            return response()->json([
                'success' => true,
                'message' => 'Usuario editado correctamente',
                'data' => $usuario
            ], 200);

        } catch (QueryException $queryException) {
            Log::error('Error al editar usuario: '.$queryException->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Error al editar el usuario'
            ], 500);
    }
}


    //Metodo para elimnar usuarios
    public function deleteUser ($id) {
        try {
            
            $usuario = User::findOrFail($id);
            $usuario->delete();

            return response()->json([
                'success' => true,
                'message' => 'Usuario eliminado correctamente'
            ], 200);


        } catch (QueryException $queryException) {

            Log::error('Error al crear usuario: '.$queryException->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar el usuario'
            ], 500);
        }
    }
    
}
