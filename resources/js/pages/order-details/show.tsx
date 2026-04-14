import { Show, DateField } from "@refinedev/antd";
import { Typography } from "antd";
import { useShow } from "@refinedev/core";

const { Title, Text } = Typography;

export const OrderDetailsShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>ID</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Identificador</Title>
            <Text>{record?.name || 'N/A'}</Text>

            <Title level={5}>Creado</Title>
            <DateField value={record?.created_at} />
        </Show>
    );
};
