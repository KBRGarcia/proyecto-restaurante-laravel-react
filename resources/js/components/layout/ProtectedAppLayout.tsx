import { ThemedLayout, ThemedSider } from "@refinedev/antd";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";
import { SidebarTitle } from "@/components/layout/SidebarTitle";

export function ProtectedAppLayout() {
    return (
        <ThemedLayout
            Header={Header}
            Sider={(props) => (
                <ThemedSider
                    {...props}
                    Title={({ collapsed }) => <SidebarTitle collapsed={collapsed} />}
                    render={({ items }) => (
                        <>
                            {items}
                            {/* Sin {Logout} — el cierre de sesión queda en el Header */}
                        </>
                    )}
                />
            )}
        >
            <Outlet />
        </ThemedLayout>
    );
}
