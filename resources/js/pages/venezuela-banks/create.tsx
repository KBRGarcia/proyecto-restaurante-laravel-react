import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Checkbox, Row, Col } from "antd";

export const VenezuelaBanksCreate = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Nombre del Banco" name="name" rules={[{ required: true, message: "El nombre es obligatorio" }]}>
                            <Input placeholder="Banco de Venezuela, Banesco..." />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Código de Banco" name="code" rules={[{ required: true, message: "El código es obligatorio" }]}>
                            <Input placeholder="0102, 0134..." maxLength={10} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12} style={{ display: "flex", alignItems: "center", paddingTop: "24px" }}>
                        <Form.Item name="active" valuePropName="checked" initialValue={true}>
                            <Checkbox>Banco Activo</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item 
                    label="Datos del Sistema (JSON)" 
                    name="system_data" 
                    initialValue="{}"
                    help="Ingresa datos adicionales requeridos por el sistema en formato JSON válido"
                    rules={[
                        {
                            validator(_, value) {
                                if (!value) return Promise.resolve();
                                try {
                                    JSON.parse(value);
                                    return Promise.resolve();
                                } catch (e) {
                                    return Promise.reject(new Error("Debe ser un JSON válido."));
                                }
                            }
                        }
                    ]}
                >
                    <Input.TextArea rows={4} placeholder='{\n  "rif": "G-20009997-6",\n  "telefono": "+58412..."\n}' />
                </Form.Item>
            </Form>
        </Create>
    );
};
