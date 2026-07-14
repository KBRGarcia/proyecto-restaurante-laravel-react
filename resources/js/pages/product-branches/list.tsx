import { List, useTable, DateField } from "@refinedev/antd";
import { Space, Table, Tag, Typography } from "antd";
import {
    CustomCreateButton,
    CustomDeleteButton,
    CustomEditButton,
    CustomShowButton,
} from "@/components/buttons/CustomActionButtons";
import { StatusSwitch } from "@/components/table/StatusSwitch";
import { useInlineUpdate } from "@/hooks/useInlineUpdate";

const { Text } = Typography;

type ProductBranchRow = {
    id: number;
    product_id: number;
    branch_id: number;
    product_name?: string;
    branch_name?: string;
    branch_city?: string;
    available: boolean;
    special_price?: number | null;
    effective_price?: number;
    product_price?: number;
    assignment_date?: string;
    created_at?: string;
};

export const ProductBranchesList = () => {
    const { tableProps } = useTable<ProductBranchRow>({
        syncWithLocation: true,
    });

    const { update, isUpdating } = useInlineUpdate();

    const handleAvailabilityChange = (checked: boolean, record: ProductBranchRow) => {
        update("product-branches", record.id, {
            product_id: record.product_id,
            branch_id: record.branch_id,
            available: checked,
            special_price: record.special_price ?? null,
        });
    };

    return (
        <List headerButtons={() => <CustomCreateButton />}>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="product_name"
                    title="Producto"
                    render={(value) => <Text strong>{value || "N/A"}</Text>}
                />
                <Table.Column
                    dataIndex="branch_name"
                    title="Sucursal"
                    render={(value, record: ProductBranchRow) => (
                        <span>
                            {value || "N/A"}
                            {record.branch_city ? (
                                <Text type="secondary"> ({record.branch_city})</Text>
                            ) : null}
                        </span>
                    )}
                />
                <Table.Column
                    dataIndex="product_price"
                    title="Precio base"
                    render={(value: number) =>
                        value != null ? `$${Number(value).toFixed(2)}` : "—"
                    }
                />
                <Table.Column
                    dataIndex="special_price"
                    title="Precio especial"
                    render={(value: number | null) =>
                        value != null ? (
                            <Tag color="blue">${Number(value).toFixed(2)}</Tag>
                        ) : (
                            <Text type="secondary">—</Text>
                        )
                    }
                />
                <Table.Column
                    dataIndex="effective_price"
                    title="Precio efectivo"
                    render={(value: number) =>
                        value != null ? `$${Number(value).toFixed(2)}` : "—"
                    }
                />
                <Table.Column<ProductBranchRow>
                    dataIndex="available"
                    title="Disponible"
                    render={(_, record) => (
                        <StatusSwitch
                            checked={record.available}
                            loading={isUpdating(record.id)}
                            onToggle={(checked) => handleAvailabilityChange(checked, record)}
                        />
                    )}
                />
                <Table.Column
                    dataIndex="assignment_date"
                    title="Asignado"
                    render={(value: string) =>
                        value ? <DateField format="LL" value={value} /> : "—"
                    }
                />
                <Table.Column
                    title="Acciones"
                    dataIndex="actions"
                    align="center"
                    render={(_, record: ProductBranchRow) => (
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
