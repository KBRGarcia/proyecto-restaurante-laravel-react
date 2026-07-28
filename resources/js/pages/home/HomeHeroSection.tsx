import { CompassOutlined, RocketOutlined } from "@ant-design/icons";
import { Button, Col, Space, Tag, Typography } from "antd";

const { Title, Paragraph } = Typography;

type HomeHeroSectionProps = {
    colorTextSecondary: string;
    onEnterRestaurant: () => void;
    onViewRestaurants: () => void;
};

export function HomeHeroSection({
    colorTextSecondary,
    onEnterRestaurant,
    onViewRestaurants,
}: HomeHeroSectionProps) {
    return (
        <Col xs={24} lg={13}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Tag
                    color="red"
                    style={{
                        borderRadius: "999px",
                        fontSize: "14px",
                        padding: "6px 14px",
                        width: "fit-content",
                    }}
                >
                    Plataforma preparada para multi-tenancy
                </Tag>

                <div>
                    <Title
                        style={{
                            fontSize: "clamp(40px, 7vw, 82px)",
                            letterSpacing: "-3px",
                            lineHeight: 0.94,
                            marginBottom: "24px",
                        }}
                    >
                        Centraliza tus restaurantes desde una sola plataforma.
                    </Title>
                    <Paragraph
                        style={{
                            color: colorTextSecondary,
                            fontSize: "clamp(17px, 2vw, 22px)",
                            lineHeight: 1.65,
                            maxWidth: "720px",
                        }}
                    >
                        Un ecosistema moderno, rápido y seguro para administrar operaciones,
                        equipos, pagos y pedidos con una experiencia diseñada para crecer junto
                        a tu negocio gastronómico.
                    </Paragraph>
                </div>

                <Space wrap size="middle">
                    <Button
                        icon={<RocketOutlined />}
                        onClick={onEnterRestaurant}
                        size="large"
                        type="primary"
                        style={{
                            background: "linear-gradient(135deg, #ef4444, #f97316)",
                            border: 0,
                            borderRadius: "999px",
                            boxShadow: "0 18px 38px rgba(239, 68, 68, 0.28)",
                            fontWeight: 700,
                            height: "48px",
                            paddingInline: "24px",
                        }}
                    >
                        Entrar a Sabor & Tradición
                    </Button>
                    <Button
                        icon={<CompassOutlined />}
                        onClick={onViewRestaurants}
                        size="large"
                        shape="round"
                    >
                        Ver restaurantes
                    </Button>
                </Space>
            </Space>
        </Col>
    );
}
