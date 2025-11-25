import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Branch, type TableColumn, type FilterField, type Pagination } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import branches from '@/routes/branches';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Eye, Plus, Search, Trash2, Building2 } from 'lucide-react';
import { useState } from 'react';

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
    filters, 
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sucursales" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="size-5" />
                                Gestión de Sucursales
                            </CardTitle>
                            <CardDescription>
                                Administra todas las sucursales del restaurante
                            </CardDescription>
                        </div>
                        <Link href={branches.create().url}>
                            <Button>
                                <Plus className="mr-2 size-4" />
                                Nueva Sucursal
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
                                        placeholder="Buscar por nombre, ciudad, dirección o gerente..."
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
                                    value={activeFilter}
                                    onChange={(e) => setActiveFilter(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                >
                                    <option value="">Todas las sucursales</option>
                                    <option value="1">Activas</option>
                                    <option value="0">Inactivas</option>
                                </select>
                            </div>

                            <div className="w-full md:w-48">
                                <label className="mb-1.5 block text-sm font-medium text-foreground">
                                    Principal
                                </label>
                                <select
                                    value={isMainFilter}
                                    onChange={(e) => setIsMainFilter(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                >
                                    <option value="">Todas</option>
                                    <option value="1">Principal</option>
                                    <option value="0">No Principal</option>
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
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={branches.show(branch.id).url}>
                                                            <Button variant="outline" size="sm">
                                                                <Eye className="size-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={branches.edit(branch.id).url}>
                                                            <Button variant="outline" size="sm">
                                                                <Edit className="size-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDelete(branch.id)}
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
    );
}

