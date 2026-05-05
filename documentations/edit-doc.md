# Documentación: resources/js/pages/users/edit.tsx

## ¿Qué es este archivo?
Este archivo define la vista y el formulario para "Editar" un usuario existente. Es la pantalla a la que se accede al hacer clic en el botón verde del lápiz en la tabla o desde la vista de detalles.

## Métodos, Funciones y Variables

### 1. `useForm` (Hook de Refine / Ant Design)
- **Función**: Es un hook especializado de `@refinedev/antd` que fusiona la lógica de datos de Refine con el gestor de formularios de Ant Design.
- **¿Qué hace en Edit?**:
  - Al igual que `useShow`, toma el ID de la URL y hace un `GET` a `/api/users/{id}` para obtener los datos actuales del usuario.
  - Una vez obtenidos, rellena **automáticamente** los campos del formulario.
  - Al hacer clic en Guardar, intercepta los datos, los valida, y hace una petición `PUT` o `PATCH` automática a la API de Laravel para guardar los cambios.
- **Retorno**: 
  - `formProps`: Propiedades necesarias para configurar el componente `<Form>`.
  - `saveButtonProps`: Propiedades necesarias para configurar el botón de "Guardar" (maneja el estado de `loading` mientras se envía el formulario).

### 2. Componente `<Edit>` (de Refine)
- Es el contenedor de página que provee el título, un botón para regresar, y un footer.
- **Prop `saveButtonProps`**: Se le inyectan los props devueltos por `useForm`. Esto es lo que permite que el botón de Guardar en la esquina inferior derecha sepa a qué formulario debe hacer "Submit" y se ponga a girar cuando está enviando datos.

### 3. Componente `<Form>` y `<Form.Item>` (Ant Design)
- **`<Form {...formProps}>`**: El formulario principal. Recibe toda la lógica de validación e inicialización del hook.
- **`layout="vertical"`**: Configuración visual que pone las etiquetas (`label`) por encima de las cajas de texto en lugar de a un lado.
- **`<Form.Item>`**: Envuelve cada campo (input).
  - **Prop `name`**: **¡CRÍTICO!** Este valor (ej. `name={["email"]}`) debe ser idéntico a la columna en la base de datos de Laravel. Ant Design usa este `name` para autocompletar el campo al cargar y para enviar el dato correcto al guardar.
  - **Prop `rules`**: Un array de reglas de validación en frontend. `[{ required: true }]` impide enviar el formulario si está vacío, mostrando un texto en rojo.
  - **Prop `help`**: Texto de ayuda inferior (usado en el campo contraseña para indicar que es opcional).

### 4. Campos de Entrada (`Input`, `Select`)
- **`<Input>` / `<Input.Password>`**: Componentes de Ant Design para escribir texto normal o contraseñas ocultas con asteriscos.
- **`<Select>`**: Crea un menú desplegable. La prop `options` recibe un arreglo con los valores posibles (`value`) y cómo se mostrarán visualmente al usuario (`label`).

## Mapeo Visual (Interfaz de Usuario)

- **El contenedor, Título "Edit User" y botones de Atrás / Refrescar**: Creados por la etiqueta `<Edit>`.
- **Botón de Acción "Guardar"**: Creado por `<Edit>`, inyectado en el footer (parte baja de la pantalla).
- **El formulario**: Dibujado por las combinaciones de `<Form.Item>` e `<Input>`. Refine se encarga automáticamente de "Pintar" los datos antiguos (ej. el correo actual del usuario) apenas termina de cargar gracias a la vinculación entre el hook `useForm` y la prop `name`.
