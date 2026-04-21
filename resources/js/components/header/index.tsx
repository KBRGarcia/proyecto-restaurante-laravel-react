import { DownOutlined } from "@ant-design/icons";
import { useGetIdentity } from "@refinedev/core";
import {
    Avatar,
    Button,
    Dropdown,
    Layout as AntdLayout,
    MenuProps,
    Space,
    Switch,
    Typography,
    theme,
} from "antd";
import React, { useContext } from "react";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { ColorModeContext } from "../../contexts/color-mode";

const { Text } = Typography;
const { useToken } = theme;

export const Header: React.FC = () => {
    const { token } = useToken();
    const { data: user } = useGetIdentity<any>();
    const { mode, setMode } = useContext(ColorModeContext);

    const headerStyles: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
    };

    return (
        <AntdLayout.Header style={headerStyles}>
            <Space size="middle">
                <Switch
                    checkedChildren={<MoonOutlined />}
                    unCheckedChildren={<SunOutlined />}
                    checked={mode === "dark"}
                    onChange={() => setMode(mode === "light" ? "dark" : "light")}
                />
                {(user?.name || user?.avatar) && (
                    <Space size="middle" style={{ cursor: "pointer" }}>
                        <Text strong>
                            {user.name} {user.last_name}
                        </Text>
                        <Avatar src={user.avatar} alt={user.name} />
                    </Space>
                )}
            </Space>
        </AntdLayout.Header>
    );
};
