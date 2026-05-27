import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Select, Input, Row, Col } from "antd";

export const PhysicalPaymentOrdersCreate = () => {
    const { formProps, saveButtonProps } = useForm();

    const { selectProps: orderSelectProps } = useSelect({
        resource: "orders",
        optionLabel: (item: any) => `Orden #${item.id} - Total: $${item.total}`,
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Pedido / Orden" name="order_id" rules={[{ required: true, message: "El pedido es obligatorio" }]}>
                            <Select {...orderSelectProps} placeholder="Selecciona un pedido" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Estado de Pago" name="status" rules={[{ required: true }]} initialValue="pending">
                            <Select
                                options={[
                                    { value: "pending", label: "Pendiente" },
                                    { value: "confirmed", label: "Confirmado" },
                                    { value: "canceled", label: "Cancelado" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Fecha Límite para el Pago" name="limit_date" rules={[{ required: true, message: "La fecha límite es obligatoria" }]}>
                    <Input type="datetime-local" />
                </Form.Item>
            </Form>
        </Create>
    );
};
