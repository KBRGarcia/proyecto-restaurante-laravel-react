# Arquitectura de las vistas Create (Crear / Store)

> **Objetivo:** que cualquier persona entienda cómo funciona la pantalla de **creación** de un resource: desde que el usuario llena el formulario hasta que un nuevo registro se inserta en la base de datos.
>
> Documentación relacionada: [`Resources.md`](./Resources.md), [`list-doc.md`](./list-doc.md), [`edit-doc.md`](./edit-doc.md), [`show-doc.md`](./show-doc.md).

---

## Qué es una vista Create

La vista **Create** es el formulario para **registrar un nuevo elemento** en el sistema. Se accede desde:

- El botón **Crear** (`CustomCreateButton`) del listado.
- La URL directa `/<resource>/create`.

Responsabilidades:

- Recolectar datos del usuario mediante un formulario Ant Design.
- Validar en frontend (UX rápida).
- Enviar el payload al backend vía `POST`.
- Mostrar errores de validación del servidor (422).
- Redirigir o notificar al completar con éxito.

Ubicación:

```text
resources/js/pages/<resource>/create.tsx
```

> Los catálogos estáticos (`banks`, `payment-methods`) **no tienen** vista create — su `store()` responde 405.

---

## Flujo completo de punta a punta

Ejemplo: el admin crea una sucursal en `/branches/create`.

```text
[1] NAVEGADOR
    URL: /branches/create
    → React Router renderiza BranchesCreate (carga diferida con React.lazy)

[2] FRONTEND — Montaje del formulario
    → useForm({ defaultFormValues: { opening_time: "09:00", active: true, ... } })
    → Refine NO hace GET previo (modo create)
    → <Create> + <Form> con campos vacíos o con defaults

[3] USUARIO — Llena el formulario y presiona "Guardar"
    → Ant Design Form valida rules locales
    → useForm dispara onFinish
    → dataProvider.create("branches", { data: payload })

[4] HTTP
    POST /api/branches
    Header: Authorization: Bearer <token>
    Body: JSON { name, address, city, phone, opening_time, closing_time, ... }

[5] LARAVEL — routes/api.php
    → auth:sanctum
    → BranchController@store

[6] CONTROLADOR
    → Preprocesa datos (horas "09:00" → "09:00:00", booleanos)
    → $request->validate(Branch::rules(), Branch::messages())
    → Establece creation_date, update_date
    → Branch::create($validated)

[7] BASE DE DATOS
    → INSERT INTO branches (name, address, city, ...) VALUES (...)

[8] RESPUESTA
    HTTP 201 + JSON del branch creado

[9] FRONTEND
    → Refine muestra notificación de éxito
    → Redirige al listado o a la vista show (según configuración de Refine)
```

### Flujo con lógica de negocio adicional (empleados)

```text
POST /api/employees con assignments[]

EmployeeController@store
  → Valida Employee::rules()
  → EmployeeAssignmentValidator::validate() (reglas de gerente por sucursal)
  → DB::transaction { Employee::create() + syncAssignments() }
  → Respuesta: EmployeeResource JSON 201
```

---

## Anatomía de un archivo create.tsx

Estructura base compartida por todos los formularios de creación:

```tsx
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Row, Col, Card } from "antd";

export const XxxCreate = () => {
    const { formProps, saveButtonProps } = useForm({
        defaultFormValues: { /* valores iniciales opcionales */ },
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={18}>
                        <Card title="Datos principales">
                            <Form.Item label="Nombre" name="name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Create>
    );
};
```

---

## Piezas clave

### 1) `useForm()` (Refine Ant Design)

Hook que conecta Ant Design Form con el `dataProvider` de Refine.

| Retorno | Uso |
| :--- | :--- |
| `formProps` | Props del `<Form>`: valores, onFinish, manejo de errores 422 |
| `saveButtonProps` | Conecta el botón "Guardar" del layout `<Create>` con el submit real |

**Modo Create:** al estar en `/<resource>/create`, Refine **no** ejecuta `getOne`. El formulario arranca vacío (o con `defaultFormValues`).

**Errores 422:** cuando Laravel rechaza la validación, Refine mapea los errores del backend a los `Form.Item` correspondientes por el atributo `name`.

### 2) `<Create saveButtonProps={...}>`

Layout de página Refine para creación:

- Título "Crear \<entidad\>".
- Botón "Guardar" con estado `loading` automático durante el POST.
- Botón "Cancelar" que regresa al listado.

### 3) Mapeo `Form.Item` → JSON → Base de datos

Cada campo del formulario define la clave del payload:

| Prop del Form.Item | Rol |
| :--- | :--- |
| `name` | Clave del JSON enviado a Laravel → columna de la tabla |
| `rules` | Validación frontend (UX). **No reemplaza** la validación del modelo |
| `valuePropName` | Para checkboxes/switches: `"checked"` en lugar de `"value"` |
| `label` | Texto visible para el usuario |

```text
Form.Item name="phone"  →  JSON { "phone": "0212-1234567" }  →  columna `phone`
```

La **fuente de verdad** de validación es siempre el backend: `Model::rules()` y `Model::messages()`.

### 4) `defaultFormValues`

Valores iniciales del formulario sin necesidad de un GET previo.

Ejemplo en `branches/create.tsx`:

```tsx
useForm({
    defaultFormValues: {
        operation_days: "Monday to Sunday",
        opening_time: "09:00",
        closing_time: "22:00",
        is_main: false,
        has_delivery: true,
        has_parking: false,
        active: true,
    },
});
```

---

## Componentes compartidos del formulario

El proyecto centraliza campos repetidos en componentes reutilizables:

| Componente | Archivo | Uso |
| :--- | :--- | :--- |
| `PhoneNumberField` | `components/form/PhoneNumberField.tsx` | Teléfono con código de área venezolano |
| `StatusFormSwitch` | `components/form/StatusFormSwitch.tsx` | Switch activo/inactivo en formularios |
| `ImageUploadField` | `components/form/ImageUploadField.tsx` | Subida de imagen con preview |
| `BranchLocationPicker` | `components/map/BranchLocationPicker.tsx` | Selector de latitud/longitud en mapa |
| `EmployeeAssignmentsField` | `components/form/EmployeeAssignmentsField.tsx` | Asignaciones de empleado a sucursales |

### Subida de imágenes (patrón base64)

Utilidad: `resources/js/lib/image-upload.ts`.

```text
[1] Usuario selecciona archivo en <Upload>
[2] beforeUpload valida tipo (JPG/PNG/GIF/WebP) y tamaño (< 2 MB)
[3] FileReader convierte a Data URL: data:image/png;base64,...
[4] Se guarda en estado local para preview (Avatar)
[5] form.setFieldsValue({ image: base64Url })
[6] El POST envía el string base64 en el JSON
```

En backend, los controladores aceptan:

- Archivo real (`$request->hasFile('image')`) → convierte a base64.
- String base64 (`str_starts_with($value, 'data:image')`) → guarda directamente.

Usado en: `users` (`profile_picture`), `products` (`image`).

### Selectores de recursos relacionados (`useSelect`)

Para campos que referencian otro resource (FK):

```tsx
const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    optionLabel: "name",
    optionValue: "id",
});

<Select {...categorySelectProps} />
```

Refine hace `GET /api/categories` automáticamente para poblar las opciones.

Usado en: `products` (categoría), `employees` (usuario asociado), `orders` (cliente, sucursal, etc.).

### Campos vinculados a usuario (`useLinkedUserProfileFields`)

Hook: `resources/js/hooks/useLinkedUserProfileFields.ts`.

Cuando en `employees/create` se selecciona un `user_id`, los campos `first_name`, `last_name`, `email`, `phone` se autocompletan y deshabilitan desde el perfil del usuario.

### Validación de asignaciones de empleado

Hook: `resources/js/hooks/useEmployeeAssignmentValidation.ts`.

Antes de guardar una asignación, llama a:

```text
POST /api/employees/validate-assignment
```

para verificar reglas de negocio (un solo gerente general activo por sucursal, etc.).

---

## Variantes de formularios en el proyecto

### Tipo A: Formulario estándar

Cards con secciones, campos directos. Ejemplos: `categories`, `clients`, `evaluations`.

### Tipo B: Formulario con layout en columnas

Panel principal (lg=18) + panel lateral de opciones (lg=4). Ejemplo: `branches/create.tsx`.

### Tipo C: Formulario con componentes especializados

- **branches**: `BranchLocationPicker` (mapa interactivo).
- **employees**: `EmployeeAssignmentsField` + `useSelect` de usuarios.
- **products**: `useSelect` de categorías + upload de imagen.
- **users**: upload de foto + validación de contraseña con regex frontend.

### Tipo D: Formulario con relaciones anidadas

`orders/create.tsx` y `order-payments/create.tsx` manejan campos que referencian múltiples resources y datos de pago.

---

## Contrato del endpoint `POST /api/<resource>`

### Request

- **Content-Type:** `application/json` (salvo archivos multipart, poco usado actualmente).
- **Body:** objeto con los campos del `Form.Item` `name`.
- **Auth:** `Authorization: Bearer <token>`.

### Validación backend

```php
$validated = $request->validate(Modelo::rules(), Modelo::messages());
$registro = Modelo::create($validated);
return response()->json($registro, 201);
```

Reglas definidas en `app/Models/<Modelo>.php`:

- `rules(bool $isUpdate = false)` — en create se llama sin argumento o con `false`.
- `messages()` — errores en español.

### Respuestas

| Código | Significado | Comportamiento en frontend |
| :--- | :--- | :--- |
| `201` | Creado exitosamente | Notificación de éxito + redirección |
| `401` | No autenticado | `authProvider.onError` desloguea |
| `422` | Validación fallida | Errores en campos del formulario |
| `500` | Error del servidor | Notificación de error global |

### Preprocesamiento habitual en controladores

Algunos controladores transforman datos **antes** de validar o guardar:

| Transformación | Ejemplo | Controlador |
| :--- | :--- | :--- |
| Normalizar horas | `"09:00"` → `"09:00:00"` | `BranchController` |
| Convertir booleanos | `"1"` / `"0"` → `true` / `false` | `BranchController` |
| Imagen a base64 | Archivo o Data URL → string | `UserController`, `ProductController` |
| Fecha de creación | `creation_date = now()` | Varios controladores |
| Perfil vinculado | Crear `Client`/`Employee` al crear `User` | `UserController` |
| Transacción DB | Crear registro + relaciones | `EmployeeController`, `OrderController` |

---

## Inventario de archivos create.tsx

| Archivo | Resource | Particularidades |
| :--- | :--- | :--- |
| `pages/users/create.tsx` | `users` | Foto base64, contraseña con regex, StatusFormSwitch |
| `pages/clients/create.tsx` | `clients` | PhoneNumberField, origen del cliente |
| `pages/employees/create.tsx` | `employees` | useSelect users, EmployeeAssignmentsField |
| `pages/branches/create.tsx` | `branches` | BranchLocationPicker, defaultFormValues, lazy loaded |
| `pages/products/create.tsx` | `products` | useSelect categories, imagen base64 |
| `pages/categories/create.tsx` | `categories` | Formulario simple |
| `pages/evaluations/create.tsx` | `evaluations` | Referencias a user, client, product, order |
| `pages/orders/create.tsx` | `orders` | Múltiples FKs, datos de pago |
| `pages/order-details/create.tsx` | `order-details` | FK a order y product |
| `pages/order-payments/create.tsx` | `order-payments` | FK a order, método de pago |
| `pages/payment-methods/create.tsx` | `payment-methods` | Existe pero el backend rechaza store (405) |

---

## Cómo crear una nueva vista Create (checklist)

```text
1. CREAR ARCHIVO
   resources/js/pages/<resource>/create.tsx

2. CONFIGURAR useForm
   const { formProps, saveButtonProps } = useForm({ defaultFormValues: {...} });

3. ARMAR FORMULARIO
   - <Create saveButtonProps={saveButtonProps}>
   - <Form {...formProps} layout="vertical">
   - Form.Item con name que coincida con columnas del modelo
   - rules frontend para campos obligatorios (UX)

4. REUTILIZAR COMPONENTES
   - PhoneNumberField, StatusFormSwitch, ImageUploadField según necesidad
   - useSelect para FKs a otros resources

5. VERIFICAR BACKEND
   - Modelo tiene rules() y messages()
   - Controlador store() valida y crea correctamente
   - Route::apiResource registrado en routes/api.php

6. REGISTRAR EN AppRouter.tsx
   - resources[] con create: "/<resource>/create"
   - <Route path="create" element={<XxxCreate />} />

7. PROBAR FLUJO COMPLETO
   - Crear desde listado → guardar → verificar INSERT en BD
   - Provocar error 422 → verificar que errores aparecen en campos
```

---

## Notas de mantenimiento

### Validación frontend vs backend

Las `rules` del `Form.Item` mejoran la UX (feedback inmediato), pero **nunca** sustituyen `Model::rules()`. Si se agrega una regla en el modelo, el frontend puede seguir enviando datos inválidos hasta que Laravel responda 422.

### Coherencia de nombres

El `name` de cada `Form.Item` debe coincidir exactamente con:

1. La clave esperada por `Model::rules()`.
2. Un campo de `$fillable` del modelo.
3. Una columna de la migración.

### Contraseñas y campos confirmed

Si `Model::rules()` incluye `confirmed` para un campo (ej. `password`), el formulario **debe** incluir un `Form.Item` con `name="password_confirmation"`. De lo contrario, el backend responderá 422 al intentar guardar.

---

## Lecturas recomendadas

### Documentación interna

- [`Resources.md`](./Resources.md) — Flujo completo y capas del sistema
- [`list-doc.md`](./list-doc.md) — Origen del botón Crear
- [`edit-doc.md`](./edit-doc.md) — Formulario de edición (patrón similar)
- [`AppRouter-doc.md`](./AppRouter-doc.md) — Registro de rutas SPA

### Documentación oficial

- [Refine — useForm](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-form/)
- [Refine — Create](https://refine.dev/docs/ui-integrations/ant-design/components/basic-views/create/)
- [Refine — useSelect](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-select/)
- [Ant Design — Form](https://ant.design/components/form)
- [Laravel 12 — Validation](https://laravel.com/docs/validation)
