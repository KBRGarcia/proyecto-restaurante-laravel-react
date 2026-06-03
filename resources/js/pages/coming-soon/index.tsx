import {
    ArrowLeftOutlined,
    MoonOutlined,
    RocketOutlined,
    SunOutlined,
} from '@ant-design/icons';
import { Button, Card, Layout, Space, Switch, Typography, theme } from 'antd';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorModeContext } from '../../contexts/color-mode';

const { Paragraph, Text, Title } = Typography;

export const ComingSoonPage: React.FC = () => {
    const navigate = useNavigate();
    const { token } = theme.useToken();
    const { mode, setMode } = useContext(ColorModeContext);
    const isDarkMode = mode === 'dark';

    return (
        <Layout
            style={{
                alignItems: 'center',
                background: isDarkMode
                    ? 'radial-gradient(circle at center, rgba(127, 29, 29, 0.34), transparent 36%), #0f0b0b'
                    : 'radial-gradient(circle at center, rgba(239, 68, 68, 0.14), transparent 36%), #fff7ed',
                display: 'flex',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '24px',
            }}
        >
            <div style={{ position: 'absolute', right: '28px', top: '28px' }}>
                <Switch
                    checked={isDarkMode}
                    checkedChildren={<MoonOutlined />}
                    unCheckedChildren={<SunOutlined />}
                    onChange={() => setMode(isDarkMode ? 'light' : 'dark')}
                />
            </div>

            <Card
                bordered={false}
                style={{
                    background: isDarkMode
                        ? 'rgba(20, 20, 20, 0.82)'
                        : 'rgba(255, 255, 255, 0.9)',
                    border: `1px solid ${
                        isDarkMode
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(239, 68, 68, 0.14)'
                    }`,
                    borderRadius: '32px',
                    boxShadow: isDarkMode
                        ? '0 35px 90px rgba(0, 0, 0, 0.42)'
                        : '0 35px 90px rgba(127, 29, 29, 0.12)',
                    maxWidth: '620px',
                    textAlign: 'center',
                    width: '100%',
                }}
                styles={{ body: { padding: '48px 36px' } }}
            >
                <Space
                    direction="vertical"
                    size="large"
                    style={{ width: '100%' }}
                >
                    <div
                        style={{
                            alignItems: 'center',
                            background:
                                'linear-gradient(135deg, #ef4444, #f97316)',
                            borderRadius: '28px',
                            color: '#fff',
                            display: 'inline-flex',
                            height: '84px',
                            justifyContent: 'center',
                            margin: '0 auto',
                            width: '84px',
                        }}
                    >
                        <RocketOutlined style={{ fontSize: '38px' }} />
                    </div>

                    <div>
                        <Text type="secondary" strong>
                            Módulo en construcción
                        </Text>
                        <Title
                            level={1}
                            style={{
                                color: token.colorText,
                                margin: '10px 0 12px',
                            }}
                        >
                            Disponible Próximamente...
                        </Title>
                        <Paragraph
                            style={{
                                color: token.colorTextSecondary,
                                fontSize: '17px',
                                margin: '0 auto',
                                maxWidth: '460px',
                            }}
                        >
                            Esta sección quedará lista cuando se integren las
                            siguientes funcionalidades de navegación y selección
                            multi-restaurante.
                        </Paragraph>
                    </div>

                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/')}
                        shape="round"
                        size="large"
                    >
                        Volver al inicio
                    </Button>
                </Space>
            </Card>
        </Layout>
    );
};
