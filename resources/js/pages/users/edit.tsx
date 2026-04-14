import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const UserEdit = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Edit saveButtonProps={saveButtonProps}>
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
                    label="Contraseña (Opcional)"
                    name={["password"]}
                    help="Déjalo en blanco si no quieres cambiar la contraseña."
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Rol"
                    name={["role"]}
                    rules={[{ required: true }]}
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
                >
                    <Select
                        options={[
                            { value: "activo", label: "Activo" },
                            { value: "inactivo", label: "Inactivo" },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Edit>
    );
};
