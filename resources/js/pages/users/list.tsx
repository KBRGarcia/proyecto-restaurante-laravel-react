import { List, EmailField, DateField, useTable } from "@refinedev/antd";
import { Table, Space, Avatar, Tag, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";

const { Text } = Typography;

export const UserList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const getRoleTag = (role: string) => {
        switch (role) {
            case "admin":
                return <Tag color="red">Administrador</Tag>;
            case "employee":
                return <Tag color="blue">Empleado</Tag>;
            case "client":
                return <Tag color="green">Cliente</Tag>;
            default:
                return <Tag>{role}</Tag>;
        }
    };

    const getStatusTag = (status: string) => {
        return status === "active" ? (
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
                <Table.Column
                    dataIndex="profile_picture"
                    title="Foto"
                    render={(value: string, record: any) => (
                        <Avatar src={value} icon={<UserOutlined />} alt={record.name} />
                    )}
                />
                <Table.Column 
                    dataIndex="name" 
                    title="Nombre Completo" 
                    render={(_, record: any) => (
                        <Text strong>{record.name} {record.last_name}</Text>
                    )}
                />
                <Table.Column dataIndex="email" title="Email" render={(value: string) => <EmailField value={value} />} />
                <Table.Column dataIndex="role" title="Rol" render={(value: string) => getRoleTag(value)} />
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
