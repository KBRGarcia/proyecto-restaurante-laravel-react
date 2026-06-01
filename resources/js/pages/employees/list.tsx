import { List, useTable } from "@refinedev/antd";
import { Table, Space, Tag, Typography } from "antd";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";

const { Text } = Typography;

type EmployeeRow = {
    id: number;
    full_name: string;
    identity_document: string | null;
    phone: string | null;
    branches_summary?: string | null;
    status: "active" | "inactive";
    hire_date_formatted?: string | null;
};

export const EmployeesList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const getStatusTag = (status: string) => status === "active"
        ? <Tag color="success">Activo</Tag>
        : <Tag color="error">Inactivo</Tag>;

    return (
        <List
            headerButtons={() => (
                <CustomCreateButton />
            )}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="full_name" title="Empleado" render={(value: string) => <Text strong>{value}</Text>} />
                <Table.Column dataIndex="identity_document" title="Documento" render={(value: string | null) => value || "N/A"} />
                <Table.Column dataIndex="phone" title="Telefono" render={(value: string | null) => value || "N/A"} />
                <Table.Column
                    dataIndex="branches_summary"
                    title="Sucursales y cargos"
                    render={(value: string | null) => value || "Sin asignacion"}
                />
                <Table.Column dataIndex="status" title="Estado" render={(value: string) => getStatusTag(value)} />
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
