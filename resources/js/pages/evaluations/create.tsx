import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Select, Rate, Input, Row, Col } from "antd";

export const EvaluationsCreate = () => {
    const { formProps, saveButtonProps } = useForm();

    const { selectProps: userSelectProps } = useSelect({
        resource: "users",
        optionLabel: "name",
        optionValue: "id",
    });

    const { selectProps: productSelectProps } = useSelect({
        resource: "products",
        optionLabel: "name",
        optionValue: "id",
    });

    const { selectProps: orderSelectProps } = useSelect({
        resource: "orders",
        optionLabel: (item) => `Orden #${item.id}`,
        optionValue: "id",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Cliente" name="user_id" rules={[{ required: true, message: "El cliente es obligatorio" }]}>
                            <Select {...userSelectProps} placeholder="Selecciona el cliente" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Calificación" name="rating" rules={[{ required: true, message: "La calificación es obligatoria" }]} initialValue={5}>
                            <Rate style={{ fontSize: "24px" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Producto Calificado (Opcional)" name="product_id">
                            <Select {...productSelectProps} placeholder="Calificar un producto" allowClear />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Pedido Relacionado (Opcional)" name="order_id">
                            <Select {...orderSelectProps} placeholder="Vincular a un pedido" allowClear />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Comentario" name="comment">
                    <Input.TextArea placeholder="Escribe aquí tu opinión..." rows={3} />
                </Form.Item>
            </Form>
        </Create>
    );
};
