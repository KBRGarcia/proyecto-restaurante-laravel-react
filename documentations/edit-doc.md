# Documentación: `resources/js/pages/users/edit.tsx` (Editar / Edit)

## ¿Qué es este archivo?

Este archivo define la vista y el formulario para **editar** un usuario existente. Se accede:

- desde el listado (`/users`) con el botón del lápiz
- desde la vista de detalles (`/users/show/:id`) con el botón “Editar”

Relacionado con:

- Ruta SPA: `/users/edit/:id` (definida en `resources/js/AppRouter.tsx`)
- Endpoints API: `GET /api/users/:id` y `PUT/PATCH /api/users/:id`
- Controlador: `app/Http/Controllers/UserController.php` (`show()`, `update()`)

## Flujo completo (UI → API → BD)

### Al abrir la pantalla (carga de datos)

1. React Router renderiza `UserEdit` con un `:id` en la URL.
2. `useForm()` detecta modo **Edit** por la ruta y dispara:
   - `dataProvider.getOne("users", { id })` → `GET /api/users/:id`
3. Laravel resuelve `UserController@show(User $user)` y retorna JSON del usuario.
4. Refine rellena automáticamente el `<Form>` con esos datos (por los `name` de cada `Form.Item`).

### Al guardar cambios (update)

1. Refine recolecta el payload del form.
2. Dispara:
   - `dataProvider.update("users", { id, data })` → `PUT/PATCH /api/users/:id`
3. Laravel ejecuta `UserController@update(Request $request, User $user)`:
   - valida (`User::rules(true)` + regla de email único ignorando el usuario actual)
   - si viene `password`, la hashea; si viene vacía, la elimina del payload
   - actualiza: `$user->update($validated)` → UPDATE en tabla `users`
4. Respuesta: **200** con JSON del usuario actualizado.

## Piezas clave en el archivo

### 1) `useForm()` (Refine Antd)

Retorna:

- **`formProps`**: props que conectan Ant Design Form con Refine (valores iniciales, submit, errores 422).
- **`saveButtonProps`**: conecta el botón “Guardar” del layout con el submit real.
- **`query`**: la consulta que trae el registro actual (resultado del `GET /api/users/:id`).

En este archivo se usa `query` para obtener el usuario y resolver la foto:

- `const user = query?.data?.data`
- `const resolvedImageUrl = imageUrl ?? user?.profile_picture ?? null`

### 2) `<Edit saveButtonProps={...}>`

`<Edit>` es el layout de página para edición. El botón “Guardar” se vuelve `loading` automáticamente mientras se envía el request.

### 3) Contraseña opcional (backend)

En UI el campo dice “Contraseña (Opcional)” y no tiene reglas frontend.

En backend, `UserController@update` implementa el comportamiento esperado:

- si `password` viene con contenido → se hashea y se guarda
- si `password` viene vacío → se elimina del payload para no sobrescribir

### Nota crítica (password confirmation)

El modelo (`User::rules(true)`) incluye `confirmed`, lo que implica que si el usuario intenta cambiar contraseña, el request debería incluir `password_confirmation`.

La UI actual no incluye “Confirmar contraseña”, así que:

- si la regla `confirmed` está activa, un update con contraseña puede fallar con 422
- para coherencia, habría que agregar el campo `password_confirmation` o ajustar reglas del backend

## Contrato del endpoint `PUT/PATCH /api/users/:id`

Campos comunes que se envían:

- `name`, `last_name`, `email` (required)
- `phone_number`, `address` (opcionales)
- `role`, `status` (required)
- `password` (opcional)
- `profile_picture` (opcional)

Validación y reglas especiales:

- `email` debe ser único excepto el registro actual (`Rule::unique('users')->ignore($user->id)`).
