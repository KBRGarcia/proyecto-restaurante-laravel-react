# Documentación: `resources/js/pages/users/create.tsx` (Crear / Create)

## ¿Qué es este archivo?

Este archivo define la vista y el formulario para **crear** un nuevo usuario. Es la pantalla que aparece al hacer clic en el botón principal **“Crear Usuario”** desde el listado.

Relacionado con:

- Rutas SPA: `resources/js/AppRouter.tsx` (`/users/create`)
- Endpoint API: `POST /api/users`
- Controlador: `app/Http/Controllers/UserController.php` (`store()`)
- Modelo/validación: `app/Models/User.php` (`rules()`, `messages()`)
- Tabla: migración `database/migrations/0001_01_01_000000_create_users_table.php`

## Flujo completo (UI → API → BD)

Al presionar “Guardar”:

1. Refine (`useForm`) recolecta valores del `<Form>`.
2. Dispara `dataProvider.create("users", { data })`.
3. `simple-rest` ejecuta:
   - `POST /api/users`
4. Axios agrega `Authorization: Bearer <token>` (interceptor en `AppRouter.tsx`).
5. Laravel resuelve:
   - `UserController@store(Request $request)`
6. `store()` valida con `User::rules()` y `User::messages()`, hace `Hash::make()` de la contraseña, y ejecuta:
   - `User::create($validated)` → INSERT en tabla `users`
7. Respuesta:
   - **201** con JSON del usuario creado

## Piezas clave en el archivo

### 1) `useForm()` (Refine Antd)

- **Qué hace**: conecta Ant Design Form con Refine y con el `dataProvider`.
- **Modo Create**: como estás en `/users/create`, Refine NO intenta cargar un registro previo y prepara un submit que hará `POST`.
- **Errores del backend**: cuando Laravel responde **422** (validación), Refine/Antd muestran los errores en los campos.

### 2) `<Create saveButtonProps={...}>`

`<Create>` es el layout de página para “crear”. Contiene el botón “Guardar” y lo conecta con el submit real mediante `saveButtonProps`.

### 3) Formulario y mapeo de campos → JSON

Cada `Form.Item` define:

- **`name`**: clave del payload JSON enviado a Laravel
- **`rules`**: validación frontend (rápida/UX). **La fuente de verdad es Laravel**.

En este formulario se envían, entre otros:

- `name`, `last_name`, `email`
- `phone_number`, `address`
- `password`
- `role` (default: `client`)
- `status` (default: `active`)
- `profile_picture` (ver sección siguiente)

## Foto de perfil (`profile_picture`): cómo se envía

La vista implementa un flujo típico de “subir foto” pero **sin subir archivo**:

- El `Upload` usa `beforeUpload`.
- Se convierte el archivo a **Base64 Data URL** con `FileReader.readAsDataURL`.
- Se guarda en estado local `imageUrl` para previsualizar.
- Se setea el valor del form:
  - `formProps.form?.setFieldsValue({ profile_picture: base64Url })`

Eso hace que el payload enviado sea un string como:

```text
data:image/png;base64,iVBORw0KGgoAAA...
```

En backend, `UserController@store` tiene lógica para aceptar:

- un archivo real (`hasFile('profile_picture')`) y convertirlo a base64
- o una cadena base64 si `profile_picture` empieza con `data:image`

### Nota crítica de mantenimiento (validación)

Actualmente el modelo valida `profile_picture` como **`image`** (archivo). Si el frontend envía base64 como string, Laravel puede rechazarlo en `validate()` con **422**.

Si se presenta ese caso, hay 2 opciones coherentes:

- **Opción A (recomendada para “subir archivo”)**: enviar multipart/form-data con archivo real (y dejar la regla `image`).
- **Opción B (recomendada para “guardar base64”)**: cambiar la regla para aceptar string/base64 (y opcionalmente validar mime/tamaño por lógica propia).

Esta documentación deja explícita la intención actual: **el controlador intenta aceptar base64**, pero la regla del modelo puede impedirlo.

## Contrato del endpoint `POST /api/users`

### Request (esperado)

Campos típicos:

- `name` (required)
- `last_name` (required)
- `email` (required, unique)
- `password` (required)
- `role` (required, `admin|employee|client`)
- `status` (required, `active|inactive`)
- opcionales: `phone_number`, `address`, `profile_picture`

### Validación (backend = fuente de verdad)

En `User::rules()` la contraseña tiene requisitos fuertes (min/max, regex, y `confirmed`).

### Nota crítica (password confirmation)

`confirmed` exige enviar `password_confirmation`. La UI actual **no** incluye un campo “confirmar contraseña”, por lo que el backend puede responder 422 si mantiene esa regla.

Si se habilita esa validación, la pantalla debe agregar un `Form.Item` para `password_confirmation`.
