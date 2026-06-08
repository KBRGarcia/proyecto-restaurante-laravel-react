import { Show } from "@refinedev/antd";
import { Card, Col, Descriptions, Row, Tag, Typography, theme } from "antd";
import { BankOutlined, CalendarOutlined, CheckCircleOutlined, CodeOutlined } from "@ant-design/icons";
import { useShow } from "@refinedev/core";
import {
    formatDateLabel,
    getDescriptionsContentStyle,
    getDescriptionsLabelStyle,
    getHeaderCardStyle,
    getInnerStatCardStyle,
    getJsonPreStyle,
    getSectionCardStyle,
    getStatWidgetStyle,
} from "@/components/show/showPageStyles";

const { Title, Text, Paragraph } = Typography;

export const BanksShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;
    const { token } = theme.useToken();

    return (
        <Show isLoading={isLoading}>
            <Card style={getHeaderCardStyle("#13c2c2", token)} bodyStyle={{ padding: "20px 24px" }}>
                <Row gutter={[24, 16]} align="middle" justify="space-between">
                    <Col xs={24} md={12}>
                        <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
                            {record?.name || "Detalle de Banco"}
                        </Title>
                        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                            <Tag color={record?.active ? "success" : "error"} style={{ borderRadius: 4 }}>
                                {record?.active ? "Activo" : "Inactivo"}
                            </Tag>
                            {record?.code && (
                                <Tag icon={<CodeOutlined />} color="processing" style={{ borderRadius: 4 }}>
                                    {record.code}
                                </Tag>
                            )}
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <Row gutter={16} justify="end">
                            <Col xs={12} sm={8}>
                                <Card bordered={false} style={getStatWidgetStyle("rgba(19, 194, 194, 0.08)")} bodyStyle={{ padding: "12px 16px", textAlign: "center" }}>
                                    <BankOutlined style={{ fontSize: 20, color: "#13c2c2" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Código</div>
                                    <div style={{ fontSize: 16, fontWeight: "bold", color: token.colorText }}>{record?.code || "N/A"}</div>
                                </Card>
                            </Col>
                            <Col xs={12} sm={8}>
                                <Card bordered={false} style={getStatWidgetStyle("rgba(82, 196, 26, 0.08)")} bodyStyle={{ padding: "12px 16px", textAlign: "center" }}>
                                    <CheckCircleOutlined style={{ fontSize: 20, color: "#52c41a" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Estado</div>
                                    <div style={{ fontSize: 16, fontWeight: "bold", color: token.colorText }}>{record?.active ? "Activo" : "Inactivo"}</div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={14}>
                    <Card title={<span style={{ fontWeight: 600 }}>Información General</span>} style={getSectionCardStyle(token)}>
                        <Descriptions
                            column={{ xs: 1, sm: 2 }}
                            bordered
                            size="middle"
                            labelStyle={getDescriptionsLabelStyle(token)}
                            contentStyle={getDescriptionsContentStyle(token)}
                        >
                            <Descriptions.Item label="Nombre">{record?.name || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Código">
                                <Text code>{record?.code || "N/A"}</Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Estado">
                                <Tag color={record?.active ? "success" : "error"} style={{ borderRadius: 4 }}>
                                    {record?.active ? "Activo" : "Inactivo"}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Fecha del Sistema">
                                {formatDateLabel(record?.creation_date || record?.created_at)}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col xs={24} lg={10}>
                    <Card title={<span style={{ fontWeight: 600 }}>Resumen</span>} style={getSectionCardStyle(token)}>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Card bordered={false} style={getInnerStatCardStyle(token)} bodyStyle={{ padding: "16px 8px" }}>
                                    <CalendarOutlined style={{ fontSize: 22, color: "#13c2c2", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Fecha de Registro</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                        {formatDateLabel(record?.creation_date || record?.created_at)}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Paragraph type="secondary" style={{ marginTop: 20, marginBottom: 0, fontSize: 12, textAlign: "center" }}>
                            Información del banco registrado en el sistema de pagos.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
