import React, { useState, useEffect } from "react";
import { useGetIdentity } from "@refinedev/core";
import {
    Form,
    Input,
    Button,
    Card,
    Avatar,
    Upload,
    message,
    Row,
    Col,
    Typography,
    Divider,
    Space,
    theme,
} from "antd";
import { UserOutlined, UploadOutlined, SaveOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

export const ProfilePage: React.FC = () => {
    const { token } = useToken();
    const { data: user, refetch } = useGetIdentity<any>();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const resolvedImageUrl = imageUrl ?? user?.profile_picture ?? user?.avatar ?? null;

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.name,
                last_name: user.last_name,
                email: user.email,
                phone_number: user.phone_number,
                address: user.address,
            });
        }
    }, [user, form]);

    const getBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handleBeforeUpload = async (file: File) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif";
        if (!isJpgOrPng) {
            message.error("Solo puedes subir archivos JPG/PNG/GIF!");
            return Upload.LIST_IGNORE;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("La imagen debe pesar menos de 2MB!");
            return Upload.LIST_IGNORE;
        }

        try {
            const base64Url = await getBase64(file);
            setImageUrl(base64Url);
        } catch (err) {
            message.error("Error al procesar la imagen.");
        }
        return false; // Evita la subida automática al servidor
    };

    const onFinish = async (values: any) => {
        if (!user?.id) return;
        setLoading(true);

        try {
            const tokenStr = localStorage.getItem("auth_token");
            const payload = {
                ...values,
                role: user.role,
                status: user.status,
                profile_picture: resolvedImageUrl,
            };

            const response = await axios.put(`/api/users/${user.id}`, payload, {
                headers: {
                    Authorization: `Bearer ${tokenStr}`,
                },
            });

            if (response.data) {
                // Actualizar local storage
                localStorage.setItem("user", JSON.stringify(response.data));
                message.success("Perfil actualizado correctamente!");
                await refetch();
            }
        } catch (error: any) {
            console.error(error);
            const errorMsg = error.response?.data?.message || "Ocurrió un error al actualizar el perfil.";
            const validationErrors = error.response?.data?.errors;

            if (validationErrors) {
                // Mapear errores de validación de Laravel al formulario de AntD
                const fieldsErrors = Object.keys(validationErrors).map((key) => ({
                    name: key,
                    errors: validationErrors[key],
                }));
                form.setFields(fieldsErrors);
            } else {
                message.error(errorMsg);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
            <Card
                style={{
                    borderRadius: "16px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                }}
            >
                <Row gutter={[32, 24]} align="middle">
                    <Col xs={24} md={8} style={{ textAlign: "center" }}>
                        <Space direction="vertical" size="middle">
                            <Avatar
                                size={120}
                                icon={<UserOutlined />}
                                src={resolvedImageUrl}
                                style={{ border: `4px solid ${token.colorPrimaryBorder}` }}
                            />
                            <div>
                                <Upload
                                    beforeUpload={handleBeforeUpload}
                                    showUploadList={false}
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />}>Cambiar Foto</Button>
                                </Upload>
                            </div>
                            <Paragraph type="secondary" style={{ fontSize: "12px", marginTop: "8px" }}>
                                Formatos permitidos: JPG, PNG, GIF.<br />Tamaño máximo: 2MB
                            </Paragraph>
                        </Space>
                    </Col>

                    <Col xs={24} md={16}>
                        <Title level={2} style={{ margin: 0 }}>Configuración de Perfil</Title>
                        <Text type="secondary">Gestiona tu información personal y de seguridad</Text>
                        <Divider style={{ margin: "16px 0" }} />

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            requiredMark={false}
                        >
                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="name"
                                        label="Nombre"
                                        rules={[{ required: true, message: "El nombre es obligatorio" }]}
                                    >
                                        <Input size="large" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="last_name"
                                        label="Apellido"
                                        rules={[{ required: true, message: "El apellido es obligatorio" }]}
                                    >
                                        <Input size="large" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="email"
                                        label="Correo Electrónico"
                                        rules={[
                                            { required: true, message: "El correo es obligatorio" },
                                            { type: "email", message: "Debe ser un correo válido" },
                                        ]}
                                    >
                                        <Input size="large" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="phone_number"
                                        label="Número de Teléfono"
                                    >
                                        <Input size="large" placeholder="+58 414 1234567" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                name="address"
                                label="Dirección"
                            >
                                <Input.TextArea size="large" rows={3} placeholder="Ingresa tu dirección completa" />
                            </Form.Item>

                            <Divider style={{ margin: "24px 0" }}>Seguridad</Divider>

                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="password"
                                        label="Nueva Contraseña (Opcional)"
                                        rules={[
                                            { min: 8, message: "La contraseña debe tener al menos 8 caracteres" },
                                            { max: 16, message: "La contraseña no debe exceder 16 caracteres" }
                                        ]}
                                        extra={
                                            <span style={{ fontSize: "11px", color: token.colorTextDescription }}>
                                                Mínimo 8 caracteres, al menos una mayúscula, un número y un caracter especial (@$!%*?&#-_.)
                                            </span>
                                        }
                                    >
                                        <Input.Password size="large" placeholder="●●●●●●●●" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="password_confirmation"
                                        label="Confirmar Contraseña"
                                        dependencies={["password"]}
                                        rules={[
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue("password") === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error("Las contraseñas no coinciden!"));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password size="large" placeholder="●●●●●●●●" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Divider style={{ margin: "24px 0" }} />

                            <Form.Item style={{ margin: 0, textAlign: "right" }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    size="large"
                                    loading={loading}
                                >
                                    Guardar Cambios
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};
