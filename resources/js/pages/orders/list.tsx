import { List, useTable, DateField } from "@refinedev/antd";
import { Table, Space, Tag, Typography } from "antd";
import { CustomShowButton, CustomEditButton, CustomDeleteButton } from "@/components/buttons/CustomActionButtons";

const { Text } = Typography;

export const OrdersList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
        sorters: { initial: [{ field: "id", order: "desc" }] },
    });

    const getStatusTag = (status: string) => {
        switch (status) {
            case "pending":
                return <Tag color="orange">Pendiente</Tag>;
            case "preparing":
                return <Tag color="blue">En Cocina</Tag>;
            case "ready":
                return <Tag color="green">Listo</Tag>;
            case "delivered":
                return <Tag color="cyan">Entregado</Tag>;
            case "canceled":
                return <Tag color="red">Cancelado</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };

    const getServiceTypeTag = (type: string) => {
        return type === "delivery" ? (
            <Tag color="purple">Delivery</Tag>
        ) : (
            <Tag color="magenta">Retiro en local</Tag>
        );
    };

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" render={(value) => <Text strong>#{value}</Text>} />
                <Table.Column 
                    dataIndex={["user", "name"]} 
                    title="Cliente" 
                    render={(value, record: any) => record.user ? `${record.user.name} ${record.user.last_name || ""}` : `Usuario #${record.user_id}`}
                />
                <Table.Column 
                    dataIndex="total" 
                    title="Total" 
                    render={(value, record: any) => (
                        <Text strong>
                            {record.currency === "nacional" ? "Bs." : "$"} {Number(value).toFixed(2)}
                        </Text>
                    )}
                />
                <Table.Column 
                    dataIndex="service_type" 
                    title="Tipo de Servicio" 
                    render={(value: string) => getServiceTypeTag(value)}
                />
                <Table.Column dataIndex="status" title="Estado" render={(value: string) => getStatusTag(value)} />
                <Table.Column
                    dataIndex="order_date"
                    title="Fecha"
                    render={(value: string) => <DateField format="LLL" value={value} />}
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
