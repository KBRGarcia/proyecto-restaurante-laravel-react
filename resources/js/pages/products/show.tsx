import { Show, DateField } from "@refinedev/antd";
import { Typography, Row, Col, Card, Tag, Divider, Avatar, Space } from "antd";
import { useShow } from "@refinedev/core";
import { CoffeeOutlined, StarOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export const ProductsShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;

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
        <Show isLoading={isLoading}>
            <Row gutter={[24, 24]} align="middle" style={{ marginBottom: "24px" }}>
                <Col xs={24} sm={6} style={{ textAlign: "center" }}>
                    <Avatar shape="square" size={120} src={record?.image} icon={<CoffeeOutlined />} />
                </Col>
                <Col xs={24} sm={18}>
                    <Title level={2} style={{ margin: 0 }}>
                        {record?.name || "Detalle de Producto"}
                    </Title>
                    <div style={{ marginTop: "12px" }}>
                        <Space>
                            {record?.status && getStatusTag(record.status)}
                            {record?.is_special && (
                                <Tag color="gold">
                                    <StarOutlined /> Especial del Chef
                                </Tag>
                            )}
                            <Tag color="blue">{record?.category?.name || "Sin Categoría"}</Tag>
                        </Space>
                    </div>
                </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card size="small" title="Información Comercial" style={{ height: "100%" }}>
                        <Title level={5}>Precio</Title>
                        <Text strong style={{ fontSize: "20px", color: "#3f8600" }}>
                            $ {record?.price ? Number(record.price).toFixed(2) : "0.00"}
                        </Text>

                        <Title level={5} style={{ marginTop: "16px" }}>Tiempo Estimado de Preparación</Title>
                        <Text>{record?.preparation_time || 0} minutos</Text>

                        <Title level={5} style={{ marginTop: "16px" }}>Fecha de Registro</Title>
                        {record?.created_at ? (
                            <DateField format="LL" value={record.created_at} />
                        ) : (
                            <Text>N/A</Text>
                        )}
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card size="small" title="Detalles Culinarios" style={{ height: "100%" }}>
                        <Title level={5}>Ingredientes</Title>
                        <Paragraph>{record?.ingredients || "No se especificaron ingredientes."}</Paragraph>

                        <Title level={5} style={{ marginTop: "16px" }}>Descripción</Title>
                        <Paragraph>{record?.description || "Sin descripción."}</Paragraph>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
