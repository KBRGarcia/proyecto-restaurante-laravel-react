import { List, useTable, DateField } from "@refinedev/antd";
import { Table, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";

const { Text } = Typography;

export const OrderDetailsList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List
            headerButtons={({ defaultButtons }) => (
                <>
                    <CustomCreateButton />
                </>
            )}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column 
                    dataIndex="order_id" 
                    title="Orden" 
                    render={(value) => <Link to={`/orders/show/${value}`}>Orden #{value}</Link>}
                />
                <Table.Column 
                    dataIndex={["product", "name"]} 
                    title="Producto" 
                    render={(value, record: any) => value || `Producto #${record.product_id}`}
                />
                <Table.Column dataIndex="quantity" title="Cantidad" render={(value) => <Text strong>{value}</Text>} />
                <Table.Column 
                    dataIndex="unit_price" 
                    title="Precio Unitario" 
                    render={(value) => `$ ${Number(value).toFixed(2)}`}
                />
                <Table.Column 
                    dataIndex="subtotal" 
                    title="Subtotal" 
                    render={(value) => <Text strong color="green">$ {Number(value).toFixed(2)}</Text>}
                />
                <Table.Column dataIndex="product_notes" title="Notas del Item" render={(value) => value || "N/A"} />
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
