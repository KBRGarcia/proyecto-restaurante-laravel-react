# Arquitectura de AppRouter.tsx

> **Objetivo:** que cualquier persona entienda el flujo completo de la aplicación frontend: desde que Laravel sirve la página HTML hasta que el usuario navega por el panel administrativo, se autentica y consume los resources CRUD.
>
> Documentación relacionada: [`Resources.md`](./Resources.md), [`tech_stack_inventory.md`](./tech_stack_inventory.md), [`list-doc.md`](./list-doc.md).

---

## Qué es AppRouter.tsx

`resources/js/AppRouter.tsx` es el **punto de configuración central** de toda la SPA (Single Page Application). No es solo un enrutador: concentra en un solo archivo:

- La conexión HTTP con Laravel (`axios` + Sanctum Bearer Token).
- La autenticación (`authProvider`).
- El registro de todos los resources CRUD (`resources[]`).
- El menú lateral jerárquico.
- Las rutas públicas y protegidas de React Router.
- El layout administrativo (sidebar, header, contenido).
- Los providers globales de Refine (datos, router, notificaciones, tema).

Todo lo que el usuario ve después de iniciar sesión pasa por este archivo.

---

## Cadena de arranque: del servidor al componente

```text
[1] Usuario visita cualquier URL (ej. /users, /login, /dashboard)
    ↓
[2] Laravel — routes/web.php
    Route::get('/{any}', fn() => view('app'))->where('any', '.*')
    → Toda ruta web devuelve la misma vista Blade
    ↓
[3] resources/views/app.blade.php
    → HTML mínimo con <div id="app">
    → @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    ↓
[4] Vite compila y sirve resources/js/app.tsx
    ↓
[5] app.tsx
    → createRoot(#app).render(<StrictMode><AppRouter /></StrictMode>)
    ↓
[6] AppRouter.tsx
    → BrowserRouter + Refine + Routes
    → React Router toma el control de la navegación del lado del cliente
```

A partir del paso 6, **ninguna navegación vuelve a pedir HTML a Laravel**. Solo se hacen peticiones JSON a `/api/*`.

---

## Vista general de la arquitectura de AppRouter

```text
┌─────────────────────────────────────────────────────────────────────────┐
│  BrowserRouter                                                          │
│  └─ AppSystemShell (contenedor CSS del sistema)                         │
│     └─ ColorModeContextProvider (tema Ant Design: claro/oscuro + rojo)  │
│        └─ <Refine> (framework maestro)                                  │
│           ├─ dataProvider    → simple-rest + axios → /api               │
│           ├─ routerProvider  → integración con React Router             │
│           ├─ authProvider    → Sanctum Bearer Token                     │
│           ├─ notificationProvider → toasts Ant Design                  │
│           ├─ resources[]     → menú lateral + mapeo CRUD                  │
│           ├─ options         → syncWithLocation, warnWhenUnsavedChanges │
│           │                                                             │
│           ├─ <Routes> (React Router)                                    │
│           │   ├─ Públicas: /, /login, /register, /proximamente          │
│           │   └─ Protegidas (ThemedLayout):                             │
│           │       ├─ ThemedSider → menú desde resources[]               │
│           │       ├─ Header → perfil, tema, logout                      │
│           │       └─ <Outlet /> → páginas CRUD / dashboard / profile    │
│           │                                                             │
│           ├─ <UnsavedChangesNotifier />                                 │
│           └─ <DocumentTitleHandler />                                   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Capa 1: Conexión HTTP con Laravel

### `API_URL` y `axiosInstance`

```ts
const API_URL = '/api';
const axiosInstance = axios.create();
```

| Elemento | Rol |
| :--- | :--- |
| `API_URL` | Prefijo base de todos los endpoints REST (`/api/users`, `/api/login`, etc.) |
| `axiosInstance` | Cliente HTTP dedicado, separado del axios global |
| Interceptor de request | Inyecta `Authorization: Bearer <auth_token>` en cada petición si existe token en `localStorage` |

```ts
axiosInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
});
```

Este interceptor es lo que permite que **todas** las operaciones CRUD y las rutas protegidas pasen el middleware `auth:sanctum` de Laravel.

El `dataProvider` de Refine usa esta misma instancia:

```ts
dataProvider={dataProvider(API_URL, axiosInstance)}
```

---

## Capa 2: Autenticación (`authProvider`)

Refine requiere un objeto `AuthProvider` para gestionar sesión. En este proyecto se implementa con **Laravel Sanctum en modo tokens personales (Bearer)**, no con cookies ni CSRF.

### Flujo completo de login

```text
[1] Usuario → /login → CustomLogin
[2] useLogin() → authProvider.login({ email, password })
[3] POST /api/login (sin token, ruta pública)
[4] ApiAuthController valida credenciales → createToken('auth_token')
[5] Respuesta: { user, token }
[6] localStorage.setItem('auth_token', token)
    localStorage.setItem('user', JSON.stringify(user))
[7] redirectTo: '/dashboard'
[8] Refine navega al dashboard → authProvider.check() confirma sesión
```

### Métodos del authProvider

| Método | Cuándo se ejecuta | Qué hace | Endpoint |
| :--- | :--- | :--- | :--- |
| `login` | Usuario envía formulario de login | Valida credenciales, guarda token y user, redirige a `/dashboard` | `POST /api/login` |
| `register` | Usuario envía formulario de registro | Crea cuenta, guarda token y user, redirige a `/dashboard` | `POST /api/register` |
| `logout` | Usuario cierra sesión (Header) | Invalida token, limpia localStorage, redirige a `/` | `POST /api/logout` |
| `check` | Cada navegación a ruta protegida | Verifica si existe `auth_token`; si no, redirige a `/login` | — (solo localStorage) |
| `getIdentity` | Header, perfil, dashboard | Devuelve user desde localStorage o `GET /api/me` | `GET /api/me` |
| `getPermissions` | Refine (permisos) | Retorna `null` (sin sistema de roles en frontend aún) | — |
| `onError` | Error HTTP global de Refine | Si status 401 → fuerza logout automático | — |

### Datos persistidos en localStorage

| Clave | Contenido | Uso |
| :--- | :--- | :--- |
| `auth_token` | Token Sanctum (string) | Interceptor Axios → header Authorization |
| `user` | JSON del usuario logueado | `getIdentity`, Header, perfil |
| `colorMode` | `"light"` o `"dark"` | Tema Ant Design (ColorModeContextProvider) |

### Endpoints de autenticación (backend)

Archivo: `routes/api.php` → `app/Http/Controllers/ApiAuthController.php`.

| Método | Ruta | Protegida | Respuesta |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/login` | No | `{ user, token }` |
| `POST` | `/api/register` | No | `{ user, token }` con **201** |
| `POST` | `/api/logout` | Sí (Sanctum) | `{ message }` — borra token actual |
| `GET` | `/api/me` | Sí (Sanctum) | JSON del usuario autenticado |

---

## Capa 3: Providers de Refine

El componente `<Refine>` recibe la configuración maestra:

```tsx
<Refine
    dataProvider={dataProvider(API_URL, axiosInstance)}
    routerProvider={routerProvider}
    authProvider={authProvider}
    notificationProvider={useNotificationProvider}
    resources={[...]}
    options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
    }}
>
```

| Provider | Paquete | Función |
| :--- | :--- | :--- |
| `dataProvider` | `@refinedev/simple-rest` | Traduce operaciones CRUD a HTTP (`getList`, `create`, `update`, etc.) |
| `routerProvider` | `@refinedev/react-router` | Conecta hooks de Refine (`useNavigation`, `useGo`) con React Router |
| `authProvider` | Implementación propia | Sesión con Sanctum (ver sección anterior) |
| `notificationProvider` | `@refinedev/antd` | Toasts de éxito/error con Ant Design |

### Opciones globales

| Opción | Efecto |
| :--- | :--- |
| `syncWithLocation: true` | Sincroniza paginación, filtros y orden de tablas con la URL |
| `warnWhenUnsavedChanges: true` | Alerta al navegar si hay cambios sin guardar en un formulario |

### Componentes auxiliares globales

| Componente | Función |
| :--- | :--- |
| `<UnsavedChangesNotifier />` | Muestra diálogo de confirmación al salir de un formulario con cambios |
| `<DocumentTitleHandler />` | Actualiza `document.title` según la página actual de Refine |

---

## Capa 4: Registro de Resources (`resources[]`)

El arreglo `resources` es el **diccionario central** del sistema. Refine lo usa para:

1. **Construir el menú lateral** (`ThemedSider`) automáticamente.
2. **Resolver el nombre del resource** para el `dataProvider` (ej. `"users"` → `/api/users`).
3. **Generar rutas de navegación** en botones Show/Edit/Create/Delete.
4. **Controlar permisos de UI** (`canDelete` habilita/deshabilita eliminación).

### Estructura de una entrada

```ts
{
    name: 'branches',              // Identificador canónico (= endpoint API)
    list: '/branches',             // Ruta SPA del listado
    create: '/branches/create',   // Ruta SPA de creación
    edit: '/branches/edit/:id',   // Ruta SPA de edición
    show: '/branches/show/:id',   // Ruta SPA de detalle
    meta: {
        label: 'Sucursales',      // Texto en el menú
        parent: 'tiendas',        // Agrupación en submenú
        canDelete: true,          // Permite eliminar registros
        icon: <BranchesOutlined />,// Ícono Ant Design
    },
}
```

### Menú jerárquico

```text
Dashboard                          (resource: dashboard)
Personas                           (parent, sin rutas)
  ├── Usuarios                     (users)
  ├── Clientes                     (clients)
  └── Empleados                    (employees)
Tiendas                            (parent)
  ├── Sucursales                   (branches)
  └── Evaluaciones                 (evaluations)
Productos                          (parent)
  ├── Productos                    (products)
  └── Categorías                   (categories)
Pagos                              (parent)
  ├── Ordenes                      (orders)
  ├── Detalles de Ordenes          (order-details)
  ├── Pagos de Ordenes             (order-payments)
  ├── Metodos de Pago              (payment-methods, solo list/show)
  └── Bancos                       (banks, solo list/show)
```

Los resources **padre** (`personas`, `tiendas`, `productos`, `pagos`) solo agrupan el menú. No tienen rutas ni endpoints.

### Resources de solo lectura

| Resource | Rutas declaradas | `canDelete` | Notas |
| :--- | :--- | :--- | :--- |
| `payment-methods` | `list`, `show` | `false` | Catálogo estático (Enum) |
| `banks` | `list`, `show` | `false` | Catálogo estático (Enum) |

---

## Capa 5: Rutas de React Router (`<Routes>`)

Además del registro en `resources[]`, cada página necesita una `<Route>` explícita. Refine no crea rutas automáticamente; solo las **referencia**.

### Rutas públicas (sin layout administrativo)

| Ruta | Componente | Descripción |
| :--- | :--- | :--- |
| `/` (index) | `HomePage` | Landing page del restaurante |
| `/login` | `CustomLogin` | Formulario de inicio de sesión |
| `/register` | `CustomRegister` | Formulario de registro |
| `/proximamente` | `ComingSoonPage` | Página placeholder |
| `*` (catch-all) | `ComingSoonPage` | Rutas no definidas |

Estas rutas se renderizan **sin** `ThemedLayout` (sin sidebar ni header administrativo).

### Rutas protegidas (con layout administrativo)

Envueltas por `ThemedLayout` → `ThemedSider` + `Header` + `<Outlet />`:

| Ruta | Componente | Resource |
| :--- | :--- | :--- |
| `/dashboard` | `CustomDashboard` | `dashboard` |
| `/users`, `/users/create`, `/users/edit/:id`, `/users/show/:id` | `UserList`, `UserCreate`, etc. | `users` |
| `/branches`, ... | `BranchesList`, `BranchesCreate`, etc. | `branches` |
| `/categories`, ... | `CategoriesList`, etc. | `categories` |
| `/clients`, ... | `ClientsList`, etc. | `clients` |
| `/employees`, ... | `EmployeesList`, etc. | `employees` |
| `/evaluations`, ... | `EvaluationsList`, etc. | `evaluations` |
| `/products`, ... | `ProductsList`, etc. | `products` |
| `/orders`, ... | `OrdersList`, etc. | `orders` |
| `/order-details`, ... | `OrderDetailsList`, etc. | `order-details` |
| `/order-payments`, ... | `OrderPaymentsList`, etc. | `order-payments` |
| `/payment-methods`, `/payment-methods/show/:id` | `PaymentMethodsList`, `PaymentMethodsShow` | `payment-methods` |
| `/banks`, `/banks/show/:id` | `BanksList`, `BanksShow` | `banks` |
| `/profile` | `ProfilePage` | (sin resource, ruta manual) |

### Protección de rutas

Refine ejecuta `authProvider.check()` al navegar. Si no hay `auth_token` en `localStorage`:

```text
check() → { authenticated: false, logout: true, redirectTo: '/login' }
```

No hay un componente `<Authenticated>` explícito; la protección la gestiona Refine internamente al detectar que las rutas están dentro del layout administrativo.

---

## Capa 6: Layout e interfaz visual

### `AppSystemShell`

Archivo: `resources/js/components/layout/AppSystemShell.tsx`.

Contenedor CSS (`app-system-outer` / `app-system`) que envuelve toda la aplicación. Controla dimensiones y scroll del sistema.

### `ColorModeContextProvider`

Archivo: `resources/js/contexts/color-mode/index.tsx`.

| Responsabilidad | Detalle |
| :--- | :--- |
| Tema Ant Design | `ConfigProvider` con `colorPrimary: '#ef4444'` (rojo del proyecto) |
| Modo claro/oscuro | `defaultAlgorithm` / `darkAlgorithm` según preferencia |
| Persistencia | Guarda `colorMode` en `localStorage` |
| Detección inicial | Usa preferencia del sistema si no hay valor guardado |
| Clase CSS | Agrega/quita `dark` en `<html>` para Tailwind |

El switch de tema está en el `Header` (no en el sidebar).

### `CustomTitle`

Componente del título del sidebar:

- Logo (`/logo.png`) + texto "Sabor & Tradición".
- Enlace a `/dashboard`.
- Oculta el texto cuando el sidebar está colapsado.

### `ThemedLayout` + `ThemedSider`

```tsx
<ThemedLayout
    Header={Header}
    Sider={(props) => (
        <ThemedSider
            {...props}
            Title={({ collapsed }) => <CustomTitle collapsed={collapsed} />}
            render={({ items }) => <>{items}</>}
        />
    )}
>
    <Outlet />
</ThemedLayout>
```

| Componente | Genera |
| :--- | :--- |
| `ThemedSider` | Menú lateral desde `resources[]` (con jerarquía parent/child) |
| `Header` | Barra superior: switch tema, avatar, menú perfil/logout |
| `<Outlet />` | Espacio donde se renderizan las páginas CRUD |

> El cierre de sesión está en el `Header` (dropdown del usuario), no en el sidebar.

### `Header`

Archivo: `resources/js/components/header/index.tsx`.

| Elemento | Hook/función | Acción |
| :--- | :--- | :--- |
| Switch claro/oscuro | `ColorModeContext` | Alterna `mode` |
| Avatar + nombre | `useGetIdentity()` | Muestra usuario logueado |
| "Mi Perfil" | `useNavigate()` | Navega a `/profile` |
| "Cerrar Sesión" | `useLogout()` | Ejecuta `authProvider.logout` |

---

## Capa 7: Carga diferida (code splitting)

El módulo `branches` usa `React.lazy` para dividir el bundle:

```tsx
const BranchesCreate = lazy(() =>
    import('./pages/branches/create').then((m) => ({ default: m.BranchesCreate }))
);

<Route path="create" element={
    <Suspense fallback={<BranchPageLoader />}>
        <BranchesCreate />
    </Suspense>
} />
```

| Aspecto | Detalle |
| :--- | :--- |
| Módulos lazy | `BranchesCreate`, `BranchesEdit`, `BranchesShow` |
| Fallback | `<BranchPageLoader />` — spinner centrado |
| List no es lazy | `BranchesList` se importa estáticamente (carga inmediata) |

Este patrón se puede replicar en otros resources con formularios pesados (mapas, muchos campos).

---

## Flujos completos de punta a punta

### Flujo A: Usuario navega a un listado CRUD

```text
[1] Click en "Sucursales" del menú lateral
[2] ThemedSider usa resources[].branches.list → navega a /branches
[3] React Router renderiza <BranchesList /> en <Outlet />
[4] BranchesList → useTable() → GET /api/branches?_start=0&_end=10
[5] axios interceptor agrega Bearer token
[6] BranchController@index → JSON + x-total-count
[7] Tabla Ant Design se renderiza con datos
```

### Flujo B: Usuario no autenticado intenta acceder al dashboard

```text
[1] Navegador → /dashboard (sin auth_token)
[2] authProvider.check() → authenticated: false
[3] Refine redirige a /login
[4] CustomLogin se renderiza sin sidebar
```

### Flujo C: Token expirado durante una operación

```text
[1] Usuario edita un registro → PUT /api/products/5
[2] Laravel responde 401 (token inválido/expirado)
[3] authProvider.onError detecta status 401 → { logout: true }
[4] Refine limpia sesión y redirige a login
```

### Flujo D: Usuario visita la landing page

```text
[1] Navegador → /
[2] Laravel sirve app.blade.php (misma vista para todas las URLs)
[3] React Router → Route index → <HomePage />
[4] HomePage es pública, sin ThemedLayout, sin auth
[5] Desde HomePage el usuario puede ir a /login o explorar el sitio
```

---

## Cómo agregar un nuevo resource en AppRouter

Checklist para integrar un módulo CRUD nuevo:

```text
1. IMPORTAR COMPONENTES
   import { XxxList } from './pages/xxx/list';
   import { XxxCreate } from './pages/xxx/create';
   import { XxxEdit } from './pages/xxx/edit';
   import { XxxShow } from './pages/xxx/show';

2. REGISTRAR EN resources[]
   {
       name: 'xxx',
       list: '/xxx',
       create: '/xxx/create',
       edit: '/xxx/edit/:id',
       show: '/xxx/show/:id',
       meta: {
           label: 'Nombre Visible',
           parent: 'grupo-padre',   // opcional
           canDelete: true,
           icon: <IconOutlined />,
       },
   }

3. AGREGAR RUTAS en <Routes>
   <Route path="/xxx">
       <Route index element={<XxxList />} />
       <Route path="create" element={<XxxCreate />} />
       <Route path="edit/:id" element={<XxxEdit />} />
       <Route path="show/:id" element={<XxxShow />} />
   </Route>

4. VERIFICAR BACKEND
   Route::apiResource('xxx', XxxController::class) en routes/api.php

5. PROBAR
   - Menú lateral muestra el nuevo ítem
   - Navegación list → create → edit → show funciona
   - dataProvider resuelve /api/xxx correctamente
```

---

## Mapa de archivos relacionados

| Archivo | Relación con AppRouter |
| :--- | :--- |
| `resources/js/app.tsx` | Punto de entrada que monta `<AppRouter />` |
| `resources/views/app.blade.php` | Vista Blade que carga Vite + div#app |
| `routes/web.php` | Catch-all que sirve app.blade.php |
| `routes/api.php` | Endpoints REST consumidos por dataProvider |
| `resources/js/contexts/color-mode/index.tsx` | Tema global envuelto en AppRouter |
| `resources/js/components/header/index.tsx` | Header del layout administrativo |
| `resources/js/components/layout/AppSystemShell.tsx` | Contenedor CSS externo |
| `resources/js/components/auth/CustomLogin.tsx` | Vista de login |
| `resources/js/components/auth/CustomRegister.tsx` | Vista de registro |
| `resources/js/components/dashboard/CustomDashboard.tsx` | Dashboard principal |
| `resources/js/pages/home/index.tsx` | Landing page pública |
| `vite.config.ts` | Build: entry `resources/js/app.tsx` |

---

## Lecturas recomendadas

### Documentación interna

- [`Resources.md`](./Resources.md) — Arquitectura completa de resources (frontend ↔ API ↔ BD)
- [`tech_stack_inventory.md`](./tech_stack_inventory.md) — Versiones de todas las herramientas
- [`list-doc.md`](./list-doc.md) — Pantallas de listado
- [`create-doc.md`](./create-doc.md) — Pantallas de creación
- [`edit-doc.md`](./edit-doc.md) — Pantallas de edición
- [`show-doc.md`](./show-doc.md) — Pantallas de detalle

### Documentación oficial

- [Refine — Refine Component](https://refine.dev/docs/core/refine-component/)
- [Refine — Auth Provider](https://refine.dev/docs/core/providers/auth-provider/)
- [Refine — Data Provider](https://refine.dev/docs/core/providers/data-provider/)
- [Refine — React Router Integration](https://refine.dev/docs/routing/integrations/react-router/)
- [React Router — Routes](https://reactrouter.com/en/main/route/route)
- [Laravel Sanctum — API Token Authentication](https://laravel.com/docs/sanctum#api-token-authentication)
