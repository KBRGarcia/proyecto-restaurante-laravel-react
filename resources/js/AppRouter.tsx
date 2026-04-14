import { Refine, AuthProvider } from "@refinedev/core";
import { AuthPage, RefineThemes, useNotificationProvider } from "@refinedev/antd";
import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import axios from "axios";


import { UserList } from "./pages/users/list";
import { UserCreate } from "./pages/users/create";
import { UserEdit } from "./pages/users/edit";
import { UserShow } from "./pages/users/show";
import { BranchesList } from "./pages/branches/list";
import { BranchesCreate } from "./pages/branches/create";
import { BranchesEdit } from "./pages/branches/edit";
import { BranchesShow } from "./pages/branches/show";
import { CategoriesList } from "./pages/categories/list";
import { CategoriesCreate } from "./pages/categories/create";
import { CategoriesEdit } from "./pages/categories/edit";
import { CategoriesShow } from "./pages/categories/show";
import { EvaluationsList } from "./pages/evaluations/list";
import { EvaluationsCreate } from "./pages/evaluations/create";
import { EvaluationsEdit } from "./pages/evaluations/edit";
import { EvaluationsShow } from "./pages/evaluations/show";
import { OrderDetailsList } from "./pages/order-details/list";
import { OrderDetailsCreate } from "./pages/order-details/create";
import { OrderDetailsEdit } from "./pages/order-details/edit";
import { OrderDetailsShow } from "./pages/order-details/show";
import { OrdersList } from "./pages/orders/list";
import { OrdersCreate } from "./pages/orders/create";
import { OrdersEdit } from "./pages/orders/edit";
import { OrdersShow } from "./pages/orders/show";
import { PaymentMethodsList } from "./pages/payment-methods/list";
import { PaymentMethodsCreate } from "./pages/payment-methods/create";
import { PaymentMethodsEdit } from "./pages/payment-methods/edit";
import { PaymentMethodsShow } from "./pages/payment-methods/show";
import { PhysicalPaymentOrdersList } from "./pages/physical-payment-orders/list";
import { PhysicalPaymentOrdersCreate } from "./pages/physical-payment-orders/create";
import { PhysicalPaymentOrdersEdit } from "./pages/physical-payment-orders/edit";
import { PhysicalPaymentOrdersShow } from "./pages/physical-payment-orders/show";
import { ProductsList } from "./pages/products/list";
import { ProductsCreate } from "./pages/products/create";
import { ProductsEdit } from "./pages/products/edit";
import { ProductsShow } from "./pages/products/show";
import { VenezuelaBanksList } from "./pages/venezuela-banks/list";
import { VenezuelaBanksCreate } from "./pages/venezuela-banks/create";
import { VenezuelaBanksEdit } from "./pages/venezuela-banks/edit";
import { VenezuelaBanksShow } from "./pages/venezuela-banks/show";

// Proveedor de datos apuntando a la API de Laravel
const API_URL = "/api";
const axiosInstance = axios.create();

// Interceptor para agregar el Bearer Token automáticamente a las peticiones
axiosInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
});

// Implementación del Auth Provider usando Sanctum
const authProvider: AuthProvider = {
    login: async ({ email, password }: any) => {
        try {
            const response = await axiosInstance.post(`${API_URL}/login`, { email, password });
            
            if (response.data?.token) {
                localStorage.setItem("auth_token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                return {
                    success: true,
                    redirectTo: "/",
                };
            }
        } catch (error) {
            return {
                success: false,
                error: {
                    name: "Error",
                    message: "Credenciales inválidas",
                },
            };
        }
        return {
            success: false,
            error: {
                message: "Error de inicio de sesión",
                name: "Inicio de sesión fallido",
            },
        };
    },
    logout: async () => {
        try {
            await axiosInstance.post(`${API_URL}/logout`);
        } catch (e) {
            // Ignorar errores al desloguearse (ej. token ya expiró)
        }
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    check: async () => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            logout: true,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            try {
                const userString = localStorage.getItem("user");
                if (userString) {
                    return JSON.parse(userString);
                }
                
                const response = await axiosInstance.get(`${API_URL}/me`);
                return response.data;
            } catch (error) {
                return null;
            }
        }
        return null;
    },
    onError: async (error: any) => {
        if (error.response?.status === 401) {
            return {
                logout: true,
            };
        }
        return { error };
    },
};

export default function AppRouter() {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    dataProvider={dataProvider(API_URL, axiosInstance)}
                    routerProvider={routerProvider}
                    authProvider={authProvider}
                    notificationProvider={useNotificationProvider}
                    resources={[
                        {
                            name: "users",
                            list: "/users",
                            create: "/users/create",
                            edit: "/users/edit/:id",
                            show: "/users/show/:id",
                            meta: { canDelete: true },
                        },
                        {
                            name: "branches",
                            list: "/branches",
                            create: "/branches/create",
                            edit: "/branches/edit/:id",
                            show: "/branches/show/:id",
                            meta: { canDelete: true },
                        },
                        {
                            name: "categories",
                            list: "/categories",
                            create: "/categories/create",
                            edit: "/categories/edit/:id",
                            show: "/categories/show/:id",
                            meta: { canDelete: true },
                        },
                        {
                            name: "evaluations",
                            list: "/evaluations",
                            create: "/evaluations/create",
                            edit: "/evaluations/edit/:id",
                            show: "/evaluations/show/:id",
                            meta: { canDelete: true },
                        },
                        {
                            name: "order-details",
                            list: "/order-details",
                            create: "/order-details/create",
                            edit: "/order-details/edit/:id",
                            show: "/order-details/show/:id",
                            meta: { canDelete: true },
                        },
                        {
                            name: "orders",
                            list: "/orders",
                            create: "/orders/create",
                            edit: "/orders/edit/:id",
                            show: "/orders/show/:id",
                            meta: { canDelete: true },
                        },
                        {
                            name: "payment-methods",
                            list: "/payment-methods",
                            create: "/payment-methods/create",
                            edit: "/payment-methods/edit/:id",
                            show: "/payment-methods/show/:id",
                            meta: { canDelete: true },
                        },
                        {
                            name: "physical-payment-orders",
                            list: "/physical-payment-orders",
                            create: "/physical-payment-orders/create",
                            edit: "/physical-payment-orders/edit/:id",
                            show: "/physical-payment-orders/show/:id",
                            meta: { canDelete: true },
                        },
                        {
                            name: "products",
                            list: "/products",
                            create: "/products/create",
                            edit: "/products/edit/:id",
                            show: "/products/show/:id",
                            meta: { canDelete: true },
                        },
                        {
                            name: "venezuela-banks",
                            list: "/venezuela-banks",
                            create: "/venezuela-banks/create",
                            edit: "/venezuela-banks/edit/:id",
                            show: "/venezuela-banks/show/:id",
                            meta: { canDelete: true },
                        },
                    ]}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <Routes>
                        <Route
                            path="/login"
                            element={<AuthPage type="login" />}
                        />

                        {/* Rutas Protegidas */}
                        <Route
                            element={<Outlet />}
                        >
                            <Route
                                index
                                element={<NavigateToResource resource="users" />}
                            />
                            
                                                        <Route path="/users">
                                <Route index element={<UserList />} />
                                <Route path="create" element={<UserCreate />} />
                                <Route path="edit/:id" element={<UserEdit />} />
                                <Route path="show/:id" element={<UserShow />} />
                            </Route>
                            <Route path="/branches">
                                <Route index element={<BranchesList />} />
                                <Route path="create" element={<BranchesCreate />} />
                                <Route path="edit/:id" element={<BranchesEdit />} />
                                <Route path="show/:id" element={<BranchesShow />} />
                            </Route>
                            <Route path="/categories">
                                <Route index element={<CategoriesList />} />
                                <Route path="create" element={<CategoriesCreate />} />
                                <Route path="edit/:id" element={<CategoriesEdit />} />
                                <Route path="show/:id" element={<CategoriesShow />} />
                            </Route>
                            <Route path="/evaluations">
                                <Route index element={<EvaluationsList />} />
                                <Route path="create" element={<EvaluationsCreate />} />
                                <Route path="edit/:id" element={<EvaluationsEdit />} />
                                <Route path="show/:id" element={<EvaluationsShow />} />
                            </Route>
                            <Route path="/order-details">
                                <Route index element={<OrderDetailsList />} />
                                <Route path="create" element={<OrderDetailsCreate />} />
                                <Route path="edit/:id" element={<OrderDetailsEdit />} />
                                <Route path="show/:id" element={<OrderDetailsShow />} />
                            </Route>
                            <Route path="/orders">
                                <Route index element={<OrdersList />} />
                                <Route path="create" element={<OrdersCreate />} />
                                <Route path="edit/:id" element={<OrdersEdit />} />
                                <Route path="show/:id" element={<OrdersShow />} />
                            </Route>
                            <Route path="/payment-methods">
                                <Route index element={<PaymentMethodsList />} />
                                <Route path="create" element={<PaymentMethodsCreate />} />
                                <Route path="edit/:id" element={<PaymentMethodsEdit />} />
                                <Route path="show/:id" element={<PaymentMethodsShow />} />
                            </Route>
                            <Route path="/physical-payment-orders">
                                <Route index element={<PhysicalPaymentOrdersList />} />
                                <Route path="create" element={<PhysicalPaymentOrdersCreate />} />
                                <Route path="edit/:id" element={<PhysicalPaymentOrdersEdit />} />
                                <Route path="show/:id" element={<PhysicalPaymentOrdersShow />} />
                            </Route>
                            <Route path="/products">
                                <Route index element={<ProductsList />} />
                                <Route path="create" element={<ProductsCreate />} />
                                <Route path="edit/:id" element={<ProductsEdit />} />
                                <Route path="show/:id" element={<ProductsShow />} />
                            </Route>
                            <Route path="/venezuela-banks">
                                <Route index element={<VenezuelaBanksList />} />
                                <Route path="create" element={<VenezuelaBanksCreate />} />
                                <Route path="edit/:id" element={<VenezuelaBanksEdit />} />
                                <Route path="show/:id" element={<VenezuelaBanksShow />} />
                            </Route>

                        </Route>

                        <Route path="*" element={<CatchAllNavigate to="/users" />} />
                    </Routes>

                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
}
