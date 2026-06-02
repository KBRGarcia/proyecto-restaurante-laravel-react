import { Switch } from "antd";
import type { SwitchProps } from "antd";

type StatusSwitchProps = {
    checked: boolean;
    loading?: boolean;
    onToggle: (checked: boolean) => void;
} & Pick<SwitchProps, "checkedChildren" | "unCheckedChildren">;

export const StatusSwitch = ({
    checked,
    loading = false,
    onToggle,
    checkedChildren,
    unCheckedChildren,
}: StatusSwitchProps) => (
    <Switch
        checked={checked}
        loading={loading}
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
        onChange={onToggle}
        onClick={(_, event) => event.stopPropagation()}
    />
);
