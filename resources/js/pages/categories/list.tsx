import { List, useTable, DateField } from "@refinedev/antd";
import { Table, Space, Tag, Avatar, Typography } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";

const { Text } = Typography;

export const CategoriesList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

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
                    dataIndex="image"
                    title="Imagen"
                    render={(value: string) => (
                        <Avatar src={value} shape="square" size={50} icon={<PictureOutlined />} />
                    )}
                />
                <Table.Column dataIndex="name" title="Categoría" render={(value) => <Text strong>{value}</Text>} />
                <Table.Column dataIndex="order_show" title="Orden de Mostrar" />
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
