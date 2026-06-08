import { Show } from "@refinedev/antd";
import { Card, Col, Descriptions, Row, Tag, Typography, theme } from "antd";
import {
    CalendarOutlined,
    CheckCircleOutlined,
    AppstoreOutlined,
    MailOutlined,
    PhoneOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useShow } from "@refinedev/core";

const { Title, Text, Paragraph } = Typography;

type EmployeeAssignment = {
    id: number;
    branch_name: string | null;
    position_label: string;
    start_date: string | null;
    active: boolean;
};

export const EmployeesShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;
    const assignments = (record?.assignments || []) as EmployeeAssignment[];
    const activeAssignments = assignments.filter((assignment) => assignment.active).length;
    const { token } = theme.useToken();

    return (
        <Show isLoading={isLoading}>
            <Card
                style={{
                    borderRadius: 12,
                    borderLeft: "6px solid #1890ff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    marginBottom: 16,
                    backgroundColor: token.colorBgContainer,
                }}
                bodyStyle={{ padding: "20px 24px" }}
            >
                <Row gutter={[24, 16]} align="middle" justify="space-between">
                    <Col xs={24} md={12}>
                        <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
                            {record?.full_name || "Detalle de Empleado"}
                        </Title>
                        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                            <Tag color={record?.status === "active" ? "success" : "error"} style={{ borderRadius: 4 }}>
                                {record?.status_label}
                            </Tag>
                            {record?.user?.email && (
                                <Tag icon={<UserOutlined />} color="processing" style={{ borderRadius: 4 }}>
                                    {record.user.email}
                                </Tag>
                            )}
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <Row gutter={16} justify="end">
                            <Col xs={12} sm={8}>
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
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Asignaciones Activas</div>
                                    <div style={{ fontSize: 16, fontWeight: "bold", color: token.colorText }}>
                                        {activeAssignments}
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={12} sm={8}>
                                <Card
                                    bordered={false}
                                    style={{
                                        borderRadius: 8,
                                        background: "rgba(24, 144, 255, 0.08)",
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                                    }}
                                    bodyStyle={{ padding: "12px 16px", textAlign: "center" }}
                                >
                                    <AppstoreOutlined style={{ fontSize: 20, color: "#1890ff" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Total Cargos</div>
                                    <div style={{ fontSize: 16, fontWeight: "bold", color: token.colorText }}>
                                        {assignments.length}
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
                        title={<span style={{ fontWeight: 600 }}>Información Personal</span>}
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
                            <Descriptions.Item label="Nacimiento">
                                {record?.birth_date_formatted || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Teléfono">
                                <Text>
                                    <PhoneOutlined style={{ marginRight: 8, color: token.colorTextDescription }} />
                                    {record?.phone || "N/A"}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Email Laboral">
                                <Text>
                                    <MailOutlined style={{ marginRight: 8, color: token.colorTextDescription }} />
                                    {record?.email || "N/A"}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Dirección" span={2}>
                                {record?.address || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Usuario" span={2}>
                                {record?.user?.email ? (
                                    <Tag icon={<UserOutlined />} color="blue" style={{ borderRadius: 4 }}>
                                        {record.user.email}
                                    </Tag>
                                ) : (
                                    <Text type="secondary">Sin usuario asociado</Text>
                                )}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col xs={24} lg={10}>
                    <Card
                        title={<span style={{ fontWeight: 600 }}>Información Laboral</span>}
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
                                    <CalendarOutlined style={{ fontSize: 22, color: "#1890ff", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Contratación</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                        {record?.hire_date_formatted || "N/A"}
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
                                    <TeamOutlined style={{ fontSize: 22, color: "#52c41a", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription }}>Sucursales</div>
                                    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 6, color: token.colorText }}>
                                        {assignments.length > 0
                                            ? new Set(assignments.map((a) => a.branch_name).filter(Boolean)).size
                                            : 0}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Paragraph type="secondary" style={{ marginTop: 20, marginBottom: 0, fontSize: 12, textAlign: "center" }}>
                            Resumen del estado de la vinculación laboral del empleado en la empresa.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>

            <Card
                title={<span style={{ fontWeight: 600 }}>Sucursales y Cargos Asignados</span>}
                style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.03)", marginTop: 16, backgroundColor: token.colorBgContainer }}
            >
                {assignments.length > 0 ? (
                    <Row gutter={[16, 16]}>
                        {assignments.map((assignment) => (
                            <Col xs={24} sm={12} md={8} key={assignment.id}>
                                <Card
                                    bordered={false}
                                    style={{
                                        borderRadius: 8,
                                        borderLeft: `4px solid ${assignment.active ? "#52c41a" : "#d9d9d9"}`,
                                        background: token.colorBgLayout,
                                        border: `1px solid ${token.colorBorderSecondary}`,
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                                    }}
                                    bodyStyle={{ padding: 16 }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                                        <div style={{ flex: 1, marginRight: 8 }}>
                                            <Text strong style={{ fontSize: 14, color: token.colorText }}>
                                                {assignment.branch_name || "Sucursal no disponible"}
                                            </Text>
                                            <div style={{ marginTop: 6 }}>
                                                <Tag color="blue" style={{ borderRadius: 4, margin: 0 }}>
                                                    {assignment.position_label}
                                                </Tag>
                                            </div>
                                        </div>
                                        <Tag color={assignment.active ? "success" : "default"} style={{ borderRadius: 4 }}>
                                            {assignment.active ? "Activo" : "Inactivo"}
                                        </Tag>
                                    </div>
                                    {assignment.start_date && (
                                        <div style={{ marginTop: 12, borderTop: `1px solid ${token.colorBorderSecondary}`, paddingTop: 8 }}>
                                            <Text type="secondary" style={{ fontSize: 11 }}>
                                                <CalendarOutlined style={{ marginRight: 4 }} />
                                                Desde: {assignment.start_date}
                                            </Text>
                                        </div>
                                    )}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Paragraph style={{ marginBottom: 0, color: token.colorTextDescription }}>Sin asignaciones registradas.</Paragraph>
                )}
            </Card>

            <Card
                title={<span style={{ fontWeight: 600 }}>Notas Internas</span>}
                style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.03)", marginTop: 16, backgroundColor: token.colorBgContainer }}
            >
                <Paragraph style={{ marginBottom: 0, whiteSpace: "pre-wrap", color: token.colorTextSecondary }}>
                    {record?.notes || "Sin notas registradas."}
                </Paragraph>
            </Card>
        </Show>
    );
};
