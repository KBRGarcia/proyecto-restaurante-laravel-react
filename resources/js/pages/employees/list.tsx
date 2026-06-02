import { List, useTable } from "@refinedev/antd";
import { Table, Space, Typography } from "antd";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";
import { StatusSwitch } from "@/components/table/StatusSwitch";
import { useInlineUpdate } from "@/hooks/useInlineUpdate";

const { Text } = Typography;

type EmployeeRow = {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    identity_document: string | null;
    phone: string | null;
    email?: string | null;
    address?: string | null;
    birth_date?: string | null;
    user_id?: number | null;
    hire_date: string;
    status: "active" | "inactive";
    notes?: string | null;
    branches_summary?: string | null;
    hire_date_formatted?: string | null;
};

export const EmployeesList = () => {
    const { tableProps } = useTable<EmployeeRow>({
        syncWithLocation: true,
    });

    const { update, isUpdating } = useInlineUpdate();

    const handleStatusChange = (checked: boolean, record: EmployeeRow) => {
        update("employees", record.id, {
            first_name: record.first_name,
            last_name: record.last_name,
            identity_document: record.identity_document,
            email: record.email ?? null,
            phone: record.phone ?? null,
            address: record.address ?? null,
            birth_date: record.birth_date ?? null,
            user_id: record.user_id ?? null,
            hire_date: record.hire_date,
            notes: record.notes ?? null,
            status: checked ? "active" : "inactive",
        });
    };

    return (
        <List headerButtons={() => <CustomCreateButton />}>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="full_name" title="Empleado" render={(value: string) => <Text strong>{value}</Text>} />
                <Table.Column dataIndex="identity_document" title="Documento" render={(value: string | null) => value || "N/A"} />
                <Table.Column dataIndex="phone" title="Telefono" render={(value: string | null) => value || "N/A"} />
                <Table.Column
                    dataIndex="branches_summary"
                    title="Sucursales y cargos"
                    render={(value: string | null) => value || "Sin asignacion"}
                />
                <Table.Column<EmployeeRow>
                    dataIndex="status"
                    title="Estado"
                    render={(_, record) => (
                        <StatusSwitch
                            checked={record.status === "active"}
                            loading={isUpdating(record.id)}
                            onToggle={(checked) => handleStatusChange(checked, record)}
                        />
                    )}
                />
                <Table.Column dataIndex="hire_date_formatted" title="Contratacion" render={(value: string | null) => value || "N/A"} />
                <Table.Column
                    title="Acciones"
                    dataIndex="actions"
                    align="center"
                    render={(_, record: EmployeeRow) => (
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
