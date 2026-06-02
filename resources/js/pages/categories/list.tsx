import { List, useTable, DateField } from "@refinedev/antd";
import { Table, Space, Avatar, Typography } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";
import { StatusSwitch } from "@/components/table/StatusSwitch";
import { useInlineUpdate } from "@/hooks/useInlineUpdate";

const { Text } = Typography;

type CategoryRow = {
    id: number;
    name: string;
    description?: string | null;
    order_show: number;
    status: "active" | "inactive";
    image?: string | null;
    created_at?: string;
};

export const CategoriesList = () => {
    const { tableProps } = useTable<CategoryRow>({
        syncWithLocation: true,
    });

    const { update, isUpdating } = useInlineUpdate();

    const handleStatusChange = (checked: boolean, record: CategoryRow) => {
        update("categories", record.id, {
            name: record.name,
            description: record.description ?? null,
            order_show: record.order_show,
            status: checked ? "active" : "inactive",
        });
    };

    return (
        <List headerButtons={() => <CustomCreateButton />}>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="image"
                    title="Imagen"
                    render={(value: string, record: CategoryRow) => (
                        <Avatar
                            src={value || undefined}
                            shape="square"
                            size={50}
                            icon={<PictureOutlined />}
                            alt={record.name}
                        />
                    )}
                />
                <Table.Column dataIndex="name" title="Categoría" render={(value) => <Text strong>{value}</Text>} />
                <Table.Column dataIndex="order_show" title="Orden de Mostrar" />
                <Table.Column<CategoryRow>
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
                    dataIndex="created_at"
                    title="Creado"
                    render={(value: string) => <DateField format="LL" value={value} />}
                />
                <Table.Column
                    title="Acciones"
                    dataIndex="actions"
                    align="center"
                    render={(_, record: CategoryRow) => (
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
