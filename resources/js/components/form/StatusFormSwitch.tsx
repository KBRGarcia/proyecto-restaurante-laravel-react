import { Form, Switch } from "antd";

type StatusFormSwitchProps = {
    label?: string;
    name?: string | string[];
    initialValue?: "active" | "inactive";
};

export const StatusFormSwitch = ({
    label = "Estado",
    name = "status",
    initialValue = "active",
}: StatusFormSwitchProps) => (
    <Form.Item
        label={label}
        name={name}
        initialValue={initialValue}
        valuePropName="checked"
        getValueFromEvent={(checked: boolean) => (checked ? "active" : "inactive")}
        getValueProps={(value: string) => ({ checked: value === "active" })}
        rules={[{ required: true, message: "El estado es obligatorio" }]}
    >
        <Switch checkedChildren="" unCheckedChildren="" />
    </Form.Item>
);
