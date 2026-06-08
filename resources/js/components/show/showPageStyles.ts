import type { GlobalToken } from "antd/es/theme/interface";

export const getHeaderCardStyle = (accentColor: string, token: GlobalToken) => ({
    borderRadius: 12,
    borderLeft: `6px solid ${accentColor}`,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    marginBottom: 16,
    backgroundColor: token.colorBgContainer,
});

export const getSectionCardStyle = (token: GlobalToken, marginTop = 0) => ({
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
    height: "100%" as const,
    backgroundColor: token.colorBgContainer,
    ...(marginTop > 0 ? { marginTop } : {}),
});

export const getDescriptionsLabelStyle = (token: GlobalToken) => ({
    backgroundColor: token.colorFillAlter,
    fontWeight: 600,
    width: "140px",
    color: token.colorText,
});

export const getDescriptionsContentStyle = (token: GlobalToken) => ({
    backgroundColor: token.colorBgContainer,
    color: token.colorText,
});

export const getStatWidgetStyle = (rgbaColor: string) => ({
    borderRadius: 8,
    background: rgbaColor,
    boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
});

export const getInnerStatCardStyle = (token: GlobalToken) => ({
    borderRadius: 8,
    textAlign: "center" as const,
    background: token.colorBgLayout,
    border: `1px solid ${token.colorBorderSecondary}`,
});

export const getJsonPreStyle = (token: GlobalToken) => ({
    padding: "12px",
    backgroundColor: token.colorBgLayout,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: 8,
    overflowX: "auto" as const,
    fontSize: 12,
    margin: 0,
    color: token.colorText,
});

export const formatDateLabel = (value?: string | null, fallback = "N/A") => {
    if (!value) return fallback;

    return new Date(value).toLocaleDateString("es-VE", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export const formatDateTimeLabel = (value?: string | null, fallback = "N/A") => {
    if (!value) return fallback;

    return new Date(value).toLocaleString("es-VE", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};
