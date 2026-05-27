import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Upload, Button, Avatar, Row, Col } from "antd";
import { UploadOutlined, PictureOutlined } from "@ant-design/icons";
import { useState } from "react";

export const CategoriesEdit = () => {
    const { formProps, saveButtonProps, query } = useForm();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const category = query?.data?.data;
    const resolvedImageUrl = imageUrl ?? category?.image ?? null;

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
            formProps.form?.setFieldsValue({ image: base64Url });
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
                        <Form.Item name="image" label="Imagen de Categoría">
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                                <Avatar size={100} shape="square" src={resolvedImageUrl} icon={<PictureOutlined />} />
                                <Upload beforeUpload={handleBeforeUpload} showUploadList={false} maxCount={1}>
                                    <Button icon={<UploadOutlined />} size="small">Cambiar Imagen</Button>
                                </Upload>
                            </div>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={18}>
                        <Row gutter={16}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Nombre de Categoría"
                                    name={["name"]}
                                    rules={[{ required: true, message: "El nombre es obligatorio" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Orden de Visualización"
                                    name={["order_show"]}
                                    rules={[{ required: true, message: "El orden es obligatorio" }]}
                                >
                                    <InputNumber min={0} style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
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
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Descripción"
                                    name={["description"]}
                                >
                                    <Input.TextArea rows={2} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </Edit>
    );
};
