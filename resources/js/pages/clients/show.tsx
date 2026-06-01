import { Show } from "@refinedev/antd";
import { Card, Col, Divider, Row, Tag, Typography } from "antd";
import { useShow } from "@refinedev/core";

const { Title, Text } = Typography;

export const ClientsShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;

    const originColor = record?.origin === "online" ? "blue" : record?.origin === "physical" ? "gold" : "purple";

    return (
        <Show isLoading={isLoading}>
            <div style={{ marginBottom: "20px" }}>
                <Title level={2} style={{ margin: 0 }}>
                    {record?.full_name || "Detalle de Cliente"}
                </Title>
                <div style={{ marginTop: "8px" }}>
                    <Tag color={record?.status === "active" ? "success" : "error"}>
                        {record?.status_label}
                    </Tag>
                    <Tag color={originColor}>{record?.origin_label}</Tag>
                </div>
            </div>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card size="small" title="Informacion Personal" style={{ height: "100%" }}>
                        <Title level={5}>Documento</Title>
                        <Text>{record?.identity_document || "N/A"}</Text>

                        <Title level={5} style={{ marginTop: "12px" }}>Telefono</Title>
                        <Text>{record?.phone || "N/A"}</Text>

                        <Title level={5} style={{ marginTop: "12px" }}>Email</Title>
                        <Text>{record?.email || "N/A"}</Text>

                        <Title level={5} style={{ marginTop: "12px" }}>Direccion</Title>
                        <Text>{record?.address || "N/A"}</Text>
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card size="small" title="Historial Comercial" style={{ height: "100%" }}>
                        <Title level={5}>Primera compra</Title>
                        <Text>{record?.first_purchase_at_formatted || "N/A"}</Text>

                        <Title level={5} style={{ marginTop: "12px" }}>Ultima compra</Title>
                        <Text>{record?.last_purchase_at_formatted || "N/A"}</Text>

                        <Title level={5} style={{ marginTop: "12px" }}>Ordenes realizadas</Title>
                        <Text>{record?.total_orders ?? 0}</Text>

                        <Title level={5} style={{ marginTop: "12px" }}>Total comprado</Title>
                        <Text>${record?.total_spent ?? 0}</Text>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                <Col xs={24}>
                    <Card size="small" title="Notas">
                        <Text>{record?.notes || "Sin notas registradas."}</Text>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
