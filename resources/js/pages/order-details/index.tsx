import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type OrderDetail, type TableColumn, type FilterField, type Pagination } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import orderDetails from '@/routes/order-details';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, FileText } from 'lucide-react';
import { useState } from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import { TableRowActions } from '@/components/resources/index/ActionButtons';

interface OrderDetailsIndexProps {
    orderDetails: {
        data: OrderDetail[];
    };
    columns: TableColumn[];
    filters: FilterField[];
    queryParams: {
        search?: string;
        order_id?: number;
        product_id?: number;
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
        title: 'Detalles de Órdenes',
        href: orderDetails.index().url,
    },
];

export default function OrderDetailsIndex({
    orderDetails: orderDetailsData,
    columns,
    filters,
    queryParams = {},
    pagination
}: OrderDetailsIndexProps) {
    const [search, setSearch] = useState(queryParams.search || '');
    const [orderFilter, setOrderFilter] = useState(queryParams.order_id?.toString() || '');
    const [productFilter, setProductFilter] = useState(queryParams.product_id?.toString() || '');

    const handleSearch = () => {
        router.get(orderDetails.index().url, {
            search,
            order_id: orderFilter,
            product_id: productFilter,
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

        router.get(orderDetails.index().url, {
            ...queryParams,
            sort_by: column,
            sort_order: sortOrder,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (orderDetailId: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar este detalle de orden?')) {
            router.delete(orderDetails.destroy(orderDetailId).url, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const orderFilterOptions = filters.find(f => f.name === 'order_id')?.options || [];
    const productFilterOptions = filters.find(f => f.name === 'product_id')?.options || [];

    return (
        <TooltipProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Detalles de Órdenes" />

                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <Card>
                        {/* Header */}
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FileText className="size-8 text-primary" />
                                    <div>
                                        <CardTitle>Detalles de Órdenes</CardTitle>
                                        <CardDescription>
                                            Gestión de detalles de órdenes del sistema
                                        </CardDescription>
                                    </div>
                                </div>
                                <Link href={orderDetails.create().url}>
                                    <Button>
                                        <Plus className="mr-2 size-4" />
                                        Nuevo Detalle
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>

                        {/* Content */}
                        <CardContent>
                            {/* Filtros de búsqueda */}
                            <div className="mb-6 grid gap-4 md:grid-cols-4">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Buscar..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className="pl-10"/>
                                </div>
                                <select
                                    value={orderFilter}
                                    onChange={(e) => setOrderFilter(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                    <option value="">Todas las órdenes</option>
                                    {orderFilterOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={productFilter}
                                    onChange={(e) => setProductFilter(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                    <option value="">Todos los productos</option>
                                    {productFilterOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <Button onClick={handleSearch} className="w-full">
                                    Buscar
                                </Button>
                            </div>

                            {/* Tabla de detalles de órdenes */}
                            <div className="rounded-md border">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-muted/50">
                                            <tr>
                                                {columns.filter(col => col.key !== 'actions').map((column) => (
                                                    <th
                                                        key={column.key}
                                                        className={`px-4 py-3 text-left text-sm font-medium ${column.sortable ? 'cursor-pointer hover:bg-muted' : ''
                                                            }`}
                                                        onClick={() => column.sortable && handleSort(column.key)}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            {column.label}
                                                            {column.sortable && queryParams.sort_by === column.key && (
                                                                <span>{queryParams.sort_order === 'asc' ? '↑' : '↓'}</span>
                                                            )}
                                                        </div>
                                                    </th>
                                                ))}
                                                <th className="px-4 py-3 text-left text-sm font-medium">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {orderDetailsData.data.length > 0 ? (
                                                orderDetailsData.data.map((orderDetail) => (
                                                    <tr key={orderDetail.id} className="hover:bg-muted/50">
                                                        <td className="px-4 py-3 text-sm">{orderDetail.id}</td>
                                                        <td className="px-4 py-3 text-sm">
                                                            <span className="font-medium">#{orderDetail.order_number}</span>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">{orderDetail.product_name}</td>
                                                        <td className="px-4 py-3 text-sm font-medium">{orderDetail.quantity}</td>
                                                        <td className="px-4 py-3 text-sm">${orderDetail.unit_price_formatted}</td>
                                                        <td className="px-4 py-3 text-sm font-semibold">${orderDetail.subtotal_formatted}</td>
                                                        {/* Botones de acción */}
                                                        <td className="px-4 py-3 text-right">
                                                            <TableRowActions
                                                                id={orderDetail.id}
                                                                urls={{
                                                                    show: orderDetails.show(orderDetail.id).url,
                                                                    edit: orderDetails.edit(orderDetail.id).url,
                                                                }}
                                                                onDelete={handleDelete}
                                                                tooltips={{
                                                                    show: 'Ver orden',
                                                                    edit: 'Editar orden',
                                                                    delete: 'Eliminar orden',
                                                                }} />
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={7} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                                        No se encontraron detalles de órdenes
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Paginación */}
                            {pagination.total > 0 && (
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-sm text-muted-foreground">
                                        Mostrando {pagination.from} a {pagination.to} de {pagination.total} registros
                                    </div>
                                    <div className="flex gap-2">
                                        {pagination.current_page > 1 && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.get(orderDetails.index().url, {
                                                    ...queryParams,
                                                    page: pagination.current_page - 1,
                                                })}
                                            >
                                                Anterior
                                            </Button>
                                        )}
                                        {pagination.current_page < pagination.last_page && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.get(orderDetails.index().url, {
                                                    ...queryParams,
                                                    page: pagination.current_page + 1,
                                                })}
                                            >
                                                Siguiente
                                            </Button>
                                        )}
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

