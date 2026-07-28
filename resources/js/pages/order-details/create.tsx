import { Create, useForm, useSelect } from "@refinedev/antd";
import { Card, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { useOne } from "@refinedev/core";
import { OrderItemsField } from "@/components/form/OrderItemsField";
import { syncOrderDetailsTotals } from "./utils";

export const OrderDetailsCreate = () => {
    const { formProps, saveButtonProps } = useForm();
    const selectedOrderId = Form.useWatch("order_id", formProps.form);

    const { selectProps: orderSelectProps } = useSelect({
        resource: "orders",
        optionLabel: (item) => `Orden #${item.id}`,
        optionValue: "id",
    });

    const { query: orderQuery } = useOne({
        resource: "orders",
        id: selectedOrderId,
        queryOptions: {
            enabled: Boolean(selectedOrderId),
        },
    });

    const serviceType = orderQuery?.data?.data?.service_type ?? "pickup";
    const isPickup = serviceType === "pickup";

    const handleValuesChange = (_changedValues: unknown, allValues: Record<string, unknown>) => {
        if (formProps.form) {
            syncOrderDetailsTotals(formProps.form, allValues);
        }

        formProps.onValuesChange?.(_changedValues, allValues);
    };

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                onValuesChange={handleValuesChange}
                initialValues={{ items: [{ quantity: 1 }], taxes: 0, currency: "internacional" }}
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={14}>
                        <Card title="Orden y productos">
                            <Form.Item
                                label="Pedido / Orden"
                                name="order_id"
                                rules={[{ required: true, message: "El pedido es obligatorio" }]}
                            >
                                <Select {...orderSelectProps} placeholder="Selecciona un pedido" />
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
                                    <Form.Item label="Subtotal" name="subtotal">
                                        <InputNumber min={0} step={0.01} style={{ width: "100%" }} readOnly />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item label="Impuestos (%)" name="taxes">
                                        <InputNumber min={0} max={100} step={0.01} style={{ width: "100%" }} />
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
        </Create>
    );
};
