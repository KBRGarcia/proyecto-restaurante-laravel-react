import { Show, EmailField, DateField } from "@refinedev/antd";
import { Typography } from "antd";
import { useShow } from "@refinedev/core";

const { Title, Text } = Typography;

export const UserShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>ID</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Nombre</Title>
            <Text>{record?.name} {record?.last_name}</Text>

            <Title level={5}>Email</Title>
            <EmailField value={record?.email} />

            <Title level={5}>Rol</Title>
            <Text>{record?.role}</Text>

            <Title level={5}>Estado</Title>
            <Text>{record?.status}</Text>
            
            <Title level={5}>Fecha de Registro</Title>
            <DateField format="LL" value={record?.registration_date} />
        </Show>
    );
};
