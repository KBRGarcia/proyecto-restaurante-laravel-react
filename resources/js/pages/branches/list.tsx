import { List, useTable } from "@refinedev/antd";
import { Table, Space, Tag, Typography } from "antd";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";

const { Text } = Typography;

export const BranchesList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const getStatusTag = (active: boolean) => {
        return active ? (
            <Tag color="success">Activa</Tag>
        ) : (
            <Tag color="error">Inactiva</Tag>
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
                <Table.Column 
                    dataIndex="name" 
                    title="Sucursal" 
                    render={(value, record: any) => (
                        <div>
                            <Text strong>{value}</Text>
                            {record.is_main && (
                                <Tag color="gold" style={{ marginLeft: "8px" }}>Principal</Tag>
                            )}
                        </div>
                    )}
                />
                <Table.Column dataIndex="phone" title="Teléfono" />
                <Table.Column 
                    dataIndex="address" 
                    title="Dirección" 
                    render={(value, record: any) => `${value}, ${record.city}`}
                />
                <Table.Column 
                    dataIndex="opening_time" 
                    title="Horario" 
                    render={(value, record: any) => `${value} - ${record.closing_time}`}
                />
                <Table.Column dataIndex="manager" title="Gerente" render={(value) => value || "N/A"} />
                <Table.Column dataIndex="active" title="Estado" render={(value: boolean) => getStatusTag(value)} />
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
        </List >
    );
};
