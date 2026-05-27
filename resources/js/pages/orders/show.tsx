import { Show, DateField } from "@refinedev/antd";
import { Typography, Row, Col, Card, Tag, Divider, Space, Timeline } from "antd";
import { useShow } from "@refinedev/core";

const { Title, Text, Paragraph } = Typography;

export const OrdersShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;

    const getStatusTag = (status: string) => {
        switch (status) {
            case "pending":
                return <Tag color="orange">Pendiente</Tag>;
            case "preparing":
                return <Tag color="blue">En Cocina</Tag>;
            case "ready":
                return <Tag color="green">Listo</Tag>;
            case "delivered":
                return <Tag color="cyan">Entregado</Tag>;
            case "canceled":
                return <Tag color="red">Cancelado</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };

    const getServiceTypeTag = (type: string) => {
        return type === "delivery" ? (
            <Tag color="purple">Delivery</Tag>
        ) : (
            <Tag color="magenta">Retiro en local</Tag>
        );
    };

    // Construcción del Historial/Timeline
    const timelineItems = [];
    if (record?.order_date) {
        timelineItems.push({
            color: "blue",
            children: (
                <div>
                    <Text strong>Pedido Creado</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                        {new Date(record.order_date).toLocaleString()}
                    </Text>
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
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                        {new Date(record.preparing_date).toLocaleString()}
                    </Text>
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
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                        {new Date(record.ready_date).toLocaleString()}
                    </Text>
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
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                        {new Date(record.delivered_date).toLocaleString()}
                    </Text>
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
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                        {new Date(record.canceled_date).toLocaleString()}
                    </Text>
                </div>
            ),
        });
    }

    return (
        <Show isLoading={isLoading}>
            <div style={{ marginBottom: "20px" }}>
                <Title level={2} style={{ margin: 0 }}>
                    Orden #{record?.id}
                </Title>
                <div style={{ marginTop: "8px" }}>
                    <Space>
                        {record?.status && getStatusTag(record.status)}
                        {record?.service_type && getServiceTypeTag(record.service_type)}
                    </Space>
                </div>
            </div>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col xs={24} md={16}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                            <Card size="small" title="Información del Cliente" style={{ height: "100%" }}>
                                <Title level={5}>Cliente</Title>
                                <Text strong>
                                    {record?.user ? `${record.user.name} ${record.user.last_name || ""}` : `Usuario #${record?.user_id}`}
                                </Text>

                                <Title level={5} style={{ marginTop: "16px" }}>Teléfono de Contacto</Title>
                                <Text>{record?.contact_phone || "No registrado"}</Text>

                                <Title level={5} style={{ marginTop: "16px" }}>Dirección de Entrega</Title>
                                <Text>{record?.delivery_address || "Retiro en local"}</Text>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Card size="small" title="Facturación y Pago" style={{ height: "100%" }}>
                                <Title level={5}>Método de Pago</Title>
                                <Text>{record?.payment_method || "No especificado"}</Text>

                                <Divider style={{ margin: "12px 0" }} />

                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                                    <Text type="secondary">Subtotal:</Text>
                                    <Text strong>
                                        {record?.currency === "nacional" ? "Bs." : "$"} {Number(record?.subtotal || 0).toFixed(2)}
                                    </Text>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                                    <Text type="secondary">Impuestos:</Text>
                                    <Text strong>
                                        {record?.currency === "nacional" ? "Bs." : "$"} {Number(record?.taxes || 0).toFixed(2)}
                                    </Text>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #f0f0f0", paddingTop: "8px" }}>
                                    <Text strong>Total:</Text>
                                    <Text strong style={{ fontSize: "16px", color: "#3f8600" }}>
                                        {record?.currency === "nacional" ? "Bs." : "$"} {Number(record?.total || 0).toFixed(2)}
                                    </Text>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: "16px" }}>
                        <Col xs={24}>
                            <Card size="small" title="Reparto y Notas">
                                <Title level={5}>Empleado Asignado</Title>
                                <Text>
                                    {record?.assigned_employee ? `${record.assigned_employee.name} ${record.assigned_employee.last_name || ""}` : "No asignado"}
                                </Text>

                                <Title level={5} style={{ marginTop: "16px" }}>Notas Especiales</Title>
                                <Paragraph>{record?.special_notes || "Sin especificaciones especiales."}</Paragraph>
                            </Card>
                        </Col>
                    </Row>
                </Col>

                <Col xs={24} md={8}>
                    <Card title="Historial del Pedido" style={{ height: "100%" }}>
                        {timelineItems.length > 0 ? (
                            <Timeline items={timelineItems} />
                        ) : (
                            <Text type="secondary">Sin historial disponible</Text>
                        )}
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
