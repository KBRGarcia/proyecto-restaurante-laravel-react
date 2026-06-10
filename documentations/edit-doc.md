# Arquitectura de las vistas Edit (Editar / Update)

> **Objetivo:** que cualquier persona entienda cómo funciona la pantalla de **edición** de un resource: desde que se cargan los datos existentes hasta que los cambios se persisten en la base de datos.
>
> Documentación relacionada: [`Resources.md`](./Resources.md), [`list-doc.md`](./list-doc.md), [`create-doc.md`](./create-doc.md), [`show-doc.md`](./show-doc.md).

---

## Qué es una vista Edit

La vista **Edit** es el formulario para **modificar un registro existente**. Se accede desde:

- El botón **Editar** (lápiz) del listado → `/<resource>/edit/:id`.
- El botón **Editar** del header en la vista show.
- La URL directa con un ID válido.

Responsabilidades:

- Cargar los datos actuales del registro (`GET`).
- Prellenar el formulario con esos valores.
- Enviar solo los campos modificados (o el formulario completo) vía `PUT`/`PATCH`.
- Manejar campos opcionales en edición (contraseña, imagen).
- Mostrar errores de validación del servidor.

Ubicación:

```text
resources/js/pages/<resource>/edit.tsx
```

> Los catálogos estáticos (`banks`, `payment-methods`) no tienen vista edit dedicada. Su única "edición" permitida es el toggle `active` desde el listado o show.

---

## Flujo completo de punta a punta

La edición tiene **dos fases** independientes: carga inicial y guardado.

### Fase 1: Al abrir la pantalla (carga de datos)

```text
[1] NAVEGADOR
    URL: /branches/edit/3
    → React Router extrae :id = 3

[2] FRONTEND — Montaje
    → useForm() detecta modo EDIT por la ruta (/edit/:id)
    → Automáticamente ejecuta dataProvider.getOne("branches", { id: 3 })

[3] HTTP
    GET /api/branches/3
    Header: Authorization: Bearer <token>

[4] LARAVEL
    → auth:sanctum
    → Route Model Binding: Branch $branch (id=3)
    → BranchController@show → JSON del registro

[5] FRONTEND
    → useForm recibe los datos y rellena el <Form>
    → Cada Form.Item.name se mapea al campo correspondiente del JSON
    → El usuario ve el formulario prellenado
```

### Fase 2: Al guardar cambios

```text
[1] USUARIO modifica campos y presiona "Guardar"
    → Ant Design valida rules locales
    → useForm dispara onFinish con el payload completo

[2] HTTP
    PUT /api/branches/3
    Body: JSON { name, address, city, phone, opening_time, active, ... }

[3] LARAVEL
    → BranchController@update(Request $request, Branch $branch)

[4] CONTROLADOR
    → Preprocesa datos (horas, booleanos)
    → $request->validate(Branch::rules(true), Branch::messages())
    → $branch->update($validated)
    → Establece update_date = now()

[5] BASE DE DATOS
    → UPDATE branches SET name=..., address=..., update_date=... WHERE id=3

[6] RESPUESTA
    HTTP 200 + JSON del registro actualizado

[7] FRONTEND
    → Notificación de éxito
    → Redirige al listado o show
```

### Flujo con relaciones (empleados)

```text
PUT /api/employees/5 con assignments[]

EmployeeController@update
  → Valida Employee::rules(true, $employee->id)
  → EmployeeAssignmentValidator::validate() si hay asignaciones
  → DB::transaction { $employee->update() + syncAssignments() }
  → Respuesta: EmployeeResource JSON 200
```

---

## Anatomía de un archivo edit.tsx

La estructura es casi idéntica a `create.tsx`, con la diferencia clave de que `useForm()` **sin argumentos** en ruta `/edit/:id` activa el modo edición automáticamente:

```tsx
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Row, Col, Card } from "antd";

export const XxxEdit = () => {
    const { formProps, saveButtonProps, query } = useForm();

    // query contiene los datos cargados del GET inicial
    const record = query?.data?.data;

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                {/* Mismos campos que create.tsx */}
            </Form>
        </Edit>
    );
};
```

En la práctica, muchos `edit.tsx` son **copias casi idénticas** de su `create.tsx` correspondiente (ej. `branches/edit.tsx` ≈ `branches/create.tsx`), porque comparten los mismos campos.

---

## Piezas clave

### 1) `useForm()` en modo Edit

| Retorno | Uso en edición |
| :--- | :--- |
| `formProps` | Form prellenado con datos del GET, onFinish → PUT |
| `saveButtonProps` | Botón "Guardar" con loading durante el PUT |
| `query` | Resultado del `GET /api/<resource>/:id` (datos originales) |
| `formLoading` | `true` mientras carga el registro inicial |

**Detección automática de modo:** Refine distingue create vs edit por la URL:

- `/branches/create` → modo create (sin GET previo).
- `/branches/edit/3` → modo edit (GET automático con id=3).

### 2) `<Edit saveButtonProps={...}>`

Layout de página Refine para edición:

- Título "Editar \<entidad\>".
- Botones del header: **Guardar**, **Eliminar** (si `canDelete: true`), **Ver** (show).
- Estado `loading` mientras carga el registro inicial y mientras guarda.

### 3) Reutilización de campos con Create

El proyecto mantiene **paridad de campos** entre create y edit:

| Aspecto | Create | Edit |
| :--- | :--- | :--- |
| Campos del formulario | Mismos `Form.Item` | Mismos `Form.Item` |
| Componentes compartidos | PhoneNumberField, BranchLocationPicker, etc. | Idénticos |
| `defaultFormValues` | Sí (valores iniciales) | No (viene del GET) |
| Validación frontend `rules` | Sí | Sí (mismas reglas) |
| Validación backend | `Model::rules()` | `Model::rules(true)` |

### 4) Campos opcionales en edición

Patrones comunes:

#### Contraseña opcional (users)

```text
Frontend: campo "Contraseña (Opcional)" sin rules required
Backend:  si password viene vacío → unset($validated['password'])
          si password tiene valor → Hash::make() y se guarda
```

#### Imagen existente (users, products)

```tsx
const record = query?.data?.data;
const resolvedImageUrl = imageUrl ?? record?.profile_picture ?? null;
```

- Si el usuario no sube nueva imagen, se mantiene la existente.
- Si sube una nueva, `beforeUpload` reemplaza el valor en el form.

#### Checkboxes y switches

En edit, los valores booleanos llegan del GET y se reflejan automáticamente en checkboxes con `valuePropName="checked"`.

---

## Componentes compartidos (mismos que Create)

| Componente | Uso en edición |
| :--- | :--- |
| `PhoneNumberField` | Teléfonos con validación de área |
| `StatusFormSwitch` | Toggle activo/inactivo |
| `ImageUploadField` / `createImageUploadHandler` | Reemplazar imagen con preview |
| `BranchLocationPicker` | Modificar coordenadas en mapa |
| `EmployeeAssignmentsField` | Editar asignaciones a sucursales |
| `useSelect` | Cambiar FK (categoría, usuario, etc.) |
| `useLinkedUserProfileFields` | Autocompletar desde usuario vinculado |

### Validación de asignaciones en edición

`useEmployeeAssignmentValidation` usa el `id` de la URL (`useParams`) como `employee_id` al llamar:

```text
POST /api/employees/validate-assignment
{ employee_id: 5, branch_id: 2, position: "branch_manager", assignments: [...] }
```

Esto excluye al empleado actual de las validaciones de conflicto.

---

## Diferencias clave: Create vs Edit

| Aspecto | Create | Edit |
| :--- | :--- | :--- |
| HTTP inicial | Ninguno | `GET /api/<resource>/:id` |
| HTTP al guardar | `POST /api/<resource>` | `PUT /api/<resource>/:id` |
| Código de respuesta | `201` | `200` |
| Validación backend | `Model::rules()` | `Model::rules(true)` |
| Reglas especiales | — | Email único excepto actual (`Rule::unique()->ignore($id)`) |
| ID en URL | No | `:id` resuelto por Route Model Binding |
| Layout Refine | `<Create>` | `<Edit>` |
| Botón eliminar en header | No | Sí (si `canDelete: true`) |

---

## Contrato del endpoint `PUT /api/<resource>/:id`

### Request

- **Método:** `PUT` (Refine/simple-rest usa PUT por defecto).
- **Body:** JSON con los campos del formulario (típicamente el registro completo).
- **Auth:** `Authorization: Bearer <token>`.

### Route Model Binding

Laravel resuelve automáticamente el parámetro de ruta:

```php
public function update(Request $request, Branch $branch)
// $branch ya es la instancia con id de la URL
```

Si el ID no existe → HTTP 404 automático.

### Validación en modo edición

```php
// Reglas base del modelo (pueden relajar campos required)
$validated = $request->validate(Modelo::rules(true), Modelo::messages());

// Reglas adicionales específicas de edición
$rules['email'] = ['required', 'email', Rule::unique('users')->ignore($user->id)];
```

El parámetro `$isUpdate = true` en `rules()` permite reglas distintas (ej. password opcional).

### Respuestas

| Código | Significado | Comportamiento en frontend |
| :--- | :--- | :--- |
| `200` | Actualizado exitosamente | Notificación + redirección |
| `401` | No autenticado | Deslogueo automático |
| `404` | ID no encontrado | Error en pantalla |
| `422` | Validación fallida | Errores en campos del formulario |

---

## Carga diferida (lazy loading)

El módulo `branches` carga sus vistas edit/create/show con `React.lazy`:

```tsx
// AppRouter.tsx
const BranchesEdit = lazy(() =>
    import('./pages/branches/edit').then((m) => ({ default: m.BranchesEdit }))
);

<Route path="edit/:id" element={
    <Suspense fallback={<BranchPageLoader />}>
        <BranchesEdit />
    </Suspense>
} />
```

Esto divide el bundle de JavaScript. El patrón de edición es idéntico; solo cambia cómo se importa el componente.

---

## Inventario de archivos edit.tsx

| Archivo | Resource | Particularidades |
| :--- | :--- | :--- |
| `pages/users/edit.tsx` | `users` | Contraseña opcional, foto existente |
| `pages/clients/edit.tsx` | `clients` | PhoneNumberField, usuario vinculado |
| `pages/employees/edit.tsx` | `employees` | EmployeeAssignmentsField, validación previa |
| `pages/branches/edit.tsx` | `branches` | BranchLocationPicker, lazy loaded |
| `pages/products/edit.tsx` | `products` | useSelect categories, imagen |
| `pages/categories/edit.tsx` | `categories` | Formulario simple |
| `pages/evaluations/edit.tsx` | `evaluations` | Referencias a entidades relacionadas |
| `pages/orders/edit.tsx` | `orders` | Múltiples FKs, NormalizesOrderClientLinks |
| `pages/order-details/edit.tsx` | `order-details` | FK a order y product |
| `pages/order-payments/edit.tsx` | `order-payments` | Datos de pago |
| `pages/payment-methods/edit.tsx` | `payment-methods` | Existe pero backend rechaza update complejo (solo active) |

---

## Actualización inline vs vista Edit

El proyecto tiene **dos formas** de modificar un registro:

| Mecanismo | Dónde | HTTP | Campos |
| :--- | :--- | :--- | :--- |
| **Inline update** | Listado (StatusSwitch) | `PUT` con registro completo | Solo cambia un campo (ej. `active`) |
| **Vista Edit** | `/edit/:id` | `PUT` con formulario completo | Cualquier campo editable |

Ambos terminan en el mismo `Controller@update`. La diferencia es la UX: el switch es rápido para toggles; el formulario es para cambios complejos.

---

## Cómo crear una nueva vista Edit (checklist)

```text
1. CREAR ARCHIVO
   resources/js/pages/<resource>/edit.tsx
   → Copiar estructura de create.tsx y adaptar

2. CONFIGURAR useForm (sin argumentos)
   const { formProps, saveButtonProps, query } = useForm();
   → El GET se dispara automáticamente

3. REUTILIZAR CAMPOS DE CREATE
   → Mismos Form.Item, mismos componentes compartidos
   → Quitar defaultFormValues (vienen del GET)

4. MANEJAR CAMPOS ESPECIALES
   → Contraseña opcional: sin rules required en frontend
   → Imágenes: resolvedImageUrl = nueva ?? existente
   → FKs: useSelect funciona igual que en create

5. VERIFICAR BACKEND
   → Modelo::rules(true) con reglas de edición
   → Controlador update() con validación y ignore de unique
   → Route Model Binding funcional

6. REGISTRAR EN AppRouter.tsx
   → resources[] con edit: "/<resource>/edit/:id"
   → <Route path="edit/:id" element={<XxxEdit />} />

7. PROBAR AMBAS FASES
   → Abrir /edit/:id → verificar prellenado correcto
   → Modificar y guardar → verificar UPDATE en BD
   → Error 422 → verificar errores en campos
```

---

## Notas de mantenimiento

### Mantener paridad create ↔ edit

Si se agrega un campo en `create.tsx`, debe agregarse también en `edit.tsx` con el mismo `name`. Si no, el campo no se podrá modificar después de crear el registro.

### PUT envía el formulario completo

Refine envía todos los campos del formulario en el PUT, no solo los modificados. El controlador debe estar preparado para recibir el registro completo y validarlo.

### Contraseña y confirmed

Si el usuario intenta cambiar la contraseña y `Model::rules(true)` incluye `confirmed`, el formulario necesita `password_confirmation`. Sin ese campo, el backend responderá 422.

---

## Lecturas recomendadas

### Documentación interna

- [`Resources.md`](./Resources.md) — Arquitectura completa
- [`create-doc.md`](./create-doc.md) — Formulario de creación (base compartida)
- [`list-doc.md`](./list-doc.md) — Origen del botón Editar e inline update
- [`show-doc.md`](./show-doc.md) — Vista de detalle (otro acceso a edit)
- [`AppRouter-doc.md`](./AppRouter-doc.md) — Rutas SPA

### Documentación oficial

- [Refine — useForm (Edit mode)](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-form/)
- [Refine — Edit](https://refine.dev/docs/ui-integrations/ant-design/components/basic-views/edit/)
- [Laravel 12 — Route Model Binding](https://laravel.com/docs/routing#route-model-binding)
- [Laravel 12 — Validation](https://laravel.com/docs/validation)
