import { useSelect } from "@refinedev/antd";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd";
import { useEmployeeAssignmentValidation } from "@/hooks/useEmployeeAssignmentValidation";

const positionOptions = [
    { value: "general_manager", label: "Gerente General" },
    { value: "branch_manager", label: "Gerente de Sucursal" },
    { value: "chef", label: "Chef" },
    { value: "sous_chef", label: "Sous Chef" },
    { value: "cook", label: "Cocinero" },
    { value: "kitchen_assistant", label: "Ayudante de Cocina" },
    { value: "waiter", label: "Mesero" },
    { value: "cashier", label: "Cajero" },
    { value: "delivery_driver", label: "Repartidor" },
    { value: "host", label: "Anfitrion" },
    { value: "cleaner", label: "Personal de Limpieza" },
    { value: "inventory_manager", label: "Encargado de Inventario" },
];

type EmployeeAssignmentsFieldProps = {
    form?: FormInstance;
};

export const EmployeeAssignmentsField = ({ form }: EmployeeAssignmentsFieldProps) => {
    const { selectProps: branchSelectProps } = useSelect({
        resource: "branches",
        optionLabel: "name",
        optionValue: "id",
    });

    const { createAssignmentValidator, revalidateAssignments, validateAssignmentRow } =
        useEmployeeAssignmentValidation();

    const handleBranchChange = (fieldIndex: number, branchId: number) => {
        void validateAssignmentRow(form, fieldIndex, { branch_id: branchId }).then((message) => {
            if (message) {
                void form?.setFields([
                    {
                        name: ["assignments", fieldIndex, "branch_id"],
                        errors: [message],
                    },
                ]);
            }

            revalidateAssignments(form, fieldIndex);
        });
    };

    const handlePositionChange = (fieldIndex: number, position: string) => {
        void validateAssignmentRow(form, fieldIndex, { position }).then((message) => {
            if (message) {
                void form?.setFields([
                    {
                        name: ["assignments", fieldIndex, "position"],
                        errors: [message],
                    },
                ]);
            }

            revalidateAssignments(form, fieldIndex);
        });
    };

    return (
        <Form.List name="assignments">
            {(fields, { add, remove }) => (
                <>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        {fields.map(({ key, name, ...restField }) => (
                            <Row gutter={16} key={key} align="middle">
                                <Col xs={24} sm={8}>
                                    <Form.Item
                                        {...restField}
                                        label="Sucursal"
                                        name={[name, "branch_id"]}
                                        dependencies={[["assignments", name, "position"]]}
                                        validateTrigger={["onChange", "onBlur"]}
                                        rules={[
                                            { required: true, message: "Seleccione una sucursal" },
                                            {
                                                validator: async () => createAssignmentValidator(form, name)(),
                                            },
                                        ]}
                                    >
                                        <Select
                                            {...branchSelectProps}
                                            placeholder="Seleccione una sucursal"
                                            onChange={(value: number) => handleBranchChange(name, value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={7}>
                                    <Form.Item
                                        {...restField}
                                        label="Cargo"
                                        name={[name, "position"]}
                                        dependencies={[["assignments", name, "branch_id"]]}
                                        validateTrigger={["onChange", "onBlur"]}
                                        rules={[
                                            { required: true, message: "Seleccione un cargo" },
                                            {
                                                validator: async () => createAssignmentValidator(form, name)(),
                                            },
                                        ]}
                                    >
                                        <Select
                                            options={positionOptions}
                                            placeholder="Seleccione un cargo"
                                            onChange={(value: string) => handlePositionChange(name, value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={7}>
                                    <Form.Item {...restField} label="Inicio" name={[name, "start_date"]}>
                                        <Input type="date" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={2}>
                                    <Button
                                        danger
                                        icon={<MinusCircleOutlined />}
                                        onClick={() => {
                                            remove(name);
                                            revalidateAssignments(form);
                                        }}
                                    />
                                </Col>
                            </Row>
                        ))}
                    </Space>
                    <Form.Item>
                        <Button type="dashed" onClick={() => add({ active: true })} block icon={<PlusOutlined />}>
                            Agregar sucursal y cargo
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
};
