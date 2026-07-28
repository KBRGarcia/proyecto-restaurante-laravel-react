import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Row, Col, Card } from "antd";
import { useDataProvider } from "@refinedev/core";
import { useState } from "react";
import { PhoneNumberField } from "@/components/form/PhoneNumberField";
import { type CustomerType, getAssignedEmployeeLabel, getEmployeeSelectFilters, handleOrderContactPhoneValuesChange } from "./utils";

export const OrdersEdit = () => {
    const { formProps, saveButtonProps, query } = useForm();
    const dataProvider = useDataProvider();
    const order = query?.data?.data;
    const [manualCustomerType, setManualCustomerType] = useState<CustomerType | null>(null);
    const customerType =
        manualCustomerType ?? (order?.client_id && !order?.user_id ? "client" : "user");
    const serviceType = Form.useWatch("service_type", formProps.form) ?? order?.service_type ?? "pickup";

    const { selectProps: userSelectProps } = useSelect({
        resource: "users",
        optionLabel: (item) => {
            const user = item as { name?: string; last_name?: string; email?: string };
            return `${user.name ?? ""} ${user.last_name ?? ""}`.trim() || user.email || "Usuario";
        },
        optionValue: "id",
        defaultValue: order?.user_id,
        filters: [
            { field: "role", operator: "eq", value: "client" },
            { field: "status", operator: "eq", value: "active" },
        ],
    });

    const { selectProps: clientSelectProps } = useSelect({
        resource: "clients",
        optionLabel: (item) => {
            const client = item as { full_name?: string; identity_document?: string };
            const name = client.full_name ?? "Cliente";
            const document = client.identity_document ? ` (${client.identity_document})` : "";
            return `${name}${document}`;
        },
        optionValue: "id",
        defaultValue: order?.client_id,
    });

    const { selectProps: employeeSelectProps } = useSelect({
        resource: "employees",
        optionLabel: (item) => {
            const employee = item as { full_name?: string; branches_summary?: string };
            const name = employee.full_name ?? "Empleado";
            const summary = employee.branches_summary ? ` — ${employee.branches_summary}` : "";
            return `${name}${summary}`;
        },
        optionValue: "id",
        defaultValue: order?.assigned_employee_id,
        filters: getEmployeeSelectFilters(serviceType),
        pagination: {
            mode: "off",
        },
        queryOptions: {
            queryKey: ["order-assigned-employee", serviceType],
            enabled: query ? !query.isLoading : false,
        },
    });

    const assignedEmployeeOption =
        order?.assigned_employee_id && order?.assigned_employee
            ? {
                value: order.assigned_employee_id,
                label: order.assigned_employee.full_name ?? "Empleado asignado",
            }
            : null;

    const employeeOptions =
        assignedEmployeeOption &&
            !employeeSelectProps.options?.some((option) => option.value === assignedEmployeeOption.value)
            ? [assignedEmployeeOption, ...(employeeSelectProps.options ?? [])]
            : employeeSelectProps.options;

    const handleCustomerTypeChange = (value: CustomerType) => {
        setManualCustomerType(value);
        formProps.form?.setFieldsValue({
            user_id: undefined,
            client_id: undefined,
            contact_phone: undefined,
        });
    };

    const handleServiceTypeChange = (value: string) => {
        formProps.form?.setFieldsValue({
            service_type: value,
            assigned_employee_id: undefined,
        });
    };

    const handleValuesChange = (changedValues: Record<string, unknown>, allValues: Record<string, unknown>) => {
        void handleOrderContactPhoneValuesChange(
            formProps.form,
            customerType,
            changedValues as Partial<{ user_id?: number | null; client_id?: number | null }>,
            dataProvider(),
        );
        formProps.onValuesChange?.(changedValues, allValues);
    };

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical" onValuesChange={handleValuesChange}>
                <Row gutter={[16, 16]} align="stretch">
                    <Col xs={24} lg={14}>
                        <Card title="Datos de la orden">
                            <Row gutter={16}>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Tipo de cliente" required>
                                        <Select
                                            value={customerType}
                                            onChange={handleCustomerTypeChange}
                                            options={[
                                                { value: "user", label: "Usuario del sistema" },
                                                { value: "client", label: "Cliente del restaurante" },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                    {customerType === "user" ? (
                                        <Form.Item
                                            label="Usuario"
                                            name="user_id"
                                            rules={[{ required: true, message: "El usuario es obligatorio" }]}
                                        >
                                            <Select
                                                options={userSelectProps.options}
                                                loading={userSelectProps.loading}
                                                showSearch={userSelectProps.showSearch}
                                                onSearch={userSelectProps.onSearch}
                                                filterOption={userSelectProps.filterOption}
                                                placeholder="Selecciona un usuario del sistema"
                                            />
                                        </Form.Item>
                                    ) : (
                                        <Form.Item
                                            label="Cliente"
                                            name="client_id"
                                            rules={[{ required: true, message: "El cliente es obligatorio" }]}
                                        >
                                            <Select
                                                options={clientSelectProps.options}
                                                loading={clientSelectProps.loading}
                                                showSearch={clientSelectProps.showSearch}
                                                onSearch={clientSelectProps.onSearch}
                                                filterOption={clientSelectProps.filterOption}
                                                placeholder="Selecciona un cliente del restaurante"
                                            />
                                        </Form.Item>
                                    )}
                                </Col>
                                <Col xs={24} sm={8}>
                                    <PhoneNumberField name="contact_phone" label="Teléfono de Contacto" />
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Tipo de Servicio" name="service_type" rules={[{ required: true }]} initialValue="pickup">
                                        <Select
                                            onChange={handleServiceTypeChange}
                                            options={[
                                                { value: "pickup", label: "Retiro en Local" },
                                                { value: "delivery", label: "Delivery" },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Estado de Orden" name="status" rules={[{ required: true }]} initialValue="pending">
                                        <Select
                                            options={[
                                                { value: "pending", label: "Pendiente" },
                                                { value: "preparing", label: "En Cocina" },
                                                { value: "ready", label: "Listo" },
                                                { value: "delivered", label: "Entregado" },
                                                { value: "canceled", label: "Cancelado" },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Form.Item label={getAssignedEmployeeLabel(serviceType)} name="assigned_employee_id">
                                        <Select
                                            {...employeeSelectProps}
                                            options={employeeOptions}
                                            placeholder={
                                                serviceType === "delivery"
                                                    ? "Selecciona un repartidor"
                                                    : "Selecciona un mesero o cajero"
                                            }
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col xs={24} lg={10} style={{ alignSelf: "flex-start" }}>
                        <Card title="Notas">
                            <Form.Item label="Notas Especiales" name="special_notes">
                                <Input.TextArea
                                    placeholder="Sin cebolla, extra salsa..."
                                    autoSize={{ minRows: 2 }}
                                />
                            </Form.Item>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Edit>
    );
};
