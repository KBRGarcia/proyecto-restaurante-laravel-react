import { useState } from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { UploadOutlined, CoffeeOutlined } from "@ant-design/icons";
import { Form, Input, Select, InputNumber, Checkbox, Row, Col, Upload, Button, Avatar } from "antd";
import { createImageUploadHandler } from "@/lib/image-upload";

export const ProductsCreate = () => {
    const { formProps, saveButtonProps } = useForm();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",
    });

    const handleBeforeUpload = createImageUploadHandler({
        form: formProps.form,
        fieldName: "image",
        onPreviewChange: setImageUrl,
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} md={6} style={{ textAlign: "center", marginBottom: "20px" }}>
                        <Form.Item name="image" label="Imagen del Plato">
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "12px",
                                }}
                            >
                                <Avatar size={100} shape="square" src={imageUrl} icon={<CoffeeOutlined />} />
                                <Upload
                                    accept="image/jpeg,image/png,image/gif,image/webp"
                                    beforeUpload={handleBeforeUpload}
                                    showUploadList={false}
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />} size="small">
                                        Subir Imagen
                                    </Button>
                                </Upload>
                            </div>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={18}>
                        <Row gutter={16}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Nombre del Producto"
                                    name={["name"]}
                                    rules={[{ required: true, message: "El nombre es obligatorio" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Precio ($)"
                                    name={["price"]}
                                    rules={[{ required: true, message: "El precio es obligatorio" }]}
                                >
                                    <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Categoría"
                                    name={["category_id"]}
                                    rules={[{ required: true, message: "La categoría es obligatoria" }]}
                                >
                                    <Select {...categorySelectProps} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label="Tiempo de Preparación (Minutos)"
                                    name={["preparation_time"]}
                                    rules={[{ required: true, message: "El tiempo es obligatorio" }]}
                                    initialValue={15}
                                >
                                    <InputNumber min={1} style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Ingredientes" name={["ingredients"]}>
                            <Input.TextArea placeholder="Ingrediente 1, ingrediente 2..." rows={3} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Descripción" name={["description"]}>
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Estado"
                            name={["status"]}
                            rules={[{ required: true }]}
                            initialValue="active"
                        >
                            <Select
                                options={[
                                    { value: "active", label: "Activo" },
                                    { value: "inactive", label: "Inactivo" },
                                    { value: "out of stock", label: "Agotado" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} style={{ display: "flex", alignItems: "center", paddingTop: "24px" }}>
                        <Form.Item name="is_special" valuePropName="checked" initialValue={false}>
                            <Checkbox>¿Es un plato especial?</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Create>
    );
};
