import { Show, DateField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Card, Col, Descriptions, Row, Tag, Typography } from "antd";
import { Link } from "react-router-dom";

const { Text } = Typography;

export const OrderPaymentsShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;
    const record = data?.data;

    const statusColor = {
        pending: "orange",
        confirmed: "success",
        rejected: "error",
        refunded: "purple",
    }[record?.status as string] || "default";

    return (
        <Show isLoading={isLoading}>
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card title="Resumen del Pago">
                        <Descriptions column={1} bordered size="small">
                            <Descriptions.Item label="Orden">
                                {record?.order_id ? <Link to={`/orders/show/${record.order_id}`}>Orden #{record.order_id}</Link> : "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Metodo">{record?.method_label || record?.method}</Descriptions.Item>
                            <Descriptions.Item label="Moneda">
                                <Tag color={record?.currency === "nacional" ? "blue" : "green"}>{record?.currency_label}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Monto">
                                <Text strong>{record?.currency_symbol} {Number(record?.amount || 0).toFixed(2)}</Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Estado">
                                <Tag color={statusColor}>{record?.status_label || record?.status}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Fecha de Pago">
                                {record?.paid_at ? <DateField format="LLL" value={record.paid_at} /> : "Sin fecha"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Confirmado en">
                                {record?.confirmed_at ? <DateField format="LLL" value={record.confirmed_at} /> : "Sin confirmar"}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="Datos del Metodo">
                        <Descriptions column={1} bordered size="small">
                            <Descriptions.Item label="Referencia">{record?.reference_number || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Cedula/RIF">{record?.payer_identification || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Telefono">{record?.payer_phone || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Correo">{record?.payer_email || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Banco Origen">{record?.source_bank_name || record?.source_bank_code || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Banco Destino">{record?.destination_bank_name || record?.destination_bank_code || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Cuenta/Billetera">{record?.account_identifier || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Titular">{record?.account_holder_name || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="ID Transaccion">{record?.transaction_id || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Tarjeta">{record?.card_last_four ? `**** ${record.card_last_four}` : "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Comprobante">{record?.proof_image_path || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Notas">{record?.notes || "Sin notas"}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
