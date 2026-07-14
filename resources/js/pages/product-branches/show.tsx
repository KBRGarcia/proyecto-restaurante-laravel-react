import { Show } from "@refinedev/antd";
import { Card, Col, Descriptions, Row, Tag, Typography, theme } from "antd";
import { ShopOutlined, InboxOutlined } from "@ant-design/icons";
import { useShow } from "@refinedev/core";
import {
    formatDateLabel,
    getDescriptionsContentStyle,
    getDescriptionsLabelStyle,
    getHeaderCardStyle,
    getSectionCardStyle,
} from "@/components/show/showPageStyles";

const { Title, Text } = Typography;

export const ProductBranchesShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;
    const { token } = theme.useToken();

    return (
        <Show isLoading={isLoading}>
            <Card style={getHeaderCardStyle("#13c2c2", token)} bodyStyle={{ padding: "20px 24px" }}>
                <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
                    {record?.product_name || "Asignación producto-sucursal"}
                </Title>
                <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <Tag color={record?.available ? "success" : "error"}>
                        {record?.available ? "Disponible" : "No disponible"}
                    </Tag>
                    <Tag icon={<ShopOutlined />}>{record?.branch_name || "Sucursal"}</Tag>
                </div>
            </Card>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} lg={14}>
                    <Card title="Detalle" style={getSectionCardStyle(token)}>
                        <Descriptions
                            column={{ xs: 1, sm: 2 }}
                            bordered
                            size="middle"
                            labelStyle={getDescriptionsLabelStyle(token)}
                            contentStyle={getDescriptionsContentStyle(token)}
                        >
                            <Descriptions.Item label="Producto">
                                <Text>
                                    <InboxOutlined style={{ marginRight: 8 }} />
                                    {record?.product_name || "N/A"}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Sucursal">
                                {record?.branch_name || "N/A"}
                                {record?.branch_city ? ` (${record.branch_city})` : ""}
                            </Descriptions.Item>
                            <Descriptions.Item label="Precio base">
                                {record?.product_price != null
                                    ? `$${Number(record.product_price).toFixed(2)}`
                                    : "—"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Precio especial">
                                {record?.special_price != null
                                    ? `$${Number(record.special_price).toFixed(2)}`
                                    : "Sin precio especial"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Precio efectivo">
                                {record?.effective_price != null
                                    ? `$${Number(record.effective_price).toFixed(2)}`
                                    : "—"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Disponible">
                                <Tag color={record?.available ? "success" : "error"}>
                                    {record?.available ? "Sí" : "No"}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Fecha de asignación">
                                {formatDateLabel(record?.assignment_date)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Creado">
                                {formatDateLabel(record?.created_at)}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
