# Plan de migración: auth_token en localStorage → cookies HttpOnly

> **Estado:** Completada (Fase 2 — cookies HttpOnly + sesión Sanctum SPA)  
> **Fase objetivo:** Fase 2 — Seguridad de autenticación  
> **Referencias oficiales:** [Laravel Sanctum SPA Authentication](https://laravel.com/docs/12.x/sanctum#spa-authentication), [React Doctor — auth-token-in-web-storage](https://react.doctor/docs/rules/react-doctor/auth-token-in-web-storage)

---

## 1. Problema actual

| Aspecto | Estado actual | Riesgo |
|---------|---------------|--------|
| Token Sanctum | Se devuelve en JSON y se guarda en `localStorage` (`auth_token:v1`) | Cualquier XSS puede leer y exfiltrar el token |
| Cabecera Authorization | Interceptor axios añade `Bearer {token}` manualmente | El token viaja en JS accesible |
| Usuario / permisos | Cacheados en `localStorage` (`user:v1`, `permissions:v1`) | Menor riesgo (no son credenciales), pero sensibles |
| Backend | `ApiAuthController` usa `$user->createToken()` (tokens API) | Patrón pensado para clientes externos, no SPA first-party |

**Impacto real:** Un script malicioso inyectado en la página (XSS) puede robar sesiones de administradores y operar el panel como el usuario autenticado.

---

## 2. Estado objetivo

Autenticación **first-party SPA** con Laravel Sanctum:

1. El servidor establece una **cookie de sesión HttpOnly, Secure, SameSite** tras el login.
2. El frontend **no almacena ni lee** el token de autenticación.
3. Axios envía cookies automáticamente con `withCredentials: true`.
4. CSRF protegido vía cookie `XSRF-TOKEN` + cabecera `X-XSRF-TOKEN`.
5. Usuario y permisos se obtienen de `/api/me` (cache opcional en memoria, no en localStorage).

---

## 3. Enfoque recomendado: Sanctum SPA (sesión web)

Sanctum ya está instalado y `config/sanctum.php` define dominios stateful. El proyecto comparte origen (`/api` en el mismo host), ideal para este patrón.

### Alternativa descartada para SPA same-origin

| Opción | Por qué no |
|--------|------------|
| Seguir con Bearer token en cookie HttpOnly custom | Requiere middleware personalizado; Sanctum SPA ya resuelve el caso |
| Mantener tokens API + cookie paralela | Duplica lógica y no elimina el riesgo hasta quitar localStorage |

---

## 4. Cambios en backend (Laravel)

### 4.1 Middleware API stateful

En `bootstrap/app.php`, habilitar peticiones stateful de Sanctum en rutas API:

```php
->withMiddleware(function (Middleware $middleware): void {
    $middleware->statefulApi(); // Laravel 11+
    // ...
})
```

Esto aplica `EnsureFrontendRequestsAreStateful` para dominios en `SANCTUM_STATEFUL_DOMAINS`.

### 4.2 ApiAuthController — login

**Antes:** `createToken()` → JSON `{ token, user, permissions }`

**Después:**

```php
// Opción A (recomendada): Auth::attempt + sesión web
Auth::guard('web')->attempt($credentials);
$request->session()->regenerate();

return response()->json([
    'user' => $user,
    'permissions' => $this->roleAuthorization->permissionsFor($user),
    // Sin campo "token"
]);
```

**Logout:** `Auth::guard('web')->logout()` + `$request->session()->invalidate()`.

**Me:** Mantener; Sanctum autenticará vía sesión si no hay Bearer token.

### 4.3 Rutas

- Mover `/login` y `/logout` a rutas que usen middleware `web` (sesión + CSRF), o mantener en `api.php` con `statefulApi()` activo.
- Añadir ruta pública o documentar uso de `GET /sanctum/csrf-cookie` antes del primer POST autenticado.

### 4.4 CORS y cookies

Para **same-origin** (Vite proxy → Laravel en desarrollo, mismo dominio en producción):

| Variable | Valor sugerido |
|----------|----------------|
| `SESSION_DRIVER` | `database` (ya configurado) |
| `SESSION_SECURE_COOKIE` | `true` en producción (HTTPS) |
| `SESSION_SAME_SITE` | `lax` |
| `SANCTUM_STATEFUL_DOMAINS` | Dominios del frontend (ej. `localhost,127.0.0.1,tudominio.com`) |

Si el frontend estuviera en otro origen, haría falta `config/cors.php` con `supports_credentials: true` y orígenes explícitos.

### 4.5 CSRF

- Excluir de CSRF solo lo estrictamente necesario (no excluir `/api/login` si usa sesión web).
- Frontend debe llamar `/sanctum/csrf-cookie` antes del login y axios debe enviar `X-XSRF-TOKEN`.

### 4.6 Tests

Actualizar:

- `tests/Feature/Auth/AuthenticationTest.php`
- Cualquier test que espere `token` en la respuesta de login
- Flujos con `$this->actingAs($user, 'sanctum')` vs sesión web según el guard elegido

---

## 5. Cambios en frontend (React / Refine)

### 5.1 Axios global

```typescript
const axiosInstance = axios.create({
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});

// Eliminar interceptor que lee auth_token de localStorage
```

### 5.2 Auth provider (AppRouter.tsx)

| Método | Cambio |
|--------|--------|
| `login` | 1) `GET /sanctum/csrf-cookie` 2) `POST /api/login` 3) Guardar solo `user` en memoria o sessionStorage no sensible; idealmente solo refetch `/me` |
| `logout` | `POST /api/logout` + limpiar cache local (sin token) |
| `check` | Verificar sesión con `GET /api/me` o confiar en respuesta 401 del interceptor |
| `getIdentity` | Siempre desde `/api/me` o estado en memoria post-login |

### 5.3 Eliminar token de localStorage

Tras la migración:

- Deprecar `getAuthToken` / `setAuthToken` en `resources/js/lib/auth-storage.ts`
- Actualizar `pages/profile/index.tsx` y `hooks/useEmployeeAssignmentValidation.ts` para usar `axiosInstance` con cookies (sin cabecera manual)
- Eliminar claves `auth_token:v1` en logout y migración one-shot para usuarios existentes

### 5.4 Refine dataProvider

`@refinedev/simple-rest` ya usa el axios instance configurado; con `withCredentials: true` heredará cookies.

---

## 6. Plan de despliegue por fases

### Fase 2a — Preparación backend (sin breaking change)

1. Activar `statefulApi()` en middleware.
2. Añadir endpoint dual: login devuelve token **y** establece sesión (período de transición) — *opcional, solo si se necesita rollback rápido*.
3. Tests de login/logout con cookies.

### Fase 2b — Frontend

1. Configurar axios `withCredentials` + CSRF.
2. Flujo login sin guardar token.
3. `check` / `getIdentity` basados en `/api/me`.
4. Quitar interceptor Bearer.

### Fase 2c — Limpieza

1. Eliminar `createToken()` del login.
2. Eliminar funciones de token en `auth-storage.ts`.
3. Migración one-shot: `localStorage.removeItem('auth_token')` y legacy keys.
4. Re-ejecutar `npx react-doctor@latest` y confirmar que desaparece `auth-token-in-web-storage`.

---

## 7. Checklist de verificación

- [ ] Login establece cookie de sesión (visible en DevTools → Application → Cookies, flag HttpOnly)
- [ ] `document.cookie` en consola **no** muestra el token de sesión
- [ ] Peticiones a `/api/*` autenticadas sin cabecera `Authorization`
- [ ] Logout invalida sesión (siguiente `/api/me` → 401)
- [ ] CSRF: POST sin token XSRF falla con 419
- [ ] Refresh de página mantiene sesión (mientras no expire)
- [ ] React Doctor: sin error `auth-token-in-web-storage`
- [ ] Tests PHPUnit verdes
- [ ] Prueba manual en Chrome y Firefox

---

## 8. Rollback

Si hay incidentes en producción:

1. Revertir frontend a interceptor Bearer + localStorage (claves `:v1`).
2. Restaurar `createToken()` en login.
3. Desactivar `statefulApi()` temporalmente.

Por eso conviene desplegar backend compatible (dual) antes de quitar tokens del frontend, o desplegar ambos en la misma ventana de mantenimiento.

---

## 9. Archivos a modificar (referencia)

| Archivo | Acción Fase 2 |
|---------|----------------|
| `bootstrap/app.php` | `statefulApi()` |
| `app/Http/Controllers/ApiAuthController.php` | Sesión web en login/logout |
| `routes/api.php` | Revisar middleware web/sanctum |
| `.env` / `.env.example` | `SANCTUM_STATEFUL_DOMAINS`, cookies seguras |
| `resources/js/AppRouter.tsx` | withCredentials, quitar token localStorage |
| `resources/js/lib/auth-storage.ts` | Quitar token; opcionalmente quitar user cache |
| `resources/js/pages/profile/index.tsx` | axiosInstance compartido |
| `resources/js/hooks/useEmployeeAssignmentValidation.ts` | axiosInstance compartido |
| `tests/Feature/Auth/*` | Actualizar aserciones |

---

## 10. Trabajo completado

### Fase 1
- [x] `axios` actualizado a `^1.18.1` (CVEs corregidos)
- [x] Claves localStorage versionadas (`user:v1`, `permissions:v1`) con migración automática desde claves legacy
- [x] Módulo centralizado `resources/js/lib/auth-storage.ts`

### Fase 2
- [x] `statefulApi()` activado en `bootstrap/app.php`
- [x] Login/logout con sesión web (`Auth::guard('web')`) sin `createToken()`
- [x] Cliente axios compartido con `withCredentials` + CSRF (`resources/js/lib/api-client.ts`)
- [x] Eliminado almacenamiento de `auth_token` en frontend
- [x] Tests en `tests/Feature/Auth/ApiSessionAuthenticationTest.php`
- [x] `SANCTUM_STATEFUL_DOMAINS` documentado en `.env.example`
