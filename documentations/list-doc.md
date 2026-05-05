# Documentación: resources/js/pages/users/list.tsx

## ¿Qué es este archivo?
Este archivo define la vista de "Listado" (Index/Tabla) para el recurso de Usuarios. Es la pantalla principal que ve el administrador cuando hace clic en "Usuarios" en el menú lateral. Muestra todos los usuarios registrados en una tabla paginada.

## Métodos, Funciones y Variables

### 1. `useTable` (Hook de Refine)
- **Función**: Es un hook mágico proveído por `@refinedev/antd`.
- **¿Qué hace?**: 
  - Se comunica automáticamente con la API (`/api/users` por defecto, según el nombre del recurso en `AppRouter`).
  - Maneja la paginación de los datos.
  - Maneja la ordenación (sorting) y el filtrado.
  - Devuelve un objeto `tableProps` que contiene toda la información necesaria para alimentar la tabla de Ant Design.
- **`syncWithLocation: true`**: Sincroniza el número de página actual y los filtros con la URL del navegador (ej. `?page=2`).

### 2. Componente `<List>` (de Refine)
- Es el contenedor o envoltura principal de la vista de listado.
- Se encarga automáticamente de proveer el título ("Usuarios" o "Users"), el recuadro blanco de fondo (Paper/Card) y el área de la cabecera.
- **Prop `headerButtons`**: Permite inyectar botones personalizados en la parte superior derecha de la tarjeta, como nuestro `<CustomCreateButton />`.

### 3. Componente `<Table>` (de Ant Design)
- Es la grilla que muestra los datos en filas y columnas.
- **Prop `{...tableProps}`**: Expande (inyecta) automáticamente todas las propiedades (datos, cargando, paginación) obtenidas del hook `useTable` hacia la tabla.
- **Prop `rowKey="id"`**: Le indica a React cuál es el identificador único de cada fila para optimizar el renderizado.

### 4. Componente `<Table.Column>`
Se encarga de definir cómo se renderiza cada columna individual de la tabla.
- **Prop `dataIndex`**: Debe coincidir exactamente con el nombre del campo en la respuesta JSON de Laravel (ej. `name`, `email`, `created_at`).
- **Prop `title`**: Es el encabezado que el usuario ve en la tabla.
- **Prop `render`**: (Opcional). Permite formatear cómo se ve el dato. Por ejemplo, se usa `<EmailField>` para convertir el texto plano en un enlace "mailto", y `<DateField format="LL">` para formatear la fecha a un string legible.

## Mapeo Visual (Interfaz de Usuario)

- **El cuadro contenedor y Título Superior**: Controlado por la etiqueta `<List>`.
- **El botón de "Crear Usuario" (Esquina superior derecha)**: Controlado por la función `headerButtons` dentro de `<List>`, que invoca al componente `<CustomCreateButton />`.
- **La tabla de datos, las páginas y el esqueleto de carga**: Controlado todo internamente por `<Table {...tableProps}>`.
- **Los botones de Ver, Editar y Eliminar de cada fila**: Controlados por la última columna (`<Table.Column dataIndex="actions">`). Usan la propiedad `render` para dibujar un componente `<Space>` (que separa los botones uniformemente) y dentro de él, invoca a nuestros botones personalizados (`CustomShowButton`, `CustomEditButton`, `CustomDeleteButton`), pasándole el `record.id` para que Refine sepa sobre qué registro exacto debe actuar al hacer clic.
