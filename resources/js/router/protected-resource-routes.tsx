import { lazy, Suspense } from "react";
import { Spin } from "antd";
import { Route } from "react-router";
import { CustomDashboard } from "@/components/dashboard/CustomDashboard";
import { ProtectedAppLayout } from "@/components/layout/ProtectedAppLayout";
import { BanksList } from "@/pages/banks/list";
import { BanksShow } from "@/pages/banks/show";
import { BranchesList } from "@/pages/branches/list";
import { CategoriesCreate } from "@/pages/categories/create";
import { CategoriesEdit } from "@/pages/categories/edit";
import { CategoriesList } from "@/pages/categories/list";
import { CategoriesShow } from "@/pages/categories/show";
import { ClientsCreate } from "@/pages/clients/create";
import { ClientsEdit } from "@/pages/clients/edit";
import { ClientsList } from "@/pages/clients/list";
import { ClientsShow } from "@/pages/clients/show";
import { EmployeesCreate } from "@/pages/employees/create";
import { EmployeesEdit } from "@/pages/employees/edit";
import { EmployeesList } from "@/pages/employees/list";
import { EmployeesShow } from "@/pages/employees/show";
import { EvaluationsCreate } from "@/pages/evaluations/create";
import { EvaluationsEdit } from "@/pages/evaluations/edit";
import { EvaluationsList } from "@/pages/evaluations/list";
import { EvaluationsShow } from "@/pages/evaluations/show";
import { OrderDetailsCreate } from "@/pages/order-details/create";
import { OrderDetailsEdit } from "@/pages/order-details/edit";
import { OrderDetailsList } from "@/pages/order-details/list";
import { OrderDetailsShow } from "@/pages/order-details/show";
import { OrderPaymentsCreate } from "@/pages/order-payments/create";
import { OrderPaymentsEdit } from "@/pages/order-payments/edit";
import { OrderPaymentsList } from "@/pages/order-payments/list";
import { OrderPaymentsShow } from "@/pages/order-payments/show";
import { OrdersCreate } from "@/pages/orders/create";
import { OrdersEdit } from "@/pages/orders/edit";
import { OrdersList } from "@/pages/orders/list";
import { OrdersShow } from "@/pages/orders/show";
import { PaymentMethodsList } from "@/pages/payment-methods/list";
import { PaymentMethodsShow } from "@/pages/payment-methods/show";
import { ProductBranchesCreate } from "@/pages/product-branches/create";
import { ProductBranchesEdit } from "@/pages/product-branches/edit";
import { ProductBranchesList } from "@/pages/product-branches/list";
import { ProductBranchesShow } from "@/pages/product-branches/show";
import { ProductsCreate } from "@/pages/products/create";
import { ProductsEdit } from "@/pages/products/edit";
import { ProductsList } from "@/pages/products/list";
import { ProductsShow } from "@/pages/products/show";
import { ProfilePage } from "@/pages/profile";
import { UserCreate } from "@/pages/users/create";
import { UserEdit } from "@/pages/users/edit";
import { UserList } from "@/pages/users/list";
import { UserShow } from "@/pages/users/show";

const BranchesCreate = lazy(() =>
    import("@/pages/branches/create").then((module) => ({ default: module.BranchesCreate })),
);
const BranchesEdit = lazy(() =>
    import("@/pages/branches/edit").then((module) => ({ default: module.BranchesEdit })),
);
const BranchesShow = lazy(() =>
    import("@/pages/branches/show").then((module) => ({ default: module.BranchesShow })),
);

const BranchPageLoader = () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
        <Spin size="large" />
    </div>
);

export const protectedResourceRoutes = (
        <Route element={<ProtectedAppLayout />}>
            <Route path="/dashboard" element={<CustomDashboard />} />

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
                <Route path="create" element={<CategoriesCreate />} />
                <Route path="edit/:id" element={<CategoriesEdit />} />
                <Route path="show/:id" element={<CategoriesShow />} />
            </Route>

            <Route path="/clients">
                <Route index element={<ClientsList />} />
                <Route path="create" element={<ClientsCreate />} />
                <Route path="edit/:id" element={<ClientsEdit />} />
                <Route path="show/:id" element={<ClientsShow />} />
            </Route>

            <Route path="/employees">
                <Route index element={<EmployeesList />} />
                <Route path="create" element={<EmployeesCreate />} />
                <Route path="edit/:id" element={<EmployeesEdit />} />
                <Route path="show/:id" element={<EmployeesShow />} />
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
                <Route path="show/:id" element={<PaymentMethodsShow />} />
            </Route>

            <Route path="/order-payments">
                <Route index element={<OrderPaymentsList />} />
                <Route path="create" element={<OrderPaymentsCreate />} />
                <Route path="edit/:id" element={<OrderPaymentsEdit />} />
                <Route path="show/:id" element={<OrderPaymentsShow />} />
            </Route>

            <Route path="/products">
                <Route index element={<ProductsList />} />
                <Route path="create" element={<ProductsCreate />} />
                <Route path="edit/:id" element={<ProductsEdit />} />
                <Route path="show/:id" element={<ProductsShow />} />
            </Route>

            <Route path="/product-branches">
                <Route index element={<ProductBranchesList />} />
                <Route path="create" element={<ProductBranchesCreate />} />
                <Route path="edit/:id" element={<ProductBranchesEdit />} />
                <Route path="show/:id" element={<ProductBranchesShow />} />
            </Route>

            <Route path="/banks">
                <Route index element={<BanksList />} />
                <Route path="show/:id" element={<BanksShow />} />
            </Route>

            <Route path="/profile" element={<ProfilePage />} />
        </Route>
);
