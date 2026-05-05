import { List, EmailField, DateField, useTable } from "@refinedev/antd";
import { Table, Space } from "antd";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";

export const UserList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List
            // Bonton de crear
            headerButtons={({ defaultButtons }) => (
                <>
                    <CustomCreateButton />
                </>
            )}
        >

            {/* Tabla de los registros */}
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="name" title="Nombres" />
                <Table.Column dataIndex="last_name" title="Apellido" />
                <Table.Column dataIndex="email" title="Email" render={(value: string) => <EmailField value={value} />} />
                <Table.Column dataIndex="role" title="Rol" />
                <Table.Column dataIndex="status" title="Estado" />
                <Table.Column
                    dataIndex="created_at"
                    title="Creado"
                    render={(value: string) => <DateField format="LL" value={value} />}
                />

                {/* Botones de Accion */}
                <Table.Column
                    title="Acciones"
                    dataIndex="actions"
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
