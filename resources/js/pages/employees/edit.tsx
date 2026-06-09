import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Button, Col, Form, Input, Row, Select, Card } from "antd";
import { StatusFormSwitch } from "@/components/form/StatusFormSwitch";
import { useLinkedUserProfileFields } from "@/hooks/useLinkedUserProfileFields";
import { PhoneNumberField } from "@/components/form/PhoneNumberField";
import { EmployeeAssignmentsField } from "@/components/form/EmployeeAssignmentsField";

export const EmployeesEdit = () => {
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
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Row gutter={[16, 16]} align="stretch">
                    <Col xs={24} lg={18}>
                        <Card title="Datos del empleado" style={{ height: "32%" }}>
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
                                    <PhoneNumberField name="phone" label="Telefono" disabled={isUserLinked} />
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        label="Email laboral"
                                        name="email"
                                        rules={[{ type: "email", message: "Introduce un email valido" }]}
                                    >
                                        <Input disabled={isUserLinked} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        <Card title="Informacion laboral" style={{ height: "30%", marginTop: "2%" }}>
                            <Row gutter={16}>
                                <Col xs={24} sm={8}>
                                    <Form.Item
                                        label="Fecha de contratacion"
                                        name="hire_date"
                                        rules={[{ required: true, message: "La fecha de contratacion es obligatoria" }]}
                                    >
                                        <Input type="date" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={16}>
                                    <Form.Item label="Direccion" name="address">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item label="Notas internas" name="notes">
                                <Input.TextArea rows={2} />
                            </Form.Item>
                        </Card>

                        <Card title="Sucursales y cargos" style={{ marginTop: "2%" }}>
                            <EmployeeAssignmentsField form={formProps.form} />
                        </Card>
                    </Col>

                    <Col xs={24} lg={6}>
                        <Card title="Estado laboral" style={{ height: "15%" }}>
                            <StatusFormSwitch name={["status"]} />
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Edit>
    );
};
