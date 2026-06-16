import { OrderInvoice } from '@/components/invoices/OrderInvoice';
import type { InvoiceImageFormat, OrderRecord } from '@/pages/orders/types';
import { useDataProvider } from '@refinedev/core';
import { message } from 'antd';
import { toJpeg, toPng } from 'html-to-image';
import type { CSSProperties } from 'react';
import { useRef, useState } from 'react';

const hiddenRendererStyles = {
    position: 'fixed',
    left: '-10000px',
    top: 0,
    zIndex: -1,
} satisfies CSSProperties;

const waitForInvoiceRender = () =>
    new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

const downloadDataUrl = (
    dataUrl: string,
    orderId: number,
    format: InvoiceImageFormat,
) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `factura-orden-${orderId}.${format}`;
    link.click();
};

export const useOrderInvoiceImage = () => {
    const getDataProvider = useDataProvider();
    const invoiceRef = useRef<HTMLDivElement>(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [invoiceOrder, setInvoiceOrder] = useState<OrderRecord | null>(null);
    const [exportingOrderId, setExportingOrderId] = useState<number | null>(
        null,
    );

    const downloadInvoice = async (
        orderOrId: OrderRecord | number,
        format: InvoiceImageFormat,
    ) => {
        const orderId = typeof orderOrId === 'number' ? orderOrId : orderOrId.id;

        try {
            setExportingOrderId(orderId);

            const { data } = await getDataProvider().getOne<OrderRecord>({
                resource: 'orders',
                id: orderId,
            });

            setInvoiceOrder(data);
            await waitForInvoiceRender();

            if (!invoiceRef.current) {
                throw new Error(
                    'No se pudo preparar la factura para exportar.',
                );
            }

            const options = {
                backgroundColor: '#ffffff',
                cacheBust: true,
                pixelRatio: 2,
            };
            const dataUrl =
                format === 'png'
                    ? await toPng(invoiceRef.current, options)
                    : await toJpeg(invoiceRef.current, {
                          ...options,
                          quality: 0.95,
                      });

            downloadDataUrl(dataUrl, orderId, format);
            messageApi.success(
                `Factura #${orderId} descargada en ${format.toUpperCase()}.`,
            );
        } catch (error) {
            const description =
                error instanceof Error ? error.message : 'Intenta nuevamente.';
            messageApi.error(`No se pudo generar la factura. ${description}`);
        } finally {
            setExportingOrderId(null);
        }
    };

    const invoiceRenderer = (
        <div aria-hidden="true" style={hiddenRendererStyles}>
            {invoiceOrder && (
                <OrderInvoice ref={invoiceRef} order={invoiceOrder} />
            )}
        </div>
    );

    return {
        contextHolder,
        downloadInvoice,
        exportingOrderId,
        invoiceRenderer,
    };
};
