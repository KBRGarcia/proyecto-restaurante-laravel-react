import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Select, Rate, Input, Row, Col, Card } from "antd";
import { useState } from "react";

type EvaluatorType = "user" | "client";

export const EvaluationsCreate = () => {
    const { formProps, saveButtonProps } = useForm();
    const [evaluatorType, setEvaluatorType] = useState<EvaluatorType>("user");

    const selectedUserId = Form.useWatch("user_id", formProps.form);
    const selectedClientId = Form.useWatch("client_id", formProps.form);
    const hasEvaluator = Boolean(selectedUserId || selectedClientId);

    const { selectProps: userSelectProps } = useSelect({
        resource: "users",
        optionLabel: (item) => {
            const user = item as { name?: string; last_name?: string; email?: string };
            return `${user.name ?? ""} ${user.last_name ?? ""}`.trim() || user.email || "Usuario";
        },
        optionValue: "id",
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
    });

    const productFilters = selectedUserId
        ? [{ field: "user_id", operator: "eq" as const, value: selectedUserId }]
        : selectedClientId
            ? [{ field: "client_id", operator: "eq" as const, value: selectedClientId }]
            : [];

    const orderFilters = selectedUserId
        ? [{ field: "user_id", operator: "eq" as const, value: selectedUserId }]
        : selectedClientId
            ? [{ field: "client_id", operator: "eq" as const, value: selectedClientId }]
            : [];

    const { selectProps: productSelectProps } = useSelect({
        resource: "products",
        optionLabel: "name",
        optionValue: "id",
        filters: productFilters,
        queryOptions: {
            enabled: hasEvaluator,
        },
    });

    const { selectProps: orderSelectProps } = useSelect({
        resource: "orders",
        optionLabel: (item) => `Orden #${item.id}`,
        optionValue: "id",
        filters: orderFilters,
        queryOptions: {
            enabled: hasEvaluator,
        },
    });

    const handleEvaluatorTypeChange = (value: EvaluatorType) => {
        setEvaluatorType(value);
        formProps.form?.setFieldsValue({
            user_id: undefined,
            client_id: undefined,
            product_id: undefined,
            order_id: undefined,
        });
    };

    const handleUserChange = (value: number | null | undefined) => {
        formProps.form?.setFieldsValue({
            user_id: value ?? undefined,
            product_id: undefined,
            order_id: undefined,
        });
    };

    const handleClientChange = (value: number | null | undefined) => {
        formProps.form?.setFieldsValue({
            client_id: value ?? undefined,
            product_id: undefined,
            order_id: undefined,
        });
    };

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={[16, 16]} align="stretch">
                    <Col xs={24} lg={18}>
                        <Card title="Datos de la evaluación" style={{ height: "100%" }}>
                            <Row gutter={16}>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Tipo de evaluador" required>
                                        <Select
                                            value={evaluatorType}
                                            onChange={handleEvaluatorTypeChange}
                                            options={[
                                                { value: "user", label: "Usuario del sistema" },
                                                { value: "client", label: "Cliente del restaurante" },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                    {evaluatorType === "user" ? (
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
                                                placeholder="Selecciona el usuario"
                                                onChange={handleUserChange}
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
                                                placeholder="Selecciona el cliente"
                                                onChange={handleClientChange}
                                            />
                                        </Form.Item>
                                    )}
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Producto Calificado (Opcional)" name="product_id">
                                        <Select
                                            {...productSelectProps}
                                            placeholder={hasEvaluator ? "Calificar un producto" : "Selecciona primero un evaluador"}
                                            allowClear
                                            disabled={!hasEvaluator}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Pedido Relacionado (Opcional)" name="order_id">
                                        <Select
                                            {...orderSelectProps}
                                            placeholder={hasEvaluator ? "Vincular a un pedido" : "Selecciona primero un evaluador"}
                                            allowClear
                                            disabled={!hasEvaluator}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item label="Comentario" name="comment">
                                <Input.TextArea placeholder="Escribe aquí tu opinión..." rows={3} />
                            </Form.Item>
                        </Card>
                    </Col>

                    <Col xs={24} lg={6}>
                        <Card title="Calificación" style={{ height: "35 %" }}>
                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        label="Calificación"
                                        name="rating"
                                        rules={[{ required: true, message: "La calificación es obligatoria" }]}
                                        initialValue={5}
                                    >
                                        <Rate style={{ fontSize: "24px" }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Create>
    );
};
