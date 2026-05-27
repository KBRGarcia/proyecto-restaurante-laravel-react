import { List, useTable, DateField } from "@refinedev/antd";
import { Table, Space, Tag, Typography } from "antd";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";

const { Text } = Typography;

export const PaymentMethodsList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const getCurrencyTypeTag = (type: string) => {
        return type === "nacional" ? (
            <Tag color="blue">Bolívares (Bs.)</Tag>
        ) : (
            <Tag color="green">Dólares ($)</Tag>
        );
    };

    const getStatusTag = (active: boolean) => {
        return active ? (
            <Tag color="success">Activo</Tag>
        ) : (
            <Tag color="error">Inactivo</Tag>
        );
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
                <Table.Column dataIndex="code" title="Código" render={(value) => <Text code>{value}</Text>} />
                <Table.Column dataIndex="name" title="Método de Pago" render={(value) => <Text strong>{value}</Text>} />
                <Table.Column dataIndex="currency_type" title="Moneda" render={(value: string) => getCurrencyTypeTag(value)} />
                <Table.Column dataIndex="active" title="Estado" render={(value: boolean) => getStatusTag(value)} />
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
