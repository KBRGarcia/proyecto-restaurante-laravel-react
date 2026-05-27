import { List, useTable, DateField } from "@refinedev/antd";
import { Table, Space, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";

const { Text } = Typography;

export const PhysicalPaymentOrdersList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const getStatusTag = (status: string) => {
        switch (status) {
            case "confirmed":
                return <Tag color="success">Confirmado</Tag>;
            case "pending":
                return <Tag color="orange">Pendiente</Tag>;
            case "canceled":
                return <Tag color="error">Cancelado</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };

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
                    dataIndex="limit_date" 
                    title="Fecha Límite" 
                    render={(value: string) => <DateField format="LLL" value={value} />}
                />
                <Table.Column dataIndex="status" title="Estado" render={(value: string) => getStatusTag(value)} />
                <Table.Column
                    dataIndex="created_at"
                    title="Creado"
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
