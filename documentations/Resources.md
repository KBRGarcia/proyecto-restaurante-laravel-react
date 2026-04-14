# 📚 Documentación: Arquitectura de Resources (Refine + API REST)

> **Objetivo:** Entender cómo funciona el patrón "Resource" en la nueva arquitectura frontend (S.P.A. con Refine) y backend (API REST con Laravel).

---

## 🗺️ Visión General: El Nuevo Flujo (Inertia 👉 Refine)

Anteriormente usábamos Inertia.js, pero hemos migrado todo el panel de administración a **Refine**. Refine es un framework React puramente _headless_ para aplicaciones CRUD data-intensivas, y ahora está conectado a una **API REST pura** en Laravel.

Cuando un usuario navega a `/users`, ocurre esto:

```text
[Navegador / Usuario]
       ↓  Navega a /users (React Router DOM lo captura en el cliente)
[Refine - resources/js/pages/users/list.tsx]
       ↓  El componente React ejecuta useTable() y pide datos al DataProvider
[Refine DataProvider - axios GET /api/users]
       ↓  Petición con Bearer Token (Sanctum)
[Laravel API Routes - routes/api.php]
       ↓  Enruta al controlador correspondiente
[UserController.php -> index()]
       ↓  Consulta BD, pagina y arma JSON
[Respuesta JSON + Headers (x-total-count)]
       ↓  DataProvider intercepta y formatea
[Refine muestra la tabla usando Ant Design]
```

## 🛠️ Modificaciones Arquitectónicas Clave

| Tecnología Anterior | Nueva Tecnología | Razón del Cambio |
|---|---|---|
| Inertia.js | **Refine + React Router** | Refine permite construir CRUDs complejos con un 10% del esfuerzo, ya que autoconfigura filtros, ordenación y validaciones por pantalla. No es compatible con el sistema de navegación de Inertia. |
| Sesiones (Cookies) | **Laravel Sanctum (Tokens)** | Como Refine opera como una aplicación aislada, necesita autenticarse mediante un _Bearer Token_ enviado en los headers HTTP de cada petición. |
| Vistas/Controladores Web | **API Controllers (`/api`)** | Refine espera que el backend sea estrictamente una RESTful API (`GET`, `POST`, `PUT`, `DELETE` en JSON) en lugar de retornar HTML. |
| Tailwind CSS Manual | **Ant Design (`antd`)** | Refine se integra magníficamente con Ant Design, brindando Tablas hiper robustas (DataGrids) que hubiese tomado semanas desarrollar de 0 en Tailwind puro. |

---

## 1. 📦 El Backend: El Modelo y el Controlador

### El Modelo (`app/Models/User.php`)
Los modelos **no cambiaron**. Aquí seguimos definiendo:
* `$fillable` para seguridad.
* Relaciones (`hasMany`, `belongsTo`).
* Reglas locales de validación estáticas (`rules()`, `messages()`).

### El Controlador API (`UserController.php`)

Nuestros controladores deben retornar un objeto **JSON** y obedecer a la especificación típica REST para que `simple-rest` (el proveedor de Refine) lo entienda.

#### `index()` (Listado)
`simple-rest` requiere dos cosas principales:
1. Una respuesta o un array plano (ej. `[{ id: 1 }, ...]`)
2. El conteo total para la paginación en un _Header_ `x-total-count`

```php
public function index(Request $request) {
    $query = User::query();

    // Paginación via simple-rest usa _start y _end !
    $start = $request->get('_start', 0);
    $end = $request->get('_end', 10);
    
    $total = $query->count();
    $users = $query->offset($start)->limit($end - $start)->get();

    // Importante: Retornamos el array e inyectamos el total en la cabecera
    return response()->json($users)->header('x-total-count', $total);
}
```

#### `store()` / `update()` / `destroy()`
De igual forma, devuelven exclusivamente JSON.

```php
public function store(Request $request) {
    // Valida y crea
    $validated = $request->validate(User::rules(), User::messages());
    // ... encriptar código, subir imgs, etc
    $user = User::create($validated);
    
    // Retorna JSON status 201
    return response()->json($user, 201);
}
```

---

## 2. 🔀 El Configurado de Rutas

Todas las rutas deben estar en `routes/api.php` bajo la validación de `auth:sanctum`:

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
});
```
*Ya NO se usa `routes/web.php` para estas rutas.*

---

## 3. 🖥️ El Frontend: La Magia de Refine

### `AppRouter.tsx` (El orquestador)
Este archivo reemplaza el core de Inertia. Define el enrutador de React y el `<Refine>` Provider. Registramos un "Recurso" en Refine para indicarle cómo operar en él.

```tsx
<Refine
    dataProvider={dataProvider("/api", axiosInstance)} // Habla con el Backend
    routerProvider={routerProvider}
    authProvider={authProvider}
    resources={[
        {
            name: "users",                 // Nombre del recurso (y la ruta base `/users`)
            list: "/users",                // Qué componente carga
            create: "/users/create",
            edit: "/users/edit/:id",
            show: "/users/show/:id",
            meta: { canDelete: true },
        },
    ]}
>
```

### Vistas CRUD Increíblemente Simples (`resources/js/pages/users/*`)

A diferencia de Inertia donde mapeábamos `state`, funciones y mutaciones mano a mano, Refine condensa la lógica del formulario usando los hooks internos y `Ant Design`.

#### `list.tsx`
Mapea los datos del servidor a una DataGrid (Tabla):
```tsx
import { List, useTable, EmailField, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space } from "antd";

export const UserList = () => {
    const { tableProps } = useTable({ syncWithLocation: true });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="name" title="Nombre" />
                <Table.Column dataIndex="email" render={(v) => <EmailField value={v} />} />
                <Table.Column
                    title="Acciones"
                    render={(_, record: any) => (
                        <Space>
                            <EditButton hideText size="small" recordItemId={record.id} />
                            <DeleteButton hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
```

#### `create.tsx`
Crea el formulario y **autodispara el POST a `/api/users`** cuando se presiona Guardar.

```tsx
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const UserCreate = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            {/* ...formProps inyecta estado onFinish, validaciones previas */}
            <Form {...formProps} layout="vertical">
                <Form.Item label="Nombre" name={["name"]} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                {/* Agrega más Input o Select según el backend */}
            </Form>
        </Create>
    );
};
```

---

## 4. 🧰 ¿Qué pasa con los antiguos componentes (Headless UI / Shadcn)? 

Anteriormente en `resources/js/components` teníamos componentes pre-estilizados usando `Tailwind` + `Radix Ui`. Si el dashboard 100% va a ser usando **Refine + Ant Design**, esos componentes de React ya no se usan en este módulo, están **inactivos**.

Si a futuro el proyecto requiere un *Portal Público (ej. tienda)* donde queremos diseños visuales ultra personalizados alejados de un "Panel B2B", podremos usar esos componentes y aplicar "Refine Headless" (`@refinedev/core`) manteniendo así un mismo DataProvider.

## 5. Resumen de Implementación de Nuevos Módulos
Pasos exactos para crear un CRUD ahora:
1. Crea/modifica tu Controlador para que retorne `response()->json()` en lugar de `Inertia`.
2. Incluye `Route::apiResource('modulo', ...)` en `api.php`.
3. Registra el Recurso dentro del prop `resources={[]}` del componente `<Refine>` dentro de `AppRouter.tsx`.
4. Crea la vista `List` usando `<List>` y `useTable()` de `@refinedev/antd`.
5. Crea la vista `Create`/`Edit` usando `<Create>`/`<Edit>` y la propiedad `{...formProps}` en tu Form de Ant Design. ¡El botón guardar lo hará mágicamente!
