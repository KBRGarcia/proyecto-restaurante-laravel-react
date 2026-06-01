import { Show, DateField } from "@refinedev/antd";
import { Typography, Row, Col, Card, Tag, Divider, Space } from "antd";
import { useShow } from "@refinedev/core";

const { Title, Text } = Typography;

export const BanksShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;

    const getStatusTag = (active: boolean) => {
        return active ? (
            <Tag color="success">Activo</Tag>
        ) : (
            <Tag color="error">Inactivo</Tag>
        );
    };

    return (
        <Show isLoading={isLoading}>
            <div style={{ marginBottom: "20px" }}>
                <Title level={2} style={{ margin: 0 }}>
                    {record?.name || "Detalle de Banco"}
                </Title>
                <div style={{ marginTop: "8px" }}>
                    <Space>
                        {record && getStatusTag(record.active)}
                    </Space>
                </div>
            </div>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card size="small" title="Informacion General" style={{ height: "100%" }}>
                        <Title level={5}>Codigo de Banco</Title>
                        <Text code style={{ fontSize: "16px" }}>{record?.code}</Text>

                        <Title level={5} style={{ marginTop: "16px" }}>Fecha del Sistema</Title>
                        {record?.creation_date ? (
                            <DateField format="LL" value={record.creation_date} />
                        ) : record?.created_at ? (
                            <DateField format="LL" value={record.created_at} />
                        ) : (
                            <Text>N/A</Text>
                        )}
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card size="small" title="Datos del Sistema (JSON)" style={{ height: "100%" }}>
                        <pre style={{
                            padding: "12px",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "6px",
                            overflowX: "auto",
                            fontSize: "12px",
                            margin: 0,
                        }}>
                            {record?.system_data ? JSON.stringify(record.system_data, null, 2) : "{}"}
                        </pre>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
