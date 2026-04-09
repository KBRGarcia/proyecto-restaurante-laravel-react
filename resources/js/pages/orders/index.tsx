import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Order, type TableColumn, type FilterField, type Pagination } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import orders from '@/routes/orders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { TooltipProvider} from "@/components/ui/tooltip";
import { TableRowActions } from '@/components/resources/index/ActionButtons';

interface OrdersIndexProps {
    orders: {
        data: Order[];
    };
    columns: TableColumn[];
    filters: FilterField[];
    queryParams: {
        search?: string;
        status?: string;
        service_type?: string;
        currency?: string;
        sort_by?: string;
        sort_order?: string;
        per_page?: number;
    };
    pagination: Pagination;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Órdenes',
        href: orders.index().url,
    },
];

export default function OrdersIndex({ 
    orders: ordersData, 
    columns, 
    queryParams = {}, 
    pagination 
}: OrdersIndexProps) {
    const [search, setSearch] = useState(queryParams.search || '');
    const [statusFilter, setStatusFilter] = useState(queryParams.status || '');
    const [serviceTypeFilter, setServiceTypeFilter] = useState(queryParams.service_type || '');
    const [currencyFilter, setCurrencyFilter] = useState(queryParams.currency || '');

    const handleSearch = () => {
        router.get(orders.index().url, {
            search,
            status: statusFilter,
            service_type: serviceTypeFilter,
            currency: currencyFilter,
            per_page: queryParams.per_page || 10,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSort = (column: string) => {
        const sortOrder = 
            queryParams.sort_by === column && queryParams.sort_order === 'asc' 
                ? 'desc' 
                : 'asc';

        router.get(orders.index().url, {
            ...queryParams,
            sort_by: column,
            sort_order: sortOrder,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (orderId: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar esta orden?')) {
            router.delete(orders.destroy(orderId).url, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
        switch (status) {
            case 'pending': return 'outline';
            case 'preparing': return 'secondary';
            case 'ready': return 'default';
            case 'delivered': return 'default';
            case 'canceled': return 'destructive';
            default: return 'outline';
        }
    };

    const formatCurrency = (amount: string | number, currency: string) => {
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        return currency === 'nacional' ? `Bs. ${num.toFixed(2)}` : `$${num.toFixed(2)}`;
    };

    return (
        <TooltipProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Órdenes" />
                
                <div className="flex h-full flex-1 flex-col gap-4 p-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <ShoppingCart className="size-5" />
                                    Gestión de Órdenes
                                </CardTitle>
                                <CardDescription>
                                    Administra todas las órdenes del sistema
                                </CardDescription>
                            </div>
                            <Link href={orders.create().url}>
                                <Button>
                                    <Plus className="mr-2 size-4" />
                                    Nueva Orden
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {/* Filtros */}
                            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end">
                                <div className="flex-1">
                                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                                        Buscar
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            type="text"
                                            placeholder="Buscar por ID, cliente, teléfono..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                
                                <div className="w-full md:w-48">
                                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                                        Estado
                                    </label>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-neutral-900 dark:text-neutral-100"
                                    >
                                        <option value="">Todos los estados</option>
                                        <option value="pending">Pendiente</option>
                                        <option value="preparing">En Preparación</option>
                                        <option value="ready">Listo</option>
                                        <option value="delivered">Entregado</option>
                                        <option value="canceled">Cancelado</option>
                                    </select>
                                </div>

                                <div className="w-full md:w-48">
                                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                                        Tipo de Servicio
                                    </label>
                                    <select
                                        value={serviceTypeFilter}
                                        onChange={(e) => setServiceTypeFilter(e.target.value)}
                                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-neutral-900 dark:text-neutral-100"
                                    >
                                        <option value="">Todos los tipos</option>
                                        <option value="delivery">Domicilio</option>
                                        <option value="pickup">Recoger</option>
                                    </select>
                                </div>

                                <div className="w-full md:w-48">
                                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                                        Moneda
                                    </label>
                                    <select
                                        value={currencyFilter}
                                        onChange={(e) => setCurrencyFilter(e.target.value)}
                                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-neutral-900 dark:text-neutral-100"
                                    >
                                        <option value="">Todas las monedas</option>
                                        <option value="nacional">Nacional</option>
                                        <option value="internacional">Internacional</option>
                                    </select>
                                </div>

                                <Button onClick={handleSearch}>
                                    <Search className="mr-2 size-4" />
                                    Buscar
                                </Button>
                            </div>

                            {/* Tabla */}
                            <div className="overflow-x-auto rounded-md border">
                                <table className="w-full text-sm">
                                    <thead className="border-b bg-muted/50">
                                        <tr>
                                            {columns.filter(col => col.visible).map((column) => (
                                                <th
                                                    key={column.key}
                                                    className="px-4 py-3 text-left font-medium text-muted-foreground"
                                                >
                                                    {column.sortable ? (
                                                        <button
                                                            onClick={() => handleSort(column.key)}
                                                            className="flex items-center gap-1 hover:text-foreground"
                                                        >
                                                            {column.label}
                                                            {queryParams.sort_by === column.key && (
                                                                <span className="text-xs">
                                                                    {queryParams.sort_order === 'asc' ? '↑' : '↓'}
                                                                </span>
                                                            )}
                                                        </button>
                                                    ) : (
                                                        column.label
                                                    )}
                                                </th>
                                            ))}
                                            <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {ordersData.data.length === 0 ? (
                                            <tr>
                                                <td 
                                                    colSpan={columns.filter(col => col.visible).length + 1}
                                                    className="px-4 py-8 text-center text-muted-foreground"
                                                >
                                                    No se encontraron órdenes
                                                </td>
                                            </tr>
                                        ) : (
                                            ordersData.data.map((order) => (
                                                <tr key={order.id} className="hover:bg-muted/50">
                                                    <td className="px-4 py-3">#{order.id}</td>
                                                    <td className="px-4 py-3 font-medium">{order.user_name}</td>
                                                    <td className="px-4 py-3">
                                                        <Badge variant={getStatusBadgeVariant(order.status)}>
                                                            {order.status_label}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {order.service_type_label}
                                                    </td>
                                                    <td className="px-4 py-3 font-medium">
                                                        {formatCurrency(order.total, order.currency)}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {order.currency_label}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {order.order_date_formatted || 
                                                            (order.order_date 
                                                                ? new Date(order.order_date).toLocaleDateString('es-ES')
                                                                : '-'
                                                            )
                                                        }
                                                    </td>

                                                    {/* Botones de acción */}
                                                    <td className="px-4 py-3 text-right">
                                                        <TableRowActions
                                                            id={order.id}
                                                            urls={{
                                                                show: orders.show(order.id).url,
                                                                edit: orders.edit(order.id).url,
                                                            }}
                                                            onDelete={handleDelete}
                                                            tooltips={{
                                                                show: 'Ver orden',
                                                                edit: 'Editar orden',
                                                                delete: 'Eliminar orden',
                                                            }}/>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Paginación */}
                            {pagination.total > 0 && (
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        Mostrando {pagination.from} a {pagination.to} de {pagination.total} órdenes
                                    </p>
                                    <div className="flex gap-2">
                                        {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                                            <Button
                                                key={page}
                                                variant={page === pagination.current_page ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => {
                                                    router.get(orders.index().url, {
                                                        ...queryParams,
                                                        page,
                                                    }, {
                                                        preserveState: true,
                                                        preserveScroll: true,
                                                    });
                                                }}
                                            >
                                                {page}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        </TooltipProvider>
    );
}

