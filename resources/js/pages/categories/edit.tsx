import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Row, Col } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ImageUploadField } from "@/components/form/ImageUploadField";

export const CategoriesEdit = () => {
    const { formProps, saveButtonProps, query } = useForm();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const category = query?.data?.data;
    const resolvedImageUrl = imageUrl ?? category?.image ?? null;

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={16}>
                    <ImageUploadField
                        form={formProps.form}
                        label="Imagen de Categoría"
                        previewUrl={resolvedImageUrl}
                        onPreviewChange={setImageUrl}
                        uploadLabel="Cambiar Imagen"
                        icon={<PictureOutlined />}
                    />
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
