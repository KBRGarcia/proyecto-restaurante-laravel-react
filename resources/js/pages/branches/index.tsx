import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Branch, type TableColumn, type FilterField, type Pagination } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import branches from '@/routes/branches';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Building2, FileText } from 'lucide-react';
import { useState } from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import { TableRowActions } from '@/components/resources/index/ActionButtons';
import { PageHeader } from '@/components/resources/index/PageHeader';

interface BranchesIndexProps {
    branches: {
        data: Branch[];
    };
    columns: TableColumn[];
    filters: FilterField[];
    queryParams: {
        search?: string;
        active?: string;
        is_main?: string;
        has_delivery?: string;
        has_parking?: string;
        city?: string;
        state?: string;
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
        title: 'Sucursales',
        href: branches.index().url,
    },
];

export default function BranchesIndex({
    branches: branchesData,
    columns,
    queryParams = {},
    pagination
}: BranchesIndexProps) {
    const [search, setSearch] = useState(queryParams.search || '');
    const [activeFilter, setActiveFilter] = useState(queryParams.active || '');
    const [isMainFilter, setIsMainFilter] = useState(queryParams.is_main || '');

    const handleSearch = () => {
        router.get(branches.index().url, {
            search,
            active: activeFilter,
            is_main: isMainFilter,
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

        router.get(branches.index().url, {
            ...queryParams,
            sort_by: column,
            sort_order: sortOrder,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (branchId: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar esta sucursal?')) {
            router.delete(branches.destroy(branchId).url, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const getActiveBadgeVariant = (active: boolean): "default" | "secondary" | "destructive" | "outline" => {
        return active ? 'default' : 'outline';
    };

    return (
        <TooltipProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Sucursales" />

                <div className="flex h-full flex-1 flex-col gap-4 p-4">
                    <Card>
                        {/* Header */}
                        <PageHeader
                            icon={Building2}
                            title="Gestión de Sucursales"
                            description="Administra todas las sucursales del restaurante"
                            createButton={{
                                url: branches.create().url,
                                label: 'Nueva Sucursal',
                            }}
                        />

                        {/* Content */}
                        <CardContent>
                            {/* Filtros de Busqueda */}
                            <div className="mb-6 grid gap-4 md:grid-cols-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
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
                                    value={activeFilter}
                                    onChange={(e) => setActiveFilter(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-neutral-900 dark:text-neutral-100">
                                    <option value="">Todas las sucursales</option>
                                    <option value="1">Activas</option>
                                    <option value="0">Inactivas</option>
                                </select>
                                <select
                                    value={isMainFilter}
                                    onChange={(e) => setIsMainFilter(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-neutral-900 dark:text-neutral-100">
                                    <option value="">Todas</option>
                                    <option value="1">Principal</option>
                                    <option value="0">No Principal</option>
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
                                        {branchesData.data.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={columns.filter(col => col.visible).length + 1}
                                                    className="px-4 py-8 text-center text-muted-foreground"
                                                >
                                                    No se encontraron sucursales
                                                </td>
                                            </tr>
                                        ) : (
                                            branchesData.data.map((branch) => (
                                                <tr key={branch.id} className="hover:bg-muted/50">
                                                    <td className="px-4 py-3">{branch.id}</td>
                                                    <td className="px-4 py-3 font-medium">{branch.name}</td>
                                                    <td className="px-4 py-3">{branch.city}</td>
                                                    <td className="px-4 py-3">{branch.state}</td>
                                                    <td className="px-4 py-3">{branch.phone}</td>
                                                    <td className="px-4 py-3">{branch.manager || '-'}</td>
                                                    <td className="px-4 py-3">
                                                        <Badge variant={branch.is_main ? 'default' : 'outline'}>
                                                            {branch.is_main_label}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Badge variant={getActiveBadgeVariant(branch.active)}>
                                                            {branch.active_label}
                                                        </Badge>
                                                    </td>

                                                    {/*Botones de Acciones*/}
                                                    <td className="px-4 py-3 text-right">
                                                        <TableRowActions
                                                            id={branch.id}
                                                            urls={{
                                                                show: branches.show(branch.id).url,
                                                                edit: branches.edit(branch.id).url,
                                                            }}
                                                            onDelete={handleDelete}
                                                            tooltips={{
                                                                show: 'Ver sucursal',
                                                                edit: 'Editar sucursal',
                                                                delete: 'Eliminar sucursal',
                                                            }} />
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
                                        Mostrando {pagination.from} a {pagination.to} de {pagination.total} sucursales
                                    </p>
                                    <div className="flex gap-2">
                                        {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                                            <Button
                                                key={page}
                                                variant={page === pagination.current_page ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => {
                                                    router.get(branches.index().url, {
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

