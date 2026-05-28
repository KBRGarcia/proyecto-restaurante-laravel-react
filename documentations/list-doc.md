# Documentación: `resources/js/pages/users/list.tsx` (Listado / Index)

## ¿Qué es este archivo?

Este archivo define la pantalla **principal del CRUD de Usuarios**: el **listado paginado** que el administrador ve al hacer clic en “Usuarios” en el menú lateral.

Relacionado con:

- Registro del resource: `resources/js/AppRouter.tsx` (resource `users`)
- Endpoints API: `routes/api.php` → `Route::apiResource('users', UserController::class)`
- Controlador: `app/Http/Controllers/UserController.php` (`index()`)

## Flujo completo (UI → API → BD)

Cuando abres `/users`, el flujo real es:

1. React Router renderiza `UserList`.
2. `useTable()` ejecuta `dataProvider.getList("users")`.
3. `@refinedev/simple-rest` hace un `GET` a:
   - `GET /api/users?_start=0&_end=10&_sort=<campo>&_order=<asc|desc>`
4. Axios agrega `Authorization: Bearer <token>` (configurado en `resources/js/AppRouter.tsx`).
5. Laravel resuelve:
   - `GET /api/users` → `UserController@index`
6. `UserController@index` arma un query Eloquent (`User::query()`), aplica filtros/orden, pagina por `offset/limit`, consulta la tabla `users` y devuelve:
   - **Body**: JSON (array de usuarios)
   - **Header**: `x-total-count` (total de filas) para que Refine pagine

## Piezas clave en el archivo

### 1) `useTable` (Refine)

- **Qué hace**: maneja listado paginado/ordenado y te entrega `tableProps` listo para Ant Design.
- **Por qué funciona “sin escribir fetch”**: Refine conoce el resource por la ruta actual (`/users`) y el `name: "users"` registrado en `AppRouter.tsx`.
- **`syncWithLocation: true`**: sincroniza estado de tabla con la URL (útil para compartir links y para “volver” a la misma página/filtros).

### 2) `<List>` (Refine Antd)

Es el contenedor de página (título, card, acciones). En este proyecto se usa `headerButtons` para colocar el botón principal:

- **Crear Usuario**: `<CustomCreateButton />` (componente compartido de botones)

### 3) `<Table {...tableProps}>` (Ant Design)

- **`rowKey="id"`**: obligatorio para una tabla estable (React necesita clave única).
- **`Table.Column`**:
  - `dataIndex`: debe coincidir con el campo que llega del backend (`email`, `role`, etc).
  - `render`: se usa para formatear/combinar valores (ej: nombre completo, tags, avatar).

### 4) Columna “Acciones”

Cada fila incluye 3 acciones estándar del CRUD:

- **Ver (Show)**: navega a `/users/show/:id`
- **Editar (Edit)**: navega a `/users/edit/:id`
- **Eliminar (Delete)**: dispara `DELETE /api/users/:id`

Los botones están centralizados en `@/components/buttons/CustomActionButtons` para mantener consistencia visual.

## Contrato de datos (lo que la tabla espera del backend)

### Campos que se usan en esta tabla

El listado renderiza (entre otros):

- `profile_picture` (para el avatar)
- `name` + `last_name` (nombre completo)
- `email`
- `role` (`admin|employee|client`)
- `status` (`active|inactive`)
- `created_at` (fecha de creación)

### Paginación

Para que Refine muestre paginación correcta, el backend debe incluir:

- Header **`x-total-count`**

Esto está implementado en `UserController@index`.

## Notas importantes (para mantenimiento)

- **Búsqueda / filtros**: el backend soporta `q`/`search`, y filtros por `role` y `status` (ver `UserController@index`). Si en el futuro agregas filtros UI, deben mapear a esos query params o adaptar el controlador.
- **Ordenamiento**: Refine manda `_sort` y `_order`; el controlador también soporta `sort_by/sort_order` (compatibilidad).
