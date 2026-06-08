import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Checkbox, Row, Col, InputNumber, Card } from "antd";
import { BranchLocationPicker } from "@/components/map/BranchLocationPicker";

export const BranchesCreate = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={[16, 16]} align="stretch">
                    <Col xs={24} lg={20}>
                        <Card title="Datos Principales" style={{ height: "30%" }}>
                            <Row gutter={16}>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Nombre de Sucursal" name="name" rules={[{ required: true, message: "El nombre es obligatorio" }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Gerente" name="manager">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Correo Electrónico" name="email" rules={[{ type: "email", message: "Introduce un correo válido" }]}>
                                        <Input placeholder="sucursal@restaurante.com" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Teléfono de Contacto" name="phone" rules={[{ required: true, message: "El teléfono es obligatorio" }]}>
                                        <Input placeholder="+58 212 1234567" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Capacidad (Personas)" name="capacity_people">
                                        <InputNumber min={0} style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Días de Operación" name="operation_days" initialValue="Monday to Sunday">
                                        <Input placeholder="Lunes a Domingo" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Hora de Apertura" name="opening_time" rules={[{ required: true, message: "La hora de apertura es obligatoria" }]} initialValue="09:00">
                                        <Input type="time" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Hora de Cierre" name="closing_time" rules={[{ required: true, message: "La hora de cierre es obligatoria" }]} initialValue="22:00">
                                        <Input type="time" />
                                    </Form.Item>
                                </Col>
                            </Row>                            
                        </Card>

                        <Card title="Datos de Ubicación" style={{ height: "70%", marginTop: "16px" }}>
                        <Row gutter={16}>
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
                        </Card>
                    </Col>

                    <Col xs={24} lg={4}>
                        <Card title="Datos Adicionales" style={{ height: "35%" }}>
                            <Row gutter={16} style={{ marginTop: "12px" }}>
                                <Col xs={12} sm={6}>
                                    <Form.Item name="is_main" valuePropName="checked" initialValue={false}>
                                        <Checkbox>¿Es principal?</Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: "12px" }}>
                                <Col xs={12} sm={6}>
                                    <Form.Item name="has_delivery" valuePropName="checked" initialValue={true}>
                                        <Checkbox>Tiene Delivery</Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: "12px" }}>
                                <Col xs={12} sm={6}>
                                    <Form.Item name="has_parking" valuePropName="checked" initialValue={false}>
                                        <Checkbox>Tiene Estacionamiento</Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: "12px" }}>
                                <Col xs={12} sm={6}>
                                    <Form.Item name="active" valuePropName="checked" initialValue={true}>
                                        <Checkbox>Activa</Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Create>
    );
};
