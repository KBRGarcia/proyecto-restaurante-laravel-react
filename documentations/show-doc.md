# Documentación: resources/js/pages/users/show.tsx

## ¿Qué es este archivo?
Este archivo define la vista de "Detalles" (Show/View) para un único usuario. Se accede a esta pantalla cuando el administrador hace clic en el botón "Ver" (el ícono del ojo azul) en la tabla de usuarios.

## Métodos, Funciones y Variables

### 1. `useShow` (Hook de Refine)
- **Función**: Es un hook proveído por `@refinedev/core`.
- **¿Qué hace?**: 
  - Extrae el ID del usuario directamente de la URL actual (gracias a la ruta configurada en `AppRouter`: `/users/show/:id`).
  - Hace una petición `GET` automática a la API de Laravel (`/api/users/{id}`).
  - Devuelve un objeto `query` que contiene el estado de la petición (cargando, error) y los datos retornados.

### 2. Extracción de Datos
- **`const { data, isLoading } = query;`**: Extraemos los datos principales y el estado de carga (booleano) de la respuesta.
- **`const record = data?.data;`**: Extraemos el objeto literal del usuario. Usamos el operador `?.` (Optional Chaining) para prevenir errores de JavaScript en caso de que `data` sea null mientras se está cargando.

### 3. Componente `<Show>` (de Refine)
- Es el contenedor principal (similar a `<List>`).
- **Prop `isLoading`**: Le indicamos a Refine que muestre un estado de carga (como un spinner o esqueleto) mientras esta variable sea `true`.

### 4. Componentes de Tipografía (Ant Design)
- **`Typography`**: Es la librería de textos de Ant Design. De ahí desestructuramos `Title` y `Text`.
- **`<Title level={5}>`**: Actúa como un encabezado `<h5>`. Se usa para poner la etiqueta o título del campo (ej. "Nombre").
- **`<Text>`**: Se usa para imprimir el valor real del campo.
- **`<EmailField>` y `<DateField>`**: Componentes visuales de Refine para mostrar emails como enlaces clickeables y fechas formateadas correctamente, respectivamente.

## Mapeo Visual (Interfaz de Usuario)

- **Contenedor Principal, Título y Botón de Atrás**: Todo esto es generado mágicamente por la etiqueta envolvente `<Show>`. Ella lee que estamos en el recurso "users" y automáticamente pone de título "Show User" y agrega un botón para volver a la tabla de lista.
- **Botones de Acción en el Header (Editar y Eliminar)**: Al igual que el botón de volver, la etiqueta `<Show>` incluye automáticamente en la cabecera superior derecha los botones de "Editar" y "Eliminar" basándose en los permisos, y pasan por defecto el `record.id`.
- **Vista de los datos del registro**: Todo lo que está dentro de `<Show> ... </Show>` es el contenido. Está estructurado de forma secuencial donde colocamos un `Title` (ej. "Rol") seguido del `Text` que extrae el valor de la base de datos (`{record?.role}`).
