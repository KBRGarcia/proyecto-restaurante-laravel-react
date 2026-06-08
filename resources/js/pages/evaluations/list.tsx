import { List, useTable, DateField } from "@refinedev/antd";
import { Table, Space, Rate, Typography } from "antd";
import { Link } from "react-router-dom";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";

const { Text } = Typography;

export const EvaluationsList = () => {
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
                    dataIndex={["user", "name"]} 
                    title="Evaluador" 
                    render={(_, record: any) => {
                        if (record.user) {
                            return `${record.user.name} ${record.user.last_name || ""}`.trim();
                        }

                        if (record.client) {
                            return record.client.full_name || `${record.client.first_name ?? ""} ${record.client.last_name ?? ""}`.trim();
                        }

                        if (record.user_id) {
                            return `Usuario #${record.user_id}`;
                        }

                        return record.client_id ? `Cliente #${record.client_id}` : "N/A";
                    }}
                />
                <Table.Column 
                    dataIndex="rating" 
                    title="Calificación" 
                    render={(value: number) => <Rate disabled defaultValue={value} style={{ fontSize: "14px" }} />}
                />
                <Table.Column dataIndex="comment" title="Comentario" render={(value) => value || "Sin comentario"} />
                <Table.Column 
                    dataIndex={["product", "name"]} 
                    title="Producto" 
                    render={(value, record: any) => value ? <Link to={`/products/show/${record.product_id}`}>{value}</Link> : "General"}
                />
                <Table.Column 
                    dataIndex="order_id" 
                    title="Orden" 
                    render={(value) => value ? <Link to={`/orders/show/${value}`}>Orden #{value}</Link> : "N/A"}
                />
                <Table.Column
                    dataIndex="evaluation_date"
                    title="Fecha"
                    render={(value: string) => <DateField format="LL" value={value} />}
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
