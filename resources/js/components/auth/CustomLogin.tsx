import { useLogin } from "@refinedev/core";
import { Button, Card, Col, Form, Input, Layout, Row, Typography, Alert, theme } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ColorModeContext } from "../../contexts/color-mode";
import { SafetyCertificateOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const CustomLogin: React.FC = () => {
    const { mutate: login, isPending } = useLogin();
    const { token } = theme.useToken();
    const { mode } = useContext(ColorModeContext);

    const onFinish = (values: Record<string, string>) => {
        login(values);
    };

    const isDarkMode = mode === "dark";

    const backgroundStyle: React.CSSProperties = {
        minHeight: "100vh",
        background: isDarkMode
            ? "radial-gradient(circle at 10% 20%, rgb(40, 10, 10) 0%, rgb(10, 10, 10) 90.2%)"
            : "radial-gradient(circle at 10% 20%, rgb(255, 245, 245) 0%, rgb(253, 230, 230) 90.2%)",
        transition: "all 0.3s ease",
    };

    return (
        <Layout style={backgroundStyle}>
            <Row justify="center" align="middle" style={{ minHeight: "100vh", padding: "16px 0" }}>
                <Col xs={22} sm={16} md={12} lg={8}>
                    <Card
                        styles={{ body: { padding: "40px 32px" } }}
                        style={{
                            borderRadius: "20px",
                            border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(239, 68, 68, 0.1)"}`,
                            background: isDarkMode ? "rgba(18, 18, 18, 0.85)" : "rgba(255, 255, 255, 0.9)",
                            backdropFilter: "blur(12px)",
                            boxShadow: isDarkMode 
                                ? "0 8px 32px 0 rgba(0, 0, 0, 0.5)" 
                                : "0 8px 32px 0 rgba(239, 68, 68, 0.05)",
                        }}
                    >
                        <div style={{ textAlign: "center", marginBottom: "28px" }}>
                            <img src="/logo.png" alt="logo" style={{ maxHeight: "100px", marginBottom: "16px" }} />
                            <Title level={2} style={{ color: "#ef4444", margin: 0, fontWeight: 800, letterSpacing: "-0.5px" }}>
                                Sabor & Tradición
                            </Title>
                            <div style={{ marginTop: "8px", color: token.colorTextSecondary, fontSize: "14px" }}>
                                Inicia sesión para continuar al panel administrativo
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
                                <Input size="large" placeholder="tu@correo.com" style={{ borderRadius: "8px" }} />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Contraseña"
                                rules={[{ required: true, message: "La contraseña es obligatoria" }]}
                                extra={
                                    <div style={{ fontSize: "11px", marginTop: "8px", color: token.colorTextDescription }}>
                                        <p style={{ margin: "2px 0" }}>• Entre 8 y 16 caracteres.</p>
                                        <p style={{ margin: "2px 0" }}>• Al menos una mayúscula, un número y un carácter especial.</p>
                                    </div>
                                }
                            >
                                <Input.Password size="large" placeholder="●●●●●●●●" style={{ borderRadius: "8px" }} />
                            </Form.Item>

                            <Form.Item style={{ marginBottom: "24px" }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    block
                                    loading={isPending}
                                    style={{
                                        marginTop: "8px",
                                        borderRadius: "8px",
                                        fontWeight: 600,
                                        height: "45px",
                                        backgroundColor: "#ef4444",
                                        borderColor: "#ef4444"
                                    }}
                                >
                                    Entrar al Sistema
                                </Button>
                            </Form.Item>

                            <div style={{ textAlign: "center", marginBottom: "20px", fontSize: "14px" }}>
                                ¿No tienes una cuenta? <Link to="/register" style={{ color: "#ef4444", fontWeight: 600 }}>Regístrate aquí</Link>
                            </div>

                            <Alert
                                message={
                                    <div style={{ fontSize: "12px" }}>
                                        <Text strong><SafetyCertificateOutlined /> Cuenta de Prueba Administrador</Text>
                                        <div style={{ marginTop: "4px" }}>
                                            <strong>Email:</strong> admin@restaurante.com <br />
                                            <strong>Contraseña:</strong> Grecia-123
                                        </div>
                                    </div>
                                }
                                type="info"
                                showIcon={false}
                                style={{
                                    borderRadius: "10px",
                                    border: isDarkMode ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(239, 68, 68, 0.15)",
                                    backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.02)" : "rgba(239, 68, 68, 0.02)"
                                }}
                            />
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
};
