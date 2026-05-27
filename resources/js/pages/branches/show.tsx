import { Show, DateField } from "@refinedev/antd";
import { Typography, Row, Col, Card, Tag, Divider, Space } from "antd";
import { useShow } from "@refinedev/core";

const { Title, Text } = Typography;

export const BranchesShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;

    const getStatusTag = (active: boolean) => {
        return active ? (
            <Tag color="success">Activa</Tag>
        ) : (
            <Tag color="error">Inactiva</Tag>
        );
    };

    return (
        <Show isLoading={isLoading}>
            <div style={{ marginBottom: "20px" }}>
                <Title level={2} style={{ margin: 0 }}>
                    {record?.name || "Detalle de Sucursal"}
                </Title>
                <div style={{ marginTop: "8px" }}>
                    <Space>
                        {record && getStatusTag(record.active)}
                        {record?.is_main && <Tag color="gold">Sucursal Principal</Tag>}
                    </Space>
                </div>
            </div>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card size="small" title="Ubicación y Contacto" style={{ height: "100%" }}>
                        <Title level={5}>Dirección</Title>
                        <Text>{record?.address}</Text>

                        <Title level={5} style={{ marginTop: "12px" }}>Ciudad y Estado</Title>
                        <Text>{record?.city}, {record?.state} {record?.postal_code ? `(${record?.postal_code})` : ""}</Text>

                        <Title level={5} style={{ marginTop: "12px" }}>Teléfono</Title>
                        <Text>{record?.phone}</Text>

                        <Title level={5} style={{ marginTop: "12px" }}>Email</Title>
                        <Text>{record?.email || "No registrado"}</Text>
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card size="small" title="Operación y Capacidad" style={{ height: "100%" }}>
                        <Title level={5}>Gerente de Sucursal</Title>
                        <Text>{record?.manager || "N/A"}</Text>

                        <Title level={5} style={{ marginTop: "12px" }}>Horario de Atención</Title>
                        <Text>{record?.opening_time} - {record?.closing_time}</Text>

                        <Title level={5} style={{ marginTop: "12px" }}>Días Operativos</Title>
                        <Text>{record?.operation_days}</Text>

                        <Title level={5} style={{ marginTop: "12px" }}>Capacidad de Clientes</Title>
                        <Text>{record?.capacity_people ? `${record?.capacity_people} personas` : "No especificada"}</Text>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                <Col xs={24}>
                    <Card size="small" title="Servicios y Características">
                        <Space size="large">
                            <div>
                                <Text strong>Servicio de Delivery: </Text>
                                {record?.has_delivery ? (
                                    <Tag color="green">Disponible</Tag>
                                ) : (
                                    <Tag color="red">No disponible</Tag>
                                )}
                            </div>
                            <div>
                                <Text strong>Estacionamiento: </Text>
                                {record?.has_parking ? (
                                    <Tag color="green">Disponible</Tag>
                                ) : (
                                    <Tag color="red">No disponible</Tag>
                                )}
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
