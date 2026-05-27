import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Checkbox, Row, Col } from "antd";
import { useEffect } from "react";

export const PaymentMethodsEdit = () => {
    const { formProps, saveButtonProps, query } = useForm();
    const paymentMethod = query?.data?.data;

    useEffect(() => {
        if (paymentMethod) {
            let configStr = "{}";
            if (paymentMethod.configuration) {
                configStr = typeof paymentMethod.configuration === "string" 
                    ? paymentMethod.configuration 
                    : JSON.stringify(paymentMethod.configuration, null, 2);
            }
            formProps.form?.setFieldsValue({
                code: paymentMethod.code,
                name: paymentMethod.name,
                currency_type: paymentMethod.currency_type,
                active: paymentMethod.active,
                configuration: configStr
            });
        }
    }, [paymentMethod, formProps.form]);

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Nombre del Método de Pago" name="name" rules={[{ required: true, message: "El nombre es obligatorio" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Código de Identificación" name="code" rules={[{ required: true, message: "El código es obligatorio" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Tipo de Moneda" name="currency_type" rules={[{ required: true }]}>
                            <Select
                                options={[
                                    { value: "nacional", label: "Nacional (Bolívares)" },
                                    { value: "internacional", label: "Internacional (Dólares)" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} style={{ display: "flex", alignItems: "center", paddingTop: "24px" }}>
                        <Form.Item name="active" valuePropName="checked">
                            <Checkbox>Método de Pago Activo</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item 
                    label="Configuración (JSON)" 
                    name="configuration" 
                    help="Ingresa la configuración requerida en formato JSON válido"
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
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Edit>
    );
};
