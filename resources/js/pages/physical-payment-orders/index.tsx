import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PhysicalPaymentOrder, type TableColumn, type FilterField, type Pagination } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import physicalPaymentOrders from '@/routes/physical-payment-orders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Receipt } from 'lucide-react';
import { useState } from 'react';
import { TooltipProvider} from "@/components/ui/tooltip";
import { TableRowActions } from '@/components/resources/index/ActionButtons';

interface PhysicalPaymentOrdersIndexProps {
    physicalPaymentOrders: {
        data: PhysicalPaymentOrder[];
    };
    columns: TableColumn[];
    filters: FilterField[];
    queryParams: {
        search?: string;
        status?: string;
        order_id?: number;
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
        title: 'Órdenes de Pago Físico',
        href: physicalPaymentOrders.index().url,
    },
];

export default function PhysicalPaymentOrdersIndex({ 
    physicalPaymentOrders: physicalPaymentOrdersData, 
    columns, 
    filters, 
    queryParams = {}, 
    pagination 
}: PhysicalPaymentOrdersIndexProps) {
    const [search, setSearch] = useState(queryParams.search || '');
    const [statusFilter, setStatusFilter] = useState(queryParams.status || '');
    const [orderFilter] = useState(queryParams.order_id?.toString() || '');

    const handleSearch = () => {
        router.get(physicalPaymentOrders.index().url, {
            search,
            status: statusFilter,
            order_id: orderFilter,
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

        router.get(physicalPaymentOrders.index().url, {
            ...queryParams,
            sort_by: column,
            sort_order: sortOrder,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (physicalPaymentOrderId: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar esta orden de pago físico?')) {
            router.delete(physicalPaymentOrders.destroy(physicalPaymentOrderId).url, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
        switch (status) {
            case 'pending':
                return 'default';
            case 'confirmed':
                return 'secondary';
            case 'canceled':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getStatusLabel = (status: string): string => {
        switch (status) {
            case 'pending':
                return 'Pendiente';
            case 'confirmed':
                return 'Confirmado';
            case 'canceled':
                return 'Cancelado';
            default:
                return status;
        }
    };

    const statusFilterOptions = filters.find(f => f.name === 'status')?.options || [];

    return (
        <TooltipProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Órdenes de Pago Físico" />
                
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Receipt className="size-8 text-primary" />
                                    <div>
                                        <CardTitle>Órdenes de Pago Físico</CardTitle>
                                        <CardDescription>
                                            Gestión de órdenes pendientes de pago físico
                                        </CardDescription>
                                    </div>
                                </div>
                                <Link href={physicalPaymentOrders.create().url}>
                                    <Button>
                                        <Plus className="mr-2 size-4" />
                                        Nueva Orden
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Filtros de búsqueda */}
                            <div className="mb-6 grid gap-4 md:grid-cols-4">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Buscar por ID o número de orden..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className="pl-8"
                                    />
                                </div>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                >
                                    <option value="">Todos los estados</option>
                                    {statusFilterOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="md:col-span-1"></div>
                                <Button onClick={handleSearch} className="w-full">
                                    Buscar
                                </Button>
                            </div>

                            {/* Tabla de órdenes de pago físico */}
                            <div className="rounded-md border">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-muted/50">
                                            <tr>
                                                {columns.filter(col => col.visible).map((column) => (
                                                    <th
                                                        key={column.key}
                                                        className={`px-4 py-3 text-left text-sm font-medium ${
                                                            column.sortable ? 'cursor-pointer hover:bg-muted' : ''
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
                                            {physicalPaymentOrdersData.data.length > 0 ? (
                                                physicalPaymentOrdersData.data.map((physicalPaymentOrder) => (
                                                    <tr key={physicalPaymentOrder.id} className="hover:bg-muted/50">
                                                        <td className="px-4 py-3 text-sm">{physicalPaymentOrder.id}</td>
                                                        <td className="px-4 py-3 text-sm">
                                                            <span className="font-medium">#{physicalPaymentOrder.order_number}</span>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">
                                                            {physicalPaymentOrder.limit_date_formatted || '-'}
                                                            {physicalPaymentOrder.is_expired && (
                                                                <Badge variant="destructive" className="ml-2 text-xs">
                                                                    Vencido
                                                                </Badge>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">
                                                            <Badge variant={getStatusBadgeVariant(physicalPaymentOrder.status)}>
                                                                {getStatusLabel(physicalPaymentOrder.status)}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">
                                                            {physicalPaymentOrder.creation_date_formatted || '-'}
                                                        </td>

                                                        {/* Botones de acción */}
                                                        <td className="px-4 py-3 text-right">
                                                            <TableRowActions
                                                                id={physicalPaymentOrder.id}
                                                                urls={{
                                                                    show: physicalPaymentOrders.show(physicalPaymentOrder.id).url,
                                                                    edit: physicalPaymentOrders.edit(physicalPaymentOrder.id).url,
                                                                }}
                                                                onDelete={handleDelete}
                                                                tooltips={{
                                                                    show: 'Ver orden de pago físico',
                                                                    edit: 'Editar orden de pago físico',
                                                                    delete: 'Eliminar orden de pago físico',
                                                                }}/>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                                        No se encontraron órdenes de pago físico
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
                                                onClick={() => router.get(physicalPaymentOrders.index().url, {
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
                                                onClick={() => router.get(physicalPaymentOrders.index().url, {
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

