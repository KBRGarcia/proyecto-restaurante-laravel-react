import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type VenezuelaBank, type TableColumn, type FilterField, type Pagination } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import venezuelaBanks from '@/routes/venezuela-banks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Building2 } from 'lucide-react';
import { useState } from 'react';
import { TooltipProvider} from "@/components/ui/tooltip";
import { TableRowActions } from '@/components/resources/index/ActionButtons';
import { PageHeader } from '@/components/resources/index/PageHeader';

interface VenezuelaBanksIndexProps {
    banks: {
        data: VenezuelaBank[];
    };
    columns: TableColumn[];
    filters: FilterField[];
    queryParams: {
        search?: string;
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
        title: 'Bancos de Venezuela',
        href: venezuelaBanks.index().url,
    },
];

export default function VenezuelaBanksIndex({ 
    banks: banksData, 
    columns, 
    queryParams = {}, 
    pagination 
}: VenezuelaBanksIndexProps) {
    const [search, setSearch] = useState(queryParams.search || '');
    const [activeFilter, setActiveFilter] = useState(queryParams.active || '');

    const handleSearch = () => {
        router.get(venezuelaBanks.index().url, {
            search,
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

        router.get(venezuelaBanks.index().url, {
            ...queryParams,
            sort_by: column,
            sort_order: sortOrder,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (bankId: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar este banco?')) {
            router.delete(venezuelaBanks.destroy(bankId).url, {
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
                <Head title="Bancos de Venezuela" />
                
                <div className="flex h-full flex-1 flex-col gap-4 p-4">
                    <Card>
                        {/* Header */}
                        <PageHeader
                            icon={Building2}
                            title="Gestión de Bancos de Venezuela"
                            description="Administra todos los bancos venezolanos del sistema"
                            createButton={{
                                url: venezuelaBanks.create().url,
                                label: 'Nuevo Banco',
                            }}
                        />
                        
                        {/* Content */}
                        <CardContent>
                            {/* Filtros de Busqueda*/}
                            <div className="mb-6 grid gap-4 md:grid-cols-3">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
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
                                        {banksData.data.length === 0 ? (
                                            <tr>
                                                <td 
                                                    colSpan={columns.filter(col => col.visible).length + 1}
                                                    className="px-4 py-8 text-center text-muted-foreground"
                                                >
                                                    No se encontraron bancos
                                                </td>
                                            </tr>
                                        ) : (
                                            banksData.data.map((bank) => (
                                                <tr key={bank.id} className="hover:bg-muted/50">
                                                    <td className="px-4 py-3">{bank.id}</td>
                                                    <td className="px-4 py-3 font-medium">{bank.code}</td>
                                                    <td className="px-4 py-3">{bank.name}</td>
                                                    <td className="px-4 py-3">
                                                        <Badge variant={getActiveBadgeVariant(bank.active)}>
                                                            {bank.active_label}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {bank.creation_date_formatted || '-'}
                                                    </td>
                                                    
                                                    {/* Botones de acción */}
                                                        <td className="px-4 py-3 text-right">
                                                            <TableRowActions
                                                                id={bank.id}
                                                                urls={{
                                                                    show: venezuelaBanks.show(bank.id).url,
                                                                    edit: venezuelaBanks.edit(bank.id).url,
                                                                }}
                                                                onDelete={handleDelete}
                                                                tooltips={{
                                                                    show: 'Ver banco',
                                                                    edit: 'Editar banco',
                                                                    delete: 'Eliminar banco',
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
                                        Mostrando {pagination.from} a {pagination.to} de {pagination.total} bancos
                                    </p>
                                    <div className="flex gap-2">
                                        {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                                            <Button
                                                key={page}
                                                variant={page === pagination.current_page ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => {
                                                    router.get(venezuelaBanks.index().url, {
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

