import { Route, Routes } from "react-router";
import { CustomLogin } from "@/components/auth/CustomLogin";
import { CustomRegister } from "@/components/auth/CustomRegister";
import { ComingSoonPage } from "@/pages/coming-soon";
import { HomePage } from "@/pages/home";
import { protectedResourceRoutes } from "@/router/protected-resource-routes";

export function AppRoutes() {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/proximamente" element={<ComingSoonPage />} />
            <Route path="/login" element={<CustomLogin />} />
            <Route path="/register" element={<CustomRegister />} />
            {protectedResourceRoutes}
            <Route path="*" element={<ComingSoonPage />} />
        </Routes>
    );
}
