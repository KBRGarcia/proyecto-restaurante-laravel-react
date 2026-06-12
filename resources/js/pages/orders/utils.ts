import { Form } from "antd";
import type { FormInstance } from "antd";
import { useEffect } from "react";

// Enum para el tipo de cliente
export type CustomerType = "user" | "client";

// Funcion para calcular el total de la orden
export function calculateOrderTotal(subtotal: number, taxPercentage: number): number {
    const safeSubtotal = Number.isFinite(subtotal) ? subtotal : 0;
    const safeTaxPercentage = Number.isFinite(taxPercentage) ? taxPercentage : 0;

    return Number((safeSubtotal + safeSubtotal * (safeTaxPercentage / 100)).toFixed(2));
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
