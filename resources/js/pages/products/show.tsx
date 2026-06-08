import { Show } from "@refinedev/antd";
import { Avatar, Card, Col, Descriptions, Row, Tag, Typography, theme } from "antd";
import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, CoffeeOutlined, DollarOutlined, StarOutlined } from "@ant-design/icons";
import { useShow } from "@refinedev/core";
import {
    formatDateLabel,
    getDescriptionsContentStyle,
    getDescriptionsLabelStyle,
    getHeaderCardStyle,
    getInnerStatCardStyle,
    getSectionCardStyle,
    getStatWidgetStyle,
} from "@/components/show/showPageStyles";

const { Title, Text, Paragraph } = Typography;

const getStatusTag = (status?: string) => {
    switch (status) {
        case "active":
            return <Tag color="success" style={{ borderRadius: 4 }}>Activo</Tag>;
        case "inactive":
            return <Tag color="error" style={{ borderRadius: 4 }}>Inactivo</Tag>;
        case "out of stock":
            return <Tag color="warning" style={{ borderRadius: 4 }}>Agotado</Tag>;
        default:
            return <Tag style={{ borderRadius: 4 }}>{status}</Tag>;
    }
};

export const ProductsShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;
    const { token } = theme.useToken();

    return (
        <Show isLoading={isLoading}>
            <Card style={getHeaderCardStyle("#fa8c16", token)} bodyStyle={{ padding: "20px 24px" }}>
                <Row gutter={[24, 16]} align="middle" justify="space-between">
                    <Col xs={24} sm={16} style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                        <Avatar
                            shape="square"
                            size={64}
                            src={record?.image || undefined}
                            icon={<CoffeeOutlined />}
                            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)", border: `2px solid ${token.colorBgContainer}` }}
                        />
                        <div>
                            <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
                                {record?.name || "Detalle de Producto"}
                            </Title>
                            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
                                {record?.status && getStatusTag(record.status)}
                                {record?.is_special && (
                                    <Tag color="gold" style={{ borderRadius: 4 }}>
                                        <StarOutlined /> Especial del Chef
                                    </Tag>
                                )}
                                <Tag color="blue" style={{ borderRadius: 4 }}>
                                    {record?.category?.name || record?.category_name || "Sin Categoría"}
                                </Tag>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Row gutter={16} justify="end">
                            <Col xs={12}>
                                <Card bordered={false} style={getStatWidgetStyle("rgba(82, 196, 26, 0.08)")} bodyStyle={{ padding: "12px 16px", textAlign: "center" }}>
                                    <DollarOutlined style={{ fontSize: 20, color: "#52c41a" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Precio</div>
                                    <div style={{ fontSize: 16, fontWeight: "bold", color: token.colorText }}>
                                        $ {record?.price ? Number(record.price).toFixed(2) : "0.00"}
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={12}>
                                <Card bordered={false} style={getStatWidgetStyle("rgba(250, 140, 22, 0.08)")} bodyStyle={{ padding: "12px 16px", textAlign: "center" }}>
                                    <ClockCircleOutlined style={{ fontSize: 20, color: "#fa8c16" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Preparación</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", color: token.colorText }}>
                                        {record?.preparation_time || 0} min
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={14}>
                    <Card title={<span style={{ fontWeight: 600 }}>Información Comercial</span>} style={getSectionCardStyle(token)}>
                        <Descriptions
                            column={{ xs: 1, sm: 2 }}
                            bordered
                            size="middle"
                            labelStyle={getDescriptionsLabelStyle(token)}
                            contentStyle={getDescriptionsContentStyle(token)}
                        >
                            <Descriptions.Item label="Nombre">{record?.name || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Estado">{record?.status ? getStatusTag(record.status) : "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Precio">
                                <Text strong style={{ color: "#52c41a" }}>
                                    $ {record?.price ? Number(record.price).toFixed(2) : "0.00"}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Categoría">
                                {record?.category?.name || record?.category_name || "Sin Categoría"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Tiempo de Preparación">
                                {record?.preparation_time || 0} minutos
                            </Descriptions.Item>
                            <Descriptions.Item label="Especial del Chef">
                                <Tag color={record?.is_special ? "gold" : "default"} style={{ borderRadius: 4 }}>
                                    {record?.is_special ? "Sí" : "No"}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Fecha de Registro" span={2}>
                                {formatDateLabel(record?.created_at || record?.creation_date)}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col xs={24} lg={10}>
                    <Card title={<span style={{ fontWeight: 600 }}>Resumen</span>} style={getSectionCardStyle(token)}>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Card bordered={false} style={getInnerStatCardStyle(token)} bodyStyle={{ padding: "16px 8px" }}>
                                    <DollarOutlined style={{ fontSize: 22, color: "#52c41a", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Precio</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                        $ {record?.price ? Number(record.price).toFixed(2) : "0.00"}
                                    </div>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card bordered={false} style={getInnerStatCardStyle(token)} bodyStyle={{ padding: "16px 8px" }}>
                                    <CalendarOutlined style={{ fontSize: 22, color: "#fa8c16", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Registro</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                        {formatDateLabel(record?.created_at || record?.creation_date)}
                                    </div>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card bordered={false} style={getInnerStatCardStyle(token)} bodyStyle={{ padding: "16px 8px", textAlign: "center" }}>
                                    <CheckCircleOutlined style={{ fontSize: 22, color: "#1890ff", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Estado</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                        {record?.status_label || record?.status || "N/A"}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Paragraph type="secondary" style={{ marginTop: 20, marginBottom: 0, fontSize: 12, textAlign: "center" }}>
                            Producto disponible en el menú del restaurante.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>

            <Card title={<span style={{ fontWeight: 600 }}>Detalles Culinarios</span>} style={getSectionCardStyle(token, 16)}>
                <Descriptions
                    column={1}
                    bordered
                    size="middle"
                    labelStyle={getDescriptionsLabelStyle(token)}
                    contentStyle={getDescriptionsContentStyle(token)}
                >
                    <Descriptions.Item label="Ingredientes">
                        <Paragraph style={{ marginBottom: 0, whiteSpace: "pre-wrap", color: token.colorTextSecondary }}>
                            {record?.ingredients || "No se especificaron ingredientes."}
                        </Paragraph>
                    </Descriptions.Item>
                    <Descriptions.Item label="Descripción">
                        <Paragraph style={{ marginBottom: 0, whiteSpace: "pre-wrap", color: token.colorTextSecondary }}>
                            {record?.description || "Sin descripción."}
                        </Paragraph>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </Show>
    );
};
