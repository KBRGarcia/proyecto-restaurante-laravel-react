# 📚 Arquitectura de “Resources” (Refine SPA + Laravel API REST)

> **Objetivo:** que cualquier persona (tú en el futuro o un nuevo integrante) pueda entender el flujo completo CRUD **desde la UI hasta la base de datos** usando el patrón **Resource** de Refine y `Route::apiResource()` de Laravel.

## 🧠 Qué significa “Resource” en esta arquitectura

Un **Resource** es la unidad “CRUD” del sistema (por ejemplo `users`, `products`, `categories`). En esta app, el Resource existe en **dos capas**:

- **Frontend (Refine)**: el Resource define *rutas SPA* y qué componente renderiza cada vista (`list`, `create`, `edit`, `show`).
- **Backend (Laravel)**: el Resource define *endpoints REST* vía `Route::apiResource()`, que mapean a métodos del controlador (`index`, `store`, `show`, `update`, `destroy`) y terminan ejecutando consultas Eloquent contra la base de datos.

En otras palabras:

```text
Refine Resource (name="users")  ↔  Laravel apiResource('users')  ↔  tabla `users`
```

## 🗺️ Flujo real (de punta a punta) cuando visitas “Usuarios”

Ejemplo: el admin entra a la lista de usuarios.

```text
[1] Navegador → /users
    ↓
[2] SPA (React Router) renderiza UserList (resources/js/pages/users/list.tsx)
    ↓
[3] Refine useTable() → dataProvider.getList("users")
    ↓
[4] simple-rest → GET /api/users?_start=0&_end=10&_sort=id&_order=desc
    ↓   (Axios interceptor agrega Authorization: Bearer <token>)
[5] Laravel routes/api.php (auth:sanctum) → UserController@index
    ↓
[6] Eloquent (User::query()) → consulta tabla `users`
    ↓
[7] Respuesta JSON + header x-total-count (paginación)
    ↓
[8] Refine pinta la tabla (Ant Design Table) con tableProps
```

## 1) Frontend: dónde se registra el Resource (Refine)

Archivo: `resources/js/AppRouter.tsx`.

### 1.1. Registro del Resource en Refine

Refine “aprende” cómo navegar a un Resource desde el arreglo `resources=[...]`:

- `name`: nombre canónico del resource (y clave para el `dataProvider`).
- `list/create/edit/show`: rutas SPA de React Router para cargar cada página.

En este proyecto el Resource de usuarios está registrado como:

```ts
{
  name: "users",
  list: "/users",
  create: "/users/create",
  edit: "/users/edit/:id",
  show: "/users/show/:id",
}
```

### 1.2. Conexión con la API (Data Provider)

En `AppRouter.tsx` se configura:

- `API_URL = "/api"`
- `dataProvider={dataProvider(API_URL, axiosInstance)}`

Eso significa: **para el resource `users`, Refine llama a `/api/users`**.

### 1.3. Autenticación SPA (Bearer Token con Sanctum)

La SPA hace login contra el backend y guarda un token en `localStorage` como `auth_token`.

Luego, un interceptor de Axios agrega:

```text
Authorization: Bearer <auth_token>
```

Esto es lo que permite pasar el middleware `auth:sanctum` en Laravel (modo tokens personales).

Documento relacionado: `documentations/AppRouter-doc.md`.

## 2) Backend: dónde se registra el Resource (Laravel)

Archivo: `routes/api.php`.

El “Resource” de Laravel se define con `Route::apiResource()`, dentro del grupo protegido por Sanctum:

- `/api/users` → `UserController@index` (GET)
- `/api/users` → `UserController@store` (POST)
- `/api/users/{user}` → `UserController@show` (GET)
- `/api/users/{user}` → `UserController@update` (PUT/PATCH)
- `/api/users/{user}` → `UserController@destroy` (DELETE)

La autenticación API está montada así:

- Públicas: `POST /api/login`, `POST /api/register`
- Protegidas: todo el grupo `Route::middleware('auth:sanctum')`

## 3) Contrato “simple-rest” ↔ Laravel (query params + paginación)

Refine usa `@refinedev/simple-rest`. Eso implica convenciones típicas en el request:

- **Paginación**: `_start` y `_end`
  - ejemplo: `_start=0&_end=10` → “dame 10 desde el offset 0”
- **Ordenamiento**: `_sort` y `_order`
  - ejemplo: `_sort=id&_order=desc`
- **Búsqueda**: usualmente `q=...` (y en este backend también soportamos `search=...`)

### 3.1. Requisito crítico: `x-total-count`

Para que Refine calcule paginación, el backend debe devolver el total en el header:

```text
x-total-count: <total_registros>
```

En este proyecto, `UserController@index` lo envía junto con el JSON.

## 4) Conexión con la base de datos (Eloquent + migración)

### 4.1. Estructura de tabla `users`

Archivo: `database/migrations/0001_01_01_000000_create_users_table.php`.

Campos clave usados por las pantallas CRUD:

- Identidad: `id`
- Datos: `name`, `last_name`, `email`, `phone_number`, `address`
- Seguridad: `password` (hash)
- Perfil: `profile_picture` (base64)
- Control: `role` (`admin|employee|client`), `status` (`active|inactive`)
- Tiempos: `registration_date`, `last_connection`, `created_at`, `updated_at`

### 4.2. Modelo `App\Models\User`

Archivo: `app/Models/User.php`.

Puntos importantes:

- `protected $fillable = [...]`: define qué campos se pueden asignar masivamente (usado por `User::create()` / `$user->update()`).
- `casts()` convierte fechas a `datetime`.
- `rules()` y `messages()` son la fuente de validación reutilizable por el controlador.

## 5) Cómo “se arma” un CRUD nuevo con este patrón (checklist real)

Para crear un módulo nuevo (un nuevo Resource):

1. **Migración + Modelo**: define tabla y `fillable/casts` (Eloquent).
2. **Controlador API**: implementa `index/store/show/update/destroy` retornando JSON.
3. **Ruta API**: `Route::apiResource('<resource>', <Controller>::class)` en `routes/api.php` (dentro de `auth:sanctum` si aplica).
4. **Resource en Refine**: agrega `{ name, list/create/edit/show }` en `resources/js/AppRouter.tsx`.
5. **Páginas SPA**: crea `resources/js/pages/<resource>/{list,create,edit,show}.tsx`.

## 6) Lecturas recomendadas (oficiales)

- Refine “Resources”: `https://refine.dev/docs/core/refine-component/#resources`
- Refine “simple-rest data provider”: `https://refine.dev/docs/data/packages/simple-rest/`
- Laravel `Route::apiResource`: `https://laravel.com/docs/routing#api-resource-routes`
- Laravel Validation: `https://laravel.com/docs/validation`
- Laravel Sanctum (API tokens): `https://laravel.com/docs/sanctum`
