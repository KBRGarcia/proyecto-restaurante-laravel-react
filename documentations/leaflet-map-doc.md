# Arquitectura del mapa Leaflet en Sucursales (branches)

> **Objetivo:** que cualquier persona entienda el flujo completo del mapa interactivo basado en **Leaflet** y **react-leaflet**: desde que el usuario hace clic en el mapa hasta que las coordenadas se guardan en la base de datos, pasando por formularios, hooks, carga diferida y validación backend.
>
> Documentación relacionada: [`create-doc.md`](./create-doc.md), [`edit-doc.md`](./edit-doc.md), [`show-doc.md`](./show-doc.md), [`Resources.md`](./Resources.md), [`tech_stack_inventory.md`](./tech_stack_inventory.md).

---

## Qué problema resuelve el mapa

El módulo de **Sucursales** (`branches`) necesita registrar la ubicación geográfica de cada local. El mapa permite:

- **Seleccionar** coordenadas haciendo clic o arrastrando un marcador (create/edit).
- **Visualizar** la ubicación de una sucursal existente (show).
- **Introducir** latitud y longitud manualmente en campos numéricos.
- **Abrir** la ubicación en Google Maps como enlace externo.

Las coordenadas se persisten en las columnas `latitude` y `longitude` de la tabla `branches`.

---

## Tecnologías involucradas

| Paquete | Versión (lock file) | Rol |
| :--- | :--- | :--- |
| **leaflet** | 1.9.4 | Librería de mapas JavaScript (motor del mapa, tiles, marcadores) |
| **react-leaflet** | 5.0.0 | Wrappers React para componentes Leaflet (`MapContainer`, `Marker`, etc.) |
| **@types/leaflet** | 1.9.21 | Tipos TypeScript para Leaflet |

Proveedor de tiles: **CARTO Voyager** (basado en datos de OpenStreetMap).

---

## Mapa de archivos del sistema

```text
resources/js/
├── lib/
│   └── branch-location.ts              ← Utilidades de coordenadas (parseo, validación, formato)
├── hooks/
│   ├── useDeferredMapMount.ts          ← Retrasa montaje del mapa (rendimiento)
│   └── useMapDisplayCoordinates.ts     ← Debounce entre inputs y mapa
├── components/map/
│   ├── BranchLocationMap.tsx           ← Componente Leaflet principal (núcleo)
│   ├── LazyBranchLocationMap.tsx       ← Carga diferida + CSS de Leaflet
│   ├── BranchLocationPicker.tsx        ← Integración con formulario Ant Design
│   ├── MapPlaceholder.tsx              ← Placeholder mientras carga
│   └── OpenGoogleMapsButton.tsx        ← Enlace externo a Google Maps
└── pages/branches/
    ├── create.tsx                      ← Usa BranchLocationPicker (editable)
    ├── edit.tsx                        ← Usa BranchLocationPicker (editable)
    ├── show.tsx                        ← Usa LazyBranchLocationMap (solo lectura)
    └── list.tsx                        ← Muestra coordenadas como texto (sin mapa)
```

---

## Vista general de la arquitectura

```text
┌─────────────────────────────────────────────────────────────────────────┐
│  VISTAS branches (create / edit / show)                                 │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
          ┌─────────────────────┴─────────────────────┐
          │                                           │
┌─────────▼──────────────┐              ┌─────────────▼─────────────┐
│  BranchLocationPicker   │              │  LazyBranchLocationMap    │
│  (create + edit)        │              │  (show, readOnly)         │
│  ├─ Form.useWatch       │              │  └─ sin onLocationChange  │
│  ├─ InputNumber lat/lng │              └─────────────┬─────────────┘
│  └─ LazyBranchLocationMap│                            │
└─────────┬──────────────┘                              │
          │                                             │
          └──────────────────┬──────────────────────────┘
                             │
              ┌──────────────▼──────────────┐
              │  LazyBranchLocationMap       │
              │  ├─ useDeferredMapMount      │
              │  ├─ React.lazy + Suspense    │
              │  └─ import leaflet.css       │
              └──────────────┬──────────────┘
                             │
              ┌──────────────▼──────────────┐
              │  BranchLocationMap           │
              │  ├─ MapContainer (Leaflet)   │
              │  ├─ TileLayer (CARTO OSM)   │
              │  ├─ Marker (arrastrable)    │
              │  ├─ MapClickHandler         │
              │  ├─ MapViewUpdater          │
              │  └─ MapReadyHandler          │
              └──────────────┬──────────────┘
                             │
              ┌──────────────▼──────────────┐
              │  branch-location.ts          │
              │  parseo, validación, formato │
              └──────────────┬──────────────┘
                             │
              ┌──────────────▼──────────────┐
              │  Form → POST/PUT /api/branches│
              │  BranchController → Eloquent  │
              │  tabla branches (lat, lng)  │
              └─────────────────────────────┘
```

---

## Tres modos de uso en las vistas branches

| Vista | Componente de mapa | Modo | Interacción |
| :--- | :--- | :--- | :--- |
| `create.tsx` | `BranchLocationPicker` | Editable | Clic, arrastre, inputs manuales |
| `edit.tsx` | `BranchLocationPicker` | Editable | Igual que create; precarga coords del GET |
| `show.tsx` | `LazyBranchLocationMap` | Solo lectura (`readOnly`) | Solo visualización + Google Maps |
| `list.tsx` | — (sin mapa) | Texto | `formatCoordinate()` en columnas |

---

## Flujo completo: seleccionar ubicación al crear una sucursal

```text
[1] USUARIO abre /branches/create
    → BranchesCreate renderiza <BranchLocationPicker /> dentro del formulario

[2] CARGA DIFERIDA DEL MAPA
    → LazyBranchLocationMap espera a que el contenedor sea visible (IntersectionObserver)
    → Muestra MapPlaceholder gris mientras tanto
    → Cuando shouldMount=true: React.lazy importa leaflet.css + BranchLocationMap
    → Suspense muestra "Cargando mapa..." con Spin

[3] RENDER DEL MAPA (BranchLocationMap)
    → parseCoordinate(latitude/longitude) — inicialmente null
    → Sin coordenadas válidas → centra en Caracas (10.4806, -66.9036), zoom 12
    → MapContainer monta el mapa Leaflet con tiles CARTO Voyager
    → MapReadyHandler llama map.invalidateSize() para corregir dimensiones
    → No hay Marker (aún no hay coordenadas)

[4] USUARIO hace clic en el mapa
    → MapClickHandler captura event.latlng (lat, lng del clic)
    → normalizeCoordinate() redondea a 8 decimales
    → onLocationChange(lat, lng) → handleLocationChange en BranchLocationPicker

[5] ACTUALIZACIÓN DEL FORMULARIO
    → setDisplayCoordinates(lat, lng) — actualiza mapa inmediatamente (sin debounce)
    → form.setFieldsValue({ latitude, longitude }) — actualiza campos Ant Design
    → Form.useWatch detecta cambio → re-render del mapa con Marker en nueva posición
    → MapViewUpdater centra el mapa en las nuevas coordenadas (zoom 15)

[6] ALTERNATIVA: USUARIO ARRASTRA EL MARCADOR
    → Marker draggable=true → event dragend
    → onLocationChange con nueva posición → mismo flujo que el clic

[7] ALTERNATIVA: USUARIO ESCRIBE COORDENADAS MANUALMENTE
    → InputNumber lat/lng cambia valor del Form
    → Form.useWatch actualiza latitude/longitude
    → useMapDisplayCoordinates aplica debounce de 350ms
    → Tras debounce: displayLatitude/displayLongitude cambian → mapa se actualiza

[8] USUARIO presiona "Guardar"
    → useForm envía POST /api/branches con { latitude, longitude, ... }
    → BranchController@store valida: nullable, numeric, between:-90,90 / -180,180
    → Branch::create() → INSERT en tabla branches

[9] BASE DE DATOS
    → latitude:  decimal(10,8) nullable
    → longitude: decimal(11,8) nullable
```

---

## Flujo completo: visualizar ubicación en show

```text
[1] USUARIO abre /branches/show/3
    → useShow() → GET /api/branches/3
    → record contiene latitude y longitude

[2] SECCIÓN "Ubicación y Contacto"
    → Descriptions muestra lat/lng formateados con formatCoordinate()
    → 8 decimales o "N/A" si son null

[3] SECCIÓN "Mapa de Ubicación"
    → <LazyBranchLocationMap
         latitude={record?.latitude}
         longitude={record?.longitude}
         readOnly
         height={360}
       />
    → Sin onLocationChange → mapa no es interactivo
    → scrollWheelZoom=false, Marker no draggable
    → Si hay coordenadas: Marker fijo + zoom 15
    → Si no hay coordenadas: centra en Caracas, zoom 12, sin Marker

[4] BOTÓN "Abrir en Google Maps"
    → buildGoogleMapsUrl(lat, lng)
    → https://www.google.com/maps/place/{lat},{lng}
    → Deshabilitado si no hay coordenadas válidas
```

---

## Componentes en detalle

### 1) `BranchLocationMap.tsx` — Núcleo Leaflet

Archivo central que renderiza el mapa. Usa **react-leaflet** como capa React sobre **Leaflet**.

#### Props

| Prop | Tipo | Default | Uso |
| :--- | :--- | :--- | :--- |
| `latitude` | `unknown` | — | Latitud (acepta number, string, null) |
| `longitude` | `unknown` | — | Longitud |
| `onLocationChange` | `(lat, lng) => void` | — | Callback al clic o arrastre (omitir en readOnly) |
| `readOnly` | `boolean` | `false` | Desactiva interacción |
| `height` | `number` | `320` | Altura del contenedor en px |

#### Configuración del marcador

Leaflet requiere configurar manualmente el ícono del marcador (problema conocido con bundlers):

```ts
const defaultMarkerIcon = new L.Icon({
    iconUrl: markerIcon,           // leaflet/dist/images/marker-icon.png
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
```

Sin esto, el marcador aparece roto en builds de Vite.

#### Capa de tiles (mapa base)

```ts
const OSM_TILE_URL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
```

| Parámetro | Valor | Motivo |
| :--- | :--- | :--- |
| Proveedor | CARTO Voyager | Estilo limpio, gratuito, basado en OpenStreetMap |
| `maxZoom` | 19 | Máximo detalle disponible |
| `detectRetina` | true | Tiles de alta resolución en pantallas Retina |
| `crossOrigin` | true | Permite cargar tiles desde dominio externo |
| `preferCanvas` | true | Renderizado Canvas (mejor rendimiento con muchos elementos) |

#### Subcomponentes internos

| Componente | Hook de react-leaflet | Función |
| :--- | :--- | :--- |
| `MapViewUpdater` | `useMap()` | Sincroniza centro y zoom cuando cambian las coordenadas externas. Evita re-centrados innecesarios comparando con la vista actual |
| `MapReadyHandler` | `useMap()` | Llama `map.invalidateSize()` tras montar para corregir dimensiones cuando el contenedor estaba oculto o en lazy load |
| `MapClickHandler` | `useMapEvents()` | Escucha `click` en el mapa y dispara `onLocationChange` con coordenadas normalizadas |
| `TileLayer` | — | Carga las imágenes del mapa base |
| `Marker` | — | Pin en la posición. `draggable` solo si no es readOnly y hay `onLocationChange` |

#### Lógica de centro y zoom

```text
Si hay coordenadas válidas (lat ∈ [-90,90], lng ∈ [-180,180]):
  → center = [latitude, longitude]
  → zoom = 15 (detalle de calle)
  → Marker visible

Si NO hay coordenadas válidas:
  → center = DEFAULT_MAP_CENTER [10.4806, -66.9036] (Caracas, Venezuela)
  → zoom = DEFAULT_MAP_ZOOM 12 (vista ciudad)
  → Sin Marker
```

---

### 2) `LazyBranchLocationMap.tsx` — Carga diferida

Envuelve `BranchLocationMap` con optimizaciones de rendimiento:

```text
[1] useDeferredMapMount(container)
    → No monta el mapa inmediatamente
    → Espera: IntersectionObserver (visible en viewport) O requestIdleCallback (CPU libre)
    → Mientras tanto: MapPlaceholder (caja gris)

[2] Cuando shouldMount = true:
    → React.lazy carga dinámicamente:
       a) import("leaflet/dist/leaflet.css")  — estilos del mapa
       b) import("@/components/map/BranchLocationMap")  — componente
    → Suspense con fallback MapPlaceholder + Spin "Cargando mapa..."

[3] BranchLocationMapLazy renderiza con las props recibidas
```

**Por qué existe:** Leaflet + CSS + tiles son pesados. En formularios largos (create/edit de branches), el mapa está al final de la página. Diferir el montaje evita bloquear el render inicial del formulario.

---

### 3) `BranchLocationPicker.tsx` — Integración con formulario

Conecta el mapa con el formulario Ant Design de create/edit.

| Pieza | Función |
| :--- | :--- |
| `Form.useFormInstance()` | Accede al formulario padre (`useForm` de Refine) |
| `Form.useWatch("latitude"/"longitude")` | Observa cambios en los inputs en tiempo real |
| `useMapDisplayCoordinates` | Separa coords del formulario (con debounce) de coords del mapa (inmediatas) |
| `handleLocationChange` | Al interactuar con el mapa: actualiza display + `form.setFieldsValue` |
| `InputNumber` lat/lng | Entrada manual con validación frontend (-90/90, -180/180, 8 decimales) |
| `OpenGoogleMapsButton` | Enlace externo usando coords del formulario |

#### Sincronización bidireccional

```text
Mapa → Formulario:
  Clic/arrastre → handleLocationChange → form.setFieldsValue({ latitude, longitude })

Formulario → Mapa:
  InputNumber cambia → Form.useWatch → useMapDisplayCoordinates (debounce 350ms)
  → displayLatitude/displayLongitude → LazyBranchLocationMap re-renderiza
```

El debounce evita que cada tecla pulsada en InputNumber provoque un re-centrado del mapa.

---

### 4) `MapPlaceholder.tsx` — Placeholder

Caja gris con borde que mantiene el espacio reservado del mapa:

- Sin loading: solo fondo `#f5f5f5` (evita layout shift).
- Con loading: `Spin` + texto "Cargando mapa...".

---

### 5) `OpenGoogleMapsButton.tsx` — Enlace externo

```ts
buildGoogleMapsUrl(lat, lng)
→ "https://www.google.com/maps/place/{lat},{lng}"
```

- Botón deshabilitado si no hay coordenadas válidas.
- Abre en nueva pestaña (`target="_blank"`).

---

## Utilidades: `branch-location.ts`

Archivo central de lógica de coordenadas (sin dependencia de Leaflet).

| Función / Constante | Propósito |
| :--- | :--- |
| `DEFAULT_MAP_CENTER` | `[10.4806, -66.9036]` — Caracas |
| `DEFAULT_MAP_ZOOM` | `12` |
| `COORDINATE_PRECISION` | `8` decimales (~1.1 mm de precisión) |
| `parseCoordinate(value)` | Convierte unknown → number o null |
| `isValidLatitude(lat)` | Entre -90 y 90 |
| `isValidLongitude(lng)` | Entre -180 y 180 |
| `hasValidCoordinates(lat, lng)` | Ambas válidas y no null |
| `getValidCoordinates(lat, lng)` | Retorna objeto o null |
| `normalizeCoordinate(value)` | Redondea a 8 decimales |
| `formatCoordinate(value)` | Formato para display ("N/A" si null) |
| `buildGoogleMapsUrl(lat, lng)` | URL de Google Maps o null |

---

## Hooks personalizados

### `useDeferredMapMount(container)`

Retrasa el montaje del mapa hasta que:

1. El contenedor es visible (`IntersectionObserver` con `rootMargin: 120px`), **o**
2. El navegador tiene tiempo libre (`requestIdleCallback` con timeout 600ms), **o**
3. Fallback: `setTimeout` de 150ms si no hay `requestIdleCallback`.

Retorna `shouldMount: boolean`. Una vez `true`, no vuelve a `false`.

### `useMapDisplayCoordinates(latitude, longitude)`

Mantiene un estado de display separado del formulario:

| Escenario | Comportamiento |
| :--- | :--- |
| Usuario escribe en InputNumber | Debounce 350ms antes de actualizar display |
| Usuario hace clic/arrastra en mapa | Actualización inmediata (`skipDebounceRef = true`) |

Esto evita que el mapa parpadee mientras el usuario tipea coordenadas.

---

## Flujo de datos: coordenadas hasta la base de datos

```text
┌──────────────┐     setFieldsValue      ┌──────────────┐
│  Leaflet Map │ ──────────────────────► │  Ant Design  │
│  (clic/drag) │                           │  Form        │
└──────────────┘                           │  latitude    │
       ▲                                   │  longitude   │
       │ displayCoords                     └──────┬───────┘
       │ debounce 350ms                           │
┌──────┴───────┐                                  │ onFinish (Guardar)
│ useMapDisplay│                                  ▼
│ Coordinates  │                           ┌──────────────┐
└──────────────┘                           │  Refine      │
┌──────────────┐                           │  useForm     │
│  InputNumber │ ─────────────────────────►│  POST/PUT    │
│  (manual)    │                           └──────┬───────┘
└──────────────┘                                  │
                                                  ▼
                                           ┌──────────────┐
                                           │  Laravel     │
                                           │  Branch::    │
                                           │  rules()     │
                                           └──────┬───────┘
                                                  │
                                                  ▼
                                           ┌──────────────┐
                                           │  MySQL/SQLite│
                                           │  branches    │
                                           │  .latitude   │
                                           │  .longitude  │
                                           └──────────────┘
```

### Validación backend

Archivo: `app/Models/Branch.php`.

```php
'latitude'  => ['nullable', 'numeric', 'between:-90,90'],
'longitude' => ['nullable', 'numeric', 'between:-180,180'],
```

Las coordenadas son **opcionales** — una sucursal puede crearse sin ubicación en el mapa.

### Esquema de base de datos

Archivo: `database/migrations/2025_11_25_155608_create_branches_table.php`.

```php
$table->decimal('latitude', 10, 8)->nullable();
$table->decimal('longitude', 11, 8)->nullable();
```

Cast en el modelo: `'latitude' => 'decimal:8'`, `'longitude' => 'decimal:8'`.

---

## Modo editable vs solo lectura

| Característica | Editable (create/edit) | Solo lectura (show) |
| :--- | :--- | :--- |
| `readOnly` | `false` (default) | `true` |
| `onLocationChange` | Presente | Omitido |
| Clic en mapa | Mueve marcador | Ignorado |
| Arrastre de marcador | Habilitado | Deshabilitado |
| Scroll zoom | Habilitado | Deshabilitado |
| Inputs lat/lng | Visibles (BranchLocationPicker) | No (solo Descriptions) |
| Componente padre | `BranchLocationPicker` | `LazyBranchLocationMap` directo |

---

## Optimizaciones de rendimiento

| Técnica | Dónde | Beneficio |
| :--- | :--- | :--- |
| `React.lazy` + `Suspense` | `LazyBranchLocationMap` | No carga Leaflet hasta que se necesita |
| `import("leaflet.css")` dinámico | `LazyBranchLocationMap` | CSS del mapa no bloquea carga inicial |
| `useDeferredMapMount` | `LazyBranchLocationMap` | No monta mapa hasta que es visible o CPU libre |
| `MapPlaceholder` | Mientras carga | Evita layout shift (espacio reservado) |
| `memo(BranchLocationMap)` | `BranchLocationMap` | Evita re-renders innecesarios |
| `useMapDisplayCoordinates` debounce | `BranchLocationPicker` | Evita re-centrados al tipear |
| `MapViewUpdater` con comparación | `BranchLocationMap` | Evita `setView` redundantes |
| `preferCanvas` | `MapContainer` | Mejor rendimiento de renderizado |
| Lazy routes en AppRouter | `branches/create`, `edit`, `show` | Todo el módulo branches se carga bajo demanda |

---

## Diagrama de secuencia: clic en el mapa

```text
Usuario          MapClickHandler    BranchLocationPicker    Ant Design Form    BranchLocationMap
  │                    │                    │                     │                  │
  │── clic en mapa ───►│                    │                     │                  │
  │                    │── onLocationChange►│                     │                  │
  │                    │                    │── setFieldsValue ──►│                  │
  │                    │                    │── setDisplayCoords ─┼─────────────────►│
  │                    │                    │                     │                  │
  │                    │                    │                     │── useWatch ─────►│
  │                    │                    │                     │                  │── re-render
  │                    │                    │                     │                  │── Marker nuevo
  │                    │                    │                     │                  │── MapViewUpdater
  │                    │                    │                     │                  │   centra zoom 15
```

---

## Cómo reutilizar el mapa en otro módulo

Si otro resource necesitara un selector de ubicación:

```text
1. REUTILIZAR utilidades
   → importar funciones de @/lib/branch-location.ts

2. OPCIÓN A: Solo visualización
   <LazyBranchLocationMap
       latitude={record.latitude}
       longitude={record.longitude}
       readOnly
       height={360}
   />

3. OPCIÓN B: Selector en formulario
   → Copiar patrón de BranchLocationPicker
   → Form.useWatch + useMapDisplayCoordinates + handleLocationChange
   → LazyBranchLocationMap con onLocationChange

4. BACKEND
   → Agregar columnas latitude/longitude en migración
   → Reglas de validación en el modelo
   → fillable + casts decimal:8
```

---

## Notas de mantenimiento

### Coordenadas opcionales

El mapa funciona sin coordenadas: muestra Caracas por defecto y no renderiza Marker. Al guardar, `latitude` y `longitude` pueden ser `null`.

### Precisión de 8 decimales

`COORDINATE_PRECISION = 8` se usa en frontend (`normalizeCoordinate`, `InputNumber precision`) y backend (`decimal:8`). No cambiar uno sin el otro.

### Tiles externos

El mapa depende de `basemaps.cartocdn.com`. Si el servicio no está disponible, el mapa aparece gris. Para producción crítica, considerar proveedor alternativo o tiles self-hosted.

### Iconos de Leaflet en Vite

Los imports de `leaflet/dist/images/marker-icon.png` son necesarios. Sin ellos, el bundler no resuelve las rutas por defecto de Leaflet.

### CSS de Leaflet

Debe importarse `leaflet/dist/leaflet.css` antes de renderizar el mapa. En este proyecto se hace dinámicamente en `LazyBranchLocationMap`.

---

## Lecturas recomendadas

### Documentación interna

- [`create-doc.md`](./create-doc.md) — Formulario de creación (donde vive BranchLocationPicker)
- [`edit-doc.md`](./edit-doc.md) — Formulario de edición (mismo picker, datos precargados)
- [`show-doc.md`](./show-doc.md) — Vista de detalle (mapa readOnly)
- [`tech_stack_inventory.md`](./tech_stack_inventory.md) — Versiones de Leaflet y react-leaflet

### Documentación oficial

- [Leaflet — Documentation](https://leafletjs.com/reference.html)
- [react-leaflet — Introduction](https://react-leaflet.js.org/docs/start-introduction/)
- [react-leaflet — MapContainer](https://react-leaflet.js.org/docs/api-map/)
- [CARTO Basemaps](https://docs.carto.com/faqs/basemaps)
