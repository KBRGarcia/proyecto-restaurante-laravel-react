import { Show } from "@refinedev/antd";
import { Card, Col, Descriptions, Row, Table, Tag, Typography, theme } from "antd";
import { DollarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useShow } from "@refinedev/core";
import { Link } from "react-router";
import { OrderInvoiceDownloadDropdown } from "@/components/buttons/OrderInvoiceDownloadDropdown";
import { useOrderInvoiceImage } from "@/hooks/useOrderInvoiceImage";
import {
    getDescriptionsContentStyle,
    getDescriptionsLabelStyle,
    getHeaderCardStyle,
    getSectionCardStyle,
    getStatWidgetStyle,
} from "@/components/show/showPageStyles";
import { getOrderServiceTypeTag } from "@/lib/order-list-tags";

const { Title, Text } = Typography;

type OrderDetailItem = {
    id: number;
    product_id: number;
    quantity: number;
    unit_price: number | string;
    subtotal: number | string;
    product_notes?: string | null;
    product?: { name?: string } | null;
};

export const OrderDetailsShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;
    const { token } = theme.useToken();
    const {
        contextHolder,
        downloadInvoice,
        exportingOrderId,
        invoiceRenderer,
    } = useOrderInvoiceImage();

    const currencySymbol = record?.currency === "nacional" ? "Bs." : "$";
    const formatMoney = (value?: number | string) => `${currencySymbol} ${Number(value || 0).toFixed(2)}`;

    return (
        <Show
            isLoading={isLoading}
            headerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    {record?.order_id && (
                        <OrderInvoiceDownloadDropdown
                            orderId={record.order_id}
                            loading={exportingOrderId === record.order_id}
                            onDownload={downloadInvoice}
                            shape="default"
                        />
                    )}
                </>
            )}
        >
            {contextHolder}
            {invoiceRenderer}
            <Card style={getHeaderCardStyle("#722ed1", token)} bodyStyle={{ padding: "20px 24px" }}>
                <Row gutter={[24, 16]} align="middle" justify="space-between">
                    <Col xs={24} md={12}>
                        <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
                            Detalles de Orden #{record?.order_id}
                        </Title>
                        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                            <Tag icon={<ShoppingCartOutlined />} color="processing" style={{ borderRadius: 4 }}>
                                <Link to={`/orders/show/${record?.order_id}`} style={{ color: "inherit" }}>
                                    Ver orden completa
                                </Link>
                            </Tag>
                            {record?.service_type && getOrderServiceTypeTag(record.service_type)}
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <Row gutter={16} justify="end">
                            <Col xs={12} sm={8}>
                                <Card
                                    bordered={false}
                                    style={getStatWidgetStyle("rgba(82, 196, 26, 0.08)")}
                                    bodyStyle={{ padding: "12px 16px", textAlign: "center" }}
                                >
                                    <DollarOutlined style={{ fontSize: 20, color: "#52c41a" }} />
                                    <div style={{ fontSize: 11, color: token.colorTextDescription, marginTop: 4 }}>Total</div>
                                    <div style={{ fontSize: 16, fontWeight: "bold", color: token.colorText }}>
                                        {formatMoney(record?.total)}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={14}>
                    <Card title={<span style={{ fontWeight: 600 }}>Productos</span>} style={getSectionCardStyle(token)}>
                        <Table<OrderDetailItem>
                            rowKey="id"
                            dataSource={record?.items ?? []}
                            pagination={false}
                            size="middle"
                        >
                            <Table.Column
                                title="Producto"
                                render={(_, item) => item.product?.name ?? `Producto #${item.product_id}`}
                            />
                            <Table.Column dataIndex="quantity" title="Cantidad" />
                            <Table.Column
                                dataIndex="unit_price"
                                title="Precio Unitario"
                                render={(value) => formatMoney(value)}
                            />
                            <Table.Column
                                dataIndex="subtotal"
                                title="Subtotal"
                                render={(value) => <Text strong>{formatMoney(value)}</Text>}
                            />
                            <Table.Column
                                dataIndex="product_notes"
                                title="Notas"
                                render={(value) => value || "N/A"}
                            />
                        </Table>
                    </Card>
                </Col>

                <Col xs={24} lg={10}>
                    <Card title={<span style={{ fontWeight: 600 }}>Facturación y entrega</span>} style={getSectionCardStyle(token)}>
                        <Descriptions
                            column={1}
                            bordered
                            size="middle"
                            labelStyle={getDescriptionsLabelStyle(token)}
                            contentStyle={getDescriptionsContentStyle(token)}
                        >
                            <Descriptions.Item label="Moneda">
                                {record?.currency === "nacional" ? "Bolívares (Bs.)" : "Dólares ($)"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Subtotal">{formatMoney(record?.subtotal)}</Descriptions.Item>
                            <Descriptions.Item label="Impuestos (%)">{Number(record?.taxes ?? 0).toFixed(2)}%</Descriptions.Item>
                            <Descriptions.Item label="Total">
                                <Text strong style={{ color: "#52c41a" }}>
                                    {formatMoney(record?.total)}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Dirección de Entrega">
                                {record?.delivery_address || "Retiro en local"}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
