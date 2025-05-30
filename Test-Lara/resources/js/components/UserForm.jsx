import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createUser, updateUser } from '../store/userSlice';

const UserForm = ({ user, onClear }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const prevUserId = useRef(null);

  useEffect(() => {
    // Solo cambia el form si es un nuevo user para editar
    if (user && user.id !== prevUserId.current) {
      setForm({ ...user, password: '' });
      prevUserId.current = user.id;
    } else if (!user && prevUserId.current !== null) {
      setForm({ name: '', email: '', password: '' });
      prevUserId.current = null;
    }
    setErrors({});
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      if (user && user.id) {
        await dispatch(updateUser(form)).unwrap();
      } else {
        await dispatch(createUser(form)).unwrap();
      }
      onClear();
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      if (err.response && err.response.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert('Error inesperado');
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          className="w-full p-2 border rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name[0]}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Correo</label>
        <input
          type="email"
          className="w-full p-2 border rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email[0]}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Contraseña</label>
        <input
          type="password"
          className="w-full p-2 border rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required={!user}
          minLength={8}
        />
        {errors.password && <p className="text-sm text-red-600">{errors.password[0]}</p>}
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          {user ? 'Actualizar' : 'Crear'}
        </button>
        {user && (
          <button type="button" onClick={onClear} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
