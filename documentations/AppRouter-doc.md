# Documentación: AppRouter.tsx

## ¿Qué es este archivo?
El archivo `AppRouter.tsx` es el **corazón de la aplicación** en cuanto a navegación y configuración principal. Actúa como el punto de entrada principal donde se unen todas las piezas maestras del sistema: Refine (el framework base), React Router (el enrutador), Ant Design (la librería de componentes) y la configuración de Autenticación con el backend de Laravel.

## Métodos, Funciones y Variables

### 1. `API_URL` y `axiosInstance`
- **`API_URL = "/api"`**: Define la ruta base para todas las peticiones al backend de Laravel.
- **`axiosInstance`**: Es una instancia personalizada de Axios (cliente HTTP).
- **Interceptor `axiosInstance.interceptors.request.use`**: Este método intercepta cada petición que sale de la aplicación (frontend) hacia Laravel (backend) y le inyecta automáticamente el token de seguridad (`Bearer Token`) que está guardado en el `localStorage`. Esto garantiza que todas las peticiones estén autenticadas.

### 2. `authProvider`
Es un objeto fundamental requerido por Refine para manejar el flujo de sesión. Contiene métodos asíncronos que interactúan con Laravel Sanctum:
- **`login`**: Envía el email y la contraseña al endpoint `/login`. Si es exitoso, guarda el token y la información del usuario en el `localStorage` y redirige a la raíz (`/`).
- **`register`**: Envía los datos de registro a `/register`. Funciona de forma similar al login guardando la sesión al finalizar exitosamente.
- **`logout`**: Envía una petición a `/logout` para invalidar el token en Laravel, limpia el `localStorage` y redirige a la vista de login.
- **`check`**: Se ejecuta automáticamente en cada cambio de ruta protegida. Verifica si existe un token en el `localStorage`. Si no existe, bloquea el acceso y redirige a `/login`.
- **`getIdentity`**: Devuelve los datos del usuario logueado actualmente, buscando primero en el `localStorage` o haciendo una petición a `/me`.
- **`onError`**: Maneja errores globales HTTP. Si Laravel responde con un error `401 Unauthorized` (token expirado), desloguea al usuario automáticamente.

#### Qué endpoints toca realmente (backend)

Los endpoints están definidos en `routes/api.php` y el controlador de auth es `app/Http/Controllers/ApiAuthController.php`:

- **Login**: `POST /api/login`
  - valida credenciales y genera token con `createToken('auth_token')`
  - responde `{ user, token }`
- **Register**: `POST /api/register`
  - crea usuario y genera token
  - responde `{ user, token }` con **201**
- **Logout** (protegido): `POST /api/logout`
  - borra el **token actual** con `currentAccessToken()->delete()`
- **Me** (protegido): `GET /api/me`
  - retorna el usuario autenticado por el token

> Nota: este flujo usa **Sanctum con tokens personales (Bearer)**, no cookies/SPA-CSRF.

### 3. Componente `CustomTitle`
- **Función**: Es un pequeño componente funcional de React que renderiza el Logo y el nombre del proyecto ("Sabor & Tradición").
- **Prop `collapsed`**: Recibe un booleano que indica si el menú lateral (Sider) está minimizado o expandido. Si está colapsado, oculta el texto y solo muestra el logo.

### 4. Componente Principal `AppRouter`
Es el componente que se exporta y renderiza en la aplicación completa.
- **`<BrowserRouter>`**: El enrutador principal de React.
- **`<ColorModeContextProvider>`**: Un proveedor de contexto (Context API) que envuelve la app para proveer el tema global (Rojo) configurado en Ant Design.
- **`<Refine>`**: El componente maestro de Refine. Recibe la configuración principal a través de sus props:
  - `dataProvider`: Le indica a Refine cómo hablar con la API (usando `simple-rest` y nuestro `axiosInstance`).
  - `routerProvider`: Conecta Refine con React Router.
  - `authProvider`: Le pasa el objeto de autenticación que explicamos antes.
  - `resources`: **(¡MUY IMPORTANTE!)** Este arreglo (array) define todas las entidades del sistema (users, categories, products). Para cada entidad, se declaran sus rutas (`list`, `create`, `edit`, `show`) y metadatos como el ícono.

#### ¿Por qué `resources` es tan importante?

Porque es el “diccionario” que usa Refine para:

- construir el menú lateral automáticamente (ThemedSider)
- resolver navegación (por ejemplo `NavigateToResource`)
- mapear cada pantalla CRUD al nombre de resource usado por el `dataProvider`

Ejemplo (Usuarios):

- Resource `name="users"` → endpoints base `/api/users`
- List `/users` → `resources/js/pages/users/list.tsx`
- Create `/users/create` → `resources/js/pages/users/create.tsx`
- Edit `/users/edit/:id` → `resources/js/pages/users/edit.tsx`
- Show `/users/show/:id` → `resources/js/pages/users/show.tsx`
  
- **`<Routes>` y `<Route>`**: Definen el mapeo de URLs a Componentes en la pantalla.

## Mapeo Visual (Interfaz de Usuario)

A nivel de lo que el usuario ve en la pantalla, los siguientes componentes se encargan de generar la interfaz:

- **Menú Lateral (Sidebar / Sider)**: Se genera automáticamente a partir de la propiedad `resources` dentro de la etiqueta `<Refine>`. El componente que lo dibuja es `<ThemedSider>` (línea 322).
- **Título superior del Menú**: Está controlado por la propiedad `Title` que pasamos dentro del `ThemedSider` referenciando a nuestro componente `<CustomTitle />`.
- **Header (Barra Superior)**: Se renderiza usando el componente `<Header>` personalizado (importado en la línea 5) que se pasa como prop en `<ThemedLayout>`.
- **Vista de Login / Registro**: Controlado por las rutas fuera del `<ThemedLayout>`. Renderizan `<CustomLogin />` y `<CustomRegister />` permitiendo que ocupen toda la pantalla sin mostrar el menú lateral.
- **Vista del contenido principal**: Es renderizado por la etiqueta `<Outlet />`. Cualquier componente de recurso (ej. `UserList`, `ProductsCreate`) se inyectará en el espacio donde está este Outlet, respetando el menú lateral envolvente.
