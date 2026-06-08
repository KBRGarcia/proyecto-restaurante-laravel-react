import { Show } from "@refinedev/antd";
import { Card, Col, Descriptions, Rate, Row, Tag, Typography, theme } from "antd";
import { CalendarOutlined, CommentOutlined, ShoppingOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import { useShow } from "@refinedev/core";
import { Link } from "react-router-dom";
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

export const EvaluationsShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;
    const { token } = theme.useToken();

    const evaluatorName = record?.user
        ? `${record.user.name} ${record.user.last_name || ""}`.trim()
        : record?.client
          ? record.client.full_name || `${record.client.first_name ?? ""} ${record.client.last_name ?? ""}`.trim()
          : record?.user_id
            ? `Usuario #${record.user_id}`
            : record?.client_id
              ? `Cliente #${record.client_id}`
              : "N/A";

    return (
        <Show isLoading={isLoading}>
            <Card style={getHeaderCardStyle("#faad14", token)} bodyStyle={{ padding: "20px 24px" }}>
                <Row gutter={[24, 16]} align="middle" justify="space-between">
                    <Col xs={24} md={12}>
                        <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
                            Valoración #{record?.id}
                        </Title>
                        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                            {record?.rating && <Rate disabled defaultValue={record.rating} />}
                            <Tag icon={<UserOutlined />} color="processing" style={{ borderRadius: 4 }}>
                                {evaluatorName}
                            </Tag>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <Row gutter={16} justify="end">
                            <Col xs={12} sm={8}>
                                <Card bordered={false} style={getStatWidgetStyle("rgba(250, 173, 20, 0.08)")} bodyStyle={{ padding: "12px 16px", textAlign: "center" }}>
                                    <StarOutlined style={{ fontSize: 20, color: "#faad14" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Calificación</div>
                                    <div style={{ fontSize: 16, fontWeight: "bold", color: token.colorText }}>{record?.rating ?? 0}/5</div>
                                </Card>
                            </Col>
                            <Col xs={12} sm={8}>
                                <Card bordered={false} style={getStatWidgetStyle("rgba(24, 144, 255, 0.08)")} bodyStyle={{ padding: "12px 16px", textAlign: "center" }}>
                                    <ShoppingOutlined style={{ fontSize: 20, color: "#1890ff" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Pedido</div>
                                    <div style={{ fontSize: 16, fontWeight: "bold", color: token.colorText }}>
                                        {record?.order_id ? `#${record.order_id}` : "N/A"}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={14}>
                    <Card title={<span style={{ fontWeight: 600 }}>Opinión y Comentarios</span>} style={getSectionCardStyle(token)}>
                        <Descriptions
                            column={1}
                            bordered
                            size="middle"
                            labelStyle={getDescriptionsLabelStyle(token)}
                            contentStyle={getDescriptionsContentStyle(token)}
                        >
                            <Descriptions.Item label="Calificación">
                                {record?.rating ? <Rate disabled defaultValue={record.rating} /> : "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Comentario">
                                <Paragraph style={{ marginBottom: 0, fontStyle: "italic", color: token.colorTextSecondary }}>
                                    "{record?.comment || "Sin comentarios."}"
                                </Paragraph>
                            </Descriptions.Item>
                            <Descriptions.Item label="Fecha de Valoración">
                                {formatDateLabel(record?.evaluation_date)}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col xs={24} lg={10}>
                    <Card title={<span style={{ fontWeight: 600 }}>Relaciones</span>} style={getSectionCardStyle(token)}>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Card bordered={false} style={getInnerStatCardStyle(token)} bodyStyle={{ padding: "16px 8px" }}>
                                    <CommentOutlined style={{ fontSize: 22, color: "#faad14", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Producto Asociado</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                        {record?.product ? (
                                            <Link to={`/products/show/${record.product_id}`}>{record.product.name}</Link>
                                        ) : (
                                            "Calificación General del Servicio"
                                        )}
                                    </div>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card bordered={false} style={getInnerStatCardStyle(token)} bodyStyle={{ padding: "16px 8px" }}>
                                    <CalendarOutlined style={{ fontSize: 22, color: "#1890ff", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Pedido Relacionado</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                        {record?.order_id ? (
                                            <Link to={`/orders/show/${record.order_id}`}>Orden #{record.order_id}</Link>
                                        ) : (
                                            "N/A"
                                        )}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Paragraph type="secondary" style={{ marginTop: 20, marginBottom: 0, fontSize: 12, textAlign: "center" }}>
                            Contexto de la valoración realizada por el cliente.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
