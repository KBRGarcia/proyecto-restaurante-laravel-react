# Documentación: resources/js/pages/users/create.tsx

## ¿Qué es este archivo?
Este archivo define la vista y el formulario para "Crear" un nuevo registro de usuario. Es la pantalla que aparece al hacer clic en el botón principal "Crear Usuario" desde la lista.

## Métodos, Funciones y Variables

### 1. `useForm` (Hook de Refine / Ant Design)
- **Función**: Es exactamente el mismo hook que usamos en `edit.tsx`, pero su comportamiento interno cambia basándose en el contexto.
- **¿Qué hace diferente en Create?**:
  - Sabe que la ruta es "create" (porque se definió en `AppRouter`), así que **no intenta buscar datos previos** ni lee un ID de la URL.
  - Prepara un formulario completamente vacío.
  - Al hacer clic en Guardar, procesa el formulario y realiza automáticamente una petición **POST** a `/api/users` en Laravel.
  - Maneja de manera automática los errores devueltos por Laravel (ej. si el correo ya existe, marca el campo de correo en rojo y muestra el error).

### 2. Componente `<Create>` (de Refine)
- Es el equivalente a `<Edit>` o `<Show>`, pero su cabecera tiene como título automático "Create User".
- Recibe las `saveButtonProps` provenientes de `useForm` para vincular su botón de guardar del footer con nuestro formulario.

### 3. Componentes del Formulario (`Form`, `Form.Item`)
Funciona bajo los mismos principios que la vista de edición, con una diferencia técnica clave:
- **`rules` en la Contraseña**: Aquí el arreglo de reglas es más estricto (`rules={[{ required: true, min: 8 }]}`). Mientras que en la edición era opcional (para no forzar a reescribirla), al crear un usuario nuevo **es obligatorio** proporcionar una contraseña, y Ant Design verificará en tiempo real que tenga mínimo 8 caracteres.
- **Prop `initialValue`**: Para los `<Form.Item>` de `role` y `status`, se configura un valor por defecto usando `initialValue="cliente"` e `initialValue="activo"`. Esto significa que, al abrir la pantalla de creación, esos selectores ya vendrán pre-seleccionados para agilizar el trabajo del administrador.

## Mapeo Visual (Interfaz de Usuario)

- **Cabecera "Create User" y botón de volver**: Dibujados por `<Create>`.
- **Botón "Guardar"**: Dibujado automáticamente por `<Create>` e inyectado en el footer (abajo de todo). 
- **Estructura de inputs**: El `<Form>` vertical acomoda los campos de texto uno debajo del otro. Los textos arriba de cada input provienen de la propiedad `label` (Ej: `label="Apellido"`). El `name` es invisible para el usuario, pero es el puente de datos hacia Laravel.
