import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { Refine } from "@refinedev/core";
import routerProvider, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter } from "react-router";
import { AppSystemShell } from "@/components/layout/AppSystemShell";
import { refineResources } from "@/config/refine-resources";
import { ColorModeContextProvider } from "@/contexts/color-mode";
import { API_URL, axiosInstance } from "@/lib/api-client";
import { accessControlProvider } from "@/providers/access-control-provider";
import { authProvider } from "@/providers/auth-provider";
import { AppRoutes } from "@/router/app-routes";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <AppSystemShell>
                <ColorModeContextProvider>
                    <Refine
                        dataProvider={dataProvider(API_URL, axiosInstance)}
                        routerProvider={routerProvider}
                        authProvider={authProvider}
                        accessControlProvider={accessControlProvider}
                        notificationProvider={useNotificationProvider}
                        resources={refineResources}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        <AppRoutes />
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </ColorModeContextProvider>
            </AppSystemShell>
        </BrowserRouter>
    );
}
