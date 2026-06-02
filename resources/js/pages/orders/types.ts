export type InvoiceImageFormat = 'png' | 'jpg';

export type OrderUser = {
    id: number;
    name: string;
    last_name?: string | null;
    full_name?: string | null;
    email?: string | null;
    phone_number?: string | null;
};

export type OrderBranch = {
    id: number;
    name: string;
    city?: string | null;
    state?: string | null;
};

export type OrderDetail = {
    id: number;
    quantity: number;
    unit_price: string | number;
    subtotal: string | number;
    product_notes?: string | null;
    product?: {
        id: number;
        name: string;
    } | null;
};

export type OrderRecord = {
    id: number;
    user_id: number;
    user?: OrderUser | null;
    branch?: OrderBranch | null;
    branch_id?: number | null;
    assigned_employee?: OrderUser | null;
    status: string;
    service_type: string;
    subtotal: string | number;
    taxes: string | number;
    total: string | number;
    delivery_address?: string | null;
    contact_phone?: string | null;
    special_notes?: string | null;
    payment_method?: string | null;
    currency: 'nacional' | 'internacional' | string;
    order_date?: string | null;
    order_details?: OrderDetail[];
};
