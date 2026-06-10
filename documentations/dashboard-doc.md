# Arquitectura del Dashboard (Panel de Control)

> **Objetivo:** que cualquier desarrollador entienda el flujo completo del **Dashboard**: desde que el usuario autenticado hace clic en "Dashboard" en el menú lateral hasta que se muestran las estadísticas, los últimos pedidos y las valoraciones recientes, pasando por los hooks de Refine, el data provider, los controladores API, los modelos Eloquent y las tablas de la base de datos.
>
> Documentación relacionada: [`AppRouter-doc.md`](./AppRouter-doc.md), [`login-register-doc.md`](./login-register-doc.md), [`Resources.md`](./Resources.md), [`list-doc.md`](./list-doc.md).

---

## Qué es el Dashboard en este proyecto

El **Dashboard** es la pantalla de inicio del panel administrativo. A diferencia de los módulos CRUD (usuarios, sucursales, pedidos, etc.), **no tiene su propio controlador ni tabla en la base de datos**. Es una **vista de agregación** que consulta datos existentes de varios resources y los presenta en un resumen visual.

Responsabilidades:

- Mostrar **4 tarjetas de estadísticas** (usuarios, sucursales, productos, pedidos).
- Listar los **5 pedidos más recientes** en una tabla con enlace al detalle.
- Mostrar las **5 valoraciones más recientes** con calificación, comentario y producto asociado.
- Servir como **destino por defecto** tras un login o registro exitoso (`redirectTo: '/dashboard'`).

Ubicación del componente principal:

```text
resources/js/components/dashboard/CustomDashboard.tsx
```

---

## Vista general del flujo

```text
┌─────────────────────────────────────────────────────────────────────────┐
│  USUARIO (navegador)                                                    │
│  URL: /dashboard                                                        │
│  Requisito: auth_token en localStorage (sesión activa)                   │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────────┐
│  FRONTEND — React Router + Refine                                       │
│  AppRouter.tsx → Ruta protegida dentro de ThemedLayout                  │
│  → CustomDashboard.tsx                                                  │
│  → 5 llamadas useList() en paralelo                                     │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │ 5 peticiones HTTP simultáneas
                                │ Header: Authorization: Bearer <token>
┌───────────────────────────────▼─────────────────────────────────────────┐
│  LARAVEL — routes/api.php                                               │
│  Middleware: auth:sanctum (todas las rutas de resources)                │
│  → UserController@index                                                 │
│  → BranchController@index                                               │
│  → ProductController@index                                              │
│  → OrderController@index                                                │
│  → EvaluationController@index                                             │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │ Eloquent ORM
┌───────────────────────────────▼─────────────────────────────────────────┐
│  BASE DE DATOS                                                          │
│  users | branches | products | orders | evaluations                     │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │ JSON + header x-total-count
┌───────────────────────────────▼─────────────────────────────────────────┐
│  FRONTEND — Render                                                      │
│  Tarjetas Statistic | Table de pedidos | List de valoraciones           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Prerequisito: autenticación

El Dashboard **no es accesible sin sesión**. Antes de cargar `/dashboard`, Refine ejecuta `authProvider.check()`:

```text
[1] Usuario navega a /dashboard
[2] authProvider.check() lee localStorage.getItem('auth_token')
[3] Si NO hay token → redirectTo: '/login'
[4] Si SÍ hay token → authenticated: true → se renderiza CustomDashboard
[5] El interceptor Axios adjunta Authorization: Bearer <token> a cada petición
[6] Laravel valida el token con middleware auth:sanctum
```

Detalle completo del flujo de autenticación: [`login-register-doc.md`](./login-register-doc.md).

---

## Capa 1: Registro en AppRouter y menú lateral

### Resource en Refine

El Dashboard se registra como un resource especial en `resources/js/AppRouter.tsx`. A diferencia de los CRUD, solo define la ruta `list` (no tiene `create`, `edit` ni `show`):

```ts
{
    name: 'dashboard',
    list: '/dashboard',
    meta: {
        canDelete: true,
        icon: <DashboardOutlined />,
    },
},
```

| Campo | Valor | Significado |
| :--- | :--- | :--- |
| `name` | `'dashboard'` | Identificador interno de Refine (aparece en el menú) |
| `list` | `'/dashboard'` | Ruta SPA del panel |
| `meta.icon` | `<DashboardOutlined />` | Ícono en el sidebar |
| `meta.canDelete` | `true` | Flag de Refine; en este resource no se usa eliminación |

### Ruta de React Router

El Dashboard vive dentro del **layout protegido** (`ThemedLayout`), junto con el sidebar y el header:

```tsx
<Route element={<ThemedLayout Header={Header} Sider={...}>}>
    <Route path="/dashboard" element={<CustomDashboard />} />
    {/* ... demás rutas CRUD ... */}
</Route>
```

| Elemento del layout | Rol en el Dashboard |
| :--- | :--- |
| `ThemedSider` | Muestra el ítem "Dashboard" en el menú (generado desde `resources[]`) |
| `Header` | Muestra nombre del usuario (`useGetIdentity`) y botón de logout |
| `CustomTitle` | Logo "Sabor & Tradición" con enlace a `/dashboard` |
| `<Outlet />` | Aquí se monta `CustomDashboard` |

### Ruta web de Laravel

Laravel no tiene una ruta específica para `/dashboard`. El archivo `routes/web.php` captura **todas** las URLs y devuelve la misma vista Blade:

```php
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
```

A partir de ahí, React Router toma el control en el cliente.

---

## Capa 2: Componente CustomDashboard

Archivo: `resources/js/components/dashboard/CustomDashboard.tsx`.

### Estructura visual

```text
┌──────────────────────────────────────────────────────────────┐
│  Título: "Panel de Control" + subtítulo de bienvenida        │
├──────────────┬──────────────┬──────────────┬─────────────────┤
│ Usuarios     │ Sucursales   │ Platos       │ Pedidos del Mes │
│ Totales      │              │ en Menú      │                 │
├──────────────────────────────────────┬───────────────────────┤
│  Últimos Pedidos (tabla, 5 filas)    │ Valoraciones Recientes│
│  ID | Cliente | Total | Estado       │ (lista, 5 ítems)      │
└──────────────────────────────────────┴───────────────────────┘
```

### Hooks de datos: `useList`

El Dashboard obtiene datos con **cinco instancias** del hook `useList` de `@refinedev/core`. Cada una apunta a un resource distinto y el `dataProvider` (`@refinedev/simple-rest`) traduce la llamada a HTTP.

#### Estadísticas (conteo total, sin paginación)

```ts
const { query: usersQuery, result: usersResult } = useList({
    resource: "users",
    pagination: { mode: "off" },
});
```

Se repite el mismo patrón para `branches` y `products`.

| Parámetro | Valor | Efecto |
| :--- | :--- | :--- |
| `resource` | `"users"` | Resuelve endpoint `GET /api/users` |
| `pagination.mode` | `"off"` | Refine pide el listado completo; el total viene en `x-total-count` |

El valor mostrado en cada tarjeta es `usersResult?.total ?? 0` (y equivalentes para branches, products, orders).

#### Pedidos y valoraciones (últimos 5, ordenados)

```ts
const { query: ordersQuery, result: ordersResult } = useList({
    resource: "orders",
    pagination: { pageSize: 5, currentPage: 1 },
    sorters: [{ field: "id", order: "desc" }],
});
```

```ts
const { query: evaluationsQuery, result: evaluationsResult } = useList({
    resource: "evaluations",
    pagination: { pageSize: 5, currentPage: 1 },
    sorters: [{ field: "id", order: "desc" }],
});
```

| Parámetro | Valor | Petición HTTP generada |
| :--- | :--- | :--- |
| `pageSize: 5` | 5 registros | `_start=0&_end=5` |
| `sorters` | `id desc` | `_sort=id&_order=desc` |

### Estados de carga

Cada sección usa el estado `query.isLoading` de Refine:

- **Tarjetas de estadísticas:** componente `<Skeleton>` de Ant Design mientras carga.
- **Tabla de pedidos:** prop `loading={ordersQuery.isLoading}` en `<Table>`.
- **Lista de valoraciones:** `<Skeleton>` o `<List>` según el estado.

### Mapeo de estados de pedidos

El Dashboard traduce los valores del enum de la base de datos a etiquetas y colores en español:

| Valor en BD (`orders.status`) | Etiqueta UI | Color del Tag |
| :--- | :--- | :--- |
| `pending` | Pendiente | orange |
| `preparing` | En Cocina | blue |
| `ready` | Listo | green |
| `delivered` | Entregado | cyan |
| `canceled` | Cancelado | red |

### Enlaces de navegación

- Cada ID de pedido enlaza a `/orders/show/:id` mediante `<Link>` de React Router.
- El sidebar permite saltar a los módulos CRUD completos desde el menú.

---

## Capa 3: Peticiones HTTP (dataProvider)

### Configuración base

En `AppRouter.tsx`:

```ts
const API_URL = '/api';
dataProvider={dataProvider(API_URL, axiosInstance)}
```

El `axiosInstance` incluye un interceptor que inyecta el Bearer Token en cada petición.

### Peticiones que dispara el Dashboard

Al montar `CustomDashboard`, se ejecutan **5 peticiones GET en paralelo**:

| # | Resource Refine | Endpoint | Parámetros | Uso en UI |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `users` | `GET /api/users` | Sin paginación | Conteo total de usuarios |
| 2 | `branches` | `GET /api/branches` | Sin paginación | Conteo total de sucursales |
| 3 | `products` | `GET /api/products` | Sin paginación | Conteo total de productos |
| 4 | `orders` | `GET /api/orders` | `_start=0&_end=5&_sort=id&_order=desc` | Tabla de últimos pedidos + total |
| 5 | `evaluations` | `GET /api/evaluations` | `_start=0&_end=5&_sort=id&_order=desc` | Lista de valoraciones + total |

### Formato de respuesta esperado

Todos los controladores del proyecto siguen el **contrato de Refine simple-rest**:

```text
Body:   JSON array de registros
Header: x-total-count: <número total de registros en la consulta>
```

Refine usa `x-total-count` para calcular `result.total` (las tarjetas de estadísticas) y la paginación.

---

## Capa 4: Rutas API (Laravel)

Archivo: `routes/api.php`.

Todas las rutas que consume el Dashboard están **dentro del grupo protegido** por Sanctum:

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('branches', BranchController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('orders', OrderController::class);
    Route::apiResource('evaluations', EvaluationController::class);
    // ...
});
```

El Dashboard solo usa el método **`index`** de cada controlador (`GET /api/{resource}`).

---

## Capa 5: Controladores

### Patrón común en `index`

Los cinco controladores comparten la misma lógica de listado compatible con Refine:

```text
[1] Construir query Eloquent (con relaciones eager-loaded si aplica)
[2] Aplicar búsqueda/filtros opcionales (search, q, status, etc.)
[3] Aplicar ordenamiento (_sort / _order o sort_by / sort_order)
[4] $total = $query->count()
[5] $records = $query->offset($start)->limit($end - $start)->get()
[6] return response()->json($records)->header('x-total-count', $total)
```

Parámetros de paginación que Refine envía:

| Parámetro | Descripción | Valor por defecto en controladores |
| :--- | :--- | :--- |
| `_start` | Offset (inicio) | `0` |
| `_end` | Fin (exclusivo) | `10` |
| `_sort` | Campo de ordenamiento | Varía por controlador |
| `_order` | Dirección (`asc` / `desc`) | `desc` en la mayoría |

---

### UserController@index

Archivo: `app/Http/Controllers/UserController.php`.

| Aspecto | Detalle |
| :--- | :--- |
| Modelo | `User::query()` |
| Relaciones | Ninguna (consulta plana) |
| Filtros | `search`/`q` (name, last_name, email), `role`, `status` |
| Orden por defecto | `id desc` |
| Tabla BD | `users` |

**Uso en Dashboard:** el conteo total de filas en `users` alimenta la tarjeta "Usuarios Totales".

---

### BranchController@index

Archivo: `app/Http/Controllers/BranchController.php`.

| Aspecto | Detalle |
| :--- | :--- |
| Modelo | `Branch::query()` |
| Filtros | `search`/`q`, `active`, `is_main`, `city`, etc. |
| Orden por defecto | `id desc` |
| Tabla BD | `branches` |

**Uso en Dashboard:** conteo total de sucursales → tarjeta "Sucursales".

---

### ProductController@index

Archivo: `app/Http/Controllers/ProductController.php`.

| Aspecto | Detalle |
| :--- | :--- |
| Modelo | `Product::query()` (con relación `category` en algunos contextos) |
| Filtros | `search`/`q`, `status`, `category_id`, etc. |
| Orden por defecto | `id desc` |
| Tabla BD | `products` |

**Uso en Dashboard:** conteo total de productos → tarjeta "Platos en Menú".

---

### OrderController@index

Archivo: `app/Http/Controllers/OrderController.php`.

| Aspecto | Detalle |
| :--- | :--- |
| Modelo | `Order::with(['user', 'client', 'branch', 'assignedEmployee'])` |
| Filtros | `search`/`q`, `status`, `service_type`, `currency`, `user_id`, `branch_id`, etc. |
| Orden por defecto | `order_date desc` (el Dashboard fuerza `id desc` vía sorter) |
| Tabla BD | `orders` |

**Uso en Dashboard:**

- `result.total` → tarjeta "Pedidos del Mes" (en realidad es el **total global** de pedidos, no filtrado por mes).
- `result.data` (5 registros) → tabla "Últimos Pedidos".

**Columnas que renderiza el Dashboard desde el JSON:**

| Campo JSON | Origen en BD | Renderizado |
| :--- | :--- | :--- |
| `id` | `orders.id` | Enlace `#123` → `/orders/show/123` |
| `user.name`, `user.last_name` | Relación `user` (FK `user_id`) | Nombre del cliente |
| `total` | `orders.total` | Monto con prefijo `Bs.` o `$` según `currency` |
| `status` | `orders.status` | Tag con color y etiqueta en español |

---

### EvaluationController@index

Archivo: `app/Http/Controllers/EvaluationController.php`.

| Aspecto | Detalle |
| :--- | :--- |
| Modelo | `Evaluation::with(['user', 'client', 'order', 'product'])` |
| Filtros | `search`/`q`, `rating` |
| Orden por defecto | `evaluation_date desc` (el Dashboard fuerza `id desc`) |
| Tabla BD | `evaluations` |

**Uso en Dashboard:** las 5 valoraciones más recientes con:

| Campo JSON | Origen | Renderizado |
| :--- | :--- | :--- |
| `user.profile_picture` | `users.profile_picture` | Avatar |
| `user.name`, `user.last_name` | Relación `user` | Nombre del evaluador |
| `rating` | `evaluations.rating` | Componente `<Rate>` (1–5 estrellas) |
| `comment` | `evaluations.comment` | Texto entre comillas |
| `product.name` | Relación `product` | Tag azul con nombre del plato |

---

## Capa 6: Modelos Eloquent

El Dashboard **no define modelos propios**. Lee datos a través de los modelos existentes:

### User

Archivo: `app/Models/User.php`.

| Relación relevante | Tipo | Uso en Dashboard |
| :--- | :--- | :--- |
| `evaluations()` | HasMany | No se usa directamente en el Dashboard |
| `employee()` | HasOne | — |
| `client()` | HasOne | — |

### Order

Archivo: `app/Models/Order.php`.

| Relación | Tipo | FK | Cargada en index |
| :--- | :--- | :--- | :--- |
| `user` | BelongsTo | `user_id` | Sí |
| `client` | BelongsTo | `client_id` | Sí |
| `branch` | BelongsTo | `branch_id` | Sí |
| `assignedEmployee` | BelongsTo | `assigned_employee_id` | Sí |

Constantes de estado usadas en la UI: `pending`, `preparing`, `ready`, `delivered`, `canceled`.

### Evaluation

Archivo: `app/Models/Evaluation.php`.

| Relación | Tipo | FK | Cargada en index |
| :--- | :--- | :--- | :--- |
| `user` | BelongsTo | `user_id` | Sí |
| `client` | BelongsTo | `client_id` | Sí |
| `order` | BelongsTo | `order_id` | Sí |
| `product` | BelongsTo | `product_id` | Sí |

### Branch y Product

Modelos estándar sin relaciones obligatorias para el conteo del Dashboard. El `index` devuelve el total de registros de cada tabla.

---

## Capa 7: Base de datos (migraciones)

### Tabla `users`

Migración: `database/migrations/0001_01_01_000000_create_users_table.php`.

| Columna | Tipo | Relevante para Dashboard |
| :--- | :--- | :--- |
| `id` | bigint PK | Identificador |
| `name`, `last_name` | string(100) | Nombre en tabla de pedidos y valoraciones |
| `email` | string(100) unique | — |
| `profile_picture` | longText nullable | Avatar en valoraciones |
| `role` | enum(admin, employee, client) | — |
| `status` | enum(active, inactive) | — |

### Tabla `branches`

Migración: `database/migrations/2025_11_25_155608_create_branches_table.php`.

| Columna | Tipo | Relevante para Dashboard |
| :--- | :--- | :--- |
| `id` | bigint PK | Conteo |
| `name` | string(100) | — |
| `active` | boolean | Filtrable en listado CRUD, no en Dashboard |

### Tabla `products`

Migración: `database/migrations/2025_11_14_230944_create_products_table.php`.

| Columna | Tipo | Relevante para Dashboard |
| :--- | :--- | :--- |
| `id` | bigint PK | Conteo |
| `name` | string(100) | Tag en valoraciones |
| `status` | enum(active, inactive, out of stock) | — |

### Tabla `orders`

Migración: `database/migrations/2025_11_26_100300_create_orders_table.php`.

| Columna | Tipo | Relevante para Dashboard |
| :--- | :--- | :--- |
| `id` | bigint PK | Enlace en tabla |
| `user_id` | FK → users | Nombre del cliente |
| `total` | decimal(10,2) | Columna "Total" |
| `currency` | enum | Prefijo `Bs.` o `$` |
| `status` | enum | Tag de estado |
| `order_date` | timestamp | Orden por defecto del controlador |

Índices útiles: `orders_status_order_date_idx`, `orders_user_order_date_idx`.

### Tabla `evaluations`

Migración: `database/migrations/2025_11_26_100600_create_evaluations_table.php`.

| Columna | Tipo | Relevante para Dashboard |
| :--- | :--- | :--- |
| `id` | bigint PK | Ordenamiento |
| `user_id` | FK → users nullable | Evaluador |
| `product_id` | FK → products nullable | Tag del plato |
| `rating` | tinyint unsigned | Estrellas (1–5) |
| `comment` | text nullable | Comentario |
| `evaluation_date` | timestamp | Fecha de la valoración |

---

## Flujo completo de punta a punta (ejemplo)

Escenario: un administrador acaba de iniciar sesión y llega a `/dashboard`.

```text
[1] NAVEGADOR
    URL: /dashboard
    localStorage: auth_token + user

[2] REACT ROUTER + REFINE
    authProvider.check() → authenticated: true
    ThemedLayout renderiza sidebar + header + Outlet
    CustomDashboard se monta

[3] CUSTOMDASHBOARD — 5 useList en paralelo
    useList("users")     → GET /api/users
    useList("branches")  → GET /api/branches
    useList("products")  → GET /api/products
    useList("orders")    → GET /api/orders?_start=0&_end=5&_sort=id&_order=desc
    useList("evaluations")→ GET /api/evaluations?_start=0&_end=5&_sort=id&_order=desc

[4] AXIOS INTERCEPTOR
    Authorization: Bearer <auth_token>

[5] LARAVEL
    auth:sanctum valida token en personal_access_tokens
    UserController@index       → SELECT COUNT(*) + SELECT * FROM users ...
    BranchController@index     → SELECT COUNT(*) + SELECT * FROM branches ...
    ProductController@index    → SELECT COUNT(*) + SELECT * FROM products ...
    OrderController@index      → SELECT COUNT(*) + SELECT * FROM orders ... LIMIT 5
                               → eager load user, client, branch, assignedEmployee
    EvaluationController@index → SELECT COUNT(*) + SELECT * FROM evaluations ... LIMIT 5
                               → eager load user, client, order, product

[6] RESPUESTAS JSON
    Cada respuesta incluye header x-total-count

[7] REFINE
    usersResult.total = 12        → Tarjeta "Usuarios Totales: 12"
    branchesResult.total = 3      → Tarjeta "Sucursales: 3"
    productsResult.total = 45     → Tarjeta "Platos en Menú: 45"
    ordersResult.total = 128      → Tarjeta "Pedidos del Mes: 128"
    ordersResult.data = [5 pedidos]→ Tabla "Últimos Pedidos"
    evaluationsResult.data = [5]  → Lista "Valoraciones Recientes"

[8] RENDER FINAL
    Skeleton desaparece, UI completa visible
```

---

## Manejo de errores

| Escenario | Comportamiento |
| :--- | :--- |
| Token ausente o inválido | `auth:sanctum` responde **401** → `authProvider.onError` fuerza logout |
| Token expirado (si se configura `expiration` en Sanctum) | Mismo flujo 401 |
| Error de red | `query.isError` en Refine; la UI puede quedar en skeleton o vacía |
| Base de datos vacía | Tarjetas muestran `0`; tablas/listas vacías sin error |

---

## Diferencias con un módulo CRUD estándar

| Aspecto | Dashboard | Módulo CRUD (ej. Users) |
| :--- | :--- | :--- |
| Componente | `components/dashboard/CustomDashboard.tsx` | `pages/users/list.tsx` |
| Hook principal | `useList` (solo lectura) | `useTable` (paginación, filtros, acciones) |
| Controlador dedicado | No existe | `UserController` completo (CRUD) |
| Resource Refine | Solo `list` | `list`, `create`, `edit`, `show` |
| Tabla propia en BD | No | Sí (`users`) |
| Operaciones de escritura | Ninguna | create, update, delete |
| Validaciones | No aplica (solo GET) | `User::rules()` en store/update |

---

## Datos de prueba

El seeder `database/seeders/UserSeeder.php` crea usuarios de ejemplo (incluido `admin@restaurante.com`). Para ver el Dashboard con datos reales, ejecutar los seeders del proyecto (`php artisan db:seed`) y asegurarse de tener registros en `orders` y `evaluations`.

---

## Archivos clave (referencia rápida)

| Capa | Archivo |
| :--- | :--- |
| Vista | `resources/js/components/dashboard/CustomDashboard.tsx` |
| Rutas SPA + resource | `resources/js/AppRouter.tsx` |
| Layout | `resources/js/components/header/index.tsx` |
| Rutas API | `routes/api.php` |
| Controladores | `UserController`, `BranchController`, `ProductController`, `OrderController`, `EvaluationController` |
| Modelos | `User`, `Branch`, `Product`, `Order`, `Evaluation` |
| Migraciones | `create_users_table`, `create_branches_table`, `create_products_table`, `create_orders_table`, `create_evaluations_table` |
| Autenticación | Ver [`login-register-doc.md`](./login-register-doc.md) |

---

## Notas para futuras mejoras

Estas observaciones no son bugs documentados como bloqueantes, pero un desarrollador debería conocerlas:

1. **"Pedidos del Mes"** muestra el total global de pedidos (`ordersResult.total`), no un filtro por mes. Para filtrar por período habría que añadir filtros en `useList` y soporte en `OrderController@index`.
2. El Dashboard realiza **5 peticiones HTTP** al cargar. Una optimización futura podría ser un endpoint dedicado `GET /api/dashboard/stats` que devuelva todo en una sola respuesta.
3. No hay **control de permisos por rol** en el frontend (`getPermissions` retorna `null`). Cualquier usuario autenticado ve el mismo Dashboard.
