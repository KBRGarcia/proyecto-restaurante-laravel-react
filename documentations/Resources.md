# 📚 Documentación: Sistema de Resources

> **Audiencia:** Desarrolladores nuevos en el proyecto.  
> **Objetivo:** Entender cómo funciona el patrón "Resource" de punta a punta, desde la base de datos hasta la pantalla del usuario.

---

## 🗺️ Visión General: El Flujo Completo

Antes de entrar en detalle, entendamos cómo fluye la información. Cuando un usuario visita `/users` en el navegador, ocurre esto:

```
[Navegador/Usuario]
       ↓  Solicitud HTTP (GET /users)
[Rutas de Laravel - routes/web.php]
       ↓  Enruta al controlador correcto
[UserController.php → método index()]
       ↓  Consulta la base de datos
[User.php - Eloquent Model]
       ↓  Convierte los datos al formato correcto
[UserResource.php]
       ↓  Envía datos al frontend via Inertia.js
[users/index.tsx - Componente React]
       ↓  Renderiza la interfaz al usuario
[Pantalla del Usuario]
```

Cada archivo en este flujo tiene una responsabilidad única y muy específica. A continuación los revisamos uno a uno.

---

## 🛠️ Herramientas y Frameworks Utilizados

| Tecnología | Tipo | ¿Dónde se usa? | ¿Por qué? |
|---|---|---|---|
| **PHP 8.3** | Lenguaje Backend | Todos los archivos `.php` | Lenguaje del servidor, permite orientación a objetos moderna |
| **Laravel 13** | Framework Backend | Controllers, Models, Resources | Estructura MVC, ORM, validación, rutas |
| **Eloquent ORM** | ORM (Object-Relational Mapping) | `User.php` | Permite trabajar con la BD usando objetos PHP en lugar de SQL puro |
| **Inertia.js** | Puente Backend↔Frontend | `Inertia::render()` en controllers | Elimina la necesidad de una API REST separada |
| **React 19** | Framework Frontend | Archivos `.tsx` | Renderizado de interfaces reactivas |
| **TypeScript** | Lenguaje Frontend tipado | Archivos `.tsx` y `.ts` | Detecta errores en tiempo de compilación |
| **Tailwind CSS 4** | Framework CSS | Clases en archivos `.tsx` | Estilos utilitarios sin escribir CSS personalizado |
| **Radix UI** | Librería de componentes | `Card`, `Button`, `Input`, etc. | Componentes accesibles y sin estilos predefinidos |
| **Lucide React** | Iconos | `<Eye />`, `<Plus />`, etc. | Set de iconos SVG consistente |
| **Laravel Wayfinder** | Generador de rutas | Archivos en `routes/users/` | Genera rutas TypeScript a partir de rutas PHP |

---

## 📁 Estructura de Archivos del Módulo Users

```
proyecto/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── UserController.php        ← Controlador principal (backend)
│   │   └── Resources/
│   │       └── UserResource.php          ← Transformador/Configurador (backend)
│   └── Models/
│       └── User.php                      ← Modelo Eloquent (backend)
│
└── resources/js/
    ├── actions/App/Http/Controllers/
    │   └── UserController.ts             ← Rutas generadas (frontend - NO editar)
    ├── routes/users/
    │   └── index.ts                      ← Re-exportación de rutas (frontend)
    └── pages/users/
        ├── index.tsx                     ← Página: Listado de usuarios
        ├── create.tsx                    ← Página: Formulario de creación
        ├── edit.tsx                      ← Página: Formulario de edición
        └── show.tsx                      ← Página: Detalle de usuario
```

---

## 1. 📦 El Modelo: `app/Models/User.php`

### ¿Qué es un Modelo?
Un **Modelo Eloquent** es una clase PHP que representa una tabla de la base de datos. Cada instancia del modelo representa una fila en esa tabla.

### ¿Cuándo se usa?
El Modelo se usa en el **Controller** cada vez que necesitamos leer, crear, actualizar o eliminar datos de la BD.

### Imports y Por Qué

```php
use Illuminate\Database\Eloquent\Factories\HasFactory;  // Permite crear usuarios de prueba con datos falsos
use Illuminate\Database\Eloquent\Relations\HasMany;       // Define relaciones 1:N con otras tablas
use Illuminate\Foundation\Auth\User as Authenticatable;   // Clase base que provee autenticación (login, sesiones)
use Illuminate\Notifications\Notifiable;                  // Permite enviar emails/notificaciones al usuario
use Laravel\Fortify\TwoFactorAuthenticatable;             // Añade soporte para 2FA (Autenticación de dos pasos)
```

### Propiedades Clave

```php
// $fillable: Lista BLANCA de campos que pueden ser asignados masivamente.
// SEGURIDAD: Previene que un atacante envíe campos no deseados (ej: is_admin)
protected $fillable = [
    'name', 'last_name', 'email', 'password',
    'phone_number', 'address', 'profile_picture',
    'role', 'status', 'registration_date', 'last_connection',
];

// $hidden: Campos que NUNCA se incluyen en las respuestas JSON/serializadas.
// SEGURIDAD: Esencial para que la contraseña nunca llegue al frontend.
protected $hidden = ['password', 'two_factor_secret', 'remember_token'];

// $casts: Convierte automáticamente tipos de datos al leer/escribir.
// Por ej: 'password' => 'hashed' hashea la contraseña automáticamente al guardar.
protected function casts(): array {
    return [
        'email_verified_at' => 'datetime',  // String del BD → objeto Carbon de PHP
        'password' => 'hashed',             // Al guardar, hashea con bcrypt automáticamente
        'registration_date' => 'datetime',
    ];
}
```

### Métodos `rules()` y `messages()` — La Validación Centralizada

```php
// rules(): Define las reglas de validación.
// Recibe $isUpdate para ajustar reglas entre creación y edición.
// Por ej: al crear, el email debe ser único. Al editar, se ignora el usuario actual.
public static function rules(bool $isUpdate = false): array {
    $rules = [
        'name' => ['required', 'string', 'max:255'],
        'password' => ['required', 'string', 'min:8', 'max:16',
            'regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#\-_.])[A-Za-z\d@$!%*?&#\-_.]+$/',
            'confirmed', // Exige que exista password_confirmation con el mismo valor
        ],
        // ...
    ];
    return $rules;
}

// messages(): Mensajes de error en español para cada regla.
// Sin esto, Laravel mostraría mensajes en inglés por defecto.
public static function messages(): array {
    return [
        'name.required' => 'El nombre es obligatorio.',
        'password.regex' => 'La contraseña debe contener al menos una mayúscula...',
        'password.confirmed' => 'La confirmación de la contraseña no coincide.',
        // ...
    ];
}
```

> **¿Por qué están en el Modelo y no en el Controller?**  
> Centralizar las reglas de validación en el Modelo evita duplicar código. Si la regla cambia, solo cambia en un lugar.

---

## 2. 🎛️ El Resource: `app/Http/Resources/UserResource.php`

### ¿Qué es un Resource?
Un **Laravel API Resource** es una capa de transformación que convierte un Modelo Eloquent en un array/JSON con el formato exacto que necesita el frontend. También actúa como un **configurador centralizado** para el frontend.

### ¿Cuándo se usa?
- En el **Controller**, justo antes de enviar datos a Inertia.
- Nunca se llama directamente desde el frontend.

### Imports y Por Qué

```php
use Illuminate\Http\Request;                        // Objeto que representa la solicitud HTTP entrante
use Illuminate\Http\Resources\Json\JsonResource;    // Clase base de Laravel Resources. Provee toArray(), collection(), etc.
```

### Método `toArray()` — Transformación de Datos

```php
// Se ejecuta automáticamente cuando Laravel serializa el Resource.
// $this -> hace referencia al modelo User cargado.
public function toArray(Request $request): array {
    return [
        'id' => $this->id,
        'name' => $this->name,
        'full_name' => $this->name . ' ' . $this->last_name,  // Campo calculado: NO existe en la BD
        'role_label' => $this->getRoleLabel(),                  // Traduce 'admin' → 'Administrador'
        'status_label' => $this->getStatusLabel(),
        'registration_date' => $this->registration_date?->format('Y-m-d H:i:s'), // Formato fecha
        // NOTA: 'password' está en $hidden del modelo, así que NUNCA aparece aquí.
    ];
}
```

**¿Por qué esto es importante?**  
Sin el Resource, el Controller enviaría el modelo crudo con todos sus campos internos, incluyendo campos que el frontend no necesita o no debería ver. El Resource actúa como un filtro y transformador.

### Métodos Estáticos de Configuración

Estos métodos son una extensión personalizada del patrón Resource. No son parte del Resource estándar de Laravel, sino una convención del proyecto para centralizar la configuración del frontend.

#### `formFields()` — Define los Campos del Formulario

```php
public static function formFields(): array {
    return [
        [
            'name' => 'name',           // Nombre del campo (coincide con el atributo del Modelo)
            'label' => 'Nombre',        // Texto visible en la etiqueta <label>
            'type' => 'text',           // Tipo del <input>: text, email, password, select, file, textarea
            'placeholder' => '...',     // Texto de ayuda dentro del campo
            'required' => true,         // ¿Es obligatorio?
            'validation' => '...',      // Referencia de validación (documentación, no se ejecuta en frontend)
            'grid_cols' => 6,           // Cuántas columnas ocupa en la grilla de 12 columnas
            'help_text' => '...',       // Texto de ayuda debajo del campo
            'show_on_edit' => false,    // ¿Mostrar en modo edición? (false = solo en creación)
            'options' => [...],         // Para campos tipo 'select': lista de opciones
        ],
        // ... más campos
    ];
}
```

**¿Por qué esto es útil?**  
El componente React (`create.tsx`, `edit.tsx`) lee este array y **genera dinámicamente** todos los campos del formulario. Si necesitamos agregar un campo nuevo al formulario de usuarios, solo editamos `UserResource::formFields()` y automáticamente aparece en create Y edit sin tocar el frontend.

#### `tableColumns()` — Columnas de la Tabla

```php
public static function tableColumns(): array {
    return [
        ['key' => 'full_name', 'label' => 'Nombre Completo', 'sortable' => true, 'visible' => true],
        ['key' => 'role_label', 'label' => 'Rol', 'sortable' => true, 'visible' => true],
        // ...
    ];
}
```

Define qué columnas muestra la tabla en `index.tsx`, si son ordenables (sortable) y si son visibles por defecto.

#### `filterFields()` — Campos de Filtro/Búsqueda

```php
public static function filterFields(): array {
    return [
        ['name' => 'search', 'label' => 'Buscar', 'type' => 'text', ...],
        ['name' => 'role', 'label' => 'Rol', 'type' => 'select', 'options' => [...]],
        // ...
    ];
}
```

Define los controles de filtrado que aparecen arriba de la tabla (barra de búsqueda, dropdowns de filtro).

### Uso Estático vs. Instanciado

```php
// Uso ESTÁTICO: Para listas y configuraciones (sin modelo específico)
UserResource::collection($users);    // Transforma una colección de usuarios
UserResource::formFields();          // Obtiene la configuración del formulario
UserResource::tableColumns();        // Obtiene la configuración de columnas

// Uso INSTANCIADO: Para un solo usuario específico
new UserResource($user);             // Transforma un único usuario
(new UserResource($user))->resolve() // Transforma y retorna el array directamente
```

---

## 3. 🎮 El Controlador: `app/Http/Controllers/UserController.php`

### ¿Qué es un Controlador?
El **Controlador** es el intermediario entre las rutas HTTP y la lógica de la aplicación. Recibe las solicitudes del navegador, coordina los Modelos y Resources, y devuelve una respuesta.

### ¿Cuándo se usa?
Siempre que el usuario navega a una URL del módulo o envía un formulario.

### Imports y Por Qué

```php
use App\Http\Resources\UserResource;         // Para transformar datos antes de enviarlos al frontend
use App\Models\User;                          // Para consultar/modificar la tabla de usuarios
use Illuminate\Http\Request;                  // Objeto con todos los datos de la solicitud HTTP (formularios, parámetros)
use Illuminate\Support\Facades\Hash;          // Para hashear contraseñas de forma segura
use Illuminate\Validation\Rule;               // Para reglas de validación avanzadas (ej: unique ignorando el ID actual)
use Inertia\Inertia;                          // Para renderizar componentes React desde el backend
```

### Los 7 Métodos CRUD

#### `index()` — Listar Todos los Usuarios (`GET /users`)
```php
public function index(Request $request) {
    $query = User::query();  // Inicia query builder: SELECT * FROM users

    // Aplica filtros dinámicos según parámetros de la URL
    if ($request->filled('search')) {
        $query->where('name', 'like', "%{$request->search}%")
              ->orWhere('email', 'like', "%{$request->search}%");
    }

    $users = $query->paginate(10)->withQueryString(); // Pagina Y mantiene filtros en URLs

    return Inertia::render('users/index', [
        'users' => UserResource::collection($users),   // Transforma colección completa
        'columns' => UserResource::tableColumns(),     // Configuración de columnas para la tabla
        'filters' => UserResource::filterFields(),     // Configuración de los filtros
        'pagination' => [...],                         // Info de paginación para los botones
    ]);
}
```

**`Inertia::render('users/index', [...])`**: Esto es el equivalente a `return view()` en Laravel clásico, pero en lugar de devolver HTML renderizado en el servidor, le dice a Inertia.js que renderice el componente React `resources/js/pages/users/index.tsx` y le pase los datos como `props`.

#### `create()` — Mostrar Formulario de Creación (`GET /users/create`)
```php
public function create() {
    return Inertia::render('users/create', [
        'fields' => UserResource::formFields(), // Solo necesita la configuración del formulario
    ]);
}
```

#### `store()` — Guardar Nuevo Usuario (`POST /users`)
```php
public function store(Request $request) {
    // 1. Validar los datos (si falla, regresa al formulario con errores automáticamente)
    $validated = $request->validate(User::rules(), User::messages());

    // 2. Hashear la contraseña antes de guardar (NUNCA guardar texto plano)
    $validated['password'] = Hash::make($validated['password']);

    // 3. Manejar la imagen (convierte a base64 para almacenar en BD)
    if ($request->hasFile('profile_picture')) {
        $image = $request->file('profile_picture');
        $imageData = base64_encode(file_get_contents($image->getRealPath()));
        $validated['profile_picture'] = 'data:' . $image->getMimeType() . ';base64,' . $imageData;
    }

    // 4. Crear el registro en la BD
    User::create($validated);

    // 5. Redirigir con mensaje de éxito
    return redirect()->route('users.index')->with('success', 'Usuario creado exitosamente.');
}
```

#### `show()` — Ver Detalle de Usuario (`GET /users/{id}`)
```php
public function show(User $user) {
    // Laravel resuelve automáticamente el $user por su ID (Route Model Binding)
    return Inertia::render('users/show', [
        'user' => (new UserResource($user))->resolve(), // Un solo usuario transformado
    ]);
}
```

#### `edit()` — Mostrar Formulario de Edición (`GET /users/{id}/edit`)
```php
public function edit(User $user) {
    return Inertia::render('users/edit', [
        'user' => (new UserResource($user))->resolve(), // Datos actuales del usuario
        'fields' => UserResource::formFields(),          // Configuración del formulario
    ]);
}
```

#### `update()` — Actualizar Usuario (`PUT /users/{id}`)
```php
public function update(Request $request, User $user) {
    $rules = User::rules(true); // true = modo actualización (password opcional)

    // Sobreescribe la regla de email para ignorar el email del usuario actual
    $rules['email'] = ['required', 'email', Rule::unique('users')->ignore($user->id)];

    $validated = $request->validate($rules, User::messages());

    // Si no envió nueva contraseña, remove del array para no sobreescribir con vacío
    if (empty($validated['password'])) {
        unset($validated['password']);
    } else {
        $validated['password'] = Hash::make($validated['password']);
    }

    $user->update($validated);
    return redirect()->route('users.index')->with('success', 'Usuario actualizado exitosamente.');
}
```

#### `destroy()` — Eliminar Usuario (`DELETE /users/{id}`)
```php
public function destroy(User $user) {
    $user->delete(); // Soft delete o hard delete según la configuración del modelo
    return redirect()->route('users.index')->with('success', 'Usuario eliminado exitosamente.');
}
```

---

## 4. 🔀 Las Rutas Generadas: `resources/js/routes/users/index.ts` y `resources/js/actions/.../UserController.ts`

### ¿Qué son estas rutas?
**Laravel Wayfinder** escanea las rutas PHP definidas en `routes/web.php` y genera automáticamente archivos TypeScript que permiten referenciar esas mismas rutas en el frontend. Son **archivos generados automáticamente** — nunca se editan manualmente.

### ¿Por qué existen dos archivos?

| Archivo | ¿Qué contiene? | ¿Dónde se importa? |
|---|---|---|
| `resources/js/actions/App/Http/Controllers/UserController.ts` | Las funciones de ruta crudas generadas por Wayfinder | NO se importa directamente en páginas |
| `resources/js/routes/users/index.ts` | Re-exporta el mismo contenido para un import más limpio | Se importa en las páginas como `import users from '@/routes/users'` |

### ¿Cómo funcionan?

```typescript
// En lugar de escribir URLs hardcodeadas como '/users/5/edit'
// usamos las funciones de ruta tipadas:

import users from '@/routes/users';

// Rutas sin parámetros:
users.index().url   // → '/users'
users.create().url  // → '/users/create'
users.store().url   // → '/users'

// Rutas con parámetros (el ID del usuario):
users.show(5).url     // → '/users/5'
users.edit(5).url     // → '/users/5/edit'
users.update(5).url   // → '/users/5'
users.destroy(5).url  // → '/users/5'
```

### Tipos TypeScript Usados

```typescript
// RouteDefinition<'get'> - describe una ruta con método y URL
// RouteQueryOptions - permite pasar query params: { query: { page: 2 } }
// RouteFormDefinition - para uso en atributos action de formularios HTML
// applyUrlDefaults - aplica valores por defecto a parámetros de URL
```

**Ventaja clave:** Si cambiamos una URL en PHP (en `routes/web.php`), ejecutamos `php artisan wayfinder:generate` y todas las referencias en el frontend se actualizan automáticamente. Sin strings de URLs hardcodeados que se puedan desincronizar.

---

## 5. 🖥️ Las Páginas Frontend: `resources/js/pages/users/`

### Imports Comunes en Todas las Páginas

```typescript
import AppLayout from '@/layouts/app-layout';      // Layout principal con sidebar y navbar
import { Head, Link, useForm, router } from '@inertiajs/react'; // Herramientas de Inertia para React
import { dashboard } from '@/routes';               // Ruta al dashboard para breadcrumbs
import users from '@/routes/users';                 // Rutas del módulo de usuarios (Wayfinder)
import { Button } from '@/components/ui/button';    // Componentes de Radix UI estilizados
import { Input } from '@/components/ui/input';
import { AlertCircle, Eye, EyeOff } from 'lucide-react'; // Iconos SVG
import { useState } from 'react';                   // Hook de React para estado local
```

### `index.tsx` — Listado de Usuarios

**Props que recibe** (vienen del Controller via Inertia):
```typescript
interface UsersIndexProps {
    users: { data: User[] };  // Array de usuarios transformados por UserResource
    columns: TableColumn[];    // Configuración de columnas (de UserResource::tableColumns())
    filters: FilterField[];    // Configuración de filtros (de UserResource::filterFields())
    queryParams: {...};        // Parámetros actuales de la URL (para mantener filtros)
    pagination: Pagination;    // Info de paginación
}
```

**Funciones clave:**
```typescript
// router.get() de Inertia: navega a una URL SIN recargar la página completa.
// preserveState: true = mantiene el estado de React (no resetea inputs)
// preserveScroll: true = no sube el scroll al tope
const handleSearch = () => {
    router.get(users.index().url, { search, role, status }, {
        preserveState: true,
        preserveScroll: true,
    });
};

// Para eliminar, router.delete() envía una solicitud DELETE (que Laravel mapea a destroy())
const handleDelete = (userId: number) => {
    router.delete(users.destroy(userId).url);
};
```

### `create.tsx` — Formulario de Creación

**La arquitectura clave: `renderField()`**

Este componente usa el array `fields` (que viene de `UserResource::formFields()`) para renderizar dinámicamente cada campo del formulario:

```typescript
const renderField = (field: FormField) => {
    switch (field.type) {
        case 'text':
        case 'email':
            return <Input type={field.type} ... />;

        case 'password':
            // Incluye botón de mostrar/ocultar contraseña
            return (
                <div className="relative">
                    <Input type={showPassword[field.name] ? 'text' : 'password'} ... />
                    <button onClick={() => togglePasswordVisibility(field.name)}>
                        {showPassword[field.name] ? <EyeOff /> : <Eye />}
                    </button>
                </div>
            );

        case 'select':
            return <select>{field.options.map(opt => <option />)}</select>;

        case 'file':
            return <Input type="file" accept={field.accept} onChange={handleFileChange} />;

        case 'textarea':
            return <Textarea rows={field.rows} ... />;
    }
};
```

**`useForm` de Inertia.js:**

```typescript
const { data, setData, post, processing, errors } = useForm({
    name: '',
    password: '',
    password_confirmation: '', // Laravel necesita este campo para la regla 'confirmed'
    profile_picture: null as File | null,
    // ... todos los campos del formulario
});

// data: objeto con los valores actuales del formulario
// setData: función para actualizar valores (como setState de React)
// post: envía el formulario como POST con manejo automático de errores
// processing: true mientras el formulario se está enviando (para deshabilitar botón)
// errors: objeto con errores de validación del servidor { campo: 'mensaje de error' }
```

**`handleSubmit` y `forceFormData`:**

```typescript
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(users.store().url, {
        // forceFormData: true envía como multipart/form-data (necesario para archivos)
        // Si es false/undefined, envía como JSON (más eficiente para datos sin archivos)
        forceFormData: !!data.profile_picture,
    });
};
```

**¿Por qué usar `post()` de useForm en vez de `router.post()`?**  
Cuando se usa `router.post()` directamente, si el servidor rechaza la solicitud por errores de validación, la respuesta de error no se mapea automáticamente al estado `errors` del hook `useForm`. El formulario "falla silenciosamente" sin mostrar los errores al usuario. Con `form.post()`, Inertia intercepta los errores `422` de validación y los convierte automáticamente en el objeto `errors`.

### `edit.tsx` — Formulario de Edición

Similar a `create.tsx` con estas diferencias importantes:

```typescript
// El formulario incluye _method: 'PUT' para emular HTTP PUT via POST
// (necesario porque los formularios HTML solo soportan GET y POST nativamente)
const { data, setData, post, errors } = useForm({
    _method: 'PUT',      // Laravel detecta esto y lo trata como PUT
    name: user.name,     // Pre-rellena con los datos actuales del usuario
    password: '',        // Vacío - solo se actualiza si el usuario escribe algo
    // ...
});

const handleSubmit = (e) => {
    e.preventDefault();
    post(users.update(user.id).url, {  // Envía a /users/{id}
        forceFormData: !!data.profile_picture,
    });
};
```

Los campos de contraseña en `edit.tsx` muestran la nota "(Opcional - dejar en blanco para mantener la actual)" porque en el backend, `User::rules(true)` hace la contraseña `nullable`.

### `show.tsx` — Vista de Detalle

Solo lectura. Muestra todos los datos del usuario devueltos por `(new UserResource($user))->resolve()`. No usa `useForm`.

---

## 6. 🔄 El Ciclo Completo: Creación de un Usuario

Para consolidar todo lo visto, aquí está el flujo completo de crear un usuario:

```
1. Usuario navega a /users/create
   → Laravel enruta a UserController::create()
   → create() llama Inertia::render('users/create', ['fields' => UserResource::formFields()])
   → React renderiza create.tsx con los campos del formulario

2. Usuario llena el formulario y hace clic en "Crear Usuario"
   → handleSubmit() previene el comportamiento por defecto del form
   → useForm.post(users.store().url, { forceFormData: true })
   → Inertia envía POST /users con los datos del formulario

3. Laravel recibe POST /users
   → Enruta a UserController::store()
   → store() llama $request->validate(User::rules(), User::messages())

   3a. Si hay ERRORES de validación:
       → Laravel retorna 422 con objeto de errores
       → Inertia intercepta y mapea errores al hook useForm
       → React re-renderiza el formulario mostrando errores en rojo debajo de cada campo
       → El usuario ve exactamente qué campo falló y por qué

   3b. Si la validación es EXITOSA:
       → store() hashea la contraseña
       → store() procesa la imagen si existe
       → User::create($validated) inserta en la BD
       → redirect()->route('users.index')->with('success', '...')
       → Inertia navega a /users mostrando el flash message de éxito
```

---

## 7. 💡 Cómo Agregar un Nuevo Campo

Supongamos que queremos agregar el campo `age` (edad) al módulo de usuarios:

### Paso 1: Migración de Base de Datos
```bash
php artisan make:migration add_age_to_users_table
```
```php
$table->integer('age')->nullable();
```

### Paso 2: Modelo (`User.php`)
Agregar `'age'` al array `$fillable`.

### Paso 3: Resource (`UserResource.php`)
- En `toArray()`: agregar `'age' => $this->age`.
- En `formFields()`: agregar la definición del campo:
```php
['name' => 'age', 'label' => 'Edad', 'type' => 'number', 'required' => false, 'grid_cols' => 6]
```

### Paso 4: Frontend (`create.tsx`, `edit.tsx`)
Si el tipo `number` ya está soportado en `renderField()`, no necesitas cambiar nada más. El campo aparecerá automáticamente.

### Paso 5: Formulario `useForm` en React
Agregar `age: ''` al estado inicial de `useForm` en `create.tsx` y `edit.tsx`.

---

## 8. 📋 Resumen de Responsabilidades

| Archivo | Responsabilidad |
|---|---|
| `User.php` (Model) | Define la estructura de datos, relaciones, reglas de validación y fillables |
| `UserResource.php` | Transforma datos del modelo para el frontend; configura formularios, tablas y filtros |
| `UserController.php` | Recibe solicitudes HTTP, coordina modelo y resource, retorna respuestas |
| `routes/users/index.ts` | Rutas tipadas para el frontend (generadas automáticamente por Wayfinder) |
| `pages/users/index.tsx` | Vista de listado con filtros, ordenamiento y paginación |
| `pages/users/create.tsx` | Formulario de creación con renderizado dinámico basado en formFields() |
| `pages/users/edit.tsx` | Formulario de edición pre-rellenado con datos actuales |
| `pages/users/show.tsx` | Vista de solo lectura del detalle de un usuario |
