import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Row, Col, Card } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import { useState } from "react";
import { StatusFormSwitch } from "@/components/form/StatusFormSwitch";
import { ImageUploadField } from "@/components/form/ImageUploadField";

export const CategoriesCreate = () => {
    const { formProps, saveButtonProps } = useForm();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={[16, 16]} align="stretch">
                    <Col xs={24} lg={18}>
                        <Card title="Datos de la Categoría" style={{ height: "100%" }}>
                            <Row gutter={16}>
                                <ImageUploadField
                                    form={formProps.form}
                                    label="Imagen de Categoría"
                                    previewUrl={imageUrl}
                                    onPreviewChange={setImageUrl}
                                    icon={<PictureOutlined />}
                                    colSpan={6}
                                />
                                <Col xs={24} md={18}>
                                    <Row gutter={16}>
                                        <Col xs={24} sm={16}>
                                            <Form.Item
                                                label="Nombre de Categoría"
                                                name={["name"]}
                                                rules={[{ required: true, message: "El nombre es obligatorio" }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row gutter={16}>
                                        <Col xs={24}>
                                            <Form.Item
                                                label="Descripción"
                                                name={["description"]}
                                            >
                                                <Input.TextArea rows={3} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={24} lg={6}>
                        <Card title="Estado" style={{ height: "55%" }}>
                            <Row gutter={16}>
                                <Col xs={24} sm={18}>
                                    <Form.Item
                                        label="Orden de Visualización"
                                        name={["order_show"]}
                                        rules={[{ required: true, message: "El orden es obligatorio" }]}
                                        initialValue={0}
                                    >
                                        <InputNumber min={0} style={{ width: "100%" }} />
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
        </Create>
    );
};
