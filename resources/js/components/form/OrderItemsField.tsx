import { useSelect } from "@refinedev/antd";
import { Button, Col, Form, Input, InputNumber, Row, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd";
import { useCallback, useEffect, useMemo } from "react";
import { calculateItemSubtotal } from "@/pages/order-details/utils";

type ProductOption = {
    id: number;
    name: string;
    price?: number | string;
};

type OrderItemsFieldProps = {
    form?: FormInstance;
};

export const OrderItemsField = ({ form }: OrderItemsFieldProps) => {
    const { selectProps: productSelectProps, query: productsQuery } = useSelect<ProductOption>({
        resource: "products",
        optionLabel: "name",
        optionValue: "id",
        filters: [{ field: "status", operator: "eq", value: "active" }],
        pagination: {
            mode: "off",
        },
    });

    const productsById = useMemo(() => {
        const map = new Map<number, ProductOption>();
        const products = productsQuery.data?.data ?? [];

        products.forEach((product) => {
            map.set(product.id, product);
        });

        return map;
    }, [productsQuery.data?.data]);

    const updateItemSubtotal = useCallback(
        (fieldIndex: number) => {
            const items = form?.getFieldValue("items") ?? [];
            const item = items[fieldIndex];

            if (!item) {
                return;
            }

            const subtotal = calculateItemSubtotal(Number(item.quantity ?? 0), Number(item.unit_price ?? 0));
            form?.setFieldValue(["items", fieldIndex, "subtotal"], subtotal);
        },
        [form],
    );

    const applyProductPrice = useCallback(
        (fieldIndex: number, productId: number) => {
            const product = productsById.get(productId);
            const unitPrice = Number(product?.price ?? 0);

            form?.setFieldValue(["items", fieldIndex, "unit_price"], unitPrice);
            updateItemSubtotal(fieldIndex);
        },
        [form, productsById, updateItemSubtotal],
    );

    const handleProductChange = (fieldIndex: number, productId: number) => {
        applyProductPrice(fieldIndex, productId);
    };

    const handleQuantityChange = (fieldIndex: number) => {
        updateItemSubtotal(fieldIndex);
    };

    useEffect(() => {
        if (!form || productsById.size === 0) {
            return;
        }

        const items = form.getFieldValue("items") ?? [];

        items.forEach((item: { product_id?: number }, index: number) => {
            if (!item?.product_id) {
                return;
            }

            const product = productsById.get(item.product_id);

            if (product?.price === undefined || product?.price === null) {
                return;
            }

            const unitPrice = Number(product.price);
            const currentUnitPrice = Number(form.getFieldValue(["items", index, "unit_price"]) ?? 0);

            if (currentUnitPrice !== unitPrice) {
                form.setFieldValue(["items", index, "unit_price"], unitPrice);
                updateItemSubtotal(index);
            }
        });
    }, [form, productsById, updateItemSubtotal]);

    return (
        <Form.List
            name="items"
            rules={[
                {
                    validator: async (_, items) => {
                        if (!items || items.length < 1) {
                            return Promise.reject(new Error("Debe agregar al menos un producto"));
                        }
                    },
                },
            ]}
        >
            {(fields, { add, remove }, { errors }) => (
                <>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        {fields.map(({ key, name, ...restField }) => (
                            <Row gutter={16} key={key} align="middle">
                                <Col xs={24} sm={6}>
                                    <Form.Item
                                        {...restField}
                                        label="Producto"
                                        name={[name, "product_id"]}
                                        rules={[{ required: true, message: "Seleccione un producto" }]}
                                    >
                                        <Select<number>
                                            options={productSelectProps.options}
                                            loading={productSelectProps.loading || productsQuery.isLoading}
                                            showSearch={productSelectProps.showSearch}
                                            onSearch={productSelectProps.onSearch}
                                            filterOption={productSelectProps.filterOption}
                                            placeholder="Seleccione un producto"
                                            onChange={(value: number) => handleProductChange(name, value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={3}>
                                    <Form.Item
                                        {...restField}
                                        label="Cantidad"
                                        name={[name, "quantity"]}
                                        initialValue={1}
                                        rules={[{ required: true, message: "Ingrese la cantidad" }]}
                                    >
                                        <InputNumber
                                            min={1}
                                            style={{ width: "100%" }}
                                            onChange={() => handleQuantityChange(name)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={5}>
                                    <Form.Item
                                        {...restField}
                                        label="Precio Unitario ($)"
                                        name={[name, "unit_price"]}
                                        rules={[{ required: true, message: "Seleccione un producto" }]}
                                    >
                                        <InputNumber
                                            min={0}
                                            step={0.01}
                                            style={{ width: "100%" }}
                                            readOnly
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={3}>
                                    <Form.Item {...restField} label="Subtotal ($)" name={[name, "subtotal"]}>
                                        <InputNumber min={0} step={0.01} style={{ width: "100%" }} readOnly />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={6}>
                                    <Form.Item {...restField} label="Notas" name={[name, "product_notes"]}>
                                        <Input placeholder="Sin cebolla..." />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={1}>
                                    <Button
                                        danger
                                        icon={<MinusCircleOutlined />}
                                        onClick={() => remove(name)}
                                        aria-label="Eliminar producto"
                                    />
                                </Col>
                            </Row>
                        ))}
                    </Space>
                    <Form.ErrorList errors={errors} />
                    <Form.Item>
                        <Button
                            type="dashed"
                            onClick={() => add({ quantity: 1, unit_price: undefined, subtotal: 0 })}
                            block
                            icon={<PlusOutlined />}
                        >
                            Agregar producto
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
};
