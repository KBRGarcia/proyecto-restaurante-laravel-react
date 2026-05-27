import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, Checkbox, Row, Col } from "antd";

export const PaymentMethodsCreate = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Nombre del Método de Pago" name="name" rules={[{ required: true, message: "El nombre es obligatorio" }]}>
                            <Input placeholder="Pago Móvil, Transferencia..." />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Código de Identificación" name="code" rules={[{ required: true, message: "El código es obligatorio" }]}>
                            <Input placeholder="pago_movil, bank_transfer..." />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Tipo de Moneda" name="currency_type" rules={[{ required: true }]} initialValue="internacional">
                            <Select
                                options={[
                                    { value: "nacional", label: "Nacional (Bolívares)" },
                                    { value: "internacional", label: "Internacional (Dólares)" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} style={{ display: "flex", alignItems: "center", paddingTop: "24px" }}>
                        <Form.Item name="active" valuePropName="checked" initialValue={true}>
                            <Checkbox>Método de Pago Activo</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item 
                    label="Configuración (JSON)" 
                    name="configuration" 
                    initialValue="{}"
                    help="Ingresa la configuración requerida en formato JSON válido (ej: banco, teléfono, cédula, etc.)"
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
                    <Input.TextArea rows={4} placeholder='{\n  "banco": "0102",\n  "telefono": "+58414...",\n  "rif": "V-12345678"\n}' />
                </Form.Item>
            </Form>
        </Create>
    );
};
