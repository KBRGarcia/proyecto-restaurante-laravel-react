import { Show } from "@refinedev/antd";
import { Avatar, Card, Col, Descriptions, Row, Tag, Typography, theme } from "antd";
import {
    CalendarOutlined,
    ClockCircleOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import { useShow } from "@refinedev/core";

const { Title, Text, Paragraph } = Typography;

const getRoleColor = (role?: string) => {
    if (role === "admin") return "red";
    if (role === "employee") return "blue";
    if (role === "client") return "green";
    return "default";
};

const getRoleLabel = (role?: string) => {
    switch (role) {
        case "admin":
            return "Administrador";
        case "employee":
            return "Empleado";
        case "client":
            return "Cliente";
        default:
            return role || "Desconocido";
    }
};

const formatDateLabel = (value?: string | null, fallback = "N/A") => {
    if (!value) return fallback;

    return new Date(value).toLocaleDateString("es-VE", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const formatDateTimeLabel = (value?: string | null, fallback = "N/A") => {
    if (!value) return fallback;

    return new Date(value).toLocaleString("es-VE", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const UserShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;
    const { token } = theme.useToken();

    return (
        <Show isLoading={isLoading}>
            <Card
                style={{
                    borderRadius: 12,
                    borderLeft: "6px solid #722ed1",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    marginBottom: 16,
                    backgroundColor: token.colorBgContainer,
                }}
                bodyStyle={{ padding: "20px 24px" }}
            >
                <Row gutter={[24, 16]} align="middle" justify="space-between">
                    <Col xs={24} sm={16} style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                        <Avatar
                            size={64}
                            src={record?.profile_picture}
                            icon={<UserOutlined />}
                            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)", border: `2px solid ${token.colorBgContainer}` }}
                        />
                        <div>
                            <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
                                {record?.name} {record?.last_name}
                            </Title>
                            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
                                <Tag color={getRoleColor(record?.role)} style={{ borderRadius: 4 }}>
                                    {getRoleLabel(record?.role)}
                                </Tag>
                                <Tag color={record?.status === "active" ? "success" : "error"} style={{ borderRadius: 4 }}>
                                    {record?.status === "active" ? "Activo" : "Inactivo"}
                                </Tag>
                                {record?.email && (
                                    <Tag icon={<MailOutlined />} color="processing" style={{ borderRadius: 4 }}>
                                        {record.email}
                                    </Tag>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Row gutter={16} justify="end">
                            <Col xs={12}>
                                <Card
                                    bordered={false}
                                    style={{
                                        borderRadius: 8,
                                        background: "rgba(114, 46, 209, 0.08)",
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                                    }}
                                    bodyStyle={{ padding: "12px 16px", textAlign: "center" }}
                                >
                                    <UserOutlined style={{ fontSize: 20, color: "#722ed1" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Rol</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", color: token.colorText, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {getRoleLabel(record?.role)}
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={12}>
                                <Card
                                    bordered={false}
                                    style={{
                                        borderRadius: 8,
                                        background: "rgba(82, 196, 26, 0.08)",
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                                    }}
                                    bodyStyle={{ padding: "12px 16px", textAlign: "center" }}
                                >
                                    <CheckCircleOutlined style={{ fontSize: 20, color: "#52c41a" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Estado</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", color: token.colorText }}>
                                        {record?.status === "active" ? "Activo" : "Inactivo"}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={14}>
                    <Card
                        title={<span style={{ fontWeight: 600 }}>Información de Contacto</span>}
                        style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.03)", height: "100%", backgroundColor: token.colorBgContainer }}
                    >
                        <Descriptions
                            column={{ xs: 1, sm: 2 }}
                            bordered
                            size="middle"
                            labelStyle={{ backgroundColor: token.colorFillAlter, fontWeight: 600, width: "140px", color: token.colorText }}
                            contentStyle={{ backgroundColor: token.colorBgContainer, color: token.colorText }}
                        >
                            <Descriptions.Item label="Documento">
                                {record?.identity_document || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Correo">
                                <Text>
                                    <MailOutlined style={{ marginRight: 8, color: token.colorTextDescription }} />
                                    {record?.email || "N/A"}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Teléfono">
                                <Text>
                                    <PhoneOutlined style={{ marginRight: 8, color: token.colorTextDescription }} />
                                    {record?.phone_number || "No registrado"}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Rol">
                                <Tag color={getRoleColor(record?.role)} style={{ borderRadius: 4 }}>
                                    {getRoleLabel(record?.role)}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Dirección" span={2}>
                                {record?.address || "No registrada"}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col xs={24} lg={10}>
                    <Card
                        title={<span style={{ fontWeight: 600 }}>Actividad en el Sistema</span>}
                        style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.03)", height: "100%", backgroundColor: token.colorBgContainer }}
                    >
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Card
                                    bordered={false}
                                    style={{
                                        borderRadius: 8,
                                        textAlign: "center",
                                        background: token.colorBgLayout,
                                        border: `1px solid ${token.colorBorderSecondary}`,
                                    }}
                                    bodyStyle={{ padding: "16px 8px" }}
                                >
                                    <CalendarOutlined style={{ fontSize: 22, color: "#722ed1", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Fecha de Registro</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                        {formatDateLabel(record?.registration_date)}
                                    </div>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card
                                    bordered={false}
                                    style={{
                                        borderRadius: 8,
                                        textAlign: "center",
                                        background: token.colorBgLayout,
                                        border: `1px solid ${token.colorBorderSecondary}`,
                                    }}
                                    bodyStyle={{ padding: "16px 8px" }}
                                >
                                    <ClockCircleOutlined style={{ fontSize: 22, color: "#faad14", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Última Conexión</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                        {formatDateTimeLabel(record?.last_connection, "Nunca")}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Paragraph type="secondary" style={{ marginTop: 20, marginBottom: 0, fontSize: 12, textAlign: "center" }}>
                            Información de control de accesos y estado del usuario en la plataforma.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
