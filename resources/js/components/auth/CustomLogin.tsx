import { useLogin } from "@refinedev/core";
import { Button, Card, Col, Form, Input, Layout, Row, Typography, theme } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Title } = Typography;

export const CustomLogin: React.FC = () => {
    const { mutate: login, isPending } = useLogin();
    const { token } = theme.useToken();

    const onFinish = (values: Record<string, string>) => {
        login(values);
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
                            <img src="/logo.png" alt="logo" style={{ maxHeight: "150px" }} />
                            <Title level={2} style={{ color: token.colorPrimary, margin: 0 }}>
                                Sabor & Tradición
                            </Title>
                            <div style={{ marginTop: "12px", color: token.colorTextSecondary }}>
                                Inicia sesión en tu cuenta
                            </div>
                        </div>

                        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
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
                                rules={[{ required: true, message: "La contraseña es obligatoria" }]}
                                extra={
                                    <div style={{ fontSize: "12px", marginTop: "8px", color: "rgb(107 114 128)" }}>
                                        <p style={{ marginBottom: "-5px" }}>Debe tener entre 8 y 16 caracteres.</p>
                                        <p style={{ marginBottom: "-5px" }}>Debe tener al menos una mayúscula</p>
                                        <p style={{ marginBottom: "-5px" }}>Debe tener al menos un número</p>
                                        <p>Debe tener al menos un caracter especial (@$!%*?&#-_.)</p>
                                    </div>
                                }
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
                                    style={{ marginTop: "5px" }}
                                >
                                    Entrar
                                </Button>
                            </Form.Item>

                            <div style={{ textAlign: "center", marginTop: "16px" }}>
                                ¿No tienes una cuenta? <Link to="/register" style={{ color: token.colorPrimary }}>Regístrate aquí</Link>
                            </div>
                            <div style={{ textAlign: "center", marginTop: "16px", color: "rgb(107 114 128)" }}>
                                <p style={{ marginBottom: "-5px" }}>Cuenta de prueba Administrador</p>
                                <p style={{ marginBottom: "-5px" }}>admin@restaurante.com</p>
                                <p>Grecia-123</p>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
};
