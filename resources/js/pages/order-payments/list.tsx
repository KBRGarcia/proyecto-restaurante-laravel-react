import { List, useTable, DateField } from "@refinedev/antd";
import { Table, Space, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";

const { Text } = Typography;

export const OrderPaymentsList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
        sorters: { initial: [{ field: "created_at", order: "desc" }] },
    });

    const getCurrencyTag = (currency: string) => (
        currency === "nacional" ? <Tag color="blue">Nacional</Tag> : <Tag color="green">Internacional</Tag>
    );

    const getStatusTag = (status: string) => {
        switch (status) {
            case "confirmed":
                return <Tag color="success">Confirmado</Tag>;
            case "pending":
                return <Tag color="orange">Pendiente</Tag>;
            case "rejected":
                return <Tag color="error">Rechazado</Tag>;
            case "refunded":
                return <Tag color="purple">Reembolsado</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };

    return (
        <List headerButtons={() => <CustomCreateButton />}>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="order_id"
                    title="Orden"
                    render={(value) => <Link to={`/orders/show/${value}`}>Orden #{value}</Link>}
                />
                <Table.Column dataIndex="method_label" title="Metodo" render={(value) => <Text>{value}</Text>} />
                <Table.Column dataIndex="currency" title="Moneda" render={(value: string) => getCurrencyTag(value)} />
                <Table.Column
                    dataIndex="amount"
                    title="Monto"
                    render={(value, record: any) => <Text strong>{record.currency === "nacional" ? "Bs." : "$"} {Number(value).toFixed(2)}</Text>}
                />
                <Table.Column dataIndex="reference_number" title="Referencia" render={(value) => value || "N/A"} />
                <Table.Column dataIndex="status" title="Estado" render={(value: string) => getStatusTag(value)} />
                <Table.Column
                    dataIndex="paid_at"
                    title="Fecha de Pago"
                    render={(value: string | null) => value ? <DateField format="LLL" value={value} /> : <Text type="secondary">Sin fecha</Text>}
                />
                <Table.Column
                    title="Acciones"
                    dataIndex="actions"
                    align="center"
                    render={(_, record: { id: number }) => (
                        <Space>
                            <CustomShowButton recordItemId={record.id} />
                            <CustomEditButton recordItemId={record.id} />
                            <CustomDeleteButton recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
