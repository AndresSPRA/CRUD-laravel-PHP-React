# CRUD de Usuarios - Laravel + React + Redux

Este proyecto es una SPA (Single Page Application) que implementa un CRUD completo de usuarios utilizando:

- Backend en **Laravel 12**
- Base de datos **PostgreSQL**
- Frontend en **React + Redux + Vite**
- Estilos con **Tailwind CSS**
- Consumo de API RESTful mediante **Axios**

---

## 🔧 Requisitos

- PHP >= 8.2
- Node.js >= 18
- Composer
- PostgreSQL
- Git

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd Test-Lara
```

### 2. Configurar el backend (Laravel)

```bash
cp .env.example .env
php artisan key:generate
```

Edita tu archivo `.env` y configura la conexión a PostgreSQL:

```dotenv
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=crud_users
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
```

Luego ejecuta:

```bash
composer install
php artisan migrate
```

### 3. Configurar el frontend (React)

```bash
npm install
```

---

## 🖥️ Ejecutar el proyecto

Puedes correr ambos entornos (backend y frontend) con:

```bash
npm run dev
```

Esto iniciará:

- Servidor Laravel en: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- Frontend Vite en: [http://127.0.0.1:5173](http://127.0.0.1:5173)

---

## 🧩 Estructura del proyecto

```
resources/
├── js/
│   ├── app.jsx               # Punto de entrada del SPA
│   ├── Main.jsx              # Página principal con UserForm y UserTable
│   ├── components/
│   │   ├── UserForm.jsx      # Formulario de creación y edición
│   │   └── UserTable.jsx     # Tabla de usuarios
│   └── store/
│       └── userSlice.js      # Redux slice para manejar estado de usuarios
```

---

## 🔐 Autenticación

> 🔧 *Aún no implementada, pero se recomienda Laravel Sanctum para proteger las rutas de API.*

---

## ✅ Funcionalidades

- Crear, editar, eliminar y listar usuarios
- Validaciones con mensajes de error
- Actualización automática de la lista
- Estilos modernos con Tailwind CSS
- Gestión de estado con Redux Toolkit

---

## ✅ Comandos útiles

```bash
# Ejecutar tests backend
php artisan test

# Formatear código Laravel
./vendor/bin/pint

# Formatear frontend
npx prettier --write resources/js
```

---

## 🧪 Pendientes sugeridos

- Implementar autenticación con Sanctum
- Agregar React Router
- Pruebas unitarias con Jest (frontend)
- Documentar en Swagger o Postman