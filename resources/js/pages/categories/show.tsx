import { Show, DateField } from "@refinedev/antd";
import { Typography, Row, Col, Card, Tag, Divider, Avatar, Space } from "antd";
import { useShow } from "@refinedev/core";
import { PictureOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export const CategoriesShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;

    const getStatusTag = (status: string) => {
        return status === "active" ? (
            <Tag color="success">Activo</Tag>
        ) : (
            <Tag color="error">Inactivo</Tag>
        );
    };

    return (
        <Show isLoading={isLoading}>
            <Row gutter={[24, 24]} align="middle" style={{ marginBottom: "24px" }}>
                <Col xs={24} sm={6} style={{ textAlign: "center" }}>
                    <Avatar
                        shape="square"
                        size={120}
                        src={record?.image || undefined}
                        icon={<PictureOutlined />}
                        alt={record?.name}
                    />
                </Col>
                <Col xs={24} sm={18}>
                    <Title level={2} style={{ margin: 0 }}>
                        {record?.name || "Detalle de Categoría"}
                    </Title>
                    <div style={{ marginTop: "12px" }}>
                        <Space>
                            {record?.status && getStatusTag(record.status)}
                            <Tag color="blue">Orden: {record?.order_show ?? 0}</Tag>
                        </Space>
                    </div>
                </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <Card size="small" title="Descripción e Información Adicional">
                        <Title level={5}>Descripción</Title>
                        <Paragraph>{record?.description || "Sin descripción disponible."}</Paragraph>

                        <Title level={5} style={{ marginTop: "16px" }}>Fecha de Creación</Title>
                        {record?.created_at ? (
                            <DateField format="LL" value={record.created_at} />
                        ) : (
                            <Text>N/A</Text>
                        )}
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
