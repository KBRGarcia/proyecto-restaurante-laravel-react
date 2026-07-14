import {
    CustomDeleteButton,
    CustomEditButton,
    CustomShowButton,
    CustomCreateButton
} from '@/components/buttons/CustomActionButtons';
import { OrderInvoiceDownloadDropdown } from '@/components/buttons/OrderInvoiceDownloadDropdown';
import { useOrderInvoiceImage } from '@/hooks/useOrderInvoiceImage';
import { DateField, List, useTable } from '@refinedev/antd';
import { Space, Table, Tag, Typography } from 'antd';
import type { OrderRecord } from './types';

const { Text } = Typography;

export const OrdersList = () => {
    const { tableProps } = useTable<OrderRecord>({
        syncWithLocation: true,
        sorters: { initial: [{ field: 'id', order: 'desc' }] },
    });

    const {
        contextHolder,
        downloadInvoice,
        exportingOrderId,
        invoiceRenderer,
    } = useOrderInvoiceImage();

    const getStatusTag = (status: string) => {
        switch (status) {
            case 'pending':
                return <Tag color="orange">Pendiente</Tag>;
            case 'preparing':
                return <Tag color="blue">En Cocina</Tag>;
            case 'ready':
                return <Tag color="green">Listo</Tag>;
            case 'delivered':
                return <Tag color="cyan">Entregado</Tag>;
            case 'canceled':
                return <Tag color="red">Cancelado</Tag>;
            case 'on_the_way':
                return <Tag color="geekblue">En Camino</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };

    const getServiceTypeTag = (type: string) => {
        return type === 'delivery' ? (
            <Tag color="purple">Delivery</Tag>
        ) : (
            <Tag color="magenta">Retiro en local</Tag>
        );
    };

    return (
        <List headerButtons={() => <CustomCreateButton />}>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    render={(value) => <Text strong>#{value}</Text>}
                />
                <Table.Column<OrderRecord>
                    dataIndex={['user', 'name']}
                    title="Cliente"
                    render={(_, record) =>
                        record.user
                            ? `${record.user.name} ${record.user.last_name || ''}`
                            : `Usuario #${record.user_id}`
                    }
                />
                <Table.Column
                    dataIndex="service_type"
                    title="Tipo de Servicio"
                    render={(value: string) => getServiceTypeTag(value)}
                />
                <Table.Column
                    dataIndex="status"
                    title="Estado"
                    render={(value: string) => getStatusTag(value)}
                />
                <Table.Column
                    dataIndex="order_date"
                    title="Fecha"
                    render={(value: string) => (
                        <DateField format="LLL" value={value} />
                    )}
                />
                <Table.Column
                    title="Acciones"
                    dataIndex="actions"
                    align="center"
                    render={(_, record: OrderRecord) => (
                        <Space>
                            <CustomShowButton recordItemId={record.id} />
                            <CustomEditButton recordItemId={record.id} />
                            <OrderInvoiceDownloadDropdown
                                orderId={record.id}
                                loading={exportingOrderId === record.id}
                                onDownload={downloadInvoice}
                            />
                            <CustomDeleteButton recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
