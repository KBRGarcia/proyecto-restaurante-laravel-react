import { Show } from "@refinedev/antd";
import { Card, Col, Descriptions, Row, Tag, Timeline, Typography, theme } from "antd";
import {
    CalendarOutlined,
    DollarOutlined,
    PhoneOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useShow } from "@refinedev/core";
import {
    formatDateTimeLabel,
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
        case "pending":
            return <Tag color="orange" style={{ borderRadius: 4 }}>Pendiente</Tag>;
        case "preparing":
            return <Tag color="blue" style={{ borderRadius: 4 }}>En Cocina</Tag>;
        case "ready":
            return <Tag color="green" style={{ borderRadius: 4 }}>Listo</Tag>;
        case "delivered":
            return <Tag color="cyan" style={{ borderRadius: 4 }}>Entregado</Tag>;
        case "canceled":
            return <Tag color="red" style={{ borderRadius: 4 }}>Cancelado</Tag>;
        default:
            return <Tag style={{ borderRadius: 4 }}>{status}</Tag>;
    }
};

const getServiceTypeTag = (type?: string) => {
    return type === "delivery" ? (
        <Tag color="purple" style={{ borderRadius: 4 }}>Delivery</Tag>
    ) : (
        <Tag color="magenta" style={{ borderRadius: 4 }}>Retiro en local</Tag>
    );
};

export const OrdersShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;
    const { token } = theme.useToken();

    const currencySymbol = record?.currency === "nacional" ? "Bs." : "$";
    const formatMoney = (value?: number | string) => `${currencySymbol} ${Number(value || 0).toFixed(2)}`;

    const clientName = record?.user
        ? `${record.user.name} ${record.user.last_name || ""}`.trim()
        : record?.user_name || `Usuario #${record?.user_id}`;

    const timelineItems = [];
    if (record?.order_date) {
        timelineItems.push({
            color: "blue",
            children: (
                <div>
                    <Text strong>Pedido Creado</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>{formatDateTimeLabel(record.order_date)}</Text>
                </div>
            ),
        });
    }
    if (record?.preparing_date) {
        timelineItems.push({
            color: "gold",
            children: (
                <div>
                    <Text strong>Iniciada Preparación</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>{formatDateTimeLabel(record.preparing_date)}</Text>
                </div>
            ),
        });
    }
    if (record?.ready_date) {
        timelineItems.push({
            color: "green",
            children: (
                <div>
                    <Text strong>Listo para Entrega</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>{formatDateTimeLabel(record.ready_date)}</Text>
                </div>
            ),
        });
    }
    if (record?.delivered_date) {
        timelineItems.push({
            color: "cyan",
            children: (
                <div>
                    <Text strong>Entregado</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>{formatDateTimeLabel(record.delivered_date)}</Text>
                </div>
            ),
        });
    }
    if (record?.canceled_date) {
        timelineItems.push({
            color: "red",
            children: (
                <div>
                    <Text strong>Cancelado</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>{formatDateTimeLabel(record.canceled_date)}</Text>
                </div>
            ),
        });
    }

    return (
        <Show isLoading={isLoading}>
            <Card style={getHeaderCardStyle("#fa541c", token)} bodyStyle={{ padding: "20px 24px" }}>
                <Row gutter={[24, 16]} align="middle" justify="space-between">
                    <Col xs={24} md={12}>
                        <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
                            Orden #{record?.id}
                        </Title>
                        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {record?.status && getStatusTag(record.status)}
                            {record?.service_type && getServiceTypeTag(record.service_type)}
                            {record?.branch_name && (
                                <Tag icon={<ShoppingCartOutlined />} color="processing" style={{ borderRadius: 4 }}>
                                    {record.branch_name}
                                </Tag>
                            )}
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <Row gutter={16} justify="end">
                            <Col xs={12} sm={8}>
                                <Card bordered={false} style={getStatWidgetStyle("rgba(250, 84, 28, 0.08)")} bodyStyle={{ padding: "12px 16px", textAlign: "center" }}>
                                    <DollarOutlined style={{ fontSize: 20, color: "#fa541c" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Total</div>
                                    <div style={{ fontSize: 16, fontWeight: "bold", color: token.colorText }}>{formatMoney(record?.total)}</div>
                                </Card>
                            </Col>
                            <Col xs={12} sm={8}>
                                <Card bordered={false} style={getStatWidgetStyle("rgba(24, 144, 255, 0.08)")} bodyStyle={{ padding: "12px 16px", textAlign: "center" }}>
                                    <CalendarOutlined style={{ fontSize: 20, color: "#1890ff" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Fecha</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", color: token.colorText, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {record?.order_date_formatted || formatDateTimeLabel(record?.order_date, "N/A")}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={14}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            <Card title={<span style={{ fontWeight: 600 }}>Información del Cliente</span>} style={getSectionCardStyle(token)}>
                                <Descriptions
                                    column={{ xs: 1, sm: 2 }}
                                    bordered
                                    size="middle"
                                    labelStyle={getDescriptionsLabelStyle(token)}
                                    contentStyle={getDescriptionsContentStyle(token)}
                                >
                                    <Descriptions.Item label="Cliente">
                                        <Text>
                                            <UserOutlined style={{ marginRight: 8, color: token.colorTextDescription }} />
                                            {clientName}
                                        </Text>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Teléfono">
                                        <Text>
                                            <PhoneOutlined style={{ marginRight: 8, color: token.colorTextDescription }} />
                                            {record?.contact_phone || "No registrado"}
                                        </Text>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Dirección de Entrega" span={2}>
                                        {record?.delivery_address || "Retiro en local"}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </Col>
                        <Col xs={24}>
                            <Card title={<span style={{ fontWeight: 600 }}>Facturación y Pago</span>} style={getSectionCardStyle(token)}>
                                <Descriptions
                                    column={{ xs: 1, sm: 2 }}
                                    bordered
                                    size="middle"
                                    labelStyle={getDescriptionsLabelStyle(token)}
                                    contentStyle={getDescriptionsContentStyle(token)}
                                >
                                    <Descriptions.Item label="Método de Pago">{record?.payment_method || "No especificado"}</Descriptions.Item>
                                    <Descriptions.Item label="Moneda">{record?.currency_label || record?.currency || "N/A"}</Descriptions.Item>
                                    <Descriptions.Item label="Subtotal">{formatMoney(record?.subtotal)}</Descriptions.Item>
                                    <Descriptions.Item label="Impuestos">{formatMoney(record?.taxes)}</Descriptions.Item>
                                    <Descriptions.Item label="Total" span={2}>
                                        <Text strong style={{ fontSize: 16, color: "#52c41a" }}>{formatMoney(record?.total)}</Text>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </Col>
                    </Row>
                </Col>

                <Col xs={24} lg={10}>
                    <Card title={<span style={{ fontWeight: 600 }}>Historial del Pedido</span>} style={getSectionCardStyle(token)}>
                        {timelineItems.length > 0 ? (
                            <Timeline items={timelineItems} />
                        ) : (
                            <Text type="secondary">Sin historial disponible</Text>
                        )}
                    </Card>
                </Col>
            </Row>

            <Card title={<span style={{ fontWeight: 600 }}>Reparto y Notas</span>} style={getSectionCardStyle(token, 16)}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Card bordered={false} style={getInnerStatCardStyle(token)} bodyStyle={{ padding: 16 }}>
                            <div style={{ fontSize: 11, color: token.colorTextDescription }}>Empleado Asignado</div>
                            <div style={{ fontSize: 14, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                {record?.assigned_employee
                                    ? `${record.assigned_employee.name} ${record.assigned_employee.last_name || ""}`.trim()
                                    : record?.assigned_employee_name || "No asignado"}
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} md={12}>
                        <Paragraph style={{ marginBottom: 0, whiteSpace: "pre-wrap", color: token.colorTextSecondary }}>
                            <Text strong style={{ display: "block", marginBottom: 8, color: token.colorText }}>Notas Especiales</Text>
                            {record?.special_notes || "Sin especificaciones especiales."}
                        </Paragraph>
                    </Col>
                </Row>
            </Card>
        </Show>
    );
};
