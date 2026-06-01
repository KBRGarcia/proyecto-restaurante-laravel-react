import { Show } from "@refinedev/antd";
import { Card, Col, Divider, Row, Space, Tag, Typography } from "antd";
import { useShow } from "@refinedev/core";

const { Title, Text } = Typography;

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

    return (
        <Show isLoading={isLoading}>
            <div style={{ marginBottom: "20px" }}>
                <Title level={2} style={{ margin: 0 }}>
                    {record?.full_name || "Detalle de Empleado"}
                </Title>
                <div style={{ marginTop: "8px" }}>
                    <Tag color={record?.status === "active" ? "success" : "error"}>
                        {record?.status_label}
                    </Tag>
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

                        <Title level={5} style={{ marginTop: "12px" }}>Email laboral</Title>
                        <Text>{record?.email || "N/A"}</Text>

                        <Title level={5} style={{ marginTop: "12px" }}>Direccion</Title>
                        <Text>{record?.address || "N/A"}</Text>
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card size="small" title="Informacion Laboral" style={{ height: "100%" }}>
                        <Title level={5}>Fecha de Contratacion</Title>
                        <Text>{record?.hire_date_formatted || "N/A"}</Text>

                        <Title level={5} style={{ marginTop: "12px" }}>Usuario asociado</Title>
                        <Text>{record?.user?.email || "Sin usuario del sistema"}</Text>

                        <Title level={5} style={{ marginTop: "12px" }}>Notas</Title>
                        <Text>{record?.notes || "N/A"}</Text>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                <Col xs={24}>
                    <Card size="small" title="Sucursales y Cargos">
                        <Space direction="vertical" style={{ width: "100%" }}>
                            {assignments.length > 0 ? assignments.map((assignment) => (
                                <div key={assignment.id}>
                                    <Text strong>{assignment.branch_name || "Sucursal no disponible"}</Text>
                                    <Tag color="blue" style={{ marginLeft: "8px" }}>{assignment.position_label}</Tag>
                                    <Tag color={assignment.active ? "success" : "default"}>
                                        {assignment.active ? "Activo" : "Inactivo"}
                                    </Tag>
                                    {assignment.start_date && <Text type="secondary"> Desde {assignment.start_date}</Text>}
                                </div>
                            )) : (
                                <Text>Sin asignaciones registradas.</Text>
                            )}
                        </Space>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
