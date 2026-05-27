import { Show } from "@refinedev/antd";
import { Typography, Row, Col, Card, Divider } from "antd";
import { useShow } from "@refinedev/core";
import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

export const OrderDetailsShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <div style={{ marginBottom: "20px" }}>
                <Title level={2} style={{ margin: 0 }}>
                    Detalle de Ítem #{record?.id}
                </Title>
                <Text type="secondary">
                    Asociado a la <Link to={`/orders/show/${record?.order_id}`}>Orden #{record?.order_id}</Link>
                </Text>
            </div>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card size="small" title="Información del Producto" style={{ height: "100%" }}>
                        <Title level={5}>Producto</Title>
                        <Text strong style={{ fontSize: "16px" }}>
                            {record?.product?.name || `Producto #${record?.product_id}`}
                        </Text>

                        {record?.product?.description && (
                            <>
                                <Title level={5} style={{ marginTop: "16px" }}>Descripción del Producto</Title>
                                <Paragraph>{record.product.description}</Paragraph>
                            </>
                        )}

                        <Title level={5} style={{ marginTop: "16px" }}>Notas del Cliente para este Ítem</Title>
                        <Paragraph>{record?.product_notes || "Sin notas específicas."}</Paragraph>
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card size="small" title="Información de Cantidad y Costo" style={{ height: "100%" }}>
                        <Title level={5}>Cantidad Pedida</Title>
                        <Text strong style={{ fontSize: "18px" }}>{record?.quantity}</Text>

                        <Title level={5} style={{ marginTop: "16px" }}>Precio Unitario</Title>
                        <Text>$ {record?.unit_price ? Number(record.unit_price).toFixed(2) : "0.00"}</Text>

                        <Divider style={{ margin: "16px 0" }} />

                        <Title level={5}>Subtotal del Ítem</Title>
                        <Text strong style={{ fontSize: "20px", color: "#3f8600" }}>
                            $ {record?.subtotal ? Number(record.subtotal).toFixed(2) : "0.00"}
                        </Text>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
