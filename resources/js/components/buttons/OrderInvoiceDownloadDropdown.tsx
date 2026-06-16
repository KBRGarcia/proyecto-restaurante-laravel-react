import type { InvoiceImageFormat } from '@/pages/orders/types';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';

type OrderInvoiceDownloadDropdownProps = {
    orderId: number;
    loading?: boolean;
    onDownload: (orderId: number, format: InvoiceImageFormat) => void;
    buttonType?: 'primary' | 'default';
    shape?: 'circle' | 'round' | 'default';
};

export const OrderInvoiceDownloadDropdown = ({
    orderId,
    loading = false,
    onDownload,
    buttonType = 'primary',
    shape = 'circle',
}: OrderInvoiceDownloadDropdownProps) => {
    return (
        <Dropdown
            menu={{
                items: [
                    {
                        key: 'png',
                        label: 'Descargar factura PNG',
                    },
                    {
                        key: 'jpg',
                        label: 'Descargar factura JPG',
                    },
                ],
                onClick: ({ key }) => onDownload(orderId, key as InvoiceImageFormat),
            }}
            trigger={['click']}
        >
            <Button
                type={buttonType}
                shape={shape}
                icon={<DownloadOutlined />}
                loading={loading}
                aria-label={`Descargar factura de la orden ${orderId}`}
            />
        </Dropdown>
    );
};
