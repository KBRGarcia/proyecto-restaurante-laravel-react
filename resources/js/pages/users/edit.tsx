import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Upload, Button, Avatar, Row, Col, theme } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

const { useToken } = theme;

export const UserEdit = () => {
    const { formProps, saveButtonProps, query } = useForm();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { token } = useToken();

    const user = query?.data?.data;
    const resolvedImageUrl = imageUrl ?? user?.profile_picture ?? null;

    const getBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handleBeforeUpload = async (file: File) => {
        try {
            const base64Url = await getBase64(file);
            setImageUrl(base64Url);
            formProps.form?.setFieldsValue({ profile_picture: base64Url });
        } catch (err) {
            console.error(err);
        }
        return false;
    };

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} md={6} style={{ textAlign: "center", marginBottom: "20px" }}>
                        <Form.Item name="profile_picture" label="Foto de Perfil">
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                                <Avatar size={100} src={resolvedImageUrl} icon={<UserOutlined />} />
                                <Upload beforeUpload={handleBeforeUpload} showUploadList={false} maxCount={1}>
                                    <Button icon={<UploadOutlined />} size="small">Cambiar Foto</Button>
                                </Upload>
                            </div>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={18}>
                        <Row gutter={16}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Nombre"
                                    name={["name"]}
                                    rules={[{ required: true, message: "El nombre es obligatorio" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Apellido"
                                    name={["last_name"]}
                                    rules={[{ required: true, message: "El apellido es obligatorio" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Email"
                                    name={["email"]}
                                    rules={[{ required: true, type: "email", message: "Introduce un email válido" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Número de Teléfono"
                                    name={["phone_number"]}
                                >
                                    <Input placeholder="+58 414 1234567" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Contraseña (Opcional)"
                            name={["password"]}
                            help="Déjalo en blanco si no deseas cambiar la contraseña."
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Dirección"
                            name={["address"]}
                        >
                            <Input.TextArea rows={1} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Rol"
                            name={["role"]}
                            rules={[{ required: true }]}
                        >
                            <Select
                                options={[
                                    { value: "admin", label: "Administrador" },
                                    { value: "employee", label: "Empleado" },
                                    { value: "client", label: "Cliente" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Estado"
                            name={["status"]}
                            rules={[{ required: true }]}
                        >
                            <Select
                                options={[
                                    { value: "active", label: "Activo" },
                                    { value: "inactive", label: "Inactivo" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Edit>
    );
};
