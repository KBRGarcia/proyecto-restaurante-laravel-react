import { useCallback } from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Col, Form, InputNumber, Row, Typography } from "antd";
import { COORDINATE_PRECISION } from "@/lib/branch-location";
import { LazyBranchLocationMap } from "@/components/map/LazyBranchLocationMap";
import { OpenGoogleMapsButton } from "@/components/map/OpenGoogleMapsButton";
import { useMapDisplayCoordinates } from "@/hooks/useMapDisplayCoordinates";

const { Text } = Typography;

export const BranchLocationPicker = () => {
    const form = Form.useFormInstance();
    const latitude = Form.useWatch("latitude", form);
    const longitude = Form.useWatch("longitude", form);
    const { displayLatitude, displayLongitude, setDisplayCoordinates } = useMapDisplayCoordinates(
        latitude,
        longitude,
    );

    const handleLocationChange = useCallback(
        (nextLatitude: number, nextLongitude: number) => {
            setDisplayCoordinates(nextLatitude, nextLongitude);
            form.setFieldsValue({
                latitude: nextLatitude,
                longitude: nextLongitude,
            });
        },
        [form, setDisplayCoordinates],
    );

    return (
        <>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Latitud"
                        name="latitude"
                        rules={[
                            { type: "number", min: -90, max: 90, message: "La latitud debe estar entre -90 y 90" },
                        ]}
                    >
                        <InputNumber
                            min={-90}
                            max={90}
                            step={0.00000001}
                            precision={COORDINATE_PRECISION}
                            style={{ width: "100%" }}
                            placeholder="Ej: 10.506348"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Longitud"
                        name="longitude"
                        rules={[
                            {
                                type: "number",
                                min: -180,
                                max: 180,
                                message: "La longitud debe estar entre -180 y 180",
                            },
                        ]}
                    >
                        <InputNumber
                            min={-180}
                            max={180}
                            step={0.00000001}
                            precision={COORDINATE_PRECISION}
                            style={{ width: "100%" }}
                            placeholder="Ej: -66.914623"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <div style={{ marginBottom: 24 }}>
                <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                    <EnvironmentOutlined />
                    <Text strong>Ubicación en el mapa</Text>
                </div>
                <Text type="secondary" style={{ display: "block", marginBottom: 12 }}>
                    Haz clic en el mapa o arrastra el marcador para seleccionar la sucursal. También puedes
                    introducir las coordenadas manualmente.
                </Text>
                <LazyBranchLocationMap
                    latitude={displayLatitude}
                    longitude={displayLongitude}
                    onLocationChange={handleLocationChange}
                />
                <OpenGoogleMapsButton latitude={latitude} longitude={longitude} />
            </div>
        </>
    );
};
