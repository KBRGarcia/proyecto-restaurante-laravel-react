import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const UserCreate = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Nombre"
                    name={["name"]}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Apellido"
                    name={["last_name"]}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name={["email"]}
                    rules={[{ required: true, type: "email" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Contraseña"
                    name={["password"]}
                    rules={[{ required: true, min: 8 }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Rol"
                    name={["role"]}
                    rules={[{ required: true }]}
                    initialValue="cliente"
                >
                    <Select
                        options={[
                            { value: "admin", label: "Administrador" },
                            { value: "militar", label: "Militar" },
                            { value: "cliente", label: "Cliente" },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="Estado"
                    name={["status"]}
                    rules={[{ required: true }]}
                    initialValue="activo"
                >
                    <Select
                        options={[
                            { value: "activo", label: "Activo" },
                            { value: "inactivo", label: "Inactivo" },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Create>
    );
};
