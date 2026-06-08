import { Show } from "@refinedev/antd";
import { Avatar, Card, Col, Descriptions, Row, Tag, Typography, theme } from "antd";
import { AppstoreOutlined, CalendarOutlined, CheckCircleOutlined, PictureOutlined } from "@ant-design/icons";
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

export const CategoriesShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;
    const { token } = theme.useToken();

    return (
        <Show isLoading={isLoading}>
            <Card style={getHeaderCardStyle("#eb2f96", token)} bodyStyle={{ padding: "20px 24px" }}>
                <Row gutter={[24, 16]} align="middle" justify="space-between">
                    <Col xs={24} sm={16} style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                        <Avatar
                            shape="square"
                            size={64}
                            src={record?.image || undefined}
                            icon={<PictureOutlined />}
                            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)", border: `2px solid ${token.colorBgContainer}` }}
                        />
                        <div>
                            <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
                                {record?.name || "Detalle de Categoría"}
                            </Title>
                            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
                                <Tag color={record?.status === "active" ? "success" : "error"} style={{ borderRadius: 4 }}>
                                    {record?.status === "active" ? "Activo" : "Inactivo"}
                                </Tag>
                                <Tag color="blue" style={{ borderRadius: 4 }}>Orden: {record?.order_show ?? 0}</Tag>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Row gutter={16} justify="end">
                            <Col xs={12}>
                                <Card bordered={false} style={getStatWidgetStyle("rgba(235, 47, 150, 0.08)")} bodyStyle={{ padding: "12px 16px", textAlign: "center" }}>
                                    <AppstoreOutlined style={{ fontSize: 20, color: "#eb2f96" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Orden</div>
                                    <div style={{ fontSize: 16, fontWeight: "bold", color: token.colorText }}>{record?.order_show ?? 0}</div>
                                </Card>
                            </Col>
                            <Col xs={12}>
                                <Card bordered={false} style={getStatWidgetStyle("rgba(82, 196, 26, 0.08)")} bodyStyle={{ padding: "12px 16px", textAlign: "center" }}>
                                    <CheckCircleOutlined style={{ fontSize: 20, color: "#52c41a" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Estado</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", color: token.colorText }}>
                                        {record?.status === "active" ? "Activo" : "Inactivo"}
                                    </div>
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
                            <Descriptions.Item label="Estado">
                                <Tag color={record?.status === "active" ? "success" : "error"} style={{ borderRadius: 4 }}>
                                    {record?.status === "active" ? "Activo" : "Inactivo"}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Orden de Visualización">{record?.order_show ?? 0}</Descriptions.Item>
                            <Descriptions.Item label="Fecha de Creación">{formatDateLabel(record?.created_at)}</Descriptions.Item>
                            <Descriptions.Item label="Descripción" span={2}>
                                {record?.description || "Sin descripción disponible."}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col xs={24} lg={10}>
                    <Card title={<span style={{ fontWeight: 600 }}>Resumen</span>} style={getSectionCardStyle(token)}>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Card bordered={false} style={getInnerStatCardStyle(token)} bodyStyle={{ padding: "16px 8px" }}>
                                    <CalendarOutlined style={{ fontSize: 22, color: "#eb2f96", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Fecha de Creación</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                        {formatDateLabel(record?.created_at)}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Paragraph type="secondary" style={{ marginTop: 20, marginBottom: 0, fontSize: 12, textAlign: "center" }}>
                            Categoría utilizada para organizar los productos del menú.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
