import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Upload, Button, Avatar, Row, Col, Card } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { StatusFormSwitch } from "@/components/form/StatusFormSwitch";
import { PhoneNumberField } from "@/components/form/PhoneNumberField";

const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#\-_.])[A-Za-z\d@$!%*?&#\-_.]+$/;

export const UserEdit = () => {
    const { formProps, saveButtonProps, query } = useForm();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

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
                <Row gutter={[16, 16]} align="stretch">
                    <Col xs={24} lg={18}>
                        <Card title="Datos del usuario" style={{ height: "100%" }}>
                            <Row gutter={16}>
                                <Col xs={24} md={6} style={{ textAlign: "center", marginBottom: "20px" }}>
                                    <Form.Item name="profile_picture" label="Foto de Perfil">
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                gap: "12px",
                                            }}
                                        >
                                            <Avatar size={100} src={imageUrl} icon={<UserOutlined />} />
                                            <Upload beforeUpload={handleBeforeUpload} showUploadList={false} maxCount={1}>
                                                <Button icon={<UploadOutlined />} size="small">
                                                    Subir Foto
                                                </Button>
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
                                                rules={[
                                                    {
                                                        required: true,
                                                        type: "email",
                                                        message: "Introduce un email válido",
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <PhoneNumberField name={["phone_number"]} label="Número de Teléfono" />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        label="Contraseña"
                                        name={["password"]}
                                        rules={[
                                            { required: true, message: "La contraseña es obligatoria" },
                                            { min: 8, message: "Mínimo 8 caracteres" },
                                            { max: 16, message: "Máximo 16 caracteres" },
                                            {
                                                pattern: passwordPattern,
                                                message:
                                                    "Debe incluir mayúscula, número y carácter especial (@$!%*?&#-_.)",
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        label="Confirmar contraseña"
                                        name={["password_confirmation"]}
                                        dependencies={["password"]}
                                        rules={[
                                            { required: true, message: "Confirma la contraseña" },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue("password") === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(
                                                        new Error("La confirmación de la contraseña no coincide"),
                                                    );
                                                },
                                            }),
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24}>
                                    <Form.Item label="Dirección" name={["address"]}>
                                        <Input.TextArea rows={2} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col xs={24} lg={6}>
                        <Card title="Rol y Estado" style={{ height: "35 %" }}>
                            <Row gutter={18}>
                                <Col xs={24} sm={18}>
                                    <Form.Item
                                        label="Rol"
                                        name={["role"]}
                                        rules={[{ required: true }]}
                                        initialValue="client"
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
                                <Col xs={24} sm={6}>
                                    <StatusFormSwitch name={["status"]} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Edit>
    );
};
