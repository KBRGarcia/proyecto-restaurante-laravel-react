import React from "react";
import { useList } from "@refinedev/core";
import {
    Card,
    Row,
    Col,
    Statistic,
    Table,
    Tag,
    Rate,
    List,
    Avatar,
    Typography,
    Space,
    Skeleton,
    theme,
} from "antd";
import {
    UserOutlined,
    ShopOutlined,
    CoffeeOutlined,
    ShoppingCartOutlined,
    StarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

export const CustomDashboard: React.FC = () => {
    const { token } = useToken();

    // Obtener datos dinámicamente usando ganchos de Refine
    const { query: usersQuery, result: usersResult } = useList<any>({
        resource: "users",
        pagination: { mode: "off" },
    });

    const { query: branchesQuery, result: branchesResult } = useList<any>({
        resource: "branches",
        pagination: { mode: "off" },
    });

    const { query: productsQuery, result: productsResult } = useList<any>({
        resource: "products",
        pagination: { mode: "off" },
    });

    const { query: ordersQuery, result: ordersResult } = useList<any>({
        resource: "orders",
        pagination: { pageSize: 5, currentPage: 1 },
        sorters: [{ field: "id", order: "desc" }],
    });

    const { query: evaluationsQuery, result: evaluationsResult } = useList<any>({
        resource: "evaluations",
        pagination: { pageSize: 5, currentPage: 1 },
        sorters: [{ field: "id", order: "desc" }],
    });

    const getStatusTagColor = (status: string) => {
        switch (status) {
            case "pending":
                return "orange";
            case "preparing":
                return "blue";
            case "ready":
                return "green";
            case "delivered":
                return "cyan";
            case "canceled":
                return "red";
            default:
                return "default";
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "pending":
                return "Pendiente";
            case "preparing":
                return "En Cocina";
            case "ready":
                return "Listo";
            case "delivered":
                return "Entregado";
            case "canceled":
                return "Cancelado";
            default:
                return status;
        }
    };

    const stats = [
        {
            title: "Usuarios Totales",
            value: usersResult?.total ?? 0,
            icon: <UserOutlined style={{ fontSize: "24px", color: "#3f8600" }} />,
            loading: usersQuery.isLoading,
            color: "rgba(63, 134, 0, 0.05)",
            border: "1px solid rgba(63, 134, 0, 0.15)",
        },
        {
            title: "Sucursales",
            value: branchesResult?.total ?? 0,
            icon: <ShopOutlined style={{ fontSize: "24px", color: "#1890ff" }} />,
            loading: branchesQuery.isLoading,
            color: "rgba(24, 144, 255, 0.05)",
            border: "1px solid rgba(24, 144, 255, 0.15)",
        },
        {
            title: "Platos en Menú",
            value: productsResult?.total ?? 0,
            icon: <CoffeeOutlined style={{ fontSize: "24px", color: "#faad14" }} />,
            loading: productsQuery.isLoading,
            color: "rgba(250, 173, 20, 0.05)",
            border: "1px solid rgba(250, 173, 20, 0.15)",
        },
        {
            title: "Pedidos del Mes",
            value: ordersResult?.total ?? 0,
            icon: <ShoppingCartOutlined style={{ fontSize: "24px", color: "#cf1322" }} />,
            loading: ordersQuery.isLoading,
            color: "rgba(207, 19, 34, 0.05)",
            border: "1px solid rgba(207, 19, 34, 0.15)",
        },
    ];

    const orderColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (id: number) => <Link to={`/orders/show/${id}`}>#{id}</Link>,
        },
        {
            title: "Cliente",
            dataIndex: ["user", "name"],
            key: "client",
            render: (_: any, record: any) => record.user ? `${record.user.name} ${record.user.last_name || ""}` : `Usuario #${record.user_id}`,
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (total: number, record: any) => (
                <Text strong>
                    {record.currency === "nacional" ? "Bs." : "$"} {Number(total).toFixed(2)}
                </Text>
            ),
        },
        {
            title: "Estado",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={getStatusTagColor(status)}>{getStatusLabel(status)}</Tag>
            ),
        },
    ];

    return (
        <div style={{ padding: "12px 0 24px 0" }}>
            <div style={{ marginBottom: "24px" }}>
                <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
                    Panel de Control
                </Title>
                <Text type="secondary">
                    Bienvenido de vuelta. Aquí está el resumen de las operaciones de hoy.
                </Text>
            </div>

            {/* Fila de Estadísticas */}
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
                {stats.map((item, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <Card
                            bordered={true}
                            style={{
                                borderRadius: "12px",
                                backgroundColor: token.colorBgContainer,
                                border: item.border,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                            }}
                        >
                            <Skeleton loading={item.loading} active avatar paragraph={{ rows: 1 }}>
                                <Row align="middle" justify="space-between">
                                    <Col>
                                        <Statistic
                                            title={item.title}
                                            value={item.value}
                                            valueStyle={{ fontWeight: 700, fontSize: "28px" }}
                                        />
                                    </Col>
                                    <Col>
                                        <div
                                            style={{
                                                padding: "12px",
                                                borderRadius: "10px",
                                                backgroundColor: item.color,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {item.icon}
                                        </div>
                                    </Col>
                                </Row>
                            </Skeleton>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Fila de Contenido Principal */}
            <Row gutter={[24, 24]}>
                {/* Tabla de Pedidos Recientes */}
                <Col xs={24} lg={16}>
                    <Card
                        title={
                            <Space>
                                <ShoppingCartOutlined />
                                <span>Últimos Pedidos</span>
                            </Space>
                        }
                        style={{
                            borderRadius: "12px",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
                        }}
                    >
                        <Table
                            dataSource={ordersResult?.data}
                            columns={orderColumns}
                            rowKey="id"
                            loading={ordersQuery.isLoading}
                            pagination={false}
                            size="middle"
                        />
                    </Card>
                </Col>

                {/* Lista de Valoraciones Recientes */}
                <Col xs={24} lg={8}>
                    <Card
                        title={
                            <Space>
                                <StarOutlined />
                                <span>Valoraciones Recientes</span>
                            </Space>
                        }
                        style={{
                            borderRadius: "12px",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
                        }}
                    >
                        {evaluationsQuery.isLoading ? (
                            <Skeleton active paragraph={{ rows: 6 }} />
                        ) : (
                            <List
                                itemLayout="horizontal"
                                dataSource={evaluationsResult?.data}
                                renderItem={(item: any) => (
                                    <List.Item style={{ padding: "12px 0" }}>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar
                                                    src={item.user?.profile_picture}
                                                    icon={<UserOutlined />}
                                                />
                                            }
                                            title={
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <Text strong>
                                                        {item.user ? `${item.user.name} ${item.user.last_name || ""}` : `Usuario #${item.user_id}`}
                                                    </Text>
                                                    <Rate disabled defaultValue={item.rating} style={{ fontSize: "12px" }} />
                                                </div>
                                            }
                                            description={
                                                <div>
                                                    <Paragraph style={{ margin: "4px 0 0 0", color: token.colorTextDescription }}>
                                                        "{item.comment || "Sin comentarios"}"
                                                    </Paragraph>
                                                    {item.product && (
                                                        <Tag color="blue" style={{ marginTop: "6px" }}>
                                                            {item.product.name}
                                                        </Tag>
                                                    )}
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};