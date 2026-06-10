# Arquitectura de las vistas Show (Detalle / Show)

> **Objetivo:** que cualquier persona entienda cómo funciona la pantalla de **detalle** de un resource: desde que el usuario hace clic en "Ver" hasta que se muestran todos los datos de un registro leídos desde la base de datos.
>
> Documentación relacionada: [`Resources.md`](./Resources.md), [`list-doc.md`](./list-doc.md), [`create-doc.md`](./create-doc.md), [`edit-doc.md`](./edit-doc.md).

---

## Qué es una vista Show

La vista **Show** es la pantalla de **solo lectura** que presenta toda la información de un registro individual. Se accede desde:

- El botón **Ver** (ojo) del listado → `/<resource>/show/:id`.
- La URL directa con un ID válido.

Responsabilidades:

- Cargar un único registro por su ID.
- Presentar los datos de forma visual y organizada (sin formulario editable).
- Ofrecer acciones de navegación: **Editar** y **Eliminar** (desde el header del layout).
- Mostrar relaciones y datos calculados (labels, fechas formateadas, resúmenes).

Ubicación:

```text
resources/js/pages/<resource>/show.tsx
```

A diferencia de create/edit, la vista show **no envía datos** al backend (solo lectura). Su única petición HTTP es el `GET` inicial.

---

## Flujo completo de punta a punta

Ejemplo: el admin ve el detalle de la sucursal #3.

```text
[1] NAVEGADOR
    URL: /branches/show/3
    → React Router extrae :id = 3

[2] FRONTEND — Montaje
    → useShow() extrae id de la URL
    → dataProvider.getOne("branches", { id: 3 })

[3] HTTP
    GET /api/branches/3
    Header: Authorization: Bearer <token>

[4] LARAVEL
    → auth:sanctum
    → Route Model Binding: Branch $branch (id=3)
    → BranchController@show($branch)
    → return response()->json($branch)

[5] BASE DE DATOS
    → SELECT * FROM branches WHERE id = 3 LIMIT 1
    → (Opcional) Eager loading de relaciones: ->load(['products', 'employees'])

[6] RESPUESTA
    HTTP 200 + JSON del registro

[7] FRONTEND — Render
    → query.data.data contiene el record
    → <Show isLoading={isLoading}> muestra loading mientras carga
    → Cards, Descriptions, Tags y widgets renderizan cada campo
```

### Acciones disponibles desde el header de Show

El layout `<Show>` de Refine incluye botones en el header (según configuración del resource):

| Botón | Acción | Destino |
| :--- | :--- | :--- |
| Editar | Navega a edit | `/<resource>/edit/:id` |
| Eliminar | Borra el registro | `DELETE /api/<resource>/:id` → redirige al listado |

La visibilidad del botón eliminar depende de `meta.canDelete` en el resource de `AppRouter.tsx`.

---

## Anatomía de un archivo show.tsx

Estructura base compartida:

```tsx
import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Card, Descriptions, Tag, Row, Col, Typography, theme } from "antd";

export const XxxShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;
    const { token } = theme.useToken();

    return (
        <Show isLoading={isLoading}>
            {/* Header con título y tags de estado */}
            <Card>{record?.name}</Card>

            {/* Secciones de detalle */}
            <Descriptions bordered>
                <Descriptions.Item label="Campo">{record?.campo || "N/A"}</Descriptions.Item>
            </Descriptions>
        </Show>
    );
};
```

---

## Piezas clave

### 1) `useShow()` (Refine Core)

Hook que gestiona la consulta de un registro individual.

| Retorno | Uso |
| :--- | :--- |
| `query` | Objeto con `data`, `isLoading`, `isError`, `error` |
| `query.data.data` | El registro (JSON del backend) |
| `showId` | ID extraído de la URL |

**Detección automática:** al estar en `/<resource>/show/:id`, Refine infiere el resource y el id sin configuración adicional.

```tsx
const { query } = useShow();
const { data, isLoading } = query;
const record = data?.data;
```

No se necesita pasar `resource` ni `id` explícitamente si la URL sigue la convención de Refine.

### 2) `<Show isLoading={isLoading}>`

Layout de página Refine para detalle:

- Título "Mostrar \<entidad\>" o "Detalle de \<entidad\>".
- Botones del header: **Editar**, **Eliminar**, **Lista** (volver al listado).
- Muestra spinner mientras `isLoading === true`.
- El contenido (children) es completamente personalizado.

### 3) Presentación visual de datos

El proyecto usa varios patrones de UI para mostrar información:

#### Patrón A: Header card con título y tags

Card superior con color de acento, título principal y tags de estado:

```tsx
<Card style={getHeaderCardStyle("#2f54eb", token)}>
    <Title level={3}>{record?.name}</Title>
    <Tag color={record?.active ? "success" : "error"}>
        {record?.active_label || (record?.active ? "Activa" : "Inactiva")}
    </Tag>
</Card>
```

Usado en: `branches`, `clients`, `users`, `employees`, `products`.

#### Patrón B: Descriptions (tabla clave-valor)

```tsx
<Descriptions column={{ xs: 1, sm: 2 }} bordered>
    <Descriptions.Item label="Teléfono">{record?.phone || "N/A"}</Descriptions.Item>
    <Descriptions.Item label="Email">{record?.email || "No registrado"}</Descriptions.Item>
</Descriptions>
```

Ideal para datos textuales organizados en filas.

#### Patrón C: Stat widgets (tarjetas de métricas)

```tsx
<Card style={getStatWidgetStyle("rgba(47, 84, 235, 0.08)")}>
    <TeamOutlined />
    <div>Capacidad</div>
    <div>{record?.capacity_people ?? "N/A"}</div>
</Card>
```

Usado para KPIs visuales: capacidad, estado, horario, estadísticas de compra.

#### Patrón D: Componentes enriquecidos

| Componente | Uso |
| :--- | :--- |
| `<Tag>` | Estados, roles, categorías con color |
| `<Avatar>` | Fotos de perfil |
| `<DateField>` | Fechas formateadas (Refine) |
| Iconos Ant Design | Contexto visual (teléfono, email, ubicación) |

### 4) Estilos compartidos de show

Archivo: `resources/js/components/show/showPageStyles.ts`.

Funciones utilitarias para mantener consistencia visual entre todas las vistas show:

| Función | Propósito |
| :--- | :--- |
| `getHeaderCardStyle(color, token)` | Card superior con borde de acento |
| `getSectionCardStyle(token)` | Cards de sección estándar |
| `getStatWidgetStyle(bgColor)` | Widgets de métricas |
| `getInnerStatCardStyle(token)` | Cards internas de stats |
| `getDescriptionsLabelStyle(token)` | Estilo de labels en Descriptions |
| `getDescriptionsContentStyle(token)` | Estilo de contenido en Descriptions |
| `formatDateLabel(value)` | Formato de fecha `es-VE` |

### 5) Componentes especializados en show

| Componente | Archivo | Uso |
| :--- | :--- | :--- |
| `LazyBranchLocationMap` | `components/map/LazyBranchLocationMap.tsx` | Mapa de ubicación (solo lectura) |
| `OpenGoogleMapsButton` | `components/map/OpenGoogleMapsButton.tsx` | Abrir en Google Maps |
| `OrderInvoice` | `components/invoices/OrderInvoice.tsx` | Factura visual de una orden |

---

## Contrato de datos con el backend

### Endpoint

```text
GET /api/<resource>/:id
```

### Respuesta

JSON del registro. La forma depende de la estrategia del controlador:

| Estrategia | Contenido | Ejemplo |
| :--- | :--- | :--- |
| Modelo directo | Campos Eloquent + relaciones cargadas | `branches`, `users` |
| JsonResource | Campos enriquecidos + relaciones transformadas | `clients`, `employees`, `orders` |

### Campos enriquecidos del JsonResource

Cuando el backend usa `JsonResource`, la respuesta incluye campos calculados que la vista show consume directamente:

| Campo | Origen | Ejemplo |
| :--- | :--- | :--- |
| `*_label` | Método privado del Resource | `active_label: "Activa"`, `role_label: "Administrador"` |
| `*_formatted` | Formato de fecha/hora | `hire_date_formatted: "15/03/2025"` |
| `full_name` | Concatenación | `"Juan Pérez"` |
| `branches_summary` | Resumen de relaciones | `"Centro (Gerente), Norte (Cajero)"` |
| Relaciones anidadas | `->load(['user', 'assignments.branch'])` | `record.user.email`, `record.assignments[0].branch.name` |

### Campos sensibles ocultos

El modelo `User` define `$hidden = ['password']`, por lo que el JSON de show **nunca** incluye la contraseña. Verificar `$hidden` al mostrar datos de cualquier modelo.

### Relaciones cargadas en show

Algunos controladores cargan relaciones adicionales en `show()`:

```php
// UserController@show
$user->load(['client', 'employee']);
return response()->json([...$user->toArray(), 'identity_document' => ...]);

// EmployeeController@show
return response()->json(
    (new EmployeeResource($employee->load(['user', 'assignments.branch'])))->resolve($request)
);
```

---

## Variantes de show en el proyecto

### Tipo A: Detalle estándar con cards y descriptions

Presentación organizada en secciones. Ejemplos: `users`, `clients`, `categories`, `evaluations`.

### Tipo B: Detalle con mapa y ubicación

Incluye componente de mapa interactivo (solo lectura). Ejemplo: `branches/show.tsx` con `LazyBranchLocationMap`.

### Tipo C: Detalle con datos de negocio complejos

Muestra relaciones, historial y métricas. Ejemplos:

- **employees**: asignaciones a sucursales con posiciones.
- **orders**: estado de la orden, líneas de detalle, pagos, factura.
- **clients**: estadísticas de compras, origen, usuario vinculado.

### Tipo D: Catálogo estático (solo lectura)

Sin botón eliminar. Datos del Enum con toggle `active`. Ejemplos: `banks/show.tsx`, `payment-methods/show.tsx`.

---

## Inventario de archivos show.tsx

| Archivo | Resource | Particularidades |
| :--- | :--- | :--- |
| `pages/users/show.tsx` | `users` | Avatar, rol, fechas de registro/conexión |
| `pages/clients/show.tsx` | `clients` | Origen, stats de compras, usuario vinculado |
| `pages/employees/show.tsx` | `employees` | Asignaciones a sucursales, posiciones |
| `pages/branches/show.tsx` | `branches` | Mapa, horarios, servicios, lazy loaded |
| `pages/products/show.tsx` | `products` | Imagen, categoría, ingredientes |
| `pages/categories/show.tsx` | `categories` | Detalle simple |
| `pages/evaluations/show.tsx` | `evaluations` | Rating, comentario, entidades relacionadas |
| `pages/orders/show.tsx` | `orders` | Estado, líneas, pagos, OrderInvoice |
| `pages/order-details/show.tsx` | `order-details` | Producto, cantidad, subtotal |
| `pages/order-payments/show.tsx` | `order-payments` | Método, monto, estado de pago |
| `pages/banks/show.tsx` | `banks` | Catálogo estático, toggle active |
| `pages/payment-methods/show.tsx` | `payment-methods` | Catálogo estático, moneda |

---

## Relación Show ↔ Edit ↔ List

```text
List (/users)
  │
  ├── [Ver]    → Show (/users/show/3)     → GET /api/users/3
  │                │
  │                ├── [Editar]  → Edit (/users/edit/3)  → GET + PUT
  │                └── [Eliminar] → DELETE /api/users/3  → vuelve a List
  │
  ├── [Editar] → Edit (/users/edit/3)
  └── [Crear]  → Create (/users/create)
```

Las tres vistas comparten:

- El mismo resource name (`"users"`).
- El mismo endpoint `GET /api/users/:id` (show y edit lo usan).
- Los mismos datos del backend (mismos campos, mismas relaciones).

La diferencia es la **presentación**: show es solo lectura con UI rica; edit es formulario editable.

---

## Cómo crear una nueva vista Show (checklist)

```text
1. CREAR ARCHIVO
   resources/js/pages/<resource>/show.tsx

2. CONFIGURAR useShow
   const { query } = useShow();
   const { data, isLoading } = query;
   const record = data?.data;

3. ARMAR LAYOUT
   <Show isLoading={isLoading}>
     - Header card: título + tags de estado
     - Secciones con Descriptions o Cards
     - Fallback "N/A" para campos opcionales

4. USAR CAMPOS ENRIQUECIDOS
   - Preferir *_label y *_formatted del JsonResource si existen
   - Formatear fechas con formatDateLabel o <DateField>

5. COMPONENTES ESPECIALIZADOS (si aplica)
   - Mapa, factura, stats, relaciones anidadas

6. ESTILOS CONSISTENTES
   - Importar funciones de showPageStyles.ts
   - Usar theme.useToken() para colores del tema

7. VERIFICAR BACKEND
   - Controller@show carga relaciones necesarias
   - Campos sensibles ocultos ($hidden)
   - JsonResource transforma datos si aplica

8. REGISTRAR EN AppRouter.tsx
   - resources[] con show: "/<resource>/show/:id"
   - <Route path="show/:id" element={<XxxShow />} />

9. PROBAR
   - Abrir /show/:id desde listado
   - Verificar todos los campos se muestran
   - Botones Editar/Eliminar funcionan
   - ID inexistente → error 404
```

---

## Notas de mantenimiento

### Fallbacks para campos opcionales

Siempre usar fallback al renderizar:

```tsx
{record?.email || "No registrado"}
{record?.capacity_people ?? "N/A"}
```

Esto evita pantallas rotas cuando un campo es `null`.

### Coherencia con edit

Los campos mostrados en show deben corresponder a los campos editables en edit. Si se agrega un campo al formulario de edición, considerar mostrarlo también en show.

### Rendimiento del mapa

`LazyBranchLocationMap` usa carga diferida para no bloquear el render inicial. Patrón aplicable a cualquier componente pesado en show (gráficos, mapas, PDFs).

### Datos que vienen del listado vs show

El listado puede mostrar un subconjunto de campos (columnas de tabla). Show debe presentar **todos** los campos relevantes del registro, incluyendo relaciones y metadatos (`created_at`, `updated_at`, notas, descripciones).

---

## Lecturas recomendadas

### Documentación interna

- [`Resources.md`](./Resources.md) — Arquitectura completa de resources
- [`list-doc.md`](./list-doc.md) — Origen del botón Ver
- [`edit-doc.md`](./edit-doc.md) — Destino del botón Editar en show
- [`create-doc.md`](./create-doc.md) — Formulario de creación
- [`AppRouter-doc.md`](./AppRouter-doc.md) — Registro de rutas SPA

### Documentación oficial

- [Refine — useShow](https://refine.dev/docs/data/hooks/use-show/)
- [Refine — Show](https://refine.dev/docs/ui-integrations/ant-design/components/basic-views/show/)
- [Ant Design — Descriptions](https://ant.design/components/descriptions)
- [Ant Design — Card](https://ant.design/components/card)
- [Laravel 12 — Eloquent API Resources](https://laravel.com/docs/eloquent-resources)
