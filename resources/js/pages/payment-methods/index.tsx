import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PaymentMethod, type TableColumn, type FilterField, type Pagination } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import paymentMethods from '@/routes/payment-methods';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Eye, Plus, Search, Trash2, CreditCard } from 'lucide-react';
import { useState } from 'react';

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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Métodos de Pago" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="size-5" />
                                Gestión de Métodos de Pago
                            </CardTitle>
                            <CardDescription>
                                Administra todos los métodos de pago del sistema
                            </CardDescription>
                        </div>
                        <Link href={paymentMethods.create().url}>
                            <Button>
                                <Plus className="mr-2 size-4" />
                                Nuevo Método de Pago
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
                                        placeholder="Buscar por código o nombre..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            
                            <div className="w-full md:w-48">
                                <label className="mb-1.5 block text-sm font-medium text-foreground">
                                    Tipo de Moneda
                                </label>
                                <select
                                    value={currencyTypeFilter}
                                    onChange={(e) => setCurrencyTypeFilter(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-neutral-900 dark:text-neutral-100"
                                >
                                    <option value="">Todos los tipos</option>
                                    <option value="nacional">Nacional</option>
                                    <option value="internacional">Internacional</option>
                                </select>
                            </div>

                            <div className="w-full md:w-48">
                                <label className="mb-1.5 block text-sm font-medium text-foreground">
                                    Estado
                                </label>
                                <select
                                    value={activeFilter}
                                    onChange={(e) => setActiveFilter(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-neutral-900 dark:text-neutral-100"
                                >
                                    <option value="">Todos los estados</option>
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
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
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={paymentMethods.show(paymentMethod.id).url}>
                                                            <Button variant="outline" size="sm">
                                                                <Eye className="size-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={paymentMethods.edit(paymentMethod.id).url}>
                                                            <Button variant="outline" size="sm">
                                                                <Edit className="size-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDelete(paymentMethod.id)}
                                                        >
                                                            <Trash2 className="size-4 text-destructive" />
                                                        </Button>
                                                    </div>
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
    );
}

