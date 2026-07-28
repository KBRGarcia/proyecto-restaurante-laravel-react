import {
    CoffeeOutlined,
    HomeOutlined,
    MoonOutlined,
    PhoneOutlined,
    ShopOutlined,
    SunOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Space, Switch, Typography } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "@/contexts/color-mode/context";

const { Text } = Typography;

const navigationItems = [
    { label: "Inicio", icon: <HomeOutlined /> },
    { label: "Nosotros", icon: <TeamOutlined /> },
    { label: "Restaurantes", icon: <ShopOutlined /> },
    { label: "Contactanos", icon: <PhoneOutlined /> },
];

type HomeHeaderProps = {
    isDarkMode: boolean;
    colorText: string;
};

export function HomeHeader({ isDarkMode, colorText }: HomeHeaderProps) {
    const navigate = useNavigate();
    const { setMode } = useContext(ColorModeContext);

    const goToComingSoon = () => navigate("/proximamente");

    return (
        <Row align="middle" justify="space-between" gutter={[24, 24]}>
            <Col>
                <Space size="middle">
                    <div
                        style={{
                            alignItems: "center",
                            background: "linear-gradient(135deg, #ef4444, #f97316)",
                            borderRadius: "18px",
                            boxShadow: "0 18px 40px rgba(239, 68, 68, 0.28)",
                            color: "#fff",
                            display: "flex",
                            height: "52px",
                            justifyContent: "center",
                            width: "52px",
                        }}
                    >
                        <CoffeeOutlined style={{ fontSize: "26px" }} />
                    </div>
                    <div>
                        <Text strong style={{ display: "block", fontSize: "18px" }}>
                            Restaurante Cloud
                        </Text>
                        <Text type="secondary">Gestión multi-restaurante</Text>
                    </div>
                </Space>
            </Col>

            <Col flex="auto">
                <Space
                    wrap
                    size="small"
                    style={{
                        background: isDarkMode
                            ? "rgba(255, 255, 255, 0.08)"
                            : "rgba(255, 255, 255, 0.78)",
                        border: `1px solid ${
                            isDarkMode
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(239, 68, 68, 0.12)"
                        }`,
                        borderRadius: "999px",
                        boxShadow: isDarkMode
                            ? "0 20px 55px rgba(0, 0, 0, 0.3)"
                            : "0 20px 55px rgba(239, 68, 68, 0.1)",
                        justifyContent: "center",
                        padding: "8px",
                        width: "100%",
                    }}
                >
                    {navigationItems.map((item) => (
                        <Button
                            key={item.label}
                            icon={item.icon}
                            onClick={goToComingSoon}
                            shape="round"
                            type="text"
                            style={{
                                color: colorText,
                                fontWeight: 600,
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Space>
            </Col>

            <Col>
                <Switch
                    checked={isDarkMode}
                    checkedChildren={<MoonOutlined />}
                    unCheckedChildren={<SunOutlined />}
                    onChange={() => setMode(isDarkMode ? "light" : "dark")}
                />
            </Col>
        </Row>
    );
}
