import { Show, DateField } from "@refinedev/antd";
import { Typography, Row, Col, Card, Rate, Divider, Space } from "antd";
import { useShow } from "@refinedev/core";
import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

export const EvaluationsShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <div style={{ marginBottom: "20px" }}>
                <Title level={2} style={{ margin: 0 }}>
                    Valoración #{record?.id}
                </Title>
                <div style={{ marginTop: "8px" }}>
                    <Space size="large">
                        {record?.rating && <Rate disabled defaultValue={record.rating} />}
                        <Text type="secondary">
                            Por: {record?.user ? `${record.user.name} ${record.user.last_name || ""}` : `Usuario #${record?.user_id}`}
                        </Text>
                    </Space>
                </div>
            </div>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col xs={24} md={16}>
                    <Card size="small" title="Opinión y Comentarios" style={{ height: "100%" }}>
                        <Title level={5}>Comentario del Cliente</Title>
                        <Paragraph style={{ fontSize: "16px", fontStyle: "italic" }}>
                            "{record?.comment || "Sin comentarios."}"
                        </Paragraph>

                        <Title level={5} style={{ marginTop: "24px" }}>Fecha de Valoración</Title>
                        {record?.evaluation_date ? (
                            <DateField format="LL" value={record.evaluation_date} />
                        ) : (
                            <Text>N/A</Text>
                        )}
                    </Card>
                </Col>

                <Col xs={24} md={8}>
                    <Card size="small" title="Relaciones y Contexto" style={{ height: "100%" }}>
                        <Title level={5}>Producto Asociado</Title>
                        {record?.product ? (
                            <Link to={`/products/show/${record.product_id}`}>
                                {record.product.name}
                            </Link>
                        ) : (
                            <Text type="secondary">Calificación General del Servicio</Text>
                        )}

                        <Title level={5} style={{ marginTop: "24px" }}>Pedido Relacionado</Title>
                        {record?.order_id ? (
                            <Link to={`/orders/show/${record.order_id}`}>
                                Orden #{record.order_id}
                            </Link>
                        ) : (
                            <Text type="secondary">N/A</Text>
                        )}
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
