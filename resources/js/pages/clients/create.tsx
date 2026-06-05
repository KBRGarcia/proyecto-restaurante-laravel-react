import { Create, useForm, useSelect } from "@refinedev/antd";
import { Button, Col, Form, Input, Row, Select, Card } from "antd";
import { StatusFormSwitch } from "@/components/form/StatusFormSwitch";
import { useLinkedUserProfileFields } from "@/hooks/useLinkedUserProfileFields";

export const ClientsCreate = () => {
    const { formProps, saveButtonProps } = useForm();
    const { selectProps: userSelectProps } = useSelect({
        resource: "users",
        optionLabel: (item) => {
            const user = item as { email?: string; name?: string; last_name?: string };
            return `${user.email ?? ""} (${user.name ?? ""} ${user.last_name ?? ""})`.trim();
        },
        optionValue: "id",
    });

    const userSelectFieldProps = {
        options: userSelectProps.options,
        loading: userSelectProps.loading,
        showSearch: userSelectProps.showSearch,
        onSearch: userSelectProps.onSearch,
        filterOption: userSelectProps.filterOption,
    };

    const { isUserLinked, clearLinkedFields } = useLinkedUserProfileFields({
        form: formProps.form,
    });

    const handleUserIdChange = (value: number | null | undefined) => {
        formProps.form?.setFieldValue("user_id", value ?? undefined);

        if (value === null || value === undefined) {
            clearLinkedFields();
        }
    };

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={18}>
                        <Card title="Datos del cliente">
                            <Row gutter={16}>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Usuario asociado" name="user_id">
                                        <Select<number>
                                            {...userSelectFieldProps}
                                            allowClear
                                            placeholder="Opcional"
                                            onChange={handleUserIdChange}
                                            onClear={clearLinkedFields}
                                            dropdownRender={(menu) => (
                                                <>
                                                    {isUserLinked && (
                                                        <div
                                                            style={{
                                                                padding: "4px 8px",
                                                                borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
                                                            }}
                                                        >
                                                            <Button type="link" size="small" block onClick={clearLinkedFields}>
                                                                Limpiar
                                                            </Button>
                                                        </div>
                                                    )}
                                                    {menu}
                                                </>
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Form.Item
                                        label="Nombre"
                                        name="first_name"
                                        rules={[{ required: true, message: "El nombre es obligatorio" }]}
                                    >
                                        <Input disabled={isUserLinked} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Form.Item
                                        label="Apellido"
                                        name="last_name"
                                        rules={[{ required: true, message: "El apellido es obligatorio" }]}
                                    >
                                        <Input disabled={isUserLinked} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Documento" name="identity_document">
                                        <Input placeholder="V-12345678" disabled={isUserLinked} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Fecha de nacimiento" name="birth_date">
                                        <Input type="date" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[{ type: "email", message: "Introduce un email valido" }]}
                                    >
                                        <Input disabled={isUserLinked} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={8}>
                                    <Form.Item label="Telefono" name="phone">
                                        <Input placeholder="+58 414 1234567" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={16}>
                                    <Form.Item label="Direccion" name="address">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item label="Notas internas" name="notes">
                                <Input.TextArea
                                    rows={3}
                                    maxLength={2000}
                                    showCount
                                    autoSize={{ minRows: 3, maxRows: 6 }}
                                    style={{ resize: "vertical" }}
                                />
                            </Form.Item>
                        </Card>
                    </Col>

                    <Col xs={24} lg={6}>
                        <Card title="Origen y Estado">
                            <Row gutter={16}>
                                <Col xs={24} sm={16}>
                                    <Form.Item label="Origen" name="origin" initialValue="online" rules={[{ required: true }]}>
                                        <Select
                                            options={[
                                                { value: "online", label: "Online" },
                                                { value: "physical", label: "Fisico" },
                                                { value: "mixed", label: "Fisico y Online" },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <StatusFormSwitch name={["status"]} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Create>
    );
};
