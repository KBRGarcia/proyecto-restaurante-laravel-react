import UserController from './UserController'
import CategoryController from './CategoryController'
import ProductController from './ProductController'
import OrderController from './OrderController'
import OrderDetailController from './OrderDetailController'
import EvaluationController from './EvaluationController'
import PaymentMethodController from './PaymentMethodController'
import VenezuelaBankController from './VenezuelaBankController'
import PhysicalPaymentOrdersController from './PhysicalPaymentOrdersController'
import BranchController from './BranchController'
import Settings from './Settings'
const Controllers = {
    UserController: Object.assign(UserController, UserController),
CategoryController: Object.assign(CategoryController, CategoryController),
ProductController: Object.assign(ProductController, ProductController),
OrderController: Object.assign(OrderController, OrderController),
OrderDetailController: Object.assign(OrderDetailController, OrderDetailController),
EvaluationController: Object.assign(EvaluationController, EvaluationController),
PaymentMethodController: Object.assign(PaymentMethodController, PaymentMethodController),
VenezuelaBankController: Object.assign(VenezuelaBankController, VenezuelaBankController),
PhysicalPaymentOrdersController: Object.assign(PhysicalPaymentOrdersController, PhysicalPaymentOrdersController),
BranchController: Object.assign(BranchController, BranchController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers