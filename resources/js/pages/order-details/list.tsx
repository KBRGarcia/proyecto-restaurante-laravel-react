import { List, useTable } from "@refinedev/antd";
import { Space, Table, Typography } from "antd";
import { Link } from "react-router";
import {
    CustomShowButton,
    CustomEditButton,
    CustomDeleteButton,
    CustomCreateButton,
} from "@/components/buttons/CustomActionButtons";
import { OrderInvoiceDownloadDropdown } from "@/components/buttons/OrderInvoiceDownloadDropdown";
import { useOrderInvoiceImage } from "@/hooks/useOrderInvoiceImage";
import { getOrderServiceTypeTag } from "@/lib/order-list-tags";

const { Text } = Typography;

type OrderDetailsListRecord = {
    id: number;
    order_id: number;
    service_type?: string;
    currency?: string;
    subtotal?: number | string;
    taxes?: number | string;
    total?: number | string;
    items_count?: number;
    user?: { name?: string; last_name?: string } | null;
};

export const OrderDetailsList = () => {
    const { tableProps } = useTable<OrderDetailsListRecord>({
        syncWithLocation: true,
        sorters: { initial: [{ field: "id", order: "desc" }] },
    });

    const {
        contextHolder,
        downloadInvoice,
        exportingOrderId,
        invoiceRenderer,
    } = useOrderInvoiceImage();

    return (
        <List
            headerButtons={() => (
                <>
                    <CustomCreateButton />
                </>
            )}
        >
            {contextHolder}
            {invoiceRenderer}
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="order_id"
                    title="Orden"
                    render={(value) => <Link to={`/orders/show/${value}`}>Orden #{value}</Link>}
                />
                <Table.Column<OrderDetailsListRecord>
                    title="Cliente"
                    render={(_, record) =>
                        record.user
                            ? `${record.user.name ?? ""} ${record.user.last_name ?? ""}`.trim()
                            : "N/A"
                    }
                />
                <Table.Column
                    dataIndex="items_count"
                    title="Productos"
                    render={(value) => <Text strong>{value ?? 0}</Text>}
                />
                <Table.Column
                    dataIndex="service_type"
                    title="Tipo de Servicio"
                    render={(value: string) => getOrderServiceTypeTag(value)}
                />
                <Table.Column<OrderDetailsListRecord>
                    dataIndex="total"
                    title="Total"
                    render={(value, record) => (
                        <Text strong>
                            {record.currency === "nacional" ? "Bs." : "$"} {Number(value ?? 0).toFixed(2)}
                        </Text>
                    )}
                />
                <Table.Column
                    title="Acciones"
                    dataIndex="actions"
                    align="center"
                    render={(_, record: OrderDetailsListRecord) => (
                        <Space>
                            <CustomShowButton recordItemId={record.id} />
                            <CustomEditButton recordItemId={record.id} />
                            <OrderInvoiceDownloadDropdown
                                orderId={record.order_id}
                                loading={exportingOrderId === record.order_id}
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
