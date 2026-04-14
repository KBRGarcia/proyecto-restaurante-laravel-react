import ApiAuthController from './ApiAuthController'
import UserController from './UserController'
import BranchController from './BranchController'
import CategoryController from './CategoryController'
import EvaluationController from './EvaluationController'
import OrderDetailController from './OrderDetailController'
import OrderController from './OrderController'
import PaymentMethodController from './PaymentMethodController'
import PhysicalPaymentOrdersController from './PhysicalPaymentOrdersController'
import ProductController from './ProductController'
import VenezuelaBankController from './VenezuelaBankController'

const Controllers = {
    ApiAuthController: Object.assign(ApiAuthController, ApiAuthController),
    UserController: Object.assign(UserController, UserController),
    BranchController: Object.assign(BranchController, BranchController),
    CategoryController: Object.assign(CategoryController, CategoryController),
    EvaluationController: Object.assign(EvaluationController, EvaluationController),
    OrderDetailController: Object.assign(OrderDetailController, OrderDetailController),
    OrderController: Object.assign(OrderController, OrderController),
    PaymentMethodController: Object.assign(PaymentMethodController, PaymentMethodController),
    PhysicalPaymentOrdersController: Object.assign(PhysicalPaymentOrdersController, PhysicalPaymentOrdersController),
    ProductController: Object.assign(ProductController, ProductController),
    VenezuelaBankController: Object.assign(VenezuelaBankController, VenezuelaBankController),
}

export default Controllers