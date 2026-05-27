import { RefineThemes } from "@refinedev/antd";
import { ConfigProvider, theme } from "antd";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

type ColorModeContextType = {
    mode: string;
    setMode: (mode: string) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({} as ColorModeContextType);

// Configuración personalizada para colores Rojos en vez de los temas por defecto de Refine
const customRedTheme = {
    ...RefineThemes.Blue, // Heredamos algunas variables de estructura de Refine
    token: {
        ...RefineThemes.Blue.token,
        colorPrimary: '#ef4444', // Rojo
        colorInfo: '#ef4444', 
    },

    components: {
        Button: {
            colorPrimary: '#1677ff', // Los botones primary son azules por defecto.
            colorPrimaryHover: '#4096ff', // El color azul mas claro para el hover.
            colorPrimaryActive: '#0958d9', // El color azul oscuro al hacer click.
            borderRadius: 6, // Botones redondeados
        }
    },
};

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const colorModeFromLocalStorage = localStorage.getItem("colorMode");
    const isSystemPreferenceDark = window?.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;

    const systemPreference = isSystemPreferenceDark ? "dark" : "light";
    const [mode, setMode] = useState(
        colorModeFromLocalStorage || systemPreference,
    );

    useEffect(() => {
        window.localStorage.setItem("colorMode", mode);
        if (mode === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [mode]);

    const setColorMode = () => {
        if (mode === "light") {
            setMode("dark");
        } else {
            setMode("light");
        }
    };

    const { darkAlgorithm, defaultAlgorithm } = theme;

    return (
        <ColorModeContext.Provider
            value={{
                setMode: setColorMode,
                mode,
            }}
        >
            <ConfigProvider
                theme={{
                    ...customRedTheme,
                    algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
                }}
            >
                {children}
            </ConfigProvider>
        </ColorModeContext.Provider>
    );
};
