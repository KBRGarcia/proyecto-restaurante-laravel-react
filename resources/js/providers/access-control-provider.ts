import type { AccessControlProvider } from "@refinedev/core";
import { getStoredUser } from "@/lib/auth-storage";

const canAccessAdmin = (role?: string) => role === "admin" || role === "employee";

export const accessControlProvider: AccessControlProvider = {
    can: async ({ resource, action }) => {
        const user = getStoredUser();
        const role = user?.role;

        if (!canAccessAdmin(role)) {
            return { can: false, reason: "Sin acceso al panel" };
        }

        if (role === "admin") {
            return { can: true };
        }

        if (resource === "users") {
            if (action === "list" || action === "show") {
                return { can: true };
            }
            if (action === "edit") {
                return { can: true };
            }
            return { can: false, reason: "Solo administradores pueden gestionar usuarios" };
        }

        return { can: true };
    },
};

export { canAccessAdmin };
