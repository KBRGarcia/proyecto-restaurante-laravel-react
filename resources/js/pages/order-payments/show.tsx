import { Show } from "@refinedev/antd";
import { Card, Col, Descriptions, Row, Tag, Typography, theme } from "antd";
import { CheckCircleOutlined, CreditCardOutlined, DollarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useShow } from "@refinedev/core";
import { Link } from "react-router-dom";
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

const statusColorMap: Record<string, string> = {
    pending: "orange",
    confirmed: "success",
    rejected: "error",
    refunded: "purple",
};

export const OrderPaymentsShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;
    const { token } = theme.useToken();

    const statusColor = statusColorMap[record?.status as string] || "default";

    return (
        <Show isLoading={isLoading}>
            <Card style={getHeaderCardStyle("#52c41a", token)} bodyStyle={{ padding: "20px 24px" }}>
                <Row gutter={[24, 16]} align="middle" justify="space-between">
                    <Col xs={24} md={12}>
                        <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
                            Pago #{record?.id}
                        </Title>
                        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                            <Tag color={statusColor} style={{ borderRadius: 4 }}>
                                {record?.status_label || record?.status}
                            </Tag>
                            <Tag color={record?.currency === "nacional" ? "blue" : "green"} style={{ borderRadius: 4 }}>
                                {record?.currency_label || record?.currency}
                            </Tag>
                            {record?.order_id && (
                                <Tag icon={<ShoppingCartOutlined />} color="processing" style={{ borderRadius: 4 }}>
                                    <Link to={`/orders/show/${record.order_id}`} style={{ color: "inherit" }}>
                                        Orden #{record.order_id}
                                    </Link>
                                </Tag>
                            )}
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <Row gutter={16} justify="end">
                            <Col xs={12} sm={10}>
                                <Card bordered={false} style={getStatWidgetStyle("rgba(82, 196, 26, 0.08)")} bodyStyle={{ padding: "12px 16px", textAlign: "center" }}>
                                    <DollarOutlined style={{ fontSize: 20, color: "#52c41a" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Monto</div>
                                    <div style={{ fontSize: 16, fontWeight: "bold", color: token.colorText }}>
                                        {record?.currency_symbol} {Number(record?.amount || 0).toFixed(2)}
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={12} sm={8}>
                                <Card bordered={false} style={getStatWidgetStyle("rgba(24, 144, 255, 0.08)")} bodyStyle={{ padding: "12px 16px", textAlign: "center" }}>
                                    <CreditCardOutlined style={{ fontSize: 20, color: "#1890ff" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Método</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", color: token.colorText, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {record?.method_label || record?.method || "N/A"}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={14}>
                    <Card title={<span style={{ fontWeight: 600 }}>Resumen del Pago</span>} style={getSectionCardStyle(token)}>
                        <Descriptions
                            column={{ xs: 1, sm: 2 }}
                            bordered
                            size="middle"
                            labelStyle={getDescriptionsLabelStyle(token)}
                            contentStyle={getDescriptionsContentStyle(token)}
                        >
                            <Descriptions.Item label="Orden">
                                {record?.order_id ? <Link to={`/orders/show/${record.order_id}`}>Orden #{record.order_id}</Link> : "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Método">{record?.method_label || record?.method || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Moneda">
                                <Tag color={record?.currency === "nacional" ? "blue" : "green"} style={{ borderRadius: 4 }}>
                                    {record?.currency_label || record?.currency}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Monto">
                                <Text strong>{record?.currency_symbol} {Number(record?.amount || 0).toFixed(2)}</Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Estado">
                                <Tag color={statusColor} style={{ borderRadius: 4 }}>{record?.status_label || record?.status}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Fecha de Pago">
                                {formatDateTimeLabel(record?.paid_at_formatted || record?.paid_at, "Sin fecha")}
                            </Descriptions.Item>
                            <Descriptions.Item label="Confirmado en" span={2}>
                                {formatDateTimeLabel(record?.confirmed_at_formatted || record?.confirmed_at, "Sin confirmar")}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col xs={24} lg={10}>
                    <Card title={<span style={{ fontWeight: 600 }}>Estado del Pago</span>} style={getSectionCardStyle(token)}>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Card bordered={false} style={getInnerStatCardStyle(token)} bodyStyle={{ padding: "16px 8px" }}>
                                    <CheckCircleOutlined style={{ fontSize: 22, color: "#52c41a", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Estado Actual</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                        {record?.status_label || record?.status || "N/A"}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Paragraph type="secondary" style={{ marginTop: 20, marginBottom: 0, fontSize: 12, textAlign: "center" }}>
                            Información de seguimiento del pago asociado a la orden.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>

            <Card title={<span style={{ fontWeight: 600 }}>Datos del Método</span>} style={getSectionCardStyle(token, 16)}>
                <Descriptions
                    column={{ xs: 1, sm: 2 }}
                    bordered
                    size="middle"
                    labelStyle={getDescriptionsLabelStyle(token)}
                    contentStyle={getDescriptionsContentStyle(token)}
                >
                    <Descriptions.Item label="Referencia">{record?.reference_number || "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Cédula/RIF">{record?.payer_identification || "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Teléfono">{record?.payer_phone || "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Correo">{record?.payer_email || "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Banco Origen">{record?.source_bank_name || record?.source_bank_code || "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Banco Destino">{record?.destination_bank_name || record?.destination_bank_code || "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Cuenta/Billetera">{record?.account_identifier || "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Titular">{record?.account_holder_name || "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="ID Transacción">{record?.transaction_id || "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Tarjeta">{record?.card_last_four ? `**** ${record.card_last_four}` : "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Comprobante" span={2}>{record?.proof_image_path || "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Notas" span={2}>{record?.notes || "Sin notas"}</Descriptions.Item>
                </Descriptions>
            </Card>
        </Show>
    );
};
