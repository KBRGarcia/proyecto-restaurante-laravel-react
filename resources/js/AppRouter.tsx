import {
    BankOutlined,
    BranchesOutlined,
    CreditCardOutlined,
    DashboardOutlined,
    DollarOutlined,
    FileDoneOutlined,
    FileOutlined,
    GoldOutlined,
    IdcardOutlined,
    InboxOutlined,
    ProductOutlined,
    ShopOutlined,
    StarOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    ThemedLayout,
    ThemedSider,
    useNotificationProvider,
} from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';
import { AuthProvider, Link, Refine } from '@refinedev/core';
import routerProvider, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from '@refinedev/react-router';
import dataProvider from '@refinedev/simple-rest';
import axios from 'axios';
import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { CustomLogin } from './components/auth/CustomLogin';
import { CustomRegister } from './components/auth/CustomRegister';
import { CustomDashboard } from './components/dashboard/CustomDashboard';
import { Header } from './components/header';
import { AppSystemShell } from './components/layout/AppSystemShell';
import { ColorModeContextProvider } from './contexts/color-mode';
import { ComingSoonPage } from './pages/coming-soon';
import { HomePage } from './pages/home';
// Resources
import { BanksList } from './pages/banks/list';
import { BanksShow } from './pages/banks/show';
import { BranchesList } from './pages/branches/list';

const BranchesCreate = lazy(() =>
    import('./pages/branches/create').then((module) => ({ default: module.BranchesCreate })),
);
const BranchesEdit = lazy(() =>
    import('./pages/branches/edit').then((module) => ({ default: module.BranchesEdit })),
);
const BranchesShow = lazy(() =>
    import('./pages/branches/show').then((module) => ({ default: module.BranchesShow })),
);

const BranchPageLoader = () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
        <Spin size="large" />
    </div>
);
import { CategoriesCreate } from './pages/categories/create';
import { CategoriesEdit } from './pages/categories/edit';
import { CategoriesList } from './pages/categories/list';
import { CategoriesShow } from './pages/categories/show';
import { ClientsCreate } from './pages/clients/create';
import { ClientsEdit } from './pages/clients/edit';
import { ClientsList } from './pages/clients/list';
import { ClientsShow } from './pages/clients/show';
import { EmployeesCreate } from './pages/employees/create';
import { EmployeesEdit } from './pages/employees/edit';
import { EmployeesList } from './pages/employees/list';
import { EmployeesShow } from './pages/employees/show';
import { EvaluationsCreate } from './pages/evaluations/create';
import { EvaluationsEdit } from './pages/evaluations/edit';
import { EvaluationsList } from './pages/evaluations/list';
import { EvaluationsShow } from './pages/evaluations/show';
import { OrderDetailsCreate } from './pages/order-details/create';
import { OrderDetailsEdit } from './pages/order-details/edit';
import { OrderDetailsList } from './pages/order-details/list';
import { OrderDetailsShow } from './pages/order-details/show';
import { OrderPaymentsCreate } from './pages/order-payments/create';
import { OrderPaymentsEdit } from './pages/order-payments/edit';
import { OrderPaymentsList } from './pages/order-payments/list';
import { OrderPaymentsShow } from './pages/order-payments/show';
import { OrdersCreate } from './pages/orders/create';
import { OrdersEdit } from './pages/orders/edit';
import { OrdersList } from './pages/orders/list';
import { OrdersShow } from './pages/orders/show';
import { PaymentMethodsList } from './pages/payment-methods/list';
import { PaymentMethodsShow } from './pages/payment-methods/show';
import { ProductsCreate } from './pages/products/create';
import { ProductsEdit } from './pages/products/edit';
import { ProductsList } from './pages/products/list';
import { ProductsShow } from './pages/products/show';
import { ProfilePage } from './pages/profile';
import { UserCreate } from './pages/users/create';
import { UserEdit } from './pages/users/edit';
import { UserList } from './pages/users/list';
import { UserShow } from './pages/users/show';

// Proveedor de datos apuntando a la API de Laravel
const API_URL = '/api';
const axiosInstance = axios.create();

// Interceptor para agregar el Bearer Token automáticamente a las peticiones
axiosInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
});

// Implementación del Auth Provider usando Sanctum
const authProvider: AuthProvider = {
    login: async ({ email, password }: Record<string, string>) => {
        try {
            const response = await axiosInstance.post(`${API_URL}/login`, {
                email,
                password,
            });

            if (response.data?.token) {
                localStorage.setItem('auth_token', response.data.token);
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user),
                );
                return {
                    success: true,
                    redirectTo: '/dashboard',
                };
            }
        } catch {
            return {
                success: false,
                error: {
                    name: 'Error',
                    message: 'Credenciales inválidas',
                },
            };
        }
        return {
            success: false,
            error: {
                message: 'Error de inicio de sesión',
                name: 'Inicio de sesión fallido',
            },
        };
    },
    register: async ({
        name,
        last_name,
        email,
        password,
    }: Record<string, string>) => {
        try {
            const response = await axiosInstance.post(`${API_URL}/register`, {
                name,
                last_name,
                email,
                password,
            });

            if (response.data?.token) {
                localStorage.setItem('auth_token', response.data.token);
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user),
                );
                return {
                    success: true,
                    redirectTo: '/dashboard',
                };
            }
        } catch (error: unknown) {
            const message = axios.isAxiosError<{ message?: string }>(error)
                ? error.response?.data?.message
                : undefined;

            return {
                success: false,
                error: {
                    message: 'Error de registro',
                    name: message || 'Falló el registro',
                },
            };
        }
        return {
            success: false,
            error: {
                message: 'Error de registro',
                name: 'Falló el registro',
            },
        };
    },
    logout: async () => {
        try {
            await axiosInstance.post(`${API_URL}/logout`);
        } catch {
            // Ignorar errores al desloguearse (ej. token ya expiró)
        }
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        return {
            success: true,
            redirectTo: '/',
        };
    },
    check: async () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            logout: true,
            redirectTo: '/login',
        };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            try {
                const userString = localStorage.getItem('user');
                if (userString) {
                    return JSON.parse(userString);
                }

                const response = await axiosInstance.get(`${API_URL}/me`);
                return response.data;
            } catch {
                return null;
            }
        }
        return null;
    },
    onError: async (error: unknown) => {
        const err = error as {
            response?: { status?: number };
            message?: string;
        };
        if (err.response?.status === 401) {
            return {
                logout: true,
            };
        }
        return { error: new Error(err?.message || 'Unknown error') };
    },
};

// Manejo del titulo del proyecto
const CustomTitle = ({ collapsed }: { collapsed: boolean }) => (
    <Link to="/dashboard">
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                textDecoration: 'none',
            }}
        >
            <img src="/logo.png" alt="Logo" style={{ maxHeight: '40px' }} />
            {!collapsed && (
                <span
                    style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#ef4444',
                        whiteSpace: 'nowrap',
                    }}
                >
                    Sabor & Tradición
                </span>
            )}
        </div>
    </Link>
);

// Menú de navegación lateral
export default function AppRouter() {
    return (
        <BrowserRouter>
            <AppSystemShell>
            <ColorModeContextProvider>
                <Refine
                    dataProvider={dataProvider(API_URL, axiosInstance)}
                    routerProvider={routerProvider}
                    authProvider={authProvider}
                    notificationProvider={useNotificationProvider}
                    resources={[
                        // Dashboard de la pagina principal
                        {
                            name: 'dashboard',
                            list: '/dashboard',
                            meta: {
                                canDelete: true,
                                icon: <DashboardOutlined />,
                            },
                        },

                        // Menus padre de la pagina principal
                        {
                            name: 'personas',
                            meta: {
                                label: 'Personas',
                                icon: <TeamOutlined />,
                            },
                        },
                        {
                            name: 'tiendas',
                            meta: {
                                label: 'Tiendas',
                                icon: <ShopOutlined />,
                            },
                        },
                        {
                            name: 'productos',
                            meta: {
                                label: 'Productos',
                                icon: <GoldOutlined />,
                            },
                        },
                        {
                            name: 'pagos',
                            meta: {
                                label: 'Pagos',
                                icon: <DollarOutlined />,
                            },
                        },

                        // Menus Hijos de la pagina principal
                        // Personas
                        {
                            name: 'users',
                            list: '/users',
                            create: '/users/create',
                            edit: '/users/edit/:id',
                            show: '/users/show/:id',
                            meta: {
                                label: 'Usuarios',
                                parent: 'personas',
                                canDelete: true,
                                icon: <UserOutlined />,
                            },
                        },
                        {
                            name: 'clients',
                            list: '/clients',
                            create: '/clients/create',
                            edit: '/clients/edit/:id',
                            show: '/clients/show/:id',
                            meta: {
                                label: 'Clientes',
                                parent: 'personas',
                                canDelete: true,
                                icon: <IdcardOutlined />,
                            },
                        },
                        {
                            name: 'employees',
                            list: '/employees',
                            create: '/employees/create',
                            edit: '/employees/edit/:id',
                            show: '/employees/show/:id',
                            meta: {
                                label: 'Empleados',
                                parent: 'personas',
                                canDelete: true,
                                icon: <TeamOutlined />,
                            },
                        },

                        // Tiendas
                        {
                            name: 'branches',
                            list: '/branches',
                            create: '/branches/create',
                            edit: '/branches/edit/:id',
                            show: '/branches/show/:id',
                            meta: {
                                label: 'Sucursales',
                                parent: 'tiendas',
                                canDelete: true,
                                icon: <BranchesOutlined />,
                            },
                        },
                        {
                            name: 'evaluations',
                            list: '/evaluations',
                            create: '/evaluations/create',
                            edit: '/evaluations/edit/:id',
                            show: '/evaluations/show/:id',
                            meta: {
                                label: 'Evaluaciones',
                                parent: 'tiendas',
                                canDelete: true,
                                icon: <StarOutlined />,
                            },
                        },

                        // Productos
                        {
                            name: 'products',
                            list: '/products',
                            create: '/products/create',
                            edit: '/products/edit/:id',
                            show: '/products/show/:id',
                            meta: {
                                label: 'Productos',
                                parent: 'productos',
                                canDelete: true,
                                icon: <InboxOutlined />,
                            },
                        },
                        {
                            name: 'categories',
                            list: '/categories',
                            create: '/categories/create',
                            edit: '/categories/edit/:id',
                            show: '/categories/show/:id',
                            meta: {
                                label: 'Categorías',
                                parent: 'productos',
                                canDelete: true,
                                icon: <ProductOutlined />,
                            },
                        },

                        // Pagos
                        {
                            name: 'orders',
                            list: '/orders',
                            create: '/orders/create',
                            edit: '/orders/edit/:id',
                            show: '/orders/show/:id',
                            meta: {
                                label: 'Ordenes',
                                parent: 'pagos',
                                canDelete: true,
                                icon: <FileOutlined />,
                            },
                        },
                        {
                            name: 'order-details',
                            list: '/order-details',
                            create: '/order-details/create',
                            edit: '/order-details/edit/:id',
                            show: '/order-details/show/:id',
                            meta: {
                                label: 'Detalles de Ordenes',
                                parent: 'pagos',
                                canDelete: true,
                                icon: <FileDoneOutlined />,
                            },
                        },
                        {
                            name: 'order-payments',
                            list: '/order-payments',
                            create: '/order-payments/create',
                            edit: '/order-payments/edit/:id',
                            show: '/order-payments/show/:id',
                            meta: {
                                label: 'Pagos de Ordenes',
                                parent: 'pagos',
                                canDelete: true,
                                icon: <DollarOutlined />,
                            },
                        },
                        {
                            name: 'payment-methods',
                            list: '/payment-methods',
                            show: '/payment-methods/show/:id',
                            meta: {
                                label: 'Metodos de Pago',
                                parent: 'pagos',
                                canDelete: false,
                                icon: <CreditCardOutlined />,
                            },
                        },
                        {
                            name: 'banks',
                            list: '/banks',
                            show: '/banks/show/:id',
                            meta: {
                                label: 'Bancos',
                                parent: 'pagos',
                                canDelete: false,
                                icon: <BankOutlined />,
                            },
                        },
                    ]}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    {/* Rutas de la página principal */}
                    <Routes>
                        <Route index element={<HomePage />} />
                        <Route
                            path="/proximamente"
                            element={<ComingSoonPage />}
                        />
                        <Route path="/login" element={<CustomLogin />} />
                        <Route path="/register" element={<CustomRegister />} />

                        {/* Rutas Protegidas */}
                        <Route
                            element={
                                <ThemedLayout
                                    Header={Header}
                                    Sider={(props) => (
                                        <ThemedSider
                                            {...props}
                                            Title={({ collapsed }) => (
                                                <CustomTitle
                                                    collapsed={collapsed}
                                                />
                                            )}
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
                            }
                        >
                            <Route
                                path="/dashboard"
                                element={<CustomDashboard />}
                            />

                            <Route path="/users">
                                <Route index element={<UserList />} />
                                <Route path="create" element={<UserCreate />} />
                                <Route path="edit/:id" element={<UserEdit />} />
                                <Route path="show/:id" element={<UserShow />} />
                            </Route>
                            <Route path="/branches">
                                <Route index element={<BranchesList />} />
                                <Route
                                    path="create"
                                    element={
                                        <Suspense fallback={<BranchPageLoader />}>
                                            <BranchesCreate />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path="edit/:id"
                                    element={
                                        <Suspense fallback={<BranchPageLoader />}>
                                            <BranchesEdit />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path="show/:id"
                                    element={
                                        <Suspense fallback={<BranchPageLoader />}>
                                            <BranchesShow />
                                        </Suspense>
                                    }
                                />
                            </Route>
                            <Route path="/categories">
                                <Route index element={<CategoriesList />} />
                                <Route
                                    path="create"
                                    element={<CategoriesCreate />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<CategoriesEdit />}
                                />
                                <Route
                                    path="show/:id"
                                    element={<CategoriesShow />}
                                />
                            </Route>
                            <Route path="/clients">
                                <Route index element={<ClientsList />} />
                                <Route
                                    path="create"
                                    element={<ClientsCreate />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<ClientsEdit />}
                                />
                                <Route
                                    path="show/:id"
                                    element={<ClientsShow />}
                                />
                            </Route>
                            <Route path="/employees">
                                <Route index element={<EmployeesList />} />
                                <Route
                                    path="create"
                                    element={<EmployeesCreate />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<EmployeesEdit />}
                                />
                                <Route
                                    path="show/:id"
                                    element={<EmployeesShow />}
                                />
                            </Route>
                            <Route path="/evaluations">
                                <Route index element={<EvaluationsList />} />
                                <Route
                                    path="create"
                                    element={<EvaluationsCreate />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<EvaluationsEdit />}
                                />
                                <Route
                                    path="show/:id"
                                    element={<EvaluationsShow />}
                                />
                            </Route>
                            <Route path="/order-details">
                                <Route index element={<OrderDetailsList />} />
                                <Route
                                    path="create"
                                    element={<OrderDetailsCreate />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<OrderDetailsEdit />}
                                />
                                <Route
                                    path="show/:id"
                                    element={<OrderDetailsShow />}
                                />
                            </Route>
                            <Route path="/orders">
                                <Route index element={<OrdersList />} />
                                <Route
                                    path="create"
                                    element={<OrdersCreate />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<OrdersEdit />}
                                />
                                <Route
                                    path="show/:id"
                                    element={<OrdersShow />}
                                />
                            </Route>
                            <Route path="/payment-methods">
                                <Route index element={<PaymentMethodsList />} />
                                <Route
                                    path="show/:id"
                                    element={<PaymentMethodsShow />}
                                />
                            </Route>
                            <Route path="/order-payments">
                                <Route index element={<OrderPaymentsList />} />
                                <Route
                                    path="create"
                                    element={<OrderPaymentsCreate />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<OrderPaymentsEdit />}
                                />
                                <Route
                                    path="show/:id"
                                    element={<OrderPaymentsShow />}
                                />
                            </Route>
                            <Route path="/products">
                                <Route index element={<ProductsList />} />
                                <Route
                                    path="create"
                                    element={<ProductsCreate />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<ProductsEdit />}
                                />
                                <Route
                                    path="show/:id"
                                    element={<ProductsShow />}
                                />
                            </Route>
                            <Route path="/banks">
                                <Route index element={<BanksList />} />
                                <Route
                                    path="show/:id"
                                    element={<BanksShow />}
                                />
                            </Route>

                            <Route path="/profile" element={<ProfilePage />} />
                        </Route>

                        <Route path="*" element={<ComingSoonPage />} />
                    </Routes>

                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </ColorModeContextProvider>
            </AppSystemShell>
        </BrowserRouter>
    );
}
