import { Show } from "@refinedev/antd";
import { Card, Col, Descriptions, Row, Tag, Typography, theme } from "antd";
import { DollarOutlined, NumberOutlined, ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useShow } from "@refinedev/core";
import { Link } from "react-router-dom";
import {
    getDescriptionsContentStyle,
    getDescriptionsLabelStyle,
    getHeaderCardStyle,
    getInnerStatCardStyle,
    getSectionCardStyle,
    getStatWidgetStyle,
} from "@/components/show/showPageStyles";

const { Title, Text, Paragraph } = Typography;

export const OrderDetailsShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;
    const { token } = theme.useToken();

    const formatMoney = (value?: number | string) => `$ ${Number(value || 0).toFixed(2)}`;

    return (
        <Show isLoading={isLoading}>
            <Card style={getHeaderCardStyle("#722ed1", token)} bodyStyle={{ padding: "20px 24px" }}>
                <Row gutter={[24, 16]} align="middle" justify="space-between">
                    <Col xs={24} md={12}>
                        <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
                            Detalle de Ítem #{record?.id}
                        </Title>
                        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                            <Tag icon={<ShoppingCartOutlined />} color="processing" style={{ borderRadius: 4 }}>
                                <Link to={`/orders/show/${record?.order_id}`} style={{ color: "inherit" }}>
                                    Orden #{record?.order_id}
                                </Link>
                            </Tag>
                            <Tag color="purple" style={{ borderRadius: 4 }}>
                                {record?.product?.name || `Producto #${record?.product_id}`}
                            </Tag>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <Row gutter={16} justify="end">
                            <Col xs={12} sm={8}>
                                <Card bordered={false} style={getStatWidgetStyle("rgba(114, 46, 209, 0.08)")} bodyStyle={{ padding: "12px 16px", textAlign: "center" }}>
                                    <NumberOutlined style={{ fontSize: 20, color: "#722ed1" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Cantidad</div>
                                    <div style={{ fontSize: 16, fontWeight: "bold", color: token.colorText }}>{record?.quantity ?? 0}</div>
                                </Card>
                            </Col>
                            <Col xs={12} sm={10}>
                                <Card bordered={false} style={getStatWidgetStyle("rgba(82, 196, 26, 0.08)")} bodyStyle={{ padding: "12px 16px", textAlign: "center" }}>
                                    <DollarOutlined style={{ fontSize: 20, color: "#52c41a" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Subtotal</div>
                                    <div style={{ fontSize: 16, fontWeight: "bold", color: token.colorText }}>{formatMoney(record?.subtotal)}</div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={14}>
                    <Card title={<span style={{ fontWeight: 600 }}>Información del Producto</span>} style={getSectionCardStyle(token)}>
                        <Descriptions
                            column={{ xs: 1, sm: 2 }}
                            bordered
                            size="middle"
                            labelStyle={getDescriptionsLabelStyle(token)}
                            contentStyle={getDescriptionsContentStyle(token)}
                        >
                            <Descriptions.Item label="Producto" span={2}>
                                <Text strong>{record?.product?.name || `Producto #${record?.product_id}`}</Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Descripción" span={2}>
                                {record?.product?.description || "Sin descripción."}
                            </Descriptions.Item>
                            <Descriptions.Item label="Notas del Cliente" span={2}>
                                {record?.product_notes || "Sin notas específicas."}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col xs={24} lg={10}>
                    <Card title={<span style={{ fontWeight: 600 }}>Cantidad y Costo</span>} style={getSectionCardStyle(token)}>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Card bordered={false} style={getInnerStatCardStyle(token)} bodyStyle={{ padding: "16px 8px" }}>
                                    <ShoppingOutlined style={{ fontSize: 22, color: "#722ed1", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Cantidad</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>{record?.quantity ?? 0}</div>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card bordered={false} style={getInnerStatCardStyle(token)} bodyStyle={{ padding: "16px 8px" }}>
                                    <DollarOutlined style={{ fontSize: 22, color: "#1890ff", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Precio Unitario</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>{formatMoney(record?.unit_price)}</div>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card bordered={false} style={{ ...getInnerStatCardStyle(token), borderLeft: "4px solid #52c41a" }} bodyStyle={{ padding: "16px 8px", textAlign: "center" }}>
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Subtotal del Ítem</div>
                                    <div style={{ fontSize: 18, fontWeight: "bold", marginTop: 6, color: "#52c41a" }}>{formatMoney(record?.subtotal)}</div>
                                </Card>
                            </Col>
                        </Row>
                        <Paragraph type="secondary" style={{ marginTop: 20, marginBottom: 0, fontSize: 12, textAlign: "center" }}>
                            Detalle económico del ítem dentro de la orden.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
