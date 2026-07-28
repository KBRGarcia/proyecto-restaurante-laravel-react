import { RefineThemes } from "@refinedev/antd";

export const customRedTheme = {
    ...RefineThemes.Blue,
    token: {
        ...RefineThemes.Blue.token,
        colorPrimary: "#ef4444",
        colorInfo: "#ef4444",
    },
    components: {
        Button: {
            colorPrimary: "#1677ff",
            colorPrimaryHover: "#4096ff",
            colorPrimaryActive: "#0958d9",
            borderRadius: 6,
        },
    },
};
