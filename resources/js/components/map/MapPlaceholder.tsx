import { Spin, Typography } from "antd";

type MapPlaceholderProps = {
    height?: number;
    loading?: boolean;
};

export const MapPlaceholder = ({ height = 320, loading = false }: MapPlaceholderProps) => (
    <div
        style={{
            height,
            width: "100%",
            borderRadius: 8,
            overflow: "hidden",
            border: "1px solid #d9d9d9",
            background: "#f5f5f5",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
        }}
    >
        {loading ? (
            <>
                <Spin size="large" />
                <Typography.Text type="secondary">Cargando mapa...</Typography.Text>
            </>
        ) : null}
    </div>
);
