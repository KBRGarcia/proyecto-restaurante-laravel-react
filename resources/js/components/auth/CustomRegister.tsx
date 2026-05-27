import { useRegister } from "@refinedev/core";
import { Button, Card, Col, Form, Input, Layout, Row, Typography, theme } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ColorModeContext } from "../../contexts/color-mode";

const { Title } = Typography;

export const CustomRegister: React.FC = () => {
    const { mutate: register, isPending } = useRegister();
    const { token } = theme.useToken();
    const { mode } = useContext(ColorModeContext);

    const onFinish = (values: Record<string, string>) => {
        register(values);
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
            <Row justify="center" align="middle" style={{ minHeight: "100vh", padding: "32px 0" }}>
                <Col xs={22} sm={18} md={14} lg={10}>
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
                            <img src="/logo.png" alt="logo" style={{ maxHeight: "80px", marginBottom: "12px" }} />
                            <Title level={2} style={{ color: "#ef4444", margin: 0, fontWeight: 800, letterSpacing: "-0.5px" }}>
                                Crear Cuenta
                            </Title>
                            <div style={{ marginTop: "6px", color: token.colorTextSecondary, fontSize: "14px" }}>
                                Regístrate para acceder al panel de Sabor & Tradición
                            </div>
                        </div>

                        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="name"
                                        label="Nombre"
                                        rules={[{ required: true, message: "El nombre es obligatorio" }]}
                                    >
                                        <Input size="large" placeholder="Tu nombre" style={{ borderRadius: "8px" }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="last_name"
                                        label="Apellido"
                                        rules={[{ required: true, message: "El apellido es obligatorio" }]}
                                    >
                                        <Input size="large" placeholder="Tu apellido" style={{ borderRadius: "8px" }} />
                                    </Form.Item>
                                </Col>
                            </Row>

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
                                rules={[
                                    { required: true, message: "La contraseña es obligatoria" },
                                    { min: 8, message: "Mínimo 8 caracteres" },
                                    { max: 16, message: "Máximo 16 caracteres" },
                                    {
                                        pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#\-_.])[A-Za-z\d@$!%*?&#\-_.]+$/,
                                        message: "La contraseña debe contener al menos una mayúscula, un número y un carácter especial."
                                    }
                                ]}
                                extra={
                                    <div style={{ fontSize: "11px", marginTop: "8px", color: token.colorTextDescription }}>
                                        <p style={{ margin: "2px 0" }}>• Entre 8 y 16 caracteres.</p>
                                        <p style={{ margin: "2px 0" }}>• Al menos una mayúscula, un número y un carácter especial (@$!%*?&#-_.).</p>
                                    </div>
                                }
                            >
                                <Input.Password size="large" placeholder="●●●●●●●●" style={{ borderRadius: "8px" }} />
                            </Form.Item>

                            <Form.Item style={{ marginBottom: "16px" }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    block
                                    loading={isPending}
                                    style={{
                                        marginTop: "16px",
                                        borderRadius: "8px",
                                        fontWeight: 600,
                                        height: "45px",
                                        backgroundColor: "#ef4444",
                                        borderColor: "#ef4444"
                                    }}
                                >
                                    Registrarse
                                </Button>
                            </Form.Item>

                            <div style={{ textAlign: "center", fontSize: "14px" }}>
                                ¿Ya tienes una cuenta? <Link to="/login" style={{ color: "#ef4444", fontWeight: 600 }}>Inicia sesión aquí</Link>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
};
