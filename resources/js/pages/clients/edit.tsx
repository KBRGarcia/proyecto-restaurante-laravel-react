import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Col, Form, Input, InputNumber, Row, Select } from "antd";

export const ClientsEdit = () => {
    const { formProps, saveButtonProps } = useForm();
    const { selectProps: userSelectProps } = useSelect({
        resource: "users",
        optionLabel: "email",
        optionValue: "id",
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Nombre" name="first_name" rules={[{ required: true, message: "El nombre es obligatorio" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Apellido" name="last_name" rules={[{ required: true, message: "El apellido es obligatorio" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Usuario asociado" name="user_id">
                            <Select {...userSelectProps} allowClear placeholder="Opcional" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Documento" name="identity_document">
                            <Input placeholder="V-12345678" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Estado" name="status" rules={[{ required: true }]}>
                            <Select
                                options={[
                                    { value: "active", label: "Activo" },
                                    { value: "inactive", label: "Inactivo" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Email" name="email" rules={[{ type: "email", message: "Introduce un email valido" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Telefono" name="phone">
                            <Input placeholder="+58 414 1234567" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Origen" name="origin" rules={[{ required: true }]}>
                            <Select
                                options={[
                                    { value: "online", label: "Online" },
                                    { value: "physical", label: "Fisico" },
                                    { value: "mixed", label: "Fisico y Online" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Fecha de nacimiento" name="birth_date">
                            <Input type="date" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Primera compra" name="first_purchase_at">
                            <Input type="datetime-local" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Ultima compra" name="last_purchase_at">
                            <Input type="datetime-local" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Total de ordenes" name="total_orders">
                            <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Total comprado" name="total_spent">
                            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Direccion" name="address">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Notas internas" name="notes">
                    <Input.TextArea rows={3} />
                </Form.Item>
            </Form>
        </Edit>
    );
};
