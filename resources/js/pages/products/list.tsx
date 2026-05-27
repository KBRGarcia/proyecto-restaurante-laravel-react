import { List, useTable, DateField } from "@refinedev/antd";
import { Table, Space, Tag, Avatar, Typography } from "antd";
import { CoffeeOutlined, StarOutlined } from "@ant-design/icons";
import { CustomShowButton, CustomEditButton, CustomDeleteButton, CustomCreateButton } from "@/components/buttons/CustomActionButtons";

const { Text } = Typography;

export const ProductsList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const getStatusTag = (status: string) => {
        switch (status) {
            case "active":
                return <Tag color="success">Activo</Tag>;
            case "inactive":
                return <Tag color="error">Inactivo</Tag>;
            case "out of stock":
                return <Tag color="warning">Agotado</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
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
                        <Avatar src={value} shape="square" size={50} icon={<CoffeeOutlined />} />
                    )}
                />
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column 
                    dataIndex="name" 
                    title="Producto" 
                    render={(value, record: any) => (
                        <div>
                            <Text strong>{value}</Text>
                            {record.is_special && (
                                <Tag color="gold" style={{ marginLeft: "8px" }}>
                                    <StarOutlined /> Especial
                                </Tag>
                            )}
                        </div>
                    )}
                />
                <Table.Column 
                    dataIndex="price" 
                    title="Precio" 
                    render={(value) => (
                        <Text strong color="green">
                            $ {Number(value).toFixed(2)}
                        </Text>
                    )}
                />
                <Table.Column 
                    dataIndex={["category", "name"]} 
                    title="Categoría" 
                    render={(value) => value || "Sin Categoría"}
                />
                <Table.Column dataIndex="preparation_time" title="Tiempo Prep." render={(value) => `${value} min`} />
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
