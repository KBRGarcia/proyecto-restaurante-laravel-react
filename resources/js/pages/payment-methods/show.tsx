import { Show, DateField } from "@refinedev/antd";
import { Typography, Row, Col, Card, Tag, Divider, Space } from "antd";
import { useShow } from "@refinedev/core";

const { Title, Text } = Typography;

export const PaymentMethodsShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;

    const getCurrencyTypeTag = (type: string) => {
        return type === "nacional" ? (
            <Tag color="blue">Bolívares (Bs.)</Tag>
        ) : (
            <Tag color="green">Dólares ($)</Tag>
        );
    };

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
                    {record?.name || "Detalle de Método de Pago"}
                </Title>
                <div style={{ marginTop: "8px" }}>
                    <Space>
                        {record && getStatusTag(record.active)}
                        {record?.currency_type && getCurrencyTypeTag(record.currency_type)}
                    </Space>
                </div>
            </div>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card size="small" title="Información General" style={{ height: "100%" }}>
                        <Title level={5}>Código de Sistema</Title>
                        <Text code style={{ fontSize: "16px" }}>{record?.code}</Text>

                        <Title level={5} style={{ marginTop: "16px" }}>Fecha de Creación</Title>
                        {record?.created_at ? (
                            <DateField format="LL" value={record.created_at} />
                        ) : (
                            <Text>N/A</Text>
                        )}
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card size="small" title="Configuración de Parámetros (JSON)" style={{ height: "100%" }}>
                        <pre style={{ 
                            padding: "12px", 
                            backgroundColor: "#f5f5f5", 
                            borderRadius: "6px",
                            overflowX: "auto",
                            fontSize: "12px",
                            margin: 0
                        }}>
                            {record?.configuration ? JSON.stringify(record.configuration, null, 2) : "{}"}
                        </pre>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
