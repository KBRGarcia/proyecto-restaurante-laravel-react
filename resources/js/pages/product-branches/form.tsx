import { Form, InputNumber, Row, Col, Select, Switch } from "antd";
import { useSelect } from "@refinedev/antd";
import type { FormInstance, FormProps } from "antd";

type ProductBranchFormProps = {
    form: FormInstance;
    formProps: FormProps;
    isEdit?: boolean;
};

export const ProductBranchForm = ({ form, formProps, isEdit = false }: ProductBranchFormProps) => {
    const { selectProps: productSelectProps } = useSelect({
        resource: "products",
        optionLabel: "name",
        optionValue: "id",
    });

    const { selectProps: branchSelectProps } = useSelect({
        resource: "branches",
        optionLabel: "name",
        optionValue: "id",
    });

    return (
        <Form {...formProps} form={form} layout="vertical">
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Producto"
                        name="product_id"
                        rules={[{ required: true, message: "El producto es obligatorio" }]}
                    >
                        <Select
                            {...productSelectProps}
                            placeholder="Selecciona un producto"
                            disabled={isEdit}
                            showSearch
                            filterOption={(input, option) =>
                                String(option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Sucursal"
                        name="branch_id"
                        rules={[{ required: true, message: "La sucursal es obligatoria" }]}
                    >
                        <Select
                            {...branchSelectProps}
                            placeholder="Selecciona una sucursal"
                            disabled={isEdit}
                            showSearch
                            filterOption={(input, option) =>
                                String(option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Precio especial"
                        name="special_price"
                        tooltip="Dejar vacío para usar el precio base del producto"
                    >
                        <InputNumber min={0} step={0.01} style={{ width: "100%" }} placeholder="Opcional" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Disponible en esta sucursal"
                        name="available"
                        valuePropName="checked"
                        initialValue={true}
                    >
                        <Switch checkedChildren="Sí" unCheckedChildren="No" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
