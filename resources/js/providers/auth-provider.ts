import type { AuthProvider } from "@refinedev/core";
import axios from "axios";
import { API_URL, axiosInstance, ensureCsrfCookie } from "@/lib/api-client";
import {
    clearAuthStorage,
    getStoredUser,
    syncStoredSession,
    type AuthUser,
} from "@/lib/auth-storage";
import { canAccessAdmin } from "./access-control-provider";

export const authProvider: AuthProvider = {
    login: async ({ email, password }: Record<string, string>) => {
        try {
            await ensureCsrfCookie();
            const response = await axiosInstance.post(`${API_URL}/login`, {
                email,
                password,
            });

            if (response.data?.user) {
                const user = response.data.user as AuthUser;
                if (!canAccessAdmin(user?.role)) {
                    try {
                        await axiosInstance.post(`${API_URL}/logout`);
                    } catch {
                        // Ignorar errores al revertir sesión no autorizada
                    }
                    clearAuthStorage();
                    return {
                        success: false,
                        error: {
                            name: "Acceso denegado",
                            message: "Esta cuenta no tiene acceso al panel administrativo.",
                        },
                    };
                }

                syncStoredSession({
                    user,
                    permissions: response.data.permissions,
                });
                return {
                    success: true,
                    redirectTo: "/dashboard",
                };
            }
        } catch (error: unknown) {
            const message = axios.isAxiosError<{ message?: string; errors?: { email?: string[] } }>(error)
                ? error.response?.data?.errors?.email?.[0] ||
                  error.response?.data?.message
                : undefined;

            return {
                success: false,
                error: {
                    name: "Error",
                    message: message || "Credenciales inválidas",
                },
            };
        }
        return {
            success: false,
            error: {
                message: "Error de inicio de sesión",
                name: "Inicio de sesión fallido",
            },
        };
    },
    register: async ({
        name,
        last_name,
        email,
        password,
    }: Record<string, string>) => {
        try {
            await ensureCsrfCookie();
            await axiosInstance.post(`${API_URL}/register`, {
                name,
                last_name,
                email,
                password,
            });

            return {
                success: true,
                redirectTo: "/login",
            };
        } catch (error: unknown) {
            const message = axios.isAxiosError<{ message?: string }>(error)
                ? error.response?.data?.message
                : undefined;

            return {
                success: false,
                error: {
                    message: "Error de registro",
                    name: message || "Falló el registro",
                },
            };
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post(`${API_URL}/logout`);
        } catch {
            // Ignorar errores al desloguearse (ej. token ya expiró)
        }
        clearAuthStorage();
        return {
            success: true,
            redirectTo: "/",
        };
    },
    check: async () => {
        try {
            const response = await axiosInstance.get(`${API_URL}/me`);
            const user = response.data as AuthUser;

            if (canAccessAdmin(user?.role)) {
                syncStoredSession({
                    user,
                    permissions: response.data.permissions,
                });
                return {
                    authenticated: true,
                };
            }

            clearAuthStorage();
        } catch {
            clearAuthStorage();
        }

        return {
            authenticated: false,
            logout: true,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => {
        const user = getStoredUser();
        return user?.role ?? null;
    },
    getIdentity: async () => {
        try {
            const response = await axiosInstance.get(`${API_URL}/me`);
            const user = response.data as AuthUser;
            syncStoredSession({
                user,
                permissions: response.data.permissions,
            });
            return user;
        } catch {
            return getStoredUser();
        }
    },
    onError: async (error: unknown) => {
        const err = error as {
            response?: { status?: number };
            message?: string;
        };
        if (err.response?.status === 401) {
            return {
                logout: true,
            };
        }
        if (err.response?.status === 403) {
            return {
                error: new Error("No tiene permisos para realizar esta acción."),
            };
        }
        return { error: new Error(err?.message || "Unknown error") };
    },
};
