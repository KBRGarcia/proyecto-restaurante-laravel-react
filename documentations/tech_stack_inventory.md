# Inventario Técnico del Sistema

> **Objetivo:** tener una referencia actualizada de todas las herramientas, frameworks y librerías del proyecto, con versiones exactas de los archivos de bloqueo (`composer.lock`, `package-lock.json`) y su rol dentro de la arquitectura.
>
> Documentación relacionada: [`AppRouter-doc.md`](./AppRouter-doc.md), [`Resources.md`](./Resources.md).

**Última actualización:** versiones extraídas de los lock files del repositorio. Las versiones de entorno (PHP, Node) reflejan el sistema donde se ejecutó la verificación.

---

## Cómo se conectan las tecnologías

```text
┌─────────────────────────────────────────────────────────────────────────┐
│  ENTORNO DE DESARROLLO                                                  │
│  PHP 8.3 + Composer │ Node.js + NPM │ Vite (dev server + build)         │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
        ┌───────────────────────┴───────────────────────┐
        │                                               │
┌───────▼──────────────┐                    ┌───────────▼──────────────┐
│  BACKEND              │                    │  FRONTEND                 │
│  Laravel 13           │   JSON /api        │  React 19 SPA             │
│  Sanctum (auth)       │ ◄─────────────────►│  Refine 5 (CRUD)         │
│  Eloquent (ORM)       │   Bearer Token     │  Ant Design 5 (UI admin)  │
│  Fortify (auth web)   │                    │  React Router 7 (rutas)   │
│  Pest (tests)         │                    │  Axios (HTTP)             │
└───────┬──────────────┘                    │  Tailwind 4 (estilos)     │
        │                                   └───────────┬──────────────┘
┌───────▼──────────────┐                                │
│  BASE DE DATOS        │                    ┌───────────▼──────────────┐
│  SQLite / MySQL       │                    │  BUILD                    │
│  (según .env)         │                    │  Vite 8 + laravel-vite    │
└───────────────────────┘                    │  React Compiler (Babel)  │
                                             └──────────────────────────┘
```

---

## Entorno y herramientas base

| Herramienta | Versión requerida (proyecto) | Versión detectada (entorno) | Rol |
| :--- | :--- | :--- | :--- |
| **PHP** | `^8.3` (composer.json) | 8.3.6 | Lenguaje del backend |
| **Composer** | — | 2.7.1 | Gestor de dependencias PHP |
| **Node.js** | — | 22.22.0 | Runtime JavaScript |
| **NPM** | — | 11.8.0 | Gestor de paquetes Node |

---

## Backend — Laravel Ecosystem

Versiones del `composer.lock` salvo donde se indique lo contrario.

### Framework y autenticación

| Paquete | Versión | Rol en el proyecto |
| :--- | :--- | :--- |
| **laravel/framework** | v13.4.0 | Framework principal: routing, Eloquent, validación, migraciones |
| **laravel/sanctum** | v4.3.1 | Autenticación API con tokens Bearer (`auth_token` en localStorage) |
| **laravel/fortify** | v1.36.2 | Lógica de autenticación web (registro, 2FA, reset password) — backend |

### Paquetes de aplicación

| Paquete | Versión | Rol en el proyecto |
| :--- | :--- | :--- |
| **laravel/tinker** | v3.0.0 | REPL interactivo (`php artisan tinker`) |
| **laravel/wayfinder** | v0.1.16 | Generación de rutas/actions TypeScript para el frontend |
| **laravel/mcp** | v0.6.5 | Model Context Protocol (integración con herramientas AI/IDE) |

### Desarrollo y calidad (PHP)

| Paquete | Versión | Rol en el proyecto |
| :--- | :--- | :--- |
| **laravel/pint** | v1.29.0 | Formateador de código PHP |
| **laravel/pail** | v1.2.6 | Visualización de logs en tiempo real (`php artisan pail`) |
| **laravel/sail** | v1.56.0 | Entorno Docker para desarrollo |

### Pruebas (PHP)

| Paquete | Versión | Rol en el proyecto |
| :--- | :--- | :--- |
| **pestphp/pest** | v4.4.5 | Framework de pruebas (sintaxis expresiva sobre PHPUnit) |
| **pestphp/pest-plugin-laravel** | v4.1.0 | Integración Pest + Laravel |
| **phpunit/phpunit** | 12.5.16 | Motor de pruebas unitarias |
| **mockery/mockery** | 1.6.12 | Mocking en tests |
| **fakerphp/faker** | v1.24.1 | Datos ficticios para factories/seeders |
| **nunomaduro/collision** | v8.9.3 | Reporte de errores formateado en CLI |

### Scripts Composer relevantes

| Script | Comando | Qué hace |
| :--- | :--- | :--- |
| `composer setup` | install + migrate + npm install + build | Configuración inicial del proyecto |
| `composer dev` | concurrently: `artisan serve` + `queue:listen` + `npm run dev` | Desarrollo local completo |
| `composer test` | `php artisan test` | Ejecuta suite de pruebas Pest |

---

## Frontend — React Ecosystem

Versiones del `package-lock.json`.

### Núcleo y arquitectura SPA

| Paquete | Versión | Rol en el proyecto |
| :--- | :--- | :--- |
| **react** | 19.2.4 | Librería UI principal |
| **react-dom** | 19.2.4 | Renderizado en el DOM |
| **typescript** | 6.0.3 | Tipado estático |
| **@refinedev/core** | 5.0.12 | Framework CRUD: hooks, providers, lógica de datos |
| **@refinedev/antd** | 6.0.3 | Integración Refine + Ant Design (layouts, hooks, tablas) |
| **@refinedev/simple-rest** | 6.0.1 | Data provider REST → convierte CRUD a HTTP |
| **@refinedev/react-router** | 2.0.4 | Integración Refine + React Router |
| **react-router** | 7.14.2 | Enrutamiento (core) |
| **react-router-dom** | 7.14.2 | Enrutamiento DOM (`BrowserRouter`, `Routes`, `Route`) |
| **@tanstack/react-query** | 5.99.2 | Caché y estado de peticiones (dependencia de Refine) |
| **axios** | 1.15.1 | Cliente HTTP (instancia con interceptor Bearer en AppRouter) |

### UI del panel administrativo

| Paquete | Versión | Rol en el proyecto |
| :--- | :--- | :--- |
| **antd** | 5.29.3 | Componentes UI del dashboard (Table, Form, Card, Layout, etc.) |
| **@ant-design/icons** | 5.6.1 | Íconos del menú lateral y formularios |

### Construcción y bundling

| Paquete | Versión | Rol en el proyecto |
| :--- | :--- | :--- |
| **vite** | 8.0.9 | Bundler y dev server |
| **@vitejs/plugin-react** | 6.0.1 | Soporte React en Vite (Fast Refresh) |
| **laravel-vite-plugin** | 3.0.1 | Integración Vite ↔ Laravel (HMR, manifest) |
| **@laravel/vite-plugin-wayfinder** | 0.1.7 | Generación de rutas Wayfinder en build |
| **babel-plugin-react-compiler** | 1.0.0 | React Compiler (optimización automática de renders) |

### Estilos

| Paquete | Versión | Rol en el proyecto |
| :--- | :--- | :--- |
| **tailwindcss** | 4.2.4 | Utility-first CSS (landing page, shell, vistas públicas) |
| **@tailwindcss/vite** | 4.2.4 | Plugin Tailwind para Vite |
| **lightningcss** | 1.32.0 | Compilador CSS (dependencia de Tailwind 4) |
| **tailwind-merge** | 3.5.0 | Fusión inteligente de clases Tailwind |
| **tw-animate-css** | 1.4.0 | Animaciones CSS para Tailwind |

### Mapas y geolocalización

| Paquete | Versión | Rol en el proyecto |
| :--- | :--- | :--- |
| **leaflet** | 1.9.4 | Librería de mapas |
| **react-leaflet** | 5.0.0 | Componentes React para Leaflet |
| **@types/leaflet** | 1.9.21 | Tipos TypeScript para Leaflet |

Usado en: módulo de sucursales (`BranchLocationPicker`, `LazyBranchLocationMap`).

### Utilidades frontend

| Paquete | Versión | Rol en el proyecto |
| :--- | :--- | :--- |
| **html-to-image** | 1.11.13 | Exportar DOM a imagen (facturas de órdenes) |
| **lucide-react** | 1.8.0 | Íconos SVG (uso complementario) |
| **class-variance-authority** | 0.7.1 | Variantes de componentes CSS |
| **clsx** | 2.1.1 | Clases CSS condicionales |
| **input-otp** | 1.4.2 | Input para códigos OTP (autenticación 2FA) |
| **concurrently** | 9.2.1 | Ejecutar servidor PHP + Vite en paralelo |
| **globals** | 17.5.0 | Definiciones globales para ESLint |

### Paquetes Web3 (futuro / experimental)

| Paquete | Versión | Rol en el proyecto |
| :--- | :--- | :--- |
| **web3** | 4.16.0 | Interacción con blockchain Ethereum |
| **web3modal** | 1.9.12 | Modal de conexión de wallets |

> Instalados en `package.json` pero sin uso activo en el panel administrativo actual.

---

## UI complementaria (vistas públicas y legacy)

Estos paquetes provienen del starter kit original (Laravel React Starter). Se usan principalmente en la **landing page** (`HomePage`) y componentes fuera del panel Refine/Ant Design:

| Paquete | Versión | Estado |
| :--- | :--- | :--- |
| **@headlessui/react** | 2.2.10 | Activo en vistas públicas |
| **@radix-ui/react-avatar** | 1.1.11 | Legacy / complementario |
| **@radix-ui/react-checkbox** | 1.3.3 | Legacy / complementario |
| **@radix-ui/react-collapsible** | 1.1.12 | Legacy / complementario |
| **@radix-ui/react-dialog** | 1.1.15 | Legacy / complementario |
| **@radix-ui/react-dropdown-menu** | 2.1.16 | Legacy / complementario |
| **@radix-ui/react-label** | 2.1.8 | Legacy / complementario |
| **@radix-ui/react-navigation-menu** | 1.2.14 | Legacy / complementario |
| **@radix-ui/react-select** | 2.2.6 | Legacy / complementario |
| **@radix-ui/react-separator** | 1.1.8 | Legacy / complementario |
| **@radix-ui/react-slot** | 1.2.4 | Legacy / complementario |
| **@radix-ui/react-switch** | 1.2.6 | Legacy / complementario |
| **@radix-ui/react-toggle** | 1.1.10 | Legacy / complementario |
| **@radix-ui/react-toggle-group** | 1.1.11 | Legacy / complementario |
| **@radix-ui/react-tooltip** | 1.2.8 | Legacy / complementario |

El **panel administrativo** (dashboard, CRUD) usa exclusivamente **Ant Design** + **Refine Ant Design**.

---

## Calidad de código (linting y formatting)

| Paquete | Versión | Rol |
| :--- | :--- | :--- |
| **eslint** | 9.39.4 | Linter JavaScript/TypeScript |
| **@eslint/js** | 9.39.4 | Configuración base ESLint |
| **eslint-config-prettier** | 10.1.8 | Desactiva reglas ESLint que conflictúan con Prettier |
| **eslint-plugin-react** | 7.37.5 | Reglas específicas de React |
| **eslint-plugin-react-hooks** | 7.1.1 | Reglas de hooks de React |
| **typescript-eslint** | 8.59.0 | Reglas TypeScript para ESLint |
| **prettier** | 3.8.3 | Formateador de código |
| **prettier-plugin-organize-imports** | 4.3.0 | Ordena imports automáticamente |
| **prettier-plugin-tailwindcss** | 0.7.2 | Ordena clases Tailwind en Prettier |

### Scripts NPM

| Script | Comando | Qué hace |
| :--- | :--- | :--- |
| `npm run dev` | `vite` | Servidor de desarrollo con HMR |
| `npm run build` | `vite build` | Build de producción |
| `npm run build:ssr` | `vite build && vite build --ssr` | Build con SSR (configurado, no usado en SPA actual) |
| `npm run lint` | `eslint . --fix` | Lint con auto-fix |
| `npm run format` | `prettier --write resources/` | Formatear código frontend |
| `npm run types` | `tsc --noEmit` | Verificación de tipos sin compilar |

---

## Mapa: qué tecnología se usa en cada capa

| Capa del sistema | Tecnologías principales | Archivos clave |
| :--- | :--- | :--- |
| **Servidor web** | Laravel 13, PHP 8.3 | `routes/web.php`, `routes/api.php` |
| **Autenticación API** | Sanctum 4 (Bearer Token) | `ApiAuthController`, `AppRouter.tsx` (authProvider) |
| **Autenticación web** | Fortify 1.36 | `config/fortify.php`, controllers en `app/Actions/Fortify/` |
| **ORM / BD** | Eloquent, migraciones | `app/Models/`, `database/migrations/` |
| **API REST** | Controladores + JsonResource | `app/Http/Controllers/`, `app/Http/Resources/` |
| **SPA (entrada)** | Vite → React 19 → AppRouter | `app.tsx`, `AppRouter.tsx` |
| **CRUD frontend** | Refine 5 + simple-rest | Hooks: `useTable`, `useForm`, `useShow` |
| **UI admin** | Ant Design 5 | Layouts, tablas, formularios, notificaciones |
| **UI pública** | Ant Design + Tailwind 4 | `HomePage`, `CustomLogin`, `CustomRegister` |
| **Enrutamiento** | React Router 7 | `<Routes>` en `AppRouter.tsx` |
| **HTTP cliente** | Axios 1.15 | `axiosInstance` con interceptor Bearer |
| **Mapas** | Leaflet + react-leaflet | `BranchLocationPicker`, `LazyBranchLocationMap` |
| **Tema** | Ant Design ConfigProvider + Tailwind dark | `contexts/color-mode/` |
| **Build** | Vite 8 + React Compiler | `vite.config.ts` |
| **Rutas tipadas** | Wayfinder | `resources/js/wayfinder/`, `resources/js/routes/` |
| **Tests backend** | Pest 4 + PHPUnit 12 | `tests/` |
| **Formateo PHP** | Pint 1.29 | Estilo de código backend |
| **Formateo JS** | Prettier 3.8 + ESLint 9 | Estilo de código frontend |

---

## Versiones objetivo vs documentación del proyecto

Las reglas del proyecto (`.cursor/rules`) referencian estas versiones como **objetivo de desarrollo**:

| Tecnología | Versión objetivo (reglas) | Versión instalada (lock file) |
| :--- | :--- | :--- |
| React | 19 | 19.2.4 |
| Laravel | 12 (reglas) / 13 (instalado) | 13.4.0 |
| Inertia.js | 2.0 (reglas) | No instalado como dependencia activa |
| PHP | 8.2 (reglas) / 8.3 (composer.json) | 8.3.6 (entorno) |
| Refine | 5.x | 5.0.12 (core) |
| Ant Design | 5.x | 5.29.3 |

> **Nota:** el proyecto evolucionó del starter kit Laravel + Inertia a una **SPA pura con Refine + React Router**. Quedan vestigios de Inertia en `config/inertia.php`, `HandleInertiaRequests.php` y el atributo `inertia` en `app.blade.php`, pero el frontend activo es `AppRouter.tsx` sin `@inertiajs/react`.

---

## Dependencias opcionales de plataforma

Binarios nativos instalados según el SO (en `optionalDependencies`):

| Paquete | Plataforma |
| :--- | :--- |
| `@rollup/rollup-linux-x64-gnu` | Linux x64 |
| `@rollup/rollup-win32-x64-msvc` | Windows x64 |
| `@tailwindcss/oxide-linux-x64-gnu` | Linux x64 |
| `@tailwindcss/oxide-win32-x64-msvc` | Windows x64 |
| `lightningcss-linux-x64-gnu` | Linux x64 |
| `lightningcss-win32-x64-msvc` | Windows x64 |

---

## Cómo verificar versiones actualizadas

```bash
# Versiones de entorno
php -v
node -v
npm -v
composer -V

# Versiones instaladas (PHP)
composer show --installed

# Versiones instaladas (Node)
npm ls --depth=0

# Verificar tipos TypeScript
npm run types

# Ejecutar tests
composer test
```

---

## Lecturas recomendadas

### Documentación interna

- [`AppRouter-doc.md`](./AppRouter-doc.md) — Cómo se ensamblan las tecnologías frontend
- [`Resources.md`](./Resources.md) — Arquitectura CRUD completa

### Documentación oficial

- [Laravel 13](https://laravel.com/docs)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [React 19](https://react.dev/)
- [Refine](https://refine.dev/docs/)
- [Ant Design 5](https://ant.design/components/overview/)
- [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/docs)
- [Pest PHP](https://pestphp.com/docs)
