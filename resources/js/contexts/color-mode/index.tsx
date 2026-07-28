import { ConfigProvider, theme } from "antd";
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import { ColorModeContext } from "./context";
import { customRedTheme } from "./theme";

export function ColorModeContextProvider({ children }: PropsWithChildren) {
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

    const setColorMode = useCallback(() => {
        setMode((current) => (current === "light" ? "dark" : "light"));
    }, []);

    const contextValue = useMemo(
        () => ({
            setMode: setColorMode,
            mode,
        }),
        [mode, setColorMode],
    );

    const { darkAlgorithm, defaultAlgorithm } = theme;

    return (
        <ColorModeContext.Provider value={contextValue}>
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
}
