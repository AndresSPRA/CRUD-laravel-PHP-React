import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  setEditingUser,
  clearEditingUser,
  deleteUser
} from './store/userSlice';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

const Main = () => {
  const dispatch = useDispatch();

  // Obtiene el estado de Redux
  const { list: users, loading, editing } = useSelector((state) => state.users);

  // Carga usuarios al iniciar
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Gestión de Usuarios</h1>

        {/* Formulario de creación/edición */}
        <UserForm user={editing} onClear={() => dispatch(clearEditingUser())} />

        {/* Lista de usuarios */}
        {loading ? (
          <p className="text-gray-500">Cargando usuarios...</p>
        ) : (
          <UserTable
            users={users}
            onEdit={(user) => dispatch(setEditingUser(user))}
            onDelete={(id) => dispatch(deleteUser(id))}
          />
        )}
      </div>
    </div>
  );
};

export default Main;
