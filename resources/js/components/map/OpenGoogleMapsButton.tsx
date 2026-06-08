import { LinkOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { buildGoogleMapsUrl } from "@/lib/branch-location";

type OpenGoogleMapsButtonProps = {
    latitude: unknown;
    longitude: unknown;
};

export const OpenGoogleMapsButton = ({ latitude, longitude }: OpenGoogleMapsButtonProps) => {
    const googleMapsUrl = buildGoogleMapsUrl(latitude, longitude);

    return (
        <Button
            type="default"
            icon={<LinkOutlined />}
            href={googleMapsUrl ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            disabled={!googleMapsUrl}
            style={{ marginTop: 12 }}
        >
            Abrir en Google Maps
        </Button>
    );
};
