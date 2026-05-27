import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Select, Input, Row, Col } from "antd";
import { useEffect } from "react";

export const PhysicalPaymentOrdersEdit = () => {
    const { formProps, saveButtonProps, query } = useForm();
    const physicalPaymentOrder = query?.data?.data;

    const { selectProps: orderSelectProps } = useSelect({
        resource: "orders",
        optionLabel: (item: any) => `Orden #${item.id} - Total: $${item.total}`,
        defaultValue: physicalPaymentOrder?.order_id,
    });

    useEffect(() => {
        if (physicalPaymentOrder) {
            let formattedDate = "";
            if (physicalPaymentOrder.limit_date) {
                const dateObj = new Date(physicalPaymentOrder.limit_date);
                if (!isNaN(dateObj.getTime())) {
                    const pad = (num: number) => String(num).padStart(2, "0");
                    formattedDate = `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}T${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`;
                }
            }
            formProps.form?.setFieldsValue({
                order_id: physicalPaymentOrder.order_id,
                status: physicalPaymentOrder.status,
                limit_date: formattedDate
            });
        }
    }, [physicalPaymentOrder, formProps.form]);

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
                        <Form.Item label="Estado de Pago" name="status" rules={[{ required: true }]}>
                            <Select
                                options={[
                                    { value: "pending", label: "Pendiente" },
                                    { value: "confirmed", label: "Confirmado" },
                                    { value: "canceled", label: "Cancelado" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Fecha Límite para el Pago" name="limit_date" rules={[{ required: true, message: "La fecha límite es obligatoria" }]}>
                    <Input type="datetime-local" />
                </Form.Item>
            </Form>
        </Edit>
    );
};
