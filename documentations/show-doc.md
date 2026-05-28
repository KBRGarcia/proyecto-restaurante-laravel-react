# Documentación: `resources/js/pages/users/show.tsx` (Detalles / Show)

## ¿Qué es este archivo?

Este archivo define la vista de **Detalles** de un usuario: la pantalla a la que se llega desde el listado (`/users`) haciendo clic en el botón “Ver” (ojo).

Relacionado con:

- Ruta SPA: `/users/show/:id` (en `resources/js/AppRouter.tsx`)
- Endpoint API: `GET /api/users/:id`
- Controlador: `app/Http/Controllers/UserController.php` (`show()`)

## Flujo completo (UI → API → BD)

Al abrir la vista:

1. React Router renderiza `UserShow` con un `:id` en la URL.
2. `useShow()` dispara:
   - `dataProvider.getOne("users", { id })` → `GET /api/users/:id`
3. Laravel resuelve `UserController@show(User $user)` y retorna JSON del usuario.
4. Refine actualiza el estado de `query` y la UI renderiza el `record`.

## Piezas clave en el archivo

### 1) `useShow()` (Refine)

`useShow()`:

- extrae `id` desde la URL
- gestiona loading/error
- expone `query` para leer `data` e `isLoading`

En este archivo:

- `const { data, isLoading } = query;`
- `const record = data?.data;`

### 2) `<Show isLoading={isLoading}>`

`<Show>` es el layout de página de detalles. Mientras `isLoading` sea `true`, muestra loading.

### 3) Render de datos (Ant Design + Refine Fields)

La UI muestra (entre otros):

- Foto: `Avatar src={record?.profile_picture}`
- Nombre: `{record?.name} {record?.last_name}`
- Email: `record?.email`
- Rol y estado: tags (`admin|employee|client`, `active|inactive`)
- Información de contacto: `phone_number`, `address`
- Fechas: `registration_date`, `last_connection` (con `<DateField>`)

## Contrato del endpoint `GET /api/users/:id`

- **Response**: JSON del usuario (tal como Eloquent lo serializa)
- **Campos sensibles**: el modelo oculta `password` (por `$hidden` en `app/Models/User.php`)

## Acciones disponibles desde esta vista

Por convención de Refine:

- **Editar**: navegación a `/users/edit/:id`
- **Eliminar**: `DELETE /api/users/:id`

En este proyecto, los botones “Editar/Eliminar” pueden aparecer en el header del layout dependiendo de cómo esté configurado el layout y permisos.
