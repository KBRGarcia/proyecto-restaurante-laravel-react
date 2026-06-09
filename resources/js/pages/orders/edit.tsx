import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Row, Col } from "antd";
import { PhoneNumberField } from "@/components/form/PhoneNumberField";

export const OrdersEdit = () => {
    const { formProps, saveButtonProps, query } = useForm();
    const order = query?.data?.data;

    const { selectProps: clientSelectProps } = useSelect({
        resource: "clients",
        optionLabel: (item) => {
            const client = item as { full_name?: string; identity_document?: string };
            const name = client.full_name ?? "Cliente";
            const document = client.identity_document ? ` (${client.identity_document})` : "";
            return `${name}${document}`;
        },
        optionValue: "id",
        defaultValue: order?.client_id,
    });

    const { selectProps: employeeSelectProps } = useSelect({
        resource: "users",
        optionLabel: "name",
        optionValue: "id",
        defaultValue: order?.assigned_employee_id,
        filters: [
            {
                field: "role",
                operator: "eq",
                value: "employee",
            },
        ],
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Cliente"
                            name="client_id"
                            rules={[{ required: true, message: "El cliente es obligatorio" }]}
                        >
                            <Select {...clientSelectProps} placeholder="Selecciona un cliente del restaurante" showSearch />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Repartidor Asignado" name="assigned_employee_id">
                            <Select {...employeeSelectProps} placeholder="Selecciona un empleado" allowClear />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Moneda" name="currency" rules={[{ required: true }]}>
                            <Select
                                options={[
                                    { value: "internacional", label: "Dólares ($)" },
                                    { value: "nacional", label: "Bolívares (Bs.)" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Tipo de Servicio" name="service_type" rules={[{ required: true }]}>
                            <Select
                                options={[
                                    { value: "pickup", label: "Retiro en Local" },
                                    { value: "delivery", label: "Delivery" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Estado de Orden" name="status" rules={[{ required: true }]}>
                            <Select
                                options={[
                                    { value: "pending", label: "Pendiente" },
                                    { value: "preparing", label: "En Cocina" },
                                    { value: "ready", label: "Listo" },
                                    { value: "delivered", label: "Entregado" },
                                    { value: "canceled", label: "Cancelado" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Subtotal" name="subtotal" rules={[{ required: true, message: "El subtotal es obligatorio" }]}>
                            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Impuestos" name="taxes">
                            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Total" name="total" rules={[{ required: true, message: "El total es obligatorio" }]}>
                            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <PhoneNumberField name="contact_phone" label="Teléfono de Contacto" />
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Dirección de Entrega" name="delivery_address">
                            <Input placeholder="Requerido si es Delivery" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Notas Especiales" name="special_notes">
                    <Input.TextArea rows={2} />
                </Form.Item>
            </Form>
        </Edit>
    );
};
