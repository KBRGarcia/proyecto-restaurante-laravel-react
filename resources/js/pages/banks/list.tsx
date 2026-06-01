import { List, useTable, DateField } from "@refinedev/antd";
import { Table, Space, Tag, Typography } from "antd";
import { CustomShowButton } from "@/components/buttons/CustomActionButtons";

const { Text } = Typography;

export const BanksList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" width={80} />
                <Table.Column
                    dataIndex="code"
                    title="Codigo"
                    render={(value: string) => <Text code>{value}</Text>}
                />
                <Table.Column dataIndex="name" title="Nombre del Banco" />
                <Table.Column
                    dataIndex="active"
                    title="Estado"
                    render={(value: boolean) => (
                        <Tag color={value ? "success" : "error"}>
                            {value ? "Activo" : "Inactivo"}
                        </Tag>
                    )}
                />
                <Table.Column
                    dataIndex="created_at"
                    title="Creado"
                    render={(value: string | null) => value ? <DateField format="LL" value={value} /> : <Text>N/A</Text>}
                />
                <Table.Column
                    title="Acciones"
                    dataIndex="actions"
                    align="center"
                    width={150}
                    render={(_, record: { id: number }) => (
                        <Space>
                            <CustomShowButton recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
