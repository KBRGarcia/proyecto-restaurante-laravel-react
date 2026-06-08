import { Spin } from "antd";

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
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        {loading ? <Spin tip="Cargando mapa..." /> : null}
    </div>
);
