import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    last_name: string;
    full_name: string;
    email: string;
    email_verified_at: string | null;
    phone_number: string | null;
    address: string | null;
    profile_picture: string | null;
    role: 'admin' | 'employee' | 'client';
    role_label: string;
    status: 'active' | 'inactive';
    status_label: string;
    registration_date: string | null;
    last_connection: string | null;
    avatar?: string;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface EmployeeAssignment {
    id: number;
    branch_id: number;
    branch_name: string | null;
    position: 'general_manager' | 'branch_manager' | 'chef' | 'sous_chef' | 'cook' | 'kitchen_assistant' | 'waiter' | 'cashier' | 'delivery_driver' | 'host' | 'cleaner' | 'inventory_manager';
    position_label: string;
    start_date: string | null;
    end_date: string | null;
    active: boolean;
}

export interface Employee {
    id: number;
    user_id: number | null;
    first_name: string;
    last_name: string;
    full_name: string;
    identity_document: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    birth_date: string | null;
    birth_date_formatted: string | null;
    hire_date: string;
    hire_date_formatted: string | null;
    status: 'active' | 'inactive';
    status_label: string;
    notes: string | null;
    assignments?: EmployeeAssignment[];
    branches_summary?: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Client {
    id: number;
    user_id: number | null;
    first_name: string;
    last_name: string;
    full_name: string;
    identity_document: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    birth_date: string | null;
    birth_date_formatted: string | null;
    origin: 'online' | 'physical' | 'mixed';
    origin_label: string;
    first_purchase_at: string | null;
    first_purchase_at_formatted: string | null;
    last_purchase_at: string | null;
    last_purchase_at_formatted: string | null;
    total_orders: number;
    total_spent: string | number;
    status: 'active' | 'inactive';
    status_label: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface TableColumn {
    key: string;
    label: string;
    sortable: boolean;
    visible: boolean;
}

export interface FilterField {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    options?: { value: string; label: string }[];
}

export interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

export interface Category {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    status: 'active' | 'inactive';
    status_label: string;
    order_show: number;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Product {
    id: number;
    name: string;
    description: string | null;
    price: string;
    category_id: number | null;
    category_name: string | null;
    image: string | null;
    status: 'active' | 'inactive' | 'out of stock';
    status_label: string;
    preparation_time: number;
    ingredients: string | null;
    is_special: boolean;
    creation_date: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Order {
    id: number;
    user_id: number;
    branch_id: number | null;
    user_name: string;
    user?: {
        id: number;
        name: string;
        last_name: string;
        full_name: string;
        email: string;
        phone_number: string | null;
    };
    status: 'pending' | 'preparing' | 'ready' | 'on_the_way' | 'delivered' | 'canceled';
    status_label: string;
    service_type: 'delivery' | 'pickup';
    service_type_label: string;
    subtotal: string | number;
    taxes: string | number;
    total: string | number;
    delivery_address: string | null;
    contact_phone: string | null;
    special_notes: string | null;
    payment_method: string | null;
    currency: 'nacional' | 'internacional';
    currency_label: string;
    national_payment_data: any | null;
    order_date: string;
    order_date_formatted: string | null;
    estimated_delivery_date: string | null;
    estimated_delivery_date_formatted: string | null;
    assigned_employee_id: number | null;
    assigned_employee_name: string | null;
    assigned_employee?: {
        id: number;
        name: string;
        last_name: string;
        full_name: string;
        email: string;
    };
    pending_date: string | null;
    preparing_date: string | null;
    ready_date: string | null;
    on_the_way_date: string | null;
    delivered_date: string | null;
    canceled_date: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface OrderDetail {
    id: number;
    order_id: number;
    order_number: number | null;
    order?: {
        id: number;
        user_name: string;
        status: string;
        service_type: string;
        total: string | number;
        order_date: string;
    };
    product_id: number;
    product_name: string;
    product?: {
        id: number;
        name: string;
        description: string | null;
        price: string | number;
        image: string | null;
        category_name: string | null;
    };
    quantity: number;
    unit_price: string | number;
    unit_price_formatted: string;
    subtotal: string | number;
    subtotal_formatted: string;
    product_notes: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Evaluation {
    id: number;
    user_id: number;
    user_name: string | null;
    user?: {
        id: number;
        name: string;
        last_name: string;
        full_name: string;
        email: string;
    };
    order_id: number | null;
    order_number: number | null;
    order?: {
        id: number;
        user_name: string;
        status: string;
        total: string | number;
        order_date: string;
    };
    product_id: number | null;
    product_name: string | null;
    product?: {
        id: number;
        name: string;
        description: string | null;
        price: string | number;
        image: string | null;
    };
    rating: number;
    comment: string | null;
    evaluation_date: string;
    evaluation_date_formatted: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface PaymentMethod {
    id: number;
    code: string;
    name: string;
    currency_type: 'nacional' | 'internacional';
    currency_type_label: string;
    active: boolean;
    active_label: string;
    configuration: any | null;
    creation_date: string | null;
    update_date: string | null;
    created_at: string | null;
    updated_at: string | null;
    [key: string]: unknown;
}

export interface Bank {
    id: number;
    code: string;
    name: string;
    active: boolean;
    active_label: string;
    system_data: any | null;
    creation_date: string | null;
    creation_date_formatted: string | null;
    created_at: string | null;
    created_at_formatted: string | null;
    updated_at: string | null;
    updated_at_formatted: string | null;
    [key: string]: unknown;
}

export interface OrderPayment {
    id: number;
    order_id: number;
    method: 'pago_movil' | 'tarjeta_nacional' | 'efectivo' | 'transferencia' | 'tarjeta_credito' | 'binance' | 'paypal' | 'zinli' | 'zelle' | 'wally';
    status: 'pending' | 'confirmed' | 'rejected' | 'refunded';
    currency: 'nacional' | 'internacional';
    amount: string | number;
    exchange_rate: string | number | null;
    bank_code: string | null;
    reference_number: string | null;
    payer_identification: string | null;
    payer_phone: string | null;
    proof_image_path: string | null;
    paid_at: string | null;
    confirmed_at: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface PhysicalPaymentOrder {
    id: number;
    order_id: number;
    order_number: number | null;
    order?: {
        id: number;
        user_name: string;
        status: string;
        service_type: string;
        total: string | number;
        currency: string;
        order_date: string;
    };
    limit_date: string;
    limit_date_formatted: string | null;
    status: string;
    status_label: string;
    is_expired: boolean;
    creation_date: string;
    creation_date_formatted: string | null;
    update_date: string;
    update_date_formatted: string | null;
    created_at: string;
    created_at_formatted: string | null;
    updated_at: string;
    updated_at_formatted: string | null;
    [key: string]: unknown;
}

export interface Branch {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    postal_code: string | null;
    phone: string;
    email: string | null;
    opening_time: string;
    opening_time_formatted: string | null;
    closing_time: string;
    closing_time_formatted: string | null;
    operation_days: string;
    latitude: string | number | null;
    longitude: string | number | null;
    is_main: boolean;
    is_main_label: string;
    has_delivery: boolean;
    has_delivery_label: string;
    has_parking: boolean;
    has_parking_label: string;
    capacity_people: number | null;
    image: string | null;
    description: string | null;
    active: boolean;
    active_label: string;
    opening_date: string | null;
    opening_date_formatted: string | null;
    manager: string | null;
    full_address: string;
    creation_date: string;
    creation_date_formatted: string | null;
    update_date: string;
    update_date_formatted: string | null;
    created_at: string;
    created_at_formatted: string | null;
    updated_at: string;
    updated_at_formatted: string | null;
    [key: string]: unknown;
}
