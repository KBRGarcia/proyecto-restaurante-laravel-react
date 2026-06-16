import { Form } from "antd";
import type { FormInstance } from "antd";
import { useOne } from "@refinedev/core";
import { useEffect, useRef } from "react";

// Enum para el tipo de cliente
export type CustomerType = "user" | "client";

type CustomerSelection = {
    type: CustomerType;
    id: number;
};

type LinkedUser = {
    phone_number?: string | null;
};

type LinkedClient = {
    phone?: string | null;
};

/**
 * Rellena contact_phone al seleccionar usuario o cliente.
 * En edición conserva el teléfono de la orden hasta que cambie la selección.
 */
export function useOrderContactPhone(
    form?: FormInstance,
    customerType: CustomerType = "user",
    options?: { enabled?: boolean },
): void {
    const enabled = options?.enabled ?? true;
    const userId = Form.useWatch("user_id", form);
    const clientId = Form.useWatch("client_id", form);
    const isInitializedRef = useRef(false);
    const previousSelectionRef = useRef<CustomerSelection | null>(null);

    const { query: userQuery } = useOne<LinkedUser>({
        resource: "users",
        id: userId ?? "",
        queryOptions: {
            enabled: enabled && customerType === "user" && Boolean(userId),
        },
    });

    const { query: clientQuery } = useOne<LinkedClient>({
        resource: "clients",
        id: clientId ?? "",
        queryOptions: {
            enabled: enabled && customerType === "client" && Boolean(clientId),
        },
    });

    useEffect(() => {
        if (!form || !enabled) {
            return;
        }

        const currentId = customerType === "user" ? userId : clientId;
        const previousSelection = previousSelectionRef.current;

        if (!isInitializedRef.current) {
            isInitializedRef.current = true;

            if (currentId) {
                previousSelectionRef.current = { type: customerType, id: currentId };
            }

            return;
        }

        if (!currentId) {
            if (previousSelection?.id) {
                form.setFieldValue("contact_phone", undefined);
            }

            previousSelectionRef.current = null;
            return;
        }

        const selectionChanged =
            !previousSelection ||
            previousSelection.type !== customerType ||
            previousSelection.id !== currentId;

        if (!selectionChanged) {
            return;
        }

        if (customerType === "user" && userQuery.isLoading) {
            return;
        }

        if (customerType === "client" && clientQuery.isLoading) {
            return;
        }

        const phone =
            customerType === "user"
                ? userQuery.data?.data?.phone_number
                : clientQuery.data?.data?.phone;

        form.setFieldValue("contact_phone", phone ?? undefined);
        previousSelectionRef.current = { type: customerType, id: currentId };
    }, [
        form,
        customerType,
        userId,
        clientId,
        userQuery.isLoading,
        userQuery.data,
        clientQuery.isLoading,
        clientQuery.data,
        enabled,
    ]);
}

// Funcion para calcular el total de la orden
export function calculateOrderTotal(subtotal: number, taxPercentage: number): number {
    const safeSubtotal = Number.isFinite(subtotal) ? subtotal : 0;
    const safeTaxPercentage = Number.isFinite(taxPercentage) ? taxPercentage : 0;

    return Number((safeSubtotal + safeSubtotal * (safeTaxPercentage / 100)).toFixed(2));
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

// Hook para calcular el total de la orden
export function useOrderTotalCalculation(form?: FormInstance): void {
    const subtotal = Form.useWatch("subtotal", form) ?? 0;
    const taxes = Form.useWatch("taxes", form) ?? 0;

    useEffect(() => {
        if (!form) {
            return;
        }

        form.setFieldValue("total", calculateOrderTotal(Number(subtotal), Number(taxes)));
    }, [form, subtotal, taxes]);
}
