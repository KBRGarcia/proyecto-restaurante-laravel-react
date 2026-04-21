import { useRegister } from "@refinedev/core";
import { Button, Card, Col, Form, Input, Layout, Row, Typography, theme } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Title } = Typography;

export const CustomRegister: React.FC = () => {
    const { mutate: register, isPending } = useRegister();
    const { token } = theme.useToken();

    const onFinish = (values: Record<string, string>) => {
        register(values);
    };

    return (
        <Layout style={{ minHeight: "100vh", backgroundColor: token.colorBgContainer }}>
            <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
                <Col xs={22} sm={16} md={12} lg={8}>
                    <Card
                        styles={{ body: { padding: "32px" } }}
                        style={{
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                    >
                        <div style={{ textAlign: "center", marginBottom: "24px" }}>
                            <Title level={3} style={{ color: token.colorPrimary }}>
                                Crear Cuenta
                            </Title>
                        </div>
                        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
                            <Form.Item
                                name="name"
                                label="Nombre"
                                rules={[{ required: true, message: "El nombre es obligatorio" }]}
                            >
                                <Input size="large" placeholder="Tu nombre" />
                            </Form.Item>
                            <Form.Item
                                name="last_name"
                                label="Apellido"
                                rules={[{ required: true, message: "El apellido es obligatorio" }]}
                            >
                                <Input size="large" placeholder="Tu apellido" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="Correo Electrónico"
                                rules={[
                                    { required: true, message: "El correo es obligatorio" },
                                    { type: "email", message: "Introduce un correo válido" },
                                ]}
                            >
                                <Input size="large" placeholder="tu@correo.com" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Contraseña"
                                rules={[{ required: true, message: "La contraseña es obligatoria" }, { min: 8, message: "Mínimo 8 caracteres" }]}
                            >
                                <Input.Password size="large" placeholder="●●●●●●●●" />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    block
                                    loading={isPending}
                                    style={{ marginTop: "16px" }}
                                >
                                    Registrarse
                                </Button>
                            </Form.Item>
                            <div style={{ textAlign: "center", marginTop: "12px" }}>
                                Ya tienes una cuenta? <Link to="/login" style={{ color: token.colorPrimary }}>Inicia sesión aquí</Link>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
};
