import { Show, EmailField, DateField } from "@refinedev/antd";
import { Typography, Avatar, Row, Col, Tag, Card, Divider } from "antd";
import { useShow } from "@refinedev/core";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const UserShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;

    const getRoleTag = (role: string) => {
        switch (role) {
            case "admin":
                return <Tag color="red">Administrador</Tag>;
            case "employee":
                return <Tag color="blue">Empleado</Tag>;
            case "client":
                return <Tag color="green">Cliente</Tag>;
            default:
                return <Tag>{role}</Tag>;
        }
    };

    const getStatusTag = (status: string) => {
        return status === "active" ? (
            <Tag color="success">Activo</Tag>
        ) : (
            <Tag color="error">Inactivo</Tag>
        );
    };

    return (
        <Show isLoading={isLoading}>
            <Row gutter={[24, 24]} align="middle" style={{ marginBottom: "24px" }}>
                <Col xs={24} sm={6} style={{ textAlign: "center" }}>
                    <Avatar size={120} src={record?.profile_picture} icon={<UserOutlined />} />
                </Col>
                <Col xs={24} sm={18}>
                    <Title level={2} style={{ margin: 0 }}>
                        {record?.name} {record?.last_name}
                    </Title>
                    <Text type="secondary">{record?.email}</Text>
                    <div style={{ marginTop: "12px" }}>
                        <Space>
                            {record?.role && getRoleTag(record.role)}
                            {record?.status && getStatusTag(record.status)}
                        </Space>
                    </div>
                </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                    <Card size="small" title="Información de Contacto">
                        <Title level={5}>Número de Teléfono</Title>
                        <Text>{record?.phone_number || "No registrado"}</Text>

                        <Title level={5} style={{ marginTop: "16px" }}>Dirección</Title>
                        <Text>{record?.address || "No registrada"}</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12}>
                    <Card size="small" title="Información de Registro">
                        <Title level={5}>Fecha de Registro</Title>
                        {record?.registration_date ? (
                            <DateField format="LL" value={record.registration_date} />
                        ) : (
                            <Text>N/A</Text>
                        )}

                        <Title level={5} style={{ marginTop: "16px" }}>Última Conexión</Title>
                        {record?.last_connection ? (
                            <DateField format="LLL" value={record.last_connection} />
                        ) : (
                            <Text>Nunca se ha conectado</Text>
                        )}
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};

import { Space } from "antd";
