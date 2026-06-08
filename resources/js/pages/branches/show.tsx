import { Show } from "@refinedev/antd";
import { Card, Col, Descriptions, Row, Tag, Typography, theme } from "antd";
import {
    CalendarOutlined,
    CarOutlined,
    CheckCircleOutlined,
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
    ShopOutlined,
    TeamOutlined,
} from "@ant-design/icons";
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

export const BranchesShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;
    const { token } = theme.useToken();

    return (
        <Show isLoading={isLoading}>
            <Card style={getHeaderCardStyle("#2f54eb", token)} bodyStyle={{ padding: "20px 24px" }}>
                <Row gutter={[24, 16]} align="middle" justify="space-between">
                    <Col xs={24} md={12}>
                        <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
                            {record?.name || "Detalle de Sucursal"}
                        </Title>
                        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                            <Tag color={record?.active ? "success" : "error"} style={{ borderRadius: 4 }}>
                                {record?.active_label || (record?.active ? "Activa" : "Inactiva")}
                            </Tag>
                            {record?.is_main && <Tag color="gold" style={{ borderRadius: 4 }}>Sucursal Principal</Tag>}
                            {record?.city && (
                                <Tag icon={<EnvironmentOutlined />} color="processing" style={{ borderRadius: 4 }}>
                                    {record.city}
                                </Tag>
                            )}
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <Row gutter={16} justify="end">
                            <Col xs={12} sm={8}>
                                <Card bordered={false} style={getStatWidgetStyle("rgba(47, 84, 235, 0.08)")} bodyStyle={{ padding: "12px 16px", textAlign: "center" }}>
                                    <TeamOutlined style={{ fontSize: 20, color: "#2f54eb" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Capacidad</div>
                                    <div style={{ fontSize: 16, fontWeight: "bold", color: token.colorText }}>
                                        {record?.capacity_people ? `${record.capacity_people}` : "N/A"}
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={12} sm={8}>
                                <Card bordered={false} style={getStatWidgetStyle("rgba(82, 196, 26, 0.08)")} bodyStyle={{ padding: "12px 16px", textAlign: "center" }}>
                                    <CheckCircleOutlined style={{ fontSize: 20, color: "#52c41a" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Estado</div>
                                    <div style={{ fontSize: 16, fontWeight: "bold", color: token.colorText }}>
                                        {record?.active ? "Activa" : "Inactiva"}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={14}>
                    <Card title={<span style={{ fontWeight: 600 }}>Ubicación y Contacto</span>} style={getSectionCardStyle(token)}>
                        <Descriptions
                            column={{ xs: 1, sm: 2 }}
                            bordered
                            size="middle"
                            labelStyle={getDescriptionsLabelStyle(token)}
                            contentStyle={getDescriptionsContentStyle(token)}
                        >
                            <Descriptions.Item label="Dirección" span={2}>{record?.address || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Ciudad">{record?.city || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Estado">{record?.state || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Código Postal">{record?.postal_code || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Teléfono">
                                <Text>
                                    <PhoneOutlined style={{ marginRight: 8, color: token.colorTextDescription }} />
                                    {record?.phone || "N/A"}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Email" span={2}>
                                <Text>
                                    <MailOutlined style={{ marginRight: 8, color: token.colorTextDescription }} />
                                    {record?.email || "No registrado"}
                                </Text>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col xs={24} lg={10}>
                    <Card title={<span style={{ fontWeight: 600 }}>Operación</span>} style={getSectionCardStyle(token)}>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Card bordered={false} style={getInnerStatCardStyle(token)} bodyStyle={{ padding: "16px 8px" }}>
                                    <CalendarOutlined style={{ fontSize: 22, color: "#2f54eb", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Horario</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                        {record?.opening_time_formatted || record?.opening_time || "N/A"} - {record?.closing_time_formatted || record?.closing_time || "N/A"}
                                    </div>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card bordered={false} style={getInnerStatCardStyle(token)} bodyStyle={{ padding: "16px 8px" }}>
                                    <ShopOutlined style={{ fontSize: 22, color: "#52c41a", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Días Operativos</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                        {record?.operation_days || "N/A"}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Paragraph type="secondary" style={{ marginTop: 20, marginBottom: 0, fontSize: 12, textAlign: "center" }}>
                            Resumen operativo de la sucursal en el sistema.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} lg={14}>
                    <Card title={<span style={{ fontWeight: 600 }}>Información Adicional</span>} style={getSectionCardStyle(token)}>
                        <Descriptions
                            column={{ xs: 1, sm: 2 }}
                            bordered
                            size="middle"
                            labelStyle={getDescriptionsLabelStyle(token)}
                            contentStyle={getDescriptionsContentStyle(token)}
                        >
                            <Descriptions.Item label="Gerente">{record?.manager || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Apertura">{record?.opening_date_formatted || formatDateLabel(record?.opening_date)}</Descriptions.Item>
                            <Descriptions.Item label="Delivery">
                                <Tag color={record?.has_delivery ? "success" : "error"} style={{ borderRadius: 4 }}>
                                    {record?.has_delivery_label || (record?.has_delivery ? "Disponible" : "No disponible")}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Estacionamiento">
                                <Tag color={record?.has_parking ? "success" : "error"} style={{ borderRadius: 4 }}>
                                    {record?.has_parking_label || (record?.has_parking ? "Disponible" : "No disponible")}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                <Col xs={24} lg={10}>
                    <Card title={<span style={{ fontWeight: 600 }}>Servicios</span>} style={getSectionCardStyle(token)}>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Card bordered={false} style={getInnerStatCardStyle(token)} bodyStyle={{ padding: "16px 8px", textAlign: "center" }}>
                                    <CarOutlined style={{ fontSize: 22, color: record?.has_delivery ? "#52c41a" : "#ff4d4f", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Delivery</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                        {record?.has_delivery ? "Sí" : "No"}
                                    </div>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card bordered={false} style={getInnerStatCardStyle(token)} bodyStyle={{ padding: "16px 8px", textAlign: "center" }}>
                                    <ShopOutlined style={{ fontSize: 22, color: record?.has_parking ? "#52c41a" : "#ff4d4f", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Estacionamiento</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                        {record?.has_parking ? "Sí" : "No"}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
