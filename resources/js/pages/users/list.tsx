import { List, EmailField, DateField, useTable } from "@refinedev/antd";
import { useUpdate } from "@refinedev/core";
import { Table, Space, Avatar, Tag, Typography, Switch } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";

const { Text } = Typography;

type UserTableRecord = {
    id: number;
    name: string;
    last_name: string;
    email: string;
    role: string;
    status: "active" | "inactive";
    profile_picture?: string | null;
    phone_number?: string | null;
    address?: string | null;
    created_at?: string;
};

export const UserList = () => {
    const { tableProps } = useTable<UserTableRecord>({
        syncWithLocation: true,
    });

    const { mutate, mutation } = useUpdate();
    const [updatingId, setUpdatingId] = useState<number | null>(null);

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

    const handleStatusChange = (checked: boolean, record: UserTableRecord) => {
        setUpdatingId(record.id);

        mutate(
            {
                resource: "users",
                id: record.id,
                values: {
                    name: record.name,
                    last_name: record.last_name,
                    email: record.email,
                    role: record.role,
                    status: checked ? "active" : "inactive",
                    phone_number: record.phone_number ?? null,
                    address: record.address ?? null,
                },
            },
            {
                onSettled: () => setUpdatingId(null),
            },
        );
    };

    return (
        <List
            headerButtons={() => (
                <>
                    <CustomCreateButton />
                </>
            )}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="profile_picture"
                    title="Foto"
                    render={(value: string, record: UserTableRecord) => (
                        <Avatar src={value} icon={<UserOutlined />} alt={record.name} />
                    )}
                />
                <Table.Column
                    dataIndex="name"
                    title="Nombre Completo"
                    render={(_, record: UserTableRecord) => (
                        <Text strong>
                            {record.name} {record.last_name}
                        </Text>
                    )}
                />
                <Table.Column
                    dataIndex="email"
                    title="Email"
                    render={(value: string) => <EmailField value={value} />}
                />
                <Table.Column
                    dataIndex="role"
                    title="Rol"
                    render={(value: string) => getRoleTag(value)}
                />
                <Table.Column<UserTableRecord>
                    dataIndex="status"
                    title="Estado"
                    render={(_, record) => (
                        <Switch
                            checked={record.status === "active"}
                            loading={mutation.isPending && updatingId === record.id}
                            onChange={(checked) => handleStatusChange(checked, record)}
                            onClick={(_, event) => event.stopPropagation()}
                        />
                    )}
                />
                <Table.Column
                    dataIndex="created_at"
                    title="Creado"
                    render={(value: string) => <DateField format="LL" value={value} />}
                />
                <Table.Column
                    title="Acciones"
                    dataIndex="actions"
                    align="center"
                    render={(_, record: UserTableRecord) => (
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
