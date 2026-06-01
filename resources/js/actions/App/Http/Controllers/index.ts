import ApiAuthController from './ApiAuthController'
import UserController from './UserController'
import BranchController from './BranchController'
import CategoryController from './CategoryController'
import ClientController from './ClientController'
import EmployeeController from './EmployeeController'
import EvaluationController from './EvaluationController'
import OrderDetailController from './OrderDetailController'
import OrderController from './OrderController'
import OrderPaymentController from './OrderPaymentController'
import PaymentMethodController from './PaymentMethodController'
import ProductController from './ProductController'
import BankController from './BankController'

const Controllers = {
    ApiAuthController: Object.assign(ApiAuthController, ApiAuthController),
    UserController: Object.assign(UserController, UserController),
    BranchController: Object.assign(BranchController, BranchController),
    CategoryController: Object.assign(CategoryController, CategoryController),
    ClientController: Object.assign(ClientController, ClientController),
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    EvaluationController: Object.assign(EvaluationController, EvaluationController),
    OrderDetailController: Object.assign(OrderDetailController, OrderDetailController),
    OrderController: Object.assign(OrderController, OrderController),
    OrderPaymentController: Object.assign(OrderPaymentController, OrderPaymentController),
    PaymentMethodController: Object.assign(PaymentMethodController, PaymentMethodController),
    ProductController: Object.assign(ProductController, ProductController),
    BankController: Object.assign(BankController, BankController),
}

export default Controllers