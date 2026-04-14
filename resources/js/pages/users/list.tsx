import {
    List,
    EmailField,
    DateField,
    EditButton,
    ShowButton,
    DeleteButton,
    useTable,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const UserList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="name" title="Nombre" />
                <Table.Column dataIndex="last_name" title="Apellido" />
                <Table.Column dataIndex="email" title="Email" render={(value: string) => <EmailField value={value} />} />
                <Table.Column dataIndex="role" title="Rol" />
                <Table.Column dataIndex="status" title="Estado" />
                <Table.Column
                    dataIndex="created_at"
                    title="Creado"
                    render={(value: string) => <DateField format="LL" value={value} />}
                />
                <Table.Column
                    title="Acciones"
                    dataIndex="actions"
                    render={(_, record: { id: number }) => (
                        <Space>
                            <ShowButton hideText size="small" recordItemId={record.id} />
                            <EditButton hideText size="small" recordItemId={record.id} />
                            <DeleteButton hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
