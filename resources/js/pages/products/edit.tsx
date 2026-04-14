import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const ProductsEdit = () => {
    const { formProps, saveButtonProps } = useForm({});

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Identificador Principal (Name/Titular)" name="name">
                    <Input />
                </Form.Item>
                {/* Personalizar campos adiccionales aquí */}
            </Form>
        </Edit>
    );
};
