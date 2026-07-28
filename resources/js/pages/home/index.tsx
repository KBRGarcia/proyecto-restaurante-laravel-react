import { CoffeeOutlined } from "@ant-design/icons";
import { Layout, Row, theme } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "@/contexts/color-mode/context";
import { HomeHeader } from "./HomeHeader";
import { HomeHeroSection } from "./HomeHeroSection";
import { HomeRestaurantSelector, type HomeRestaurant } from "./HomeRestaurantSelector";

const restaurants: HomeRestaurant[] = [
    {
        name: "Sabor & Tradición",
        description: "Restaurante principal disponible",
        accent: "#ef4444",
        available: true,
    },
    {
        name: "Restaurante #2",
        description: "Espacio reservado para un nuevo tenant",
        accent: "#7c3aed",
        available: false,
    },
    {
        name: "Restaurante #3",
        description: "Próxima integración multi-restaurante",
        accent: "#2563eb",
        available: false,
    },
];

export function HomePage() {
    const navigate = useNavigate();
    const { token } = theme.useToken();
    const { mode } = useContext(ColorModeContext);
    const isDarkMode = mode === "dark";

    const goToComingSoon = () => navigate("/proximamente");
    const goToRestaurantLogin = (isAvailable: boolean) => {
        navigate(isAvailable ? "/login?restaurant=sabor-tradicion" : "/proximamente");
    };

    return (
        <Layout
            style={{
                minHeight: "100vh",
                overflowX: "hidden",
                overflowY: "auto",
                background: isDarkMode
                    ? "radial-gradient(circle at top left, rgba(127, 29, 29, 0.42), transparent 34%), linear-gradient(135deg, #110f0f 0%, #1b1414 48%, #070707 100%)"
                    : "radial-gradient(circle at top left, rgba(239, 68, 68, 0.16), transparent 34%), linear-gradient(135deg, #fff7ed 0%, #fff 52%, #fee2e2 100%)",
                color: token.colorText,
            }}
        >
            <div style={{ padding: "28px min(6vw, 72px)" }}>
                <HomeHeader isDarkMode={isDarkMode} colorText={token.colorText} />

                <Row
                    align="middle"
                    gutter={[48, 48]}
                    style={{
                        minHeight: "calc(100vh - 120px)",
                        padding: "56px 0 36px",
                    }}
                >
                    <HomeHeroSection
                        colorTextSecondary={token.colorTextSecondary}
                        onEnterRestaurant={() => goToRestaurantLogin(true)}
                        onViewRestaurants={goToComingSoon}
                    />
                    <HomeRestaurantSelector
                        restaurants={restaurants}
                        isDarkMode={isDarkMode}
                        colorText={token.colorText}
                        onSelectRestaurant={goToRestaurantLogin}
                    />
                </Row>
            </div>
        </Layout>
    );
}
