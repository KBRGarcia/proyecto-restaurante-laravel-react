import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Row, Col } from "antd";

export const OrderDetailsEdit = () => {
    const { formProps, saveButtonProps, query } = useForm();
    const orderDetail = query?.data?.data;

    const { selectProps: orderSelectProps } = useSelect({
        resource: "orders",
        optionLabel: (item) => `Orden #${item.id}`,
        optionValue: "id",
        defaultValue: orderDetail?.order_id,
    });

    const { selectProps: productSelectProps } = useSelect({
        resource: "products",
        optionLabel: "name",
        optionValue: "id",
        defaultValue: orderDetail?.product_id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Pedido / Orden" name="order_id" rules={[{ required: true, message: "El pedido es obligatorio" }]}>
                            <Select {...orderSelectProps} placeholder="Selecciona un pedido" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Producto" name="product_id" rules={[{ required: true, message: "El producto es obligatorio" }]}>
                            <Select {...productSelectProps} placeholder="Selecciona un producto" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Cantidad" name="quantity" rules={[{ required: true, message: "La cantidad es obligatoria" }]}>
                            <InputNumber min={1} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Precio Unitario ($)" name="unit_price" rules={[{ required: true, message: "El precio es obligatorio" }]}>
                            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item label="Subtotal ($)" name="subtotal" rules={[{ required: true, message: "El subtotal es obligatorio" }]}>
                            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Notas del Item" name="product_notes">
                    <Input.TextArea rows={2} />
                </Form.Item>
            </Form>
        </Edit>
    );
};
