import type { ClientPurchaseStatsDisplay } from "@/hooks/useLinkedUserProfileFields";
import { Col, Form, Input, InputNumber, Row, Spin, Typography } from "antd";

type ClientPurchaseStatsFieldsProps = {
    stats?: ClientPurchaseStatsDisplay | null;
    loading?: boolean;
};

const emptyValue = "Sin compras registradas";

export const ClientPurchaseStatsFields = ({ stats, loading = false }: ClientPurchaseStatsFieldsProps) => {
    return (
        <Spin spinning={loading}>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 16 }}>
                Estos datos se calculan automaticamente desde las ordenes entregadas y no pueden editarse manualmente.
            </Typography.Paragraph>

            <Row gutter={16}>
                <Col xs={24} sm={8}>
                    <Form.Item label="Primera compra">
                        <Input
                            readOnly
                            disabled
                            value={stats?.first_purchase_at_formatted ?? emptyValue}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item label="Ultima compra">
                        <Input
                            readOnly
                            disabled
                            value={stats?.last_purchase_at_formatted ?? emptyValue}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item label="Total de ordenes">
                        <InputNumber
                            readOnly
                            disabled
                            min={0}
                            style={{ width: "100%" }}
                            value={stats?.total_orders ?? 0}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={8}>
                    <Form.Item label="Total comprado">
                        <InputNumber
                            readOnly
                            disabled
                            min={0}
                            step={0.01}
                            style={{ width: "100%" }}
                            value={Number(stats?.total_spent ?? 0)}
                            formatter={(value) => `$ ${value}`}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Spin>
    );
};
