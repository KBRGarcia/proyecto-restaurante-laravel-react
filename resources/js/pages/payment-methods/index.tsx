import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PaymentMethod, type TableColumn, type FilterField, type Pagination } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import paymentMethods from '@/routes/payment-methods';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, CreditCard, FileText } from 'lucide-react';
import { useState } from 'react';
import { TooltipProvider} from "@/components/ui/tooltip";
import { TableRowActions } from '@/components/resources/index/ActionButtons';
import { PageHeader } from '@/components/resources/index/PageHeader';

interface PaymentMethodsIndexProps {
    payment_methods: {
        data: PaymentMethod[];
    };
    columns: TableColumn[];
    filters: FilterField[];
    queryParams: {
        search?: string;
        currency_type?: string;
        active?: string;
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
        title: 'Métodos de Pago',
        href: paymentMethods.index().url,
    },
];

export default function PaymentMethodsIndex({ 
    payment_methods: paymentMethodsData, 
    columns, 
    queryParams = {}, 
    pagination 
}: PaymentMethodsIndexProps) {
    const [search, setSearch] = useState(queryParams.search || '');
    const [currencyTypeFilter, setCurrencyTypeFilter] = useState(queryParams.currency_type || '');
    const [activeFilter, setActiveFilter] = useState(queryParams.active || '');

    const handleSearch = () => {
        router.get(paymentMethods.index().url, {
            search,
            currency_type: currencyTypeFilter,
            active: activeFilter,
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

        router.get(paymentMethods.index().url, {
            ...queryParams,
            sort_by: column,
            sort_order: sortOrder,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (paymentMethodId: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar este método de pago?')) {
            router.delete(paymentMethods.destroy(paymentMethodId).url, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const getCurrencyBadgeVariant = (currencyType: string): "default" | "secondary" | "destructive" | "outline" => {
        return currencyType === 'nacional' ? 'default' : 'secondary';
    };

    const getStatusBadgeVariant = (active: boolean): "default" | "secondary" | "destructive" | "outline" => {
        return active ? 'default' : 'outline';
    };

    return (
        <TooltipProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Métodos de Pago" />
                
                <div className="flex h-full flex-1 flex-col gap-4 p-4">
                    <Card>
                        {/* Header */}
                        <PageHeader
                            icon={CreditCard}
                            title="Gestión de Métodos de Pago"
                            description="Administra todos los métodos de pago del sistema"
                            createButton={{
                                url: paymentMethods.create().url,
                                label: 'Nuevo Método de Pago',
                            }}
                        />

                        {/* Content */}
                        <CardContent>
                            {/* Filtros de Busqueda*/}
                            <div className="mb-6 grid gap-4 md:grid-cols-4">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground"/>
                                    <Input
                                        type="text"
                                        placeholder="Buscar..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className="pl-10"
                                    />
                                </div>
                                <select
                                    value={currencyTypeFilter}
                                    onChange={(e) => setCurrencyTypeFilter(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-neutral-900 dark:text-neutral-100">
                                    <option value="">Todos los tipos</option>
                                    <option value="nacional">Nacional</option>
                                    <option value="internacional">Internacional</option>
                                </select>
                                <select
                                    value={activeFilter}
                                    onChange={(e) => setActiveFilter(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-neutral-900 dark:text-neutral-100">
                                    <option value="">Todos los estados</option>
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                                <Button onClick={handleSearch} className="w-full">
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
                                        {paymentMethodsData.data.length === 0 ? (
                                            <tr>
                                                <td 
                                                    colSpan={columns.filter(col => col.visible).length + 1}
                                                    className="px-4 py-8 text-center text-muted-foreground"
                                                >
                                                    No se encontraron métodos de pago
                                                </td>
                                            </tr>
                                        ) : (
                                            paymentMethodsData.data.map((paymentMethod) => (
                                                <tr key={paymentMethod.id} className="hover:bg-muted/50">
                                                    <td className="px-4 py-3">{paymentMethod.id}</td>
                                                    <td className="px-4 py-3 font-mono text-xs">{paymentMethod.code}</td>
                                                    <td className="px-4 py-3 font-medium">{paymentMethod.name}</td>
                                                    <td className="px-4 py-3">
                                                        <Badge variant={getCurrencyBadgeVariant(paymentMethod.currency_type)}>
                                                            {paymentMethod.currency_type_label}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Badge variant={getStatusBadgeVariant(paymentMethod.active)}>
                                                            {paymentMethod.active_label}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {paymentMethod.creation_date 
                                                            ? new Date(paymentMethod.creation_date).toLocaleDateString('es-ES')
                                                            : '-'
                                                        }
                                                    </td>

                                                    {/* Botones de acción */}
                                                    <td className="px-4 py-3 text-right">
                                                        <TableRowActions
                                                            id={paymentMethod.id}
                                                            urls={{
                                                                show: paymentMethods.show(paymentMethod.id).url,
                                                                edit: paymentMethods.edit(paymentMethod.id).url,
                                                            }}
                                                            onDelete={handleDelete}
                                                            tooltips={{
                                                                show: 'Ver método de pago',
                                                                edit: 'Editar método de pago',
                                                                delete: 'Eliminar método de pago',
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
                                        Mostrando {pagination.from} a {pagination.to} de {pagination.total} métodos de pago
                                    </p>
                                    <div className="flex gap-2">
                                        {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                                            <Button
                                                key={page}
                                                variant={page === pagination.current_page ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => {
                                                    router.get(paymentMethods.index().url, {
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

