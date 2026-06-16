import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Card, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { OrderItemsField } from "@/components/form/OrderItemsField";
import { useOrderDetailsTotalCalculation } from "./utils";

export const OrderDetailsEdit = () => {
    const { formProps, saveButtonProps, query } = useForm();
    const orderDetails = query?.data?.data;
    const serviceType = Form.useWatch("service_type", formProps.form) ?? orderDetails?.service_type ?? "pickup";

    useOrderDetailsTotalCalculation(formProps.form);

    const { selectProps: orderSelectProps } = useSelect({
        resource: "orders",
        optionLabel: (item) => `Orden #${item.id}`,
        optionValue: "id",
        defaultValue: orderDetails?.order_id,
    });

    const isPickup = serviceType === "pickup";

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item name="service_type" hidden>
                    <Input />
                </Form.Item>

                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={14}>
                        <Card title="Orden y productos">
                            <Form.Item
                                label="Pedido / Orden"
                                name="order_id"
                                rules={[{ required: true, message: "El pedido es obligatorio" }]}
                            >
                                <Select {...orderSelectProps} placeholder="Selecciona un pedido" disabled />
                            </Form.Item>

                            <OrderItemsField form={formProps.form} />
                        </Card>
                    </Col>

                    <Col xs={24} lg={10}>
                        <Card title="Facturación y entrega">
                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item label="Moneda" name="currency" rules={[{ required: true }]}>
                                        <Select
                                            options={[
                                                { value: "internacional", label: "Dólares ($)" },
                                                { value: "nacional", label: "Bolívares (Bs.)" },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item label="Impuestos (%)" name="taxes">
                                        <InputNumber min={0} max={100} step={0.01} style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item label="Subtotal" name="subtotal">
                                        <InputNumber min={0} step={0.01} style={{ width: "100%" }} readOnly />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item label="Total" name="total">
                                        <InputNumber min={0} step={0.01} style={{ width: "100%" }} readOnly />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                label="Dirección de Entrega"
                                name="delivery_address"
                                rules={
                                    isPickup
                                        ? []
                                        : [{ required: true, message: "La dirección de entrega es obligatoria para delivery" }]
                                }
                            >
                                <Input placeholder="Requerido si es Delivery" disabled={isPickup} />
                            </Form.Item>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Edit>
    );
};
