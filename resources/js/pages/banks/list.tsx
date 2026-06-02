import { List, useTable, DateField } from "@refinedev/antd";
import { Table, Space, Typography } from "antd";
import { CustomShowButton } from "@/components/buttons/CustomActionButtons";
import { StatusSwitch } from "@/components/table/StatusSwitch";
import { useInlineUpdate } from "@/hooks/useInlineUpdate";

const { Text } = Typography;

type BankRow = {
    id: number;
    code: string;
    name: string;
    active: boolean;
    created_at?: string | null;
};

export const BanksList = () => {
    const { tableProps } = useTable<BankRow>({
        syncWithLocation: true,
    });

    const { update, isUpdating } = useInlineUpdate();

    const handleActiveChange = (checked: boolean, record: BankRow) => {
        update("banks", record.id, {
            active: checked,
        });
    };

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="name" title="Nombre del Banco" />
                <Table.Column dataIndex="code" title="Codigo" render={(value: string) => <Text code>{value}</Text>} />
                <Table.Column<BankRow>
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
                    width={150}
                    render={(_, record: BankRow) => (
                        <Space>
                            <CustomShowButton recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
