import { Show } from "@refinedev/antd";
import { Card, Col, Descriptions, Row, Statistic, Tag, Typography } from "antd";
import {
    CalendarOutlined,
    DollarOutlined,
    MailOutlined,
    PhoneOutlined,
    ShoppingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useShow } from "@refinedev/core";

const { Title, Text, Paragraph } = Typography;

const getOriginColor = (origin?: string) => {
    if (origin === "online") return "blue";
    if (origin === "physical") return "gold";
    return "purple";
};

export const ClientsShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Card>
                <Row gutter={[24, 16]} align="middle">
                    <Col xs={24} md={16}>
                        <Title level={3} style={{ margin: 0 }}>
                            {record?.full_name || "Detalle de Cliente"}
                        </Title>
                        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                            <Tag color={record?.status === "active" ? "success" : "error"}>
                                {record?.status_label}
                            </Tag>
                            <Tag color={getOriginColor(record?.origin)}>{record?.origin_label}</Tag>
                            {record?.user?.email && (
                                <Tag icon={<UserOutlined />} color="processing">
                                    {record.user.email}
                                </Tag>
                            )}
                        </div>
                    </Col>
                    <Col xs={24} md={8}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic
                                    title="Ordenes entregadas"
                                    value={record?.total_orders ?? 0}
                                    prefix={<ShoppingOutlined />}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="Total comprado"
                                    value={Number(record?.total_spent ?? 0)}
                                    precision={2}
                                    prefix={<DollarOutlined />}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} lg={14}>
                    <Card title="Informacion personal">
                        <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
                            <Descriptions.Item label="Documento">
                                {record?.identity_document || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Fecha de nacimiento">
                                {record?.birth_date_formatted || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Telefono">
                                <Text>
                                    <PhoneOutlined style={{ marginRight: 8 }} />
                                    {record?.phone || "N/A"}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Email">
                                <Text>
                                    <MailOutlined style={{ marginRight: 8 }} />
                                    {record?.email || "N/A"}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Direccion" span={2}>
                                {record?.address || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Usuario del sistema" span={2}>
                                {record?.user?.email || "Sin usuario asociado"}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col xs={24} lg={10}>
                    <Card title="Historial de compras">
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Card size="small" type="inner">
                                    <Statistic
                                        title="Primera compra"
                                        value={record?.first_purchase_at_formatted || "Sin compras"}
                                        valueStyle={{ fontSize: 16 }}
                                        prefix={<CalendarOutlined />}
                                    />
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card size="small" type="inner">
                                    <Statistic
                                        title="Ultima compra"
                                        value={record?.last_purchase_at_formatted || "Sin compras"}
                                        valueStyle={{ fontSize: 16 }}
                                        prefix={<CalendarOutlined />}
                                    />
                                </Card>
                            </Col>
                        </Row>
                        <Paragraph type="secondary" style={{ marginTop: 16, marginBottom: 0 }}>
                            Calculado automaticamente desde las ordenes entregadas del cliente.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>

            <Card title="Notas internas" style={{ marginTop: 16 }}>
                <Paragraph style={{ marginBottom: 0, whiteSpace: "pre-wrap" }}>
                    {record?.notes || "Sin notas registradas."}
                </Paragraph>
            </Card>
        </Show>
    );
};
