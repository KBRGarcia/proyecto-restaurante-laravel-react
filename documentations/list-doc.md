# Arquitectura de las vistas List (Listado / Index)

> **Objetivo:** que cualquier persona entienda cómo funciona la pantalla de **listado** de un resource: desde que el usuario hace clic en el menú lateral hasta que la tabla muestra datos paginados desde la base de datos.
>
> Documentación relacionada: [`Resources.md`](./Resources.md) (arquitectura general), [`create-doc.md`](./create-doc.md), [`edit-doc.md`](./edit-doc.md), [`show-doc.md`](./show-doc.md).

---

## Qué es una vista List

La vista **List** es la **pantalla principal** de cada módulo CRUD. Es lo primero que ve el administrador al hacer clic en un ítem del menú lateral (por ejemplo, "Sucursales" → `/branches`).

Responsabilidades:

- Mostrar registros en una tabla paginada y ordenable.
- Ofrecer acceso rápido a **crear**, **ver**, **editar** y **eliminar** registros.
- Permitir cambios inline (por ejemplo, activar/desactivar con un switch) sin abrir el formulario de edición.

Ubicación en el proyecto:

```text
resources/js/pages/<resource>/list.tsx
```

---

## Flujo completo de punta a punta

Ejemplo: el admin abre "Sucursales" en el menú.

```text
[1] NAVEGADOR
    URL: /branches
    → React Router resuelve la ruta definida en AppRouter.tsx

[2] FRONTEND — Componente BranchesList
    → useTable({ syncWithLocation: true })
    → Refine detecta resource "branches" por la URL actual
    → dataProvider.getList("branches", { pagination, sorters, filters })

[3] HTTP
    GET /api/branches?_start=0&_end=10&_sort=id&_order=desc
    Header: Authorization: Bearer <token>

[4] LARAVEL — routes/api.php
    → Middleware auth:sanctum
    → BranchController@index

[5] CONTROLADOR
    → Branch::query()
    → Aplica búsqueda (search/q), filtros (active, is_main, city, etc.)
    → Ordena (_sort/_order)
    → $total = $query->count()
    → $branches = $query->offset($start)->limit($end - $start)->get()

[6] BASE DE DATOS
    → SELECT * FROM branches ORDER BY ... LIMIT ... OFFSET ...

[7] RESPUESTA
    Body: JSON (array de sucursales)
    Header: x-total-count: <total>

[8] FRONTEND — Render
    → tableProps alimenta <Table> de Ant Design
    → Refine calcula paginación con x-total-count
    → Se pintan columnas, switches y botones de acción
```

### Flujo de eliminación desde el listado

```text
[1] Usuario hace clic en botón Eliminar (CustomDeleteButton)
[2] Refine muestra confirmación
[3] dataProvider.deleteOne("branches", { id })
    → DELETE /api/branches/:id
[4] BranchController@destroy → $branch->delete() → HTTP 204
[5] Refine invalida caché y recarga la tabla automáticamente
```

### Flujo de actualización inline (switch de estado)

```text
[1] Usuario cambia el switch de "Activa/Inactiva" en una fila
[2] handleActiveChange() llama useInlineUpdate().update("branches", id, { ...record, active: checked })
[3] useUpdate() de Refine → PUT /api/branches/:id
[4] BranchController@update valida y persiste el cambio
[5] La fila se actualiza; el switch muestra loading mientras muta
```

---

## Anatomía de un archivo list.tsx

Todos los listados del proyecto siguen la misma estructura base:

```tsx
import { List, useTable } from "@refinedev/antd";
import { Table, Space } from "antd";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";

type RowType = { id: number; /* campos del backend */ };

export const XxxList = () => {
    const { tableProps } = useTable<RowType>({ syncWithLocation: true });

    return (
        <List headerButtons={() => <CustomCreateButton />}>
            <Table {...tableProps} rowKey="id">
                {/* Table.Column por cada columna */}
                <Table.Column title="Acciones" render={(_, record) => (
                    <Space>
                        <CustomShowButton recordItemId={record.id} />
                        <CustomEditButton recordItemId={record.id} />
                        <CustomDeleteButton recordItemId={record.id} />
                    </Space>
                )} />
            </Table>
        </List>
    );
};
```

---

## Piezas clave

### 1) `useTable()` (Refine Ant Design)

Hook central del listado. Sin escribir `fetch` manual, conecta la tabla con el `dataProvider`.

| Retorno | Uso |
| :--- | :--- |
| `tableProps` | Props listas para `<Table>`: `dataSource`, `pagination`, `onChange`, `loading` |
| `filters` | Estado de filtros activos (si se configuran) |
| `sorters` | Estado de ordenamiento activo |

**Por qué funciona automáticamente:** Refine infiere el resource desde la URL actual (`/branches` → `name: "branches"` registrado en `AppRouter.tsx`).

**`syncWithLocation: true`** (configurado globalmente en `AppRouter.tsx` y reforzado en cada `useTable`):

- Sincroniza página, orden y filtros con la URL.
- Permite compartir links con estado de tabla.
- Al volver desde show/edit, la tabla conserva su posición.

### 2) `<List>` (layout de página)

Contenedor Refine que provee:

- Título de la página (derivado del `meta.label` del resource).
- Área de botones del header (`headerButtons`).
- Card envolvente con estilo Ant Design.

Patrón habitual:

```tsx
<List headerButtons={() => <CustomCreateButton />}>
```

En catálogos de solo lectura (`banks`, `payment-methods`) **no** se incluye `CustomCreateButton`.

### 3) `<Table {...tableProps}>` (Ant Design)

| Prop | Obligatorio | Motivo |
| :--- | :--- | :--- |
| `rowKey="id"` | Sí | React necesita clave única por fila para render estable |
| `dataIndex` en columnas | Sí | Debe coincidir con el campo del JSON del backend |
| `render` | Opcional | Formatear valores, combinar campos, renderizar componentes |

Campos de Refine/Ant Design útiles en columnas:

- `<EmailField>` — emails con enlace `mailto:`
- `<DateField format="LL">` — fechas localizadas
- `<Tag>` — estados, roles, categorías
- `<Avatar>` — fotos de perfil o imágenes

### 4) Botones de acción (`CustomActionButtons`)

Archivo: `resources/js/components/buttons/CustomActionButtons.tsx`.

| Componente | Acción | Navegación / HTTP |
| :--- | :--- | :--- |
| `CustomCreateButton` | Crear registro | Navega a `/<resource>/create` |
| `CustomShowButton` | Ver detalle | Navega a `/<resource>/show/:id` |
| `CustomEditButton` | Editar | Navega a `/<resource>/edit/:id` |
| `CustomDeleteButton` | Eliminar | `DELETE /api/<resource>/:id` |

Todos envuelven los botones nativos de Refine (`ShowButton`, `EditButton`, etc.) con estilos consistentes del proyecto (colores, forma circular, sin texto).

### 5) Actualización inline

Dos patrones coexisten en el proyecto:

#### Patrón A: `useInlineUpdate` (recomendado, reutilizable)

Hook: `resources/js/hooks/useInlineUpdate.ts`.

```tsx
const { update, isUpdating } = useInlineUpdate();

const handleStatusChange = (checked: boolean, record: BranchRow) => {
    update("branches", record.id, { ...record, active: checked });
};

<StatusSwitch
    checked={record.active}
    loading={isUpdating(record.id)}
    onToggle={(checked) => handleActiveChange(checked, record)}
/>
```

Componente: `resources/js/components/table/StatusSwitch.tsx` — switch con etiqueta "Activo/Inactivo".

Usado en: `branches`, `employees`, `clients`, `banks`, `payment-methods`.

#### Patrón B: `useUpdate` directo

Usado en `users/list.tsx` con `Switch` de Ant Design y estado local `updatingId`.

Ambos patrones envían un `PUT` completo del registro (no un PATCH parcial). El controlador valida con `Model::rules(true)` y actualiza.

---

## Contrato de datos con el backend

### Query params que Refine envía automáticamente

| Parámetro | Propósito | Ejemplo |
| :--- | :--- | :--- |
| `_start` | Offset de paginación | `0` |
| `_end` | Límite exclusivo | `10` |
| `_sort` | Campo de ordenamiento | `name` |
| `_order` | Dirección | `asc` / `desc` |

### Header obligatorio

```text
x-total-count: <total_registros_sin_paginar>
```

Sin este header, la paginación de Ant Design no funciona correctamente.

### Filtros y búsqueda (soporte backend)

Cada controlador `index()` acepta filtros propios además de los params de Refine:

| Resource | Filtros soportados en backend |
| :--- | :--- |
| `users` | `search`/`q`, `role`, `status` |
| `branches` | `search`/`q`, `active`, `is_main`, `has_delivery`, `has_parking`, `city`, `state` |
| `products` | `search`/`q`, `category_id`, `status`, `is_special`, `user_id`, `client_id` |
| `employees` | `search`/`q`, `status`, `branch_id` |
| `clients` | `search`/`q`, `origin`, `status` |
| `orders` | `search`/`q`, `status`, `service_type`, `currency`, `user_id`, `client_id`, `branch_id` |
| `evaluations` | `search`/`q`, `rating` |
| `banks` / `payment-methods` | `search`/`q`, `active` |

> Si en el futuro se agregan filtros en la UI del listado, deben mapearse a estos query params o adaptarse en el controlador correspondiente.

### Campos que espera la tabla (por tipo de respuesta)

| Estrategia backend | Qué recibe el frontend | Ejemplo |
| :--- | :--- | :--- |
| Modelo Eloquent directo | Campos tal cual están en la BD | `branches`, `users`, `products` |
| Laravel JsonResource | Campos enriquecidos (`*_label`, `*_formatted`, relaciones) | `employees` (`full_name`, `branches_summary`), `clients` |

Definir un **tipo TypeScript** (`BranchRow`, `EmployeeRow`, etc.) al inicio de cada `list.tsx` documenta qué campos consume la tabla y facilita el autocompletado.

---

## Variantes de listado en el proyecto

### Tipo A: CRUD completo (mayoría)

Incluye botón crear, y acciones ver/editar/eliminar.

Resources: `users`, `clients`, `employees`, `branches`, `evaluations`, `products`, `categories`, `orders`, `order-details`, `order-payments`.

### Tipo B: Catálogo de solo lectura

Sin botón crear. Solo ver detalle y toggle de estado `active`.

| Resource | Botones disponibles | Notas |
| :--- | :--- | :--- |
| `banks` | Show + StatusSwitch | Datos de `App\Enums\Banks` |
| `payment-methods` | Show + StatusSwitch | Datos de `App\Enums\PaymentMethod` |

El `active` de catálogos estáticos se persiste en caché (`CatalogActiveRegistry`), no en base de datos.

### Tipo C: Listado con columnas enriquecidas

Algunos listados muestran datos calculados del JsonResource:

- **employees**: `full_name`, `branches_summary`, `hire_date_formatted`
- **clients**: `full_name`, `origin_label`, `status_label`
- **products**: `category_name`, `status_label`

Estos campos los genera `toArray()` del JsonResource en el backend; la tabla solo los renderiza.

---

## Inventario de archivos list.tsx

| Archivo | Resource | Tipo |
| :--- | :--- | :--- |
| `pages/users/list.tsx` | `users` | CRUD completo |
| `pages/clients/list.tsx` | `clients` | CRUD completo |
| `pages/employees/list.tsx` | `employees` | CRUD completo |
| `pages/branches/list.tsx` | `branches` | CRUD completo |
| `pages/evaluations/list.tsx` | `evaluations` | CRUD completo |
| `pages/products/list.tsx` | `products` | CRUD completo |
| `pages/categories/list.tsx` | `categories` | CRUD completo |
| `pages/orders/list.tsx` | `orders` | CRUD completo |
| `pages/order-details/list.tsx` | `order-details` | CRUD completo |
| `pages/order-payments/list.tsx` | `order-payments` | CRUD completo |
| `pages/banks/list.tsx` | `banks` | Solo lectura |
| `pages/payment-methods/list.tsx` | `payment-methods` | Solo lectura |

---

## Cómo crear un nuevo listado (checklist)

```text
1. CREAR ARCHIVO
   resources/js/pages/<resource>/list.tsx

2. DEFINIR TIPO
   type XxxRow = { id: number; ... }  → campos que devuelve GET /api/<resource>

3. CONFIGURAR useTable
   const { tableProps } = useTable<XxxRow>({ syncWithLocation: true });

4. ARMAR COLUMNAS
   - Una Table.Column por campo visible
   - render personalizado donde haga falta (tags, fechas, avatares)
   - Columna "Acciones" con CustomShowButton, CustomEditButton, CustomDeleteButton

5. HEADER
   - <CustomCreateButton /> si el resource permite creación
   - Omitir si es catálogo de solo lectura

6. INLINE UPDATE (opcional)
   - useInlineUpdate + StatusSwitch para campos toggleables

7. REGISTRAR EN AppRouter.tsx
   - Entrada en resources[] con list: "/<resource>"
   - <Route index element={<XxxList />} /> dentro del grupo protegido

8. VERIFICAR BACKEND
   - BranchController@index (o equivalente) devuelve x-total-count
   - Los dataIndex de las columnas coinciden con los campos del JSON
```

---

## Lecturas recomendadas

### Documentación interna

- [`Resources.md`](./Resources.md) — Arquitectura completa de resources
- [`AppRouter-doc.md`](./AppRouter-doc.md) — Registro de resources y rutas SPA
- [`create-doc.md`](./create-doc.md) — Pantalla de creación (destino del botón Crear)
- [`show-doc.md`](./show-doc.md) — Pantalla de detalle (destino del botón Ver)
- [`edit-doc.md`](./edit-doc.md) — Pantalla de edición (destino del botón Editar)

### Documentación oficial

- [Refine — useTable](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-table/)
- [Refine — List](https://refine.dev/docs/ui-integrations/ant-design/components/basic-views/list/)
- [Ant Design — Table](https://ant.design/components/table)
