import { List, useTable, DateField } from "@refinedev/antd";
import { Table, Space, Tag, Avatar, Typography } from "antd";
import { CoffeeOutlined, StarOutlined } from "@ant-design/icons";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";
import { StatusSwitch } from "@/components/table/StatusSwitch";
import { useInlineUpdate } from "@/hooks/useInlineUpdate";

const { Text } = Typography;

type ProductRow = {
    id: number;
    name: string;
    price: number | string;
    category_id: number;
    preparation_time: number;
    ingredients?: string | null;
    description?: string | null;
    status: "active" | "inactive" | "out of stock";
    is_special?: boolean;
    image?: string | null;
    created_at?: string;
    category?: { name?: string };
};

export const ProductsList = () => {
    const { tableProps } = useTable<ProductRow>({
        syncWithLocation: true,
    });

    const { update, isUpdating } = useInlineUpdate();

    const handleStatusChange = (checked: boolean, record: ProductRow) => {
        update("products", record.id, {
            name: record.name,
            price: record.price,
            category_id: record.category_id,
            preparation_time: record.preparation_time,
            ingredients: record.ingredients ?? null,
            description: record.description ?? null,
            is_special: record.is_special ?? false,
            status: checked ? "active" : "inactive",
        });
    };

    return (
        <List headerButtons={() => <CustomCreateButton />}>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="image"
                    title="Imagen"
                    render={(value: string, record: ProductRow) => (
                        <Avatar
                            src={value || undefined}
                            shape="square"
                            size={50}
                            icon={<CoffeeOutlined />}
                            alt={record.name}
                        />
                    )}
                />
                <Table.Column
                    dataIndex="name"
                    title="Producto"
                    render={(value, record: ProductRow) => (
                        <div>
                            <Text strong>{value}</Text>
                            {record.is_special && (
                                <Tag color="gold" style={{ marginLeft: "8px" }}>
                                    <StarOutlined /> Especial
                                </Tag>
                            )}
                        </div>
                    )}
                />
                <Table.Column
                    dataIndex="price"
                    title="Precio"
                    render={(value) => (
                        <Text strong style={{ color: "#3f8600" }}>
                            $ {Number(value).toFixed(2)}
                        </Text>
                    )}
                />
                <Table.Column
                    dataIndex={["category", "name"]}
                    title="Categoría"
                    render={(value) => value || "Sin Categoría"}
                />
                <Table.Column dataIndex="preparation_time" title="Tiempo Prep." render={(value) => `${value} min`} />
                <Table.Column<ProductRow>
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
                    render={(_, record: ProductRow) => (
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
