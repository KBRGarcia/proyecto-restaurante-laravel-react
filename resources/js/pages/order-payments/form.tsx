import { useEffect } from "react";
import { Form, Input, Select, InputNumber, Row, Col } from "antd";
import { useSelect } from "@refinedev/antd";
import type { FormInstance } from "antd";
import { PhoneNumberField } from "@/components/form/PhoneNumberField";

type PaymentCurrency = "nacional" | "internacional";

type PaymentMethodOption = {
    value: string;
    label: string;
    currency: PaymentCurrency;
    requiredFields: string[];
    optionalFields: string[];
};

const PAYMENT_METHODS: PaymentMethodOption[] = [
    {
        value: "transferencia_bancaria",
        label: "Transferencia Bancaria",
        currency: "nacional",
        requiredFields: ["payer_identification", "reference_number", "source_bank_code", "destination_bank_code", "paid_at"],
        optionalFields: ["proof_image_path", "notes"],
    },
    {
        value: "pago_movil",
        label: "Pago Movil",
        currency: "nacional",
        requiredFields: ["payer_identification", "payer_phone", "source_bank_code", "reference_number"],
        optionalFields: ["proof_image_path", "paid_at", "notes"],
    },
    {
        value: "efectivo_nacional",
        label: "Efectivo Nacional",
        currency: "nacional",
        requiredFields: [],
        optionalFields: ["paid_at", "notes"],
    },
    {
        value: "tarjeta_nacional",
        label: "Tarjeta Nacional",
        currency: "nacional",
        requiredFields: ["reference_number"],
        optionalFields: ["card_last_four", "card_network", "paid_at", "notes"],
    },
    {
        value: "paypal",
        label: "PayPal",
        currency: "internacional",
        requiredFields: ["payer_email", "reference_number"],
        optionalFields: ["paid_at", "proof_image_path", "notes"],
    },
    {
        value: "zelle",
        label: "Zelle",
        currency: "internacional",
        requiredFields: ["payer_email", "reference_number"],
        optionalFields: ["account_holder_name", "paid_at", "proof_image_path", "notes"],
    },
    {
        value: "zinli",
        label: "Zinli",
        currency: "internacional",
        requiredFields: ["account_identifier", "reference_number"],
        optionalFields: ["payer_phone", "payer_email", "paid_at", "proof_image_path", "notes"],
    },
    {
        value: "wally",
        label: "Wally",
        currency: "internacional",
        requiredFields: ["account_identifier", "reference_number"],
        optionalFields: ["payer_phone", "payer_email", "paid_at", "proof_image_path", "notes"],
    },
    {
        value: "tarjeta_credito",
        label: "Tarjeta de Credito",
        currency: "internacional",
        requiredFields: ["reference_number"],
        optionalFields: ["payer_email", "card_last_four", "card_network", "paid_at", "notes"],
    },
    {
        value: "binance",
        label: "Binance",
        currency: "internacional",
        requiredFields: ["transaction_id"],
        optionalFields: ["account_identifier", "paid_at", "proof_image_path", "notes"],
    },
    {
        value: "efectivo_internacional",
        label: "Efectivo Internacional",
        currency: "internacional",
        requiredFields: [],
        optionalFields: ["paid_at", "notes"],
    },
];

type OrderPaymentFormProps = {
    form: FormInstance;
    formProps: object;
};

export const OrderPaymentForm = ({ form, formProps }: OrderPaymentFormProps) => {
    const currency = Form.useWatch("currency", form) as PaymentCurrency | undefined;
    const method = Form.useWatch("method", form) as string | undefined;

    const { selectProps: orderSelectProps } = useSelect({
        resource: "orders",
        optionLabel: "id",
        optionValue: "id",
    });

    const { selectProps: bankSelectProps } = useSelect({
        resource: "banks",
        optionLabel: "name",
        optionValue: "code",
    });

    const availableMethods = PAYMENT_METHODS.filter((option) => option.currency === currency);
    const selectedMethod = PAYMENT_METHODS.find((option) => option.value === method);
    const shouldShow = (field: string) => Boolean(selectedMethod?.requiredFields.includes(field) || selectedMethod?.optionalFields.includes(field));
    const isRequired = (field: string) => Boolean(selectedMethod?.requiredFields.includes(field));

    useEffect(() => {
        if (method && currency && selectedMethod?.currency !== currency) {
            form.setFieldValue("method", undefined);
        }
    }, [currency, form, method, selectedMethod?.currency]);

    return (
        <Form {...formProps} form={form} layout="vertical">
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item label="Orden" name="order_id" rules={[{ required: true, message: "La orden es obligatoria" }]}>
                        <Select {...orderSelectProps} placeholder="Selecciona una orden" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="Moneda" name="currency" rules={[{ required: true, message: "La moneda es obligatoria" }]} initialValue="nacional">
                        <Select
                            options={[
                                { value: "nacional", label: "Moneda Nacional" },
                                { value: "internacional", label: "Moneda Internacional" },
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="Metodo de Pago" name="method" rules={[{ required: true, message: "El metodo es obligatorio" }]}>
                        <Select
                            placeholder="Selecciona un metodo"
                            disabled={!currency}
                            options={availableMethods.map((option) => ({ value: option.value, label: option.label }))}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item label="Monto" name="amount" rules={[{ required: true, message: "El monto es obligatorio" }]}>
                        <InputNumber min={0.01} step={0.01} style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="Estado" name="status" initialValue="pending">
                        <Select
                            options={[
                                { value: "pending", label: "Pendiente" },
                                { value: "confirmed", label: "Confirmado" },
                                { value: "rejected", label: "Rechazado" },
                                { value: "refunded", label: "Reembolsado" },
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="Tasa de Cambio" name="exchange_rate">
                        <InputNumber min={0} step={0.0001} style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                {shouldShow("payer_identification") && (
                    <Col xs={24} md={8}>
                        <Form.Item label="Cedula/RIF" name="payer_identification" rules={[{ required: isRequired("payer_identification") }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                )}
                {shouldShow("payer_phone") && (
                    <Col xs={24} md={8}>
                        <PhoneNumberField
                            name="payer_phone"
                            label="Telefono"
                            required={isRequired("payer_phone")}
                        />
                    </Col>
                )}
                {shouldShow("payer_email") && (
                    <Col xs={24} md={8}>
                        <Form.Item label="Correo del Pagador" name="payer_email" rules={[{ required: isRequired("payer_email") }, { type: "email" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                )}
            </Row>

            <Row gutter={16}>
                {shouldShow("source_bank_code") && (
                    <Col xs={24} md={8}>
                        <Form.Item label="Banco Origen" name="source_bank_code" rules={[{ required: isRequired("source_bank_code") }]}>
                            <Select {...bankSelectProps} placeholder="Selecciona banco origen" />
                        </Form.Item>
                    </Col>
                )}
                {shouldShow("destination_bank_code") && (
                    <Col xs={24} md={8}>
                        <Form.Item label="Banco Destino" name="destination_bank_code" rules={[{ required: isRequired("destination_bank_code") }]}>
                            <Select {...bankSelectProps} placeholder="Selecciona banco destino" />
                        </Form.Item>
                    </Col>
                )}
                {shouldShow("reference_number") && (
                    <Col xs={24} md={8}>
                        <Form.Item label="Referencia" name="reference_number" rules={[{ required: isRequired("reference_number") }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                )}
            </Row>

            <Row gutter={16}>
                {shouldShow("account_identifier") && (
                    <Col xs={24} md={8}>
                        <Form.Item label="Cuenta/Billetera" name="account_identifier" rules={[{ required: isRequired("account_identifier") }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                )}
                {shouldShow("account_holder_name") && (
                    <Col xs={24} md={8}>
                        <Form.Item label="Titular" name="account_holder_name" rules={[{ required: isRequired("account_holder_name") }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                )}
                {shouldShow("transaction_id") && (
                    <Col xs={24} md={8}>
                        <Form.Item label="ID de Transaccion" name="transaction_id" rules={[{ required: isRequired("transaction_id") }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                )}
            </Row>

            <Row gutter={16}>
                {shouldShow("card_last_four") && (
                    <Col xs={24} md={8}>
                        <Form.Item label="Ultimos 4 digitos" name="card_last_four">
                            <Input maxLength={4} />
                        </Form.Item>
                    </Col>
                )}
                {shouldShow("card_network") && (
                    <Col xs={24} md={8}>
                        <Form.Item label="Red de Tarjeta" name="card_network">
                            <Input placeholder="Visa, Mastercard..." />
                        </Form.Item>
                    </Col>
                )}
                {shouldShow("paid_at") && (
                    <Col xs={24} md={8}>
                        <Form.Item label="Fecha de Pago" name="paid_at" rules={[{ required: isRequired("paid_at") }]}>
                            <Input type="datetime-local" />
                        </Form.Item>
                    </Col>
                )}
            </Row>

            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item label="Comprobante" name="proof_image_path">
                        <Input placeholder="Ruta o URL del comprobante" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label="Confirmado en" name="confirmed_at">
                        <Input type="datetime-local" />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item label="Notas" name="notes">
                <Input.TextArea rows={3} />
            </Form.Item>
        </Form>
    );
};
