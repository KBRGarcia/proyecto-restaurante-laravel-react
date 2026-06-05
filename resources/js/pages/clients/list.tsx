import { List, useTable } from "@refinedev/antd";
import { Table, Space, Tag, Typography } from "antd";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";
import { StatusSwitch } from "@/components/table/StatusSwitch";
import { useInlineUpdate } from "@/hooks/useInlineUpdate";

const { Text } = Typography;

type ClientRow = {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    identity_document: string | null;
    phone: string | null;
    email?: string | null;
    address?: string | null;
    birth_date?: string | null;
    user_id?: number | null;
    origin: "online" | "physical" | "mixed";
    origin_label: string;
    total_orders: number;
    total_spent: string | number;
    status: "active" | "inactive";
    notes?: string | null;
};

export const ClientsList = () => {
    const { tableProps } = useTable<ClientRow>({
        syncWithLocation: true,
    });

    const { update, isUpdating } = useInlineUpdate();

    const getOriginTag = (origin: string, label: string) => {
        const color = origin === "online" ? "blue" : origin === "physical" ? "gold" : "purple";

        return <Tag color={color}>{label}</Tag>;
    };

    const handleStatusChange = (checked: boolean, record: ClientRow) => {
        update("clients", record.id, {
            first_name: record.first_name,
            last_name: record.last_name,
            identity_document: record.identity_document,
            email: record.email ?? null,
            phone: record.phone ?? null,
            address: record.address ?? null,
            birth_date: record.birth_date ?? null,
            user_id: record.user_id ?? null,
            origin: record.origin,
            notes: record.notes ?? null,
            status: checked ? "active" : "inactive",
        });
    };

    return (
        <List headerButtons={() => <CustomCreateButton />}>
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
                <Table.Column<ClientRow>
                    dataIndex="status"
                    title="Estado"
                    render={(_, record) => (
                        <StatusSwitch
                            checked={record.status === "active"}
                            loading={isUpdating(record.id)}
                            onToggle={(checked) => handleStatusChange(checked, record)}
                        />
                    )}
                />
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
