import { List, useTable } from "@refinedev/antd";
import { Table, Space, Tag, Typography } from "antd";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";
import { StatusSwitch } from "@/components/table/StatusSwitch";
import { useInlineUpdate } from "@/hooks/useInlineUpdate";

const { Text } = Typography;

type BranchRow = {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    postal_code?: string | null;
    phone: string;
    email?: string | null;
    opening_time: string;
    closing_time: string;
    operation_days?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    is_main?: boolean;
    has_delivery?: boolean;
    has_parking?: boolean;
    capacity_people?: number | null;
    image?: string | null;
    description?: string | null;
    manager?: string | null;
    active: boolean;
};

export const BranchesList = () => {
    const { tableProps } = useTable<BranchRow>({
        syncWithLocation: true,
    });

    const { update, isUpdating } = useInlineUpdate();

    const handleActiveChange = (checked: boolean, record: BranchRow) => {
        update("branches", record.id, {
            name: record.name,
            address: record.address,
            city: record.city,
            state: record.state,
            postal_code: record.postal_code ?? null,
            phone: record.phone,
            email: record.email ?? null,
            opening_time: record.opening_time,
            closing_time: record.closing_time,
            operation_days: record.operation_days ?? null,
            latitude: record.latitude ?? null,
            longitude: record.longitude ?? null,
            is_main: record.is_main ?? false,
            has_delivery: record.has_delivery ?? true,
            has_parking: record.has_parking ?? false,
            capacity_people: record.capacity_people ?? null,
            image: record.image ?? null,
            description: record.description ?? null,
            manager: record.manager ?? null,
            active: checked,
        });
    };

    return (
        <List headerButtons={() => <CustomCreateButton />}>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="name"
                    title="Sucursal"
                    render={(value, record: BranchRow) => (
                        <div>
                            <Text strong>{value}</Text>
                            {record.is_main && (
                                <Tag color="gold" style={{ marginLeft: "8px" }}>
                                    Principal
                                </Tag>
                            )}
                        </div>
                    )}
                />
                <Table.Column dataIndex="phone" title="Teléfono" />
                <Table.Column
                    dataIndex="address"
                    title="Dirección"
                    render={(value, record: BranchRow) => `${value}, ${record.city}`}
                />
                <Table.Column
                    dataIndex="opening_time"
                    title="Horario"
                    render={(value, record: BranchRow) => `${value} - ${record.closing_time}`}
                />
                <Table.Column dataIndex="manager" title="Gerente" render={(value) => value || "N/A"} />
                <Table.Column<BranchRow>
                    dataIndex="active"
                    title="Estado"
                    render={(_, record) => (
                        <StatusSwitch
                            checked={record.active}
                            loading={isUpdating(record.id)}
                            onToggle={(checked) => handleActiveChange(checked, record)}
                        />
                    )}
                />
                <Table.Column
                    title="Acciones"
                    dataIndex="actions"
                    align="center"
                    render={(_, record: BranchRow) => (
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
