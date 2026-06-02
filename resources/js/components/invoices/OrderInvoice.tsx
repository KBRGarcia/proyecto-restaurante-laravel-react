import type { OrderRecord } from '@/pages/orders/types';
import type { CSSProperties } from 'react';
import { forwardRef } from 'react';

type OrderInvoiceProps = {
    order: OrderRecord;
};

const invoiceStyles = {
    invoice: {
        width: '760px',
        background: '#ffffff',
        color: '#111827',
        fontFamily: 'Arial, sans-serif',
        padding: '32px',
        border: '1px solid #e5e7eb',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '24px',
        marginBottom: '28px',
    },
    sectionGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '24px',
    },
    card: {
        border: '1px solid #e5e7eb',
        borderRadius: '10px',
        padding: '16px',
    },
    muted: {
        color: '#6b7280',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '24px',
    },
    tableHeader: {
        textAlign: 'left',
        padding: '12px',
        borderBottom: '1px solid #d1d5db',
    },
    tableHeaderRight: {
        textAlign: 'right',
        padding: '12px',
        borderBottom: '1px solid #d1d5db',
    },
    tableCell: {
        padding: '12px',
        borderBottom: '1px solid #e5e7eb',
    },
    tableCellRight: {
        textAlign: 'right',
        padding: '12px',
        borderBottom: '1px solid #e5e7eb',
    },
} satisfies Record<string, CSSProperties>;

const formatCurrency = (
    value: string | number | null | undefined,
    currency: OrderRecord['currency'],
) => {
    const symbol = currency === 'nacional' ? 'Bs.' : '$';

    return `${symbol} ${Number(value ?? 0).toFixed(2)}`;
};

const formatDate = (value?: string | null) => {
    if (!value) {
        return 'Sin fecha';
    }

    return new Intl.DateTimeFormat('es-VE', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(value));
};

const getCustomerName = (order: OrderRecord) => {
    if (order.user?.full_name) {
        return order.user.full_name;
    }

    if (order.user) {
        return `${order.user.name} ${order.user.last_name || ''}`.trim();
    }

    return `Usuario #${order.user_id}`;
};

const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
        pending: 'Pendiente',
        preparing: 'En Cocina',
        ready: 'Listo',
        on_the_way: 'En Camino',
        delivered: 'Entregado',
        canceled: 'Cancelado',
    };

    return labels[status] ?? status;
};

const getServiceTypeLabel = (type: string) =>
    type === 'delivery' ? 'Delivery' : 'Retiro en local';

const getPaymentMethodLabel = (method?: string | null) => {
    if (!method) {
        return 'No especificado';
    }

    return method.replaceAll('_', ' ');
};

export const OrderInvoice = forwardRef<HTMLDivElement, OrderInvoiceProps>(
    ({ order }, ref) => {
        return (
            <div ref={ref} style={invoiceStyles.invoice}>
                <div style={invoiceStyles.header}>
                    <div>
                        <div style={{ fontSize: '26px', fontWeight: 700 }}>
                            Factura
                        </div>
                        <div
                            style={{ ...invoiceStyles.muted, marginTop: '4px' }}
                        >
                            Orden #{order.id}
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '18px', fontWeight: 700 }}>
                            Restaurante
                        </div>
                        <div style={invoiceStyles.muted}>
                            {order.branch?.name ?? 'Sucursal no asignada'}
                        </div>
                        <div style={invoiceStyles.muted}>
                            {formatDate(order.order_date)}
                        </div>
                    </div>
                </div>

                <div style={invoiceStyles.sectionGrid}>
                    <div style={invoiceStyles.card}>
                        <div
                            style={{
                                fontSize: '13px',
                                ...invoiceStyles.muted,
                                marginBottom: '8px',
                            }}
                        >
                            Cliente
                        </div>
                        <div style={{ fontWeight: 700 }}>
                            {getCustomerName(order)}
                        </div>
                        <div>{order.user?.email ?? 'Email no registrado'}</div>
                        <div>
                            {order.contact_phone ??
                                order.user?.phone_number ??
                                'Teléfono no registrado'}
                        </div>
                    </div>
                    <div style={invoiceStyles.card}>
                        <div
                            style={{
                                fontSize: '13px',
                                ...invoiceStyles.muted,
                                marginBottom: '8px',
                            }}
                        >
                            Pedido
                        </div>
                        <div>Estado: {getStatusLabel(order.status)}</div>
                        <div>
                            Servicio: {getServiceTypeLabel(order.service_type)}
                        </div>
                        <div>
                            Pago: {getPaymentMethodLabel(order.payment_method)}
                        </div>
                    </div>
                </div>

                <table style={invoiceStyles.table}>
                    <thead>
                        <tr style={{ background: '#f3f4f6' }}>
                            <th style={invoiceStyles.tableHeader}>Producto</th>
                            <th style={invoiceStyles.tableHeaderRight}>
                                Cant.
                            </th>
                            <th style={invoiceStyles.tableHeaderRight}>
                                Precio
                            </th>
                            <th style={invoiceStyles.tableHeaderRight}>
                                Subtotal
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.order_details?.length ? (
                            order.order_details.map((detail) => (
                                <tr key={detail.id}>
                                    <td style={invoiceStyles.tableCell}>
                                        <div style={{ fontWeight: 600 }}>
                                            {detail.product?.name ??
                                                'Producto no disponible'}
                                        </div>
                                        {detail.product_notes && (
                                            <div
                                                style={{
                                                    ...invoiceStyles.muted,
                                                    fontSize: '12px',
                                                }}
                                            >
                                                {detail.product_notes}
                                            </div>
                                        )}
                                    </td>
                                    <td style={invoiceStyles.tableCellRight}>
                                        {detail.quantity}
                                    </td>
                                    <td style={invoiceStyles.tableCellRight}>
                                        {formatCurrency(
                                            detail.unit_price,
                                            order.currency,
                                        )}
                                    </td>
                                    <td style={invoiceStyles.tableCellRight}>
                                        {formatCurrency(
                                            detail.subtotal,
                                            order.currency,
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    style={{
                                        padding: '16px',
                                        textAlign: 'center',
                                        ...invoiceStyles.muted,
                                    }}
                                >
                                    Esta orden no tiene productos registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: '280px' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '8px',
                            }}
                        >
                            <span>Subtotal</span>
                            <strong>
                                {formatCurrency(order.subtotal, order.currency)}
                            </strong>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '8px',
                            }}
                        >
                            <span>Impuestos</span>
                            <strong>
                                {formatCurrency(order.taxes, order.currency)}
                            </strong>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderTop: '2px solid #111827',
                                paddingTop: '12px',
                                fontSize: '18px',
                            }}
                        >
                            <span>Total</span>
                            <strong>
                                {formatCurrency(order.total, order.currency)}
                            </strong>
                        </div>
                    </div>
                </div>

                {(order.delivery_address || order.special_notes) && (
                    <div
                        style={{
                            marginTop: '24px',
                            borderTop: '1px solid #e5e7eb',
                            paddingTop: '16px',
                        }}
                    >
                        {order.delivery_address && (
                            <div>Dirección: {order.delivery_address}</div>
                        )}
                        {order.special_notes && (
                            <div>Notas: {order.special_notes}</div>
                        )}
                    </div>
                )}
            </div>
        );
    },
);

OrderInvoice.displayName = 'OrderInvoice';
