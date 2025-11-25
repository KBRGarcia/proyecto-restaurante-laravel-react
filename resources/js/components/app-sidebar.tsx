// import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, Tag, Package, ShoppingCart, Settings, Store, Receipt, FileText, Star, CreditCard, Building2, MapPin } from 'lucide-react';
import AppLogo from './app-logo';
import users from '@/routes/users';
import categories from '@/routes/categories';
import products from '@/routes/products';
import orders from '@/routes/orders';
import orderDetails from '@/routes/order-details';
import evaluations from '@/routes/evaluations';
import paymentMethods from '@/routes/payment-methods';
import venezuelaBanks from '@/routes/venezuela-banks';
import physicalPaymentOrders from '@/routes/physical-payment-orders';
import branches from '@/routes/branches';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Administración',
        href: users.index(), // Href por defecto (no se usa cuando hay subitems)
        icon: Settings,
        items: [
            {
                title: 'Usuarios',
                href: users.index(),
                icon: Users,
            },
        ],
    },
    {
        title: 'Catálogo',
        href: categories.index(), // Href por defecto (no se usa cuando hay subitems)
        icon: Store,
        items: [
            {
                title: 'Categorías',
                href: categories.index(),
                icon: Tag,
            },
            {
                title: 'Productos',
                href: products.index(),
                icon: Package,
            },
        ],
    },
    {
        title: 'Ventas',
        href: orders.index(), // Href por defecto (no se usa cuando hay subitems)
        icon: Receipt,
        items: [
            {
                title: 'Órdenes',
                href: orders.index(),
                icon: ShoppingCart,
            },
            {
                title: 'Detalles de Órdenes',
                href: orderDetails.index(),
                icon: FileText,
            },
            {
                title: 'Evaluaciones',
                href: evaluations.index(),
                icon: Star,
            },
        ],
    },
    {
        title: 'Métodos de Pago',
        href: paymentMethods.index(), // Href por defecto (no se usa cuando hay subitems)
        icon: CreditCard,
        items: [
            {
                title: 'Métodos de Pago',
                href: paymentMethods.index(),
                icon: CreditCard,
            },
            {
                title: 'Bancos de Venezuela',
                href: venezuelaBanks.index(),
                icon: Building2,
            },
            {
                title: 'Órdenes de Pago Físico',
                href: physicalPaymentOrders.index(),
                icon: Receipt,
            },
        ],
    },
    {
        title: 'Sucursales',
        href: branches.index(), // Href por defecto (no se usa cuando hay subitems)
        icon: MapPin,
        items: [
            {
                title: 'Sucursales',
                href: branches.index(),
                icon: MapPin,
            },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
