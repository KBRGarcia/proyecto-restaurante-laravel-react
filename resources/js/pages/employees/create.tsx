import { Create, useForm, useSelect } from "@refinedev/antd";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const positionOptions = [
    { value: "general_manager", label: "Gerente General" },
    { value: "branch_manager", label: "Gerente de Sucursal" },
    { value: "chef", label: "Chef" },
    { value: "sous_chef", label: "Sous Chef" },
    { value: "cook", label: "Cocinero" },
    { value: "kitchen_assistant", label: "Ayudante de Cocina" },
    { value: "waiter", label: "Mesero" },
    { value: "cashier", label: "Cajero" },
    { value: "delivery_driver", label: "Repartidor" },
    { value: "host", label: "Anfitrion" },
    { value: "cleaner", label: "Personal de Limpieza" },
    { value: "inventory_manager", label: "Encargado de Inventario" },
];

export const EmployeesCreate = () => {
    const { formProps, saveButtonProps } = useForm();
    const { selectProps: userSelectProps } = useSelect({
        resource: "users",
        optionLabel: "email",
        optionValue: "id",
    });
    const { selectProps: branchSelectProps } = useSelect({
        resource: "branches",
        optionLabel: "name",
        optionValue: "id",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
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
                        <Form.Item label="Estado" name="status" initialValue="active" rules={[{ required: true }]}>
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
                        <Form.Item label="Email laboral" name="email" rules={[{ type: "email", message: "Introduce un email valido" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Telefono" name="phone">
                            <Input placeholder="+58 414 1234567" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Fecha de contratacion" name="hire_date" rules={[{ required: true, message: "La fecha de contratacion es obligatoria" }]}>
                            <Input type="date" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Fecha de nacimiento" name="birth_date">
                            <Input type="date" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={16}>
                        <Form.Item label="Direccion" name="address">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Notas internas" name="notes">
                    <Input.TextArea rows={2} />
                </Form.Item>

                <Form.List name="assignments">
                    {(fields, { add, remove }) => (
                        <>
                            <Space direction="vertical" style={{ width: "100%" }}>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row gutter={16} key={key} align="middle">
                                        <Col xs={24} sm={8}>
                                            <Form.Item {...restField} label="Sucursal" name={[name, "branch_id"]} rules={[{ required: true }]}>
                                                <Select {...branchSelectProps} placeholder="Seleccione una sucursal" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={7}>
                                            <Form.Item {...restField} label="Cargo" name={[name, "position"]} rules={[{ required: true }]}>
                                                <Select options={positionOptions} placeholder="Seleccione un cargo" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={7}>
                                            <Form.Item {...restField} label="Inicio" name={[name, "start_date"]}>
                                                <Input type="date" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={2}>
                                            <Button danger icon={<MinusCircleOutlined />} onClick={() => remove(name)} />
                                        </Col>
                                    </Row>
                                ))}
                            </Space>
                            <Form.Item>
                                <Button type="dashed" onClick={() => add({ active: true })} block icon={<PlusOutlined />}>
                                    Agregar sucursal y cargo
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Create>
    );
};
