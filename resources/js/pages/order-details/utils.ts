import { Form } from "antd";
import type { FormInstance } from "antd";

export type OrderDetailItem = {
    id?: number;
    product_id?: number;
    quantity?: number;
    unit_price?: number;
    subtotal?: number;
    product_notes?: string;
};

export function calculateItemSubtotal(quantity: number, unitPrice: number): number {
    const safeQuantity = Number.isFinite(quantity) ? quantity : 0;
    const safeUnitPrice = Number.isFinite(unitPrice) ? unitPrice : 0;

    return Number((safeQuantity * safeUnitPrice).toFixed(2));
}

export function calculateOrderSubtotal(items: OrderDetailItem[] | undefined): number {
    if (!items?.length) {
        return 0;
    }

    return Number(
        items
            .reduce((sum, item) => sum + calculateItemSubtotal(Number(item.quantity ?? 0), Number(item.unit_price ?? 0)), 0)
            .toFixed(2),
    );
}

export function calculateOrderTotal(subtotal: number, taxPercentage: number): number {
    const safeSubtotal = Number.isFinite(subtotal) ? subtotal : 0;
    const safeTaxPercentage = Number.isFinite(taxPercentage) ? taxPercentage : 0;

    return Number((safeSubtotal + safeSubtotal * (safeTaxPercentage / 100)).toFixed(2));
}

export function syncOrderDetailsTotals(form: FormInstance, values: Record<string, unknown>): void {
    const items = values.items as OrderDetailItem[] | undefined;
    const taxes = Number(values.taxes ?? 0);
    const subtotal = calculateOrderSubtotal(items);

    form.setFieldsValue({
        subtotal,
        total: calculateOrderTotal(subtotal, taxes),
    });
}
