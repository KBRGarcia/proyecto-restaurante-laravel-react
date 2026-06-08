import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Checkbox, Row, Col, InputNumber } from "antd";
import { BranchLocationPicker } from "@/components/map/BranchLocationPicker";

export const BranchesEdit = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Nombre de Sucursal" name="name" rules={[{ required: true, message: "El nombre es obligatorio" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Gerente" name="manager">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Teléfono de Contacto" name="phone" rules={[{ required: true, message: "El teléfono es obligatorio" }]}>
                            <Input placeholder="+58 212 1234567" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Correo Electrónico" name="email" rules={[{ type: "email", message: "Introduce un correo válido" }]}>
                            <Input placeholder="sucursal@restaurante.com" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Hora de Apertura" name="opening_time" rules={[{ required: true, message: "La hora de apertura es obligatoria" }]}>
                            <Input type="time" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Hora de Cierre" name="closing_time" rules={[{ required: true, message: "La hora de cierre es obligatoria" }]}>
                            <Input type="time" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Capacidad (Personas)" name="capacity_people">
                            <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Días de Operación" name="operation_days">
                            <Input placeholder="Lunes a Domingo" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Dirección" name="address" rules={[{ required: true, message: "La dirección es obligatoria" }]}>
                            <Input placeholder="Avenida Principal..." />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Ciudad" name="city" rules={[{ required: true, message: "La ciudad es obligatoria" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Estado/Provincia" name="state" rules={[{ required: true, message: "El estado es obligatorio" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Código Postal" name="postal_code">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <BranchLocationPicker />

                <Row gutter={16} style={{ marginTop: "12px" }}>
                    <Col xs={12} sm={6}>
                        <Form.Item name="is_main" valuePropName="checked">
                            <Checkbox>¿Es principal?</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Form.Item name="has_delivery" valuePropName="checked">
                            <Checkbox>Tiene Delivery</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Form.Item name="has_parking" valuePropName="checked">
                            <Checkbox>Tiene Estacionamiento</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Form.Item name="active" valuePropName="checked">
                            <Checkbox>Activa</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Edit>
    );
};
