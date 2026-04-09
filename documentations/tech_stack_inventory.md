# Inventario Técnico del Sistema

A continuación, se detalla una lista exhaustiva de todas las herramientas, frameworks y librerías utilizadas en el proyecto, con sus versiones exactas detectadas en el entorno local y en los archivos de bloqueo (`composer.lock` y `package-lock.json`).

## 🛠️ Entorno y Herramientas Base

| Herramienta | Versión | Descripción |
| :--- | :--- | :--- |
| **PHP** | 8.3.6 | Lenguaje de programación del lado del servidor. |
| **Node.js** | 25.5.0 | Entorno de ejecución para JavaScript. |
| **Composer** | 2.7.1 | Gestor de dependencias de PHP. |
| **NPM** | 11.8.0 | Gestor de paquetes de Node.js. |

---

## 🐘 Backend (Laravel Ecosystem)

### Framework y Núcleo
- **Laravel Framework**: `v13.4.0`
- **Inertia Laravel**: `v3.0.2` (Integración con el frontend).
- **Laravel Fortify**: `v1.36.2` (Lógica de autenticación backend).

### Utilidades y Desarrollo
- **Laravel Tinker**: `v3.0.0` (REPL interactivo).
- **Laravel Wayfinder**: `v0.1.16` (Generación de tipos para rutas).
- **Laravel MCP**: `v0.6.5` (Model Context Protocol).
- **Laravel Sail**: `v1.56.0` (Entorno Docker).
- **Laravel Pail**: `v1.2.6` (Visualización de logs en tiempo real).
- **Laravel Pint**: `v1.29.0` (Formateador de código PHP).

### Pruebas (Testing)
- **Pest PHP**: `v4.4.5` (Framework de pruebas).
- **Pest Plugin Laravel**: `v4.1.0`
- **PHPUnit**: `12.5.16`
- **Mockery**: `1.6.12`
- **Faker**: `v1.24.1`
- **Collision**: `v8.9.3` (Manejo de errores en CLI).

---

## ⚛️ Frontend (React Ecosystem)

### Núcleo y Lenguaje
- **React**: `19.2.4`
- **React DOM**: `19.2.4`
- **TypeScript**: `v6.0.2`
- **Inertia React**: `v3.0.3`

### Construcción y Estilos
- **Vite**: `v8.0.7` (Bundler y entorno de desarrollo).
- **Tailwind CSS**: `v4.2.2` (Framework de estilos).
- **@tailwindcss/vite**: `4.2.2`
- **LightningCSS**: `1.32.0` (Compilador CSS ultrarrápido).

### Componentes de UI (Radix UI / Headless UI)
- **Headless UI**: `v2.2.10`
- **Lucide React**: `v1.7.0` (Iconografía).
- **Radix UI Core Components**:
    - Avatar: `v1.1.11`
    - Checkbox: `v1.3.3`
    - Collapsible: `v1.1.12`
    - Dialog / Modal: `v1.1.15`
    - Dropdown Menu: `v2.1.16`
    - Label: `v2.1.8`
    - Navigation Menu: `v1.2.14`
    - Select: `v2.2.6`
    - Separator: `v1.1.8`
    - Switch: `v1.2.6`
    - Toggle & Toggle Group: `v1.1.10` / `v1.1.11`
    - Tooltip: `v1.2.8`
    - Slot: `v1.2.4`

### Utilidades Frontend
- **Class Variance Authority (CVA)**: `v0.7.1` (Gestión de variantes de componentes).
- **Clsx**: `v2.1.1` (Utilidad para clases condicionales).
- **Tailwind Merge**: `v3.5.0` (Fusión inteligente de clases Tailwind).
- **Tw-animate-css**: `v1.4.0` (Animaciones).
- **Input OTP**: `v1.4.2` (Componente de entrada para códigos).
- **Concurrently**: `v9.2.1` (Ejecución de múltiples comandos).

---

## 🧹 Calidad de Código (Linting & Formatting)

- **ESLint**: `v9.39.4`
    - `@eslint/js`: `9.39.4`
    - `eslint-config-prettier`: `10.1.8`
    - `eslint-plugin-react`: `7.37.5`
    - `eslint-plugin-react-hooks`: `7.0.1`
    - `typescript-eslint`: `8.58.0`
- **Prettier**: `v3.8.1`
    - `prettier-plugin-organize-imports`: `4.3.0`
    - `prettier-plugin-tailwindcss`: `0.7.2`
- **React Compiler (Babel Plugin)**: `1.0.0`
