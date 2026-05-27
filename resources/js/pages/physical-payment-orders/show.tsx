import { Show, DateField } from "@refinedev/antd";
import { Typography, Row, Col, Card, Tag, Divider, Space } from "antd";
import { useShow } from "@refinedev/core";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

export const PhysicalPaymentOrdersShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;

    const getStatusTag = (status: string) => {
        switch (status) {
            case "confirmed":
                return <Tag color="success">Confirmado</Tag>;
            case "pending":
                return <Tag color="orange">Pendiente</Tag>;
            case "canceled":
                return <Tag color="error">Cancelado</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };

    return (
        <Show isLoading={isLoading}>
            <div style={{ marginBottom: "20px" }}>
                <Title level={2} style={{ margin: 0 }}>
                    Orden de Pago Físico #{record?.id}
                </Title>
                <div style={{ marginTop: "8px" }}>
                    <Space>
                        {record?.status && getStatusTag(record.status)}
                        <Tag color="blue">
                            <Link to={`/orders/show/${record?.order_id}`} style={{ color: "inherit" }}>
                                Ver Pedido #{record?.order_id}
                            </Link>
                        </Tag>
                    </Space>
                </div>
            </div>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card size="small" title="Información de la Orden Asociada" style={{ height: "100%" }}>
                        <Title level={5}>Cliente</Title>
                        <Text strong>
                            {record?.order?.user ? `${record.order.user.name} ${record.order.user.last_name || ""}` : `Usuario #${record?.order?.user_id || "N/A"}`}
                        </Text>

                        <Title level={5} style={{ marginTop: "16px" }}>Monto de la Orden</Title>
                        <Text strong style={{ fontSize: "16px" }}>
                            {record?.order?.currency === "nacional" ? "Bs." : "$"} {record?.order?.total ? Number(record.order.total).toFixed(2) : "0.00"}
                        </Text>

                        <Title level={5} style={{ marginTop: "16px" }}>Estado del Pedido</Title>
                        <Text>{record?.order?.status || "N/A"}</Text>
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card size="small" title="Fechas y Límites" style={{ height: "100%" }}>
                        <Title level={5}>Fecha Límite para Pago</Title>
                        {record?.limit_date ? (
                            <DateField format="LLL" value={record.limit_date} />
                        ) : (
                            <Text>N/A</Text>
                        )}

                        <Title level={5} style={{ marginTop: "16px" }}>Fecha de Creación</Title>
                        {record?.created_at ? (
                            <DateField format="LL" value={record.created_at} />
                        ) : (
                            <Text>N/A</Text>
                        )}

                        <Title level={5} style={{ marginTop: "16px" }}>Última Actualización</Title>
                        {record?.updated_at ? (
                            <DateField format="LLL" value={record.updated_at} />
                        ) : (
                            <Text>N/A</Text>
                        )}
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
