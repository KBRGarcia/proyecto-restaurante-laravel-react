import { List, useTable, DateField } from "@refinedev/antd";
import { Table, Space, Tag, Typography } from "antd";
import { CustomShowButton } from "@/components/buttons/CustomActionButtons";
import { StatusSwitch } from "@/components/table/StatusSwitch";
import { useInlineUpdate } from "@/hooks/useInlineUpdate";

const { Text } = Typography;

type PaymentMethodRow = {
    id: number;
    code: string;
    name: string;
    currency_type: string;
    active: boolean;
    created_at?: string | null;
};

export const PaymentMethodsList = () => {
    const { tableProps } = useTable<PaymentMethodRow>({
        syncWithLocation: true,
    });

    const { update, isUpdating } = useInlineUpdate();

    const getCurrencyTypeTag = (type: string) => {
        return type === "nacional" ? (
            <Tag color="blue">Bolívares (Bs.)</Tag>
        ) : (
            <Tag color="green">Dólares ($)</Tag>
        );
    };

    const handleActiveChange = (checked: boolean, record: PaymentMethodRow) => {
        update("payment-methods", record.id, {
            active: checked,
        });
    };

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="code" title="Código" render={(value) => <Text code>{value}</Text>} />
                <Table.Column dataIndex="name" title="Método de Pago" render={(value) => <Text strong>{value}</Text>} />
                <Table.Column dataIndex="currency_type" title="Moneda" render={(value: string) => getCurrencyTypeTag(value)} />
                <Table.Column<PaymentMethodRow>
                    dataIndex="active"
                    title="Estado"
                    render={(_, record) => (
                        <StatusSwitch
                            checked={record.active}
                            loading={isUpdating(record.id)}
                            onToggle={(checked) => handleActiveChange(checked, record)}
                        />
                    )}
                />
                <Table.Column
                    dataIndex="created_at"
                    title="Creado"
                    render={(value: string | null) => (value ? <DateField format="LL" value={value} /> : <Text>N/A</Text>)}
                />
                <Table.Column
                    title="Acciones"
                    dataIndex="actions"
                    align="center"
                    render={(_, record: PaymentMethodRow) => (
                        <Space>
                            <CustomShowButton recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
