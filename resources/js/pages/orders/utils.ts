import type { DataProvider } from "@refinedev/core";
import type { FormInstance } from "antd";

// Enum para el tipo de cliente
export type CustomerType = "user" | "client";

type LinkedUser = {
    phone_number?: string | null;
};

type LinkedClient = {
    phone?: string | null;
};

export async function handleOrderContactPhoneValuesChange(
    form: FormInstance | undefined,
    customerType: CustomerType,
    changedValues: Partial<{ user_id?: number | null; client_id?: number | null }>,
    dataProvider: DataProvider,
): Promise<void> {
    if (!form) {
        return;
    }

    if (customerType === "user" && "user_id" in changedValues) {
        const userId = changedValues.user_id;

        if (!userId) {
            form.setFieldValue("contact_phone", undefined);
            return;
        }

        const { data } = await dataProvider.getOne<LinkedUser>({
            resource: "users",
            id: userId,
        });

        form.setFieldValue("contact_phone", data.phone_number ?? undefined);
        return;
    }

    if (customerType === "client" && "client_id" in changedValues) {
        const clientId = changedValues.client_id;

        if (!clientId) {
            form.setFieldValue("contact_phone", undefined);
            return;
        }

        const { data } = await dataProvider.getOne<LinkedClient>({
            resource: "clients",
            id: clientId,
        });

        form.setFieldValue("contact_phone", data.phone ?? undefined);
    }
}

// Filtros para el select de empleados asignables a una orden
export function getEmployeeSelectFilters(serviceType: string) {
    return [
        ...getEmployeePositionFilters(serviceType),
        { field: "status", operator: "eq" as const, value: "active" },
    ];
}

// Filtros para el select de empleados
export function getEmployeePositionFilters(serviceType: string) {
    if (serviceType === "delivery") {
        return [{ field: "position", operator: "eq" as const, value: "delivery_driver" }];
    }

    return [{ field: "positions", operator: "eq" as const, value: "waiter,cashier" }];
}

// Funcion para obtener el label del empleado asignado
export function getAssignedEmployeeLabel(serviceType: string): string {
    return serviceType === "delivery" ? "Repartidor asignado" : "Empleado asignado";
}
