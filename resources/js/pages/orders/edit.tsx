import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Row, Col, Card } from "antd";
import { useState } from "react";
import { PhoneNumberField } from "@/components/form/PhoneNumberField";
import { type CustomerType, getAssignedEmployeeLabel, getEmployeePositionFilters, useOrderTotalCalculation } from "./utils";

// Componente para editar una orden
export const OrdersEdit = () => {
    // Hook para editar una orden
    const { formProps, saveButtonProps, query } = useForm();
    // Estado para la orden
    const order = query?.data?.data;
    // Estado para el tipo de cliente
    const [manualCustomerType, setManualCustomerType] = useState<CustomerType | null>(null);
    const customerType =
        manualCustomerType ?? (order?.client_id && !order?.user_id ? "client" : "user");
    // Estado para el tipo de servicio
    const serviceType = Form.useWatch("service_type", formProps.form) ?? order?.service_type ?? "pickup";

    // Hook para calcular el total de la orden
    useOrderTotalCalculation(formProps.form);

    // Select para seleccionar un usuario
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

    // Select para seleccionar un cliente
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

    // Select para seleccionar un empleado
    const { selectProps: employeeSelectProps } = useSelect({
        resource: "employees",
        optionLabel: (item) => {
            const employee = item as { full_name?: string; branches_summary?: string };
            const name = employee.full_name ?? "Empleado";
            const summary = employee.branches_summary ? ` — ${employee.branches_summary}` : "";
            return `${name}${summary}`;
        },
        optionValue: "user_id",
        filters: [
            ...getEmployeePositionFilters(serviceType),
            { field: "has_user", operator: "eq", value: "1" },
            { field: "status", operator: "eq", value: "active" },
        ],
    });

    // Opcion para seleccionar un empleado asignado
    const assignedEmployeeOption =
        order?.assigned_employee_id && order?.assigned_employee
            ? {
                value: order.assigned_employee_id,
                label:
                    order.assigned_employee.full_name ??
                    `${order.assigned_employee.name} ${order.assigned_employee.last_name ?? ""}`.trim(),
            }
            : null;

    // Opciones para seleccionar un empleado asignado
    const employeeOptions =
        assignedEmployeeOption &&
            !employeeSelectProps.options?.some((option) => option.value === assignedEmployeeOption.value)
            ? [assignedEmployeeOption, ...(employeeSelectProps.options ?? [])]
            : employeeSelectProps.options;

    // Funcion para cambiar el tipo de cliente
    const handleCustomerTypeChange = (value: CustomerType) => {
        setManualCustomerType(value);
        formProps.form?.setFieldsValue({
            user_id: undefined,
            client_id: undefined,
        });
    };

    // Funcion para cambiar el tipo de servicio
    const handleServiceTypeChange = (value: string) => {
        formProps.form?.setFieldsValue({
            service_type: value,
            assigned_employee_id: undefined,
            ...(value === "pickup" ? { delivery_address: undefined } : {}),
        });
    };

    // Verifica si el servicio es pickup
    const isPickup = serviceType === "pickup";

    // Renderiza el componente
    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={[16, 16]} align="stretch">
                    <Col xs={24} lg={14}>
                        <Card title="Datos de la orden" style={{ height: "70%" }}>
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

                    <Col xs={24} lg={10}>
                        <Card title="Detalles de la orden" style={{ height: "100%" }}>
                            <Row gutter={16}>
                                <Col xs={24} sm={6}>
                                    <Form.Item label="Moneda" name="currency" rules={[{ required: true }]} initialValue="internacional">
                                        <Select
                                            options={[
                                                { value: "internacional", label: "Dólares ($)" },
                                                { value: "nacional", label: "Bolívares (Bs.)" },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={6}>
                                    <Form.Item label="Subtotal" name="subtotal" rules={[{ required: true, message: "El subtotal es obligatorio" }]}>
                                        <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={6}>
                                    <Form.Item label="Impuestos (%)" name="taxes" initialValue={0}>
                                        <InputNumber min={0} max={100} step={0.01} style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={6}>
                                    <Form.Item label="Total" name="total" rules={[{ required: true, message: "El total es obligatorio" }]}>
                                        <InputNumber min={0} step={0.01} style={{ width: "100%" }} readOnly />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={24}>
                                    <Form.Item
                                        label="Dirección de Entrega"
                                        name="delivery_address"
                                        rules={
                                            isPickup
                                                ? []
                                                : [{ required: true, message: "La dirección de entrega es obligatoria para delivery" }]
                                        }>
                                        <Input placeholder="Requerido si es Delivery" disabled={isPickup} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={24}>
                                    <Form.Item label="Notas Especiales" name="special_notes">
                                        <Input.TextArea placeholder="Sin cebolla, extra salsa..." rows={2} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Edit>
    );
};
