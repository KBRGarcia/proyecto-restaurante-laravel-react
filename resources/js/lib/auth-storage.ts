/**
 * Cache de perfil/permisos en cliente (no credenciales).
 * La autenticación usa cookies HttpOnly de sesión (Sanctum SPA).
 */

export type AuthUser = {
    id?: number;
    role?: string;
    name?: string;
    last_name?: string;
    email?: string;
    status?: string;
    profile_picture?: string;
    avatar?: string;
    phone_number?: string;
    address?: string;
    permissions?: string[];
};

const STORAGE_VERSION = 'v1';

const KEYS = {
    user: `user:${STORAGE_VERSION}`,
    permissions: `permissions:${STORAGE_VERSION}`,
} as const;

const LEGACY_KEYS = {
    authToken: 'auth_token',
    authTokenVersioned: `auth_token:${STORAGE_VERSION}`,
    user: 'user',
    permissions: 'permissions',
} as const;

let legacyMigrationDone = false;

const purgeLegacyAuthTokens = (): void => {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.removeItem(LEGACY_KEYS.authToken);
    localStorage.removeItem(LEGACY_KEYS.authTokenVersioned);
};

const migrateLegacyKeys = (): void => {
    if (legacyMigrationDone || typeof window === 'undefined') {
        return;
    }

    legacyMigrationDone = true;
    purgeLegacyAuthTokens();

    for (const key of ['user', 'permissions'] as const) {
        const legacyKey = LEGACY_KEYS[key];
        const versionedKey = KEYS[key];

        if (localStorage.getItem(versionedKey) !== null) {
            continue;
        }

        const legacyValue = localStorage.getItem(legacyKey);
        if (legacyValue !== null) {
            localStorage.setItem(versionedKey, legacyValue);
            localStorage.removeItem(legacyKey);
        }
    }
};

if (typeof window !== 'undefined') {
    purgeLegacyAuthTokens();
}

const readJson = <T>(key: string): T | null => {
    migrateLegacyKeys();

    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : null;
    } catch {
        localStorage.removeItem(key);
        return null;
    }
};

export const getStoredUser = (): AuthUser | null => readJson<AuthUser>(KEYS.user);

export const setStoredUser = (user: AuthUser): void => {
    migrateLegacyKeys();
    localStorage.setItem(KEYS.user, JSON.stringify(user));
};

export const removeStoredUser = (): void => {
    migrateLegacyKeys();
    localStorage.removeItem(KEYS.user);
    localStorage.removeItem(LEGACY_KEYS.user);
};

const getStoredPermissions = (): string[] | null =>
    readJson<string[]>(KEYS.permissions);

const setStoredPermissions = (permissions: string[]): void => {
    migrateLegacyKeys();
    localStorage.setItem(KEYS.permissions, JSON.stringify(permissions));
};

export const removeStoredPermissions = (): void => {
    migrateLegacyKeys();
    localStorage.removeItem(KEYS.permissions);
    localStorage.removeItem(LEGACY_KEYS.permissions);
};

export const clearAuthStorage = (): void => {
    purgeLegacyAuthTokens();
    removeStoredUser();
    removeStoredPermissions();
};

export const syncStoredSession = (payload: {
    user: AuthUser;
    permissions?: string[];
}): void => {
    setStoredUser(payload.user);
    if (payload.permissions) {
        setStoredPermissions(payload.permissions);
    }
};
