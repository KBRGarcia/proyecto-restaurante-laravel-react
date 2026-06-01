import { List, useTable } from "@refinedev/antd";
import { Table, Space, Tag, Typography } from "antd";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";

const { Text } = Typography;

type ClientRow = {
    id: number;
    full_name: string;
    identity_document: string | null;
    phone: string | null;
    origin: "online" | "physical" | "mixed";
    origin_label: string;
    total_orders: number;
    total_spent: string | number;
    status: "active" | "inactive";
};

export const ClientsList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const getStatusTag = (status: string) => status === "active"
        ? <Tag color="success">Activo</Tag>
        : <Tag color="error">Inactivo</Tag>;

    const getOriginTag = (origin: string, label: string) => {
        const color = origin === "online" ? "blue" : origin === "physical" ? "gold" : "purple";

        return <Tag color={color}>{label}</Tag>;
    };

    return (
        <List
            headerButtons={() => (
                <CustomCreateButton />
            )}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="full_name" title="Cliente" render={(value: string) => <Text strong>{value}</Text>} />
                <Table.Column dataIndex="identity_document" title="Documento" render={(value: string | null) => value || "N/A"} />
                <Table.Column dataIndex="phone" title="Telefono" render={(value: string | null) => value || "N/A"} />
                <Table.Column
                    dataIndex="origin"
                    title="Origen"
                    render={(value: string, record: ClientRow) => getOriginTag(value, record.origin_label)}
                />
                <Table.Column dataIndex="total_orders" title="Ordenes" />
                <Table.Column dataIndex="total_spent" title="Total Comprado" render={(value: string | number) => `$${value}`} />
                <Table.Column dataIndex="status" title="Estado" render={(value: string) => getStatusTag(value)} />
                <Table.Column
                    title="Acciones"
                    dataIndex="actions"
                    align="center"
                    render={(_, record: ClientRow) => (
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
