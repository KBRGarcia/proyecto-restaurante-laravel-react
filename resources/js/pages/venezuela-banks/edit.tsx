import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Checkbox, Row, Col } from "antd";
import { useEffect } from "react";

export const VenezuelaBanksEdit = () => {
    const { formProps, saveButtonProps, query } = useForm();
    const bank = query?.data?.data;

    useEffect(() => {
        if (bank) {
            let systemDataStr = "{}";
            if (bank.system_data) {
                systemDataStr = typeof bank.system_data === "string" 
                    ? bank.system_data 
                    : JSON.stringify(bank.system_data, null, 2);
            }
            formProps.form?.setFieldsValue({
                code: bank.code,
                name: bank.name,
                active: bank.active,
                system_data: systemDataStr
            });
        }
    }, [bank, formProps.form]);

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Nombre del Banco" name="name" rules={[{ required: true, message: "El nombre es obligatorio" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Código de Banco" name="code" rules={[{ required: true, message: "El código es obligatorio" }]}>
                            <Input maxLength={10} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12} style={{ display: "flex", alignItems: "center", paddingTop: "24px" }}>
                        <Form.Item name="active" valuePropName="checked">
                            <Checkbox>Banco Activo</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item 
                    label="Datos del Sistema (JSON)" 
                    name="system_data" 
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
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Edit>
    );
};
