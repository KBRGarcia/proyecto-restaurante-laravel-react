import { DownOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useGetIdentity, useLogout } from "@refinedev/core";
import {
    Avatar,
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
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { useToken } = theme;

export const Header: React.FC = () => {
    const { token } = useToken();
    const { data: user } = useGetIdentity<any>();
    const { mode, setMode } = useContext(ColorModeContext);
    const { mutate: logout } = useLogout();
    const navigate = useNavigate();

    const headerStyles: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
        boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
    };

    const menuItems: MenuProps["items"] = [
        {
            key: "profile",
            label: "Mi Perfil",
            icon: <UserOutlined />,
            onClick: () => navigate("/profile"),
        },
        {
            type: "divider",
        },
        {
            key: "logout",
            label: "Cerrar Sesión",
            icon: <LogoutOutlined />,
            danger: true,
            onClick: () => logout(),
        },
    ];

    return (
        <AntdLayout.Header style={headerStyles}>
            <Space size="middle">
                <Switch
                    checkedChildren={<MoonOutlined />}
                    unCheckedChildren={<SunOutlined />}
                    checked={mode === "dark"}
                    onChange={() => setMode(mode === "light" ? "dark" : "light")}
                />
                {(user?.name || user?.profile_picture || user?.avatar) && (
                    <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                        <Space size="small" style={{ cursor: "pointer", padding: "4px 8px", borderRadius: "6px" }}>
                            <Avatar src={user.profile_picture || user.avatar} alt={user.name} />
                            <Text strong style={{ marginLeft: "4px" }}>
                                {user.name} {user.last_name}
                            </Text>
                            <DownOutlined style={{ fontSize: "10px", color: token.colorTextSecondary }} />
                        </Space>
                    </Dropdown>
                )}
            </Space>
        </AntdLayout.Header>
    );
};
