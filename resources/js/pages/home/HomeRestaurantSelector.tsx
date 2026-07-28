import { ShopOutlined } from "@ant-design/icons";
import { Card, Col, Space, Tag, Typography } from "antd";

const { Text, Title } = Typography;

export type HomeRestaurant = {
    name: string;
    description: string;
    accent: string;
    available: boolean;
};

type HomeRestaurantSelectorProps = {
    restaurants: HomeRestaurant[];
    isDarkMode: boolean;
    colorText: string;
    onSelectRestaurant: (isAvailable: boolean) => void;
};

export function HomeRestaurantSelector({
    restaurants,
    isDarkMode,
    colorText,
    onSelectRestaurant,
}: HomeRestaurantSelectorProps) {
    return (
        <Col xs={24} lg={11}>
            <Card
                bordered={false}
                style={{
                    background: isDarkMode
                        ? "rgba(20, 20, 20, 0.76)"
                        : "rgba(255, 255, 255, 0.82)",
                    border: `1px solid ${
                        isDarkMode
                            ? "rgba(255, 255, 255, 0.1)"
                            : "rgba(239, 68, 68, 0.13)"
                    }`,
                    borderRadius: "36px",
                    boxShadow: isDarkMode
                        ? "0 35px 100px rgba(0, 0, 0, 0.44)"
                        : "0 35px 100px rgba(127, 29, 29, 0.13)",
                    overflow: "hidden",
                }}
                styles={{ body: { padding: "28px" } }}
            >
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <div>
                        <Text type="secondary" strong>
                            Selecciona tu restaurante
                        </Text>
                        <Title level={3} style={{ margin: "6px 0 0" }}>
                            Acceso por tenant
                        </Title>
                    </div>

                    {restaurants.map((restaurant) => (
                        <button
                            key={restaurant.name}
                            onClick={() => onSelectRestaurant(restaurant.available)}
                            type="button"
                            style={{
                                alignItems: "center",
                                background: isDarkMode
                                    ? "rgba(255, 255, 255, 0.055)"
                                    : "rgba(255, 255, 255, 0.9)",
                                border: `1px solid ${restaurant.accent}55`,
                                borderRadius: "24px",
                                boxShadow: `0 18px 48px ${restaurant.accent}22`,
                                color: colorText,
                                cursor: "pointer",
                                display: "flex",
                                gap: "18px",
                                padding: "18px",
                                textAlign: "left",
                                transition: "transform 0.2s ease, border-color 0.2s ease",
                                width: "100%",
                            }}
                        >
                            <span
                                style={{
                                    alignItems: "center",
                                    background: `${restaurant.accent}1f`,
                                    borderRadius: "18px",
                                    color: restaurant.accent,
                                    display: "flex",
                                    flex: "0 0 56px",
                                    height: "56px",
                                    justifyContent: "center",
                                }}
                            >
                                <ShopOutlined style={{ fontSize: "28px" }} />
                            </span>
                            <span style={{ flex: 1 }}>
                                <Text
                                    strong
                                    style={{
                                        color: restaurant.available
                                            ? restaurant.accent
                                            : colorText,
                                        display: "block",
                                        fontSize: "18px",
                                    }}
                                >
                                    {restaurant.name}
                                </Text>
                                <Text type="secondary">{restaurant.description}</Text>
                            </span>
                            <Tag color={restaurant.available ? "success" : "default"}>
                                {restaurant.available ? "Disponible" : "Próximo"}
                            </Tag>
                        </button>
                    ))}
                </Space>
            </Card>
        </Col>
    );
}
