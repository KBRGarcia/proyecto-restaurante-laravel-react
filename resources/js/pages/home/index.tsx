import {
    CoffeeOutlined,
    CompassOutlined,
    HomeOutlined,
    MoonOutlined,
    PhoneOutlined,
    RocketOutlined,
    ShopOutlined,
    SunOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import {
    Button,
    Card,
    Col,
    Layout,
    Row,
    Space,
    Switch,
    Tag,
    Typography,
    theme,
} from 'antd';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorModeContext } from '../../contexts/color-mode';

const { Text, Title, Paragraph } = Typography;

const navigationItems = [
    { label: 'Inicio', icon: <HomeOutlined /> },
    { label: 'Nosotros', icon: <TeamOutlined /> },
    { label: 'Restaurantes', icon: <ShopOutlined /> },
    { label: 'Contactanos', icon: <PhoneOutlined /> },
];

const restaurants = [
    {
        name: 'Sabor & Tradición',
        description: 'Restaurante principal disponible',
        accent: '#ef4444',
        available: true,
    },
    {
        name: 'Restaurante #2',
        description: 'Espacio reservado para un nuevo tenant',
        accent: '#7c3aed',
        available: false,
    },
    {
        name: 'Restaurante #3',
        description: 'Próxima integración multi-restaurante',
        accent: '#2563eb',
        available: false,
    },
];

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { token } = theme.useToken();
    const { mode, setMode } = useContext(ColorModeContext);
    const isDarkMode = mode === 'dark';

    const goToComingSoon = () => navigate('/proximamente');
    const goToRestaurantLogin = (isAvailable: boolean) => {
        navigate(
            isAvailable ? '/login?restaurant=sabor-tradicion' : '/proximamente',
        );
    };

    return (
        <Layout
            style={{
                minHeight: '100vh',
                overflowX: 'hidden',
                overflowY: 'auto',
                background: isDarkMode
                    ? 'radial-gradient(circle at top left, rgba(127, 29, 29, 0.42), transparent 34%), linear-gradient(135deg, #110f0f 0%, #1b1414 48%, #070707 100%)'
                    : 'radial-gradient(circle at top left, rgba(239, 68, 68, 0.16), transparent 34%), linear-gradient(135deg, #fff7ed 0%, #fff 52%, #fee2e2 100%)',
                color: token.colorText,
            }}
        >
            <div style={{ padding: '28px min(6vw, 72px)' }}>
                <Row align="middle" justify="space-between" gutter={[24, 24]}>
                    <Col>
                        <Space size="middle">
                            <div
                                style={{
                                    alignItems: 'center',
                                    background:
                                        'linear-gradient(135deg, #ef4444, #f97316)',
                                    borderRadius: '18px',
                                    boxShadow:
                                        '0 18px 40px rgba(239, 68, 68, 0.28)',
                                    color: '#fff',
                                    display: 'flex',
                                    height: '52px',
                                    justifyContent: 'center',
                                    width: '52px',
                                }}
                            >
                                <CoffeeOutlined style={{ fontSize: '26px' }} />
                            </div>
                            <div>
                                <Text
                                    strong
                                    style={{
                                        display: 'block',
                                        fontSize: '18px',
                                    }}
                                >
                                    Restaurante Cloud
                                </Text>
                                <Text type="secondary">
                                    Gestión multi-restaurante
                                </Text>
                            </div>
                        </Space>
                    </Col>

                    <Col flex="auto">
                        <Space
                            wrap
                            size="small"
                            style={{
                                background: isDarkMode
                                    ? 'rgba(255, 255, 255, 0.08)'
                                    : 'rgba(255, 255, 255, 0.78)',
                                border: `1px solid ${
                                    isDarkMode
                                        ? 'rgba(255, 255, 255, 0.1)'
                                        : 'rgba(239, 68, 68, 0.12)'
                                }`,
                                borderRadius: '999px',
                                boxShadow: isDarkMode
                                    ? '0 20px 55px rgba(0, 0, 0, 0.3)'
                                    : '0 20px 55px rgba(239, 68, 68, 0.1)',
                                justifyContent: 'center',
                                padding: '8px',
                                width: '100%',
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
                                        color: token.colorText,
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
                            onChange={() =>
                                setMode(isDarkMode ? 'light' : 'dark')
                            }
                        />
                    </Col>
                </Row>

                <Row
                    align="middle"
                    gutter={[48, 48]}
                    style={{
                        minHeight: 'calc(100vh - 120px)',
                        padding: '56px 0 36px',
                    }}
                >
                    <Col xs={24} lg={13}>
                        <Space
                            direction="vertical"
                            size="large"
                            style={{ width: '100%' }}
                        >
                            <Tag
                                color="red"
                                style={{
                                    borderRadius: '999px',
                                    fontSize: '14px',
                                    padding: '6px 14px',
                                    width: 'fit-content',
                                }}
                            >
                                Plataforma preparada para multi-tenancy
                            </Tag>

                            <div>
                                <Title
                                    style={{
                                        fontSize: 'clamp(40px, 7vw, 82px)',
                                        letterSpacing: '-3px',
                                        lineHeight: 0.94,
                                        marginBottom: '24px',
                                    }}
                                >
                                    Centraliza tus restaurantes desde una sola
                                    plataforma.
                                </Title>
                                <Paragraph
                                    style={{
                                        color: token.colorTextSecondary,
                                        fontSize: 'clamp(17px, 2vw, 22px)',
                                        lineHeight: 1.65,
                                        maxWidth: '720px',
                                    }}
                                >
                                    Un ecosistema moderno, rápido y seguro para
                                    administrar operaciones, equipos, pagos y
                                    pedidos con una experiencia diseñada para
                                    crecer junto a tu negocio gastronómico.
                                </Paragraph>
                            </div>

                            <Space wrap size="middle">
                                <Button
                                    icon={<RocketOutlined />}
                                    onClick={() => goToRestaurantLogin(true)}
                                    size="large"
                                    type="primary"
                                    style={{
                                        background:
                                            'linear-gradient(135deg, #ef4444, #f97316)',
                                        border: 0,
                                        borderRadius: '999px',
                                        boxShadow:
                                            '0 18px 38px rgba(239, 68, 68, 0.28)',
                                        fontWeight: 700,
                                        height: '48px',
                                        paddingInline: '24px',
                                    }}
                                >
                                    Entrar a Sabor & Tradición
                                </Button>
                                <Button
                                    icon={<CompassOutlined />}
                                    onClick={goToComingSoon}
                                    size="large"
                                    shape="round"
                                >
                                    Ver restaurantes
                                </Button>
                            </Space>
                        </Space>
                    </Col>

                    <Col xs={24} lg={11}>
                        <Card
                            bordered={false}
                            style={{
                                background: isDarkMode
                                    ? 'rgba(20, 20, 20, 0.76)'
                                    : 'rgba(255, 255, 255, 0.82)',
                                border: `1px solid ${
                                    isDarkMode
                                        ? 'rgba(255, 255, 255, 0.1)'
                                        : 'rgba(239, 68, 68, 0.13)'
                                }`,
                                borderRadius: '36px',
                                boxShadow: isDarkMode
                                    ? '0 35px 100px rgba(0, 0, 0, 0.44)'
                                    : '0 35px 100px rgba(127, 29, 29, 0.13)',
                                overflow: 'hidden',
                            }}
                            styles={{ body: { padding: '28px' } }}
                        >
                            <Space
                                direction="vertical"
                                size="large"
                                style={{ width: '100%' }}
                            >
                                <div>
                                    <Text type="secondary" strong>
                                        Selecciona tu restaurante
                                    </Text>
                                    <Title
                                        level={3}
                                        style={{ margin: '6px 0 0' }}
                                    >
                                        Acceso por tenant
                                    </Title>
                                </div>

                                {restaurants.map((restaurant) => (
                                    <button
                                        key={restaurant.name}
                                        onClick={() =>
                                            goToRestaurantLogin(
                                                restaurant.available,
                                            )
                                        }
                                        type="button"
                                        style={{
                                            alignItems: 'center',
                                            background: isDarkMode
                                                ? 'rgba(255, 255, 255, 0.055)'
                                                : 'rgba(255, 255, 255, 0.9)',
                                            border: `1px solid ${restaurant.accent}55`,
                                            borderRadius: '24px',
                                            boxShadow: `0 18px 48px ${restaurant.accent}22`,
                                            color: token.colorText,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            gap: '18px',
                                            padding: '18px',
                                            textAlign: 'left',
                                            transition:
                                                'transform 0.2s ease, border-color 0.2s ease',
                                            width: '100%',
                                        }}
                                    >
                                        <span
                                            style={{
                                                alignItems: 'center',
                                                background: `${restaurant.accent}1f`,
                                                borderRadius: '18px',
                                                color: restaurant.accent,
                                                display: 'flex',
                                                flex: '0 0 56px',
                                                height: '56px',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <ShopOutlined
                                                style={{ fontSize: '28px' }}
                                            />
                                        </span>
                                        <span style={{ flex: 1 }}>
                                            <Text
                                                strong
                                                style={{
                                                    color: restaurant.available
                                                        ? restaurant.accent
                                                        : token.colorText,
                                                    display: 'block',
                                                    fontSize: '18px',
                                                }}
                                            >
                                                {restaurant.name}
                                            </Text>
                                            <Text type="secondary">
                                                {restaurant.description}
                                            </Text>
                                        </span>
                                        <Tag
                                            color={
                                                restaurant.available
                                                    ? 'success'
                                                    : 'default'
                                            }
                                        >
                                            {restaurant.available
                                                ? 'Disponible'
                                                : 'Próximo'}
                                        </Tag>
                                    </button>
                                ))}
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};
