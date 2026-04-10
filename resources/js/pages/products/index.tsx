import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Product, type TableColumn, type FilterField, type Pagination } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import products from '@/routes/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Package } from 'lucide-react';
import { useState } from 'react';
import { TooltipProvider} from "@/components/ui/tooltip";
import { TableRowActions } from '@/components/resources/index/ActionButtons';
import { PageHeader } from '@/components/resources/index/PageHeader';

interface ProductsIndexProps {
    products: {
        data: Product[];
    };
    columns: TableColumn[];
    filters: FilterField[];
    queryParams: {
        search?: string;
        category_id?: string;
        status?: string;
        is_special?: string;
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
        title: 'Productos',
        href: products.index().url,
    },
];

export default function ProductsIndex({ 
    products: productsData, 
    columns, 
    filters, 
    queryParams = {}, 
    pagination 
}: ProductsIndexProps) {
    const [search, setSearch] = useState(queryParams.search || '');
    const [categoryFilter, setCategoryFilter] = useState(queryParams.category_id || '');
    const [statusFilter, setStatusFilter] = useState(queryParams.status || '');
    const [specialFilter] = useState(queryParams.is_special || '');

    const handleSearch = () => {
        router.get(products.index().url, {
            search,
            category_id: categoryFilter,
            status: statusFilter,
            is_special: specialFilter,
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

        router.get(products.index().url, {
            ...queryParams,
            sort_by: column,
            sort_order: sortOrder,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (productId: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            router.delete(products.destroy(productId).url, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
        switch (status) {
            case 'active': return 'default';
            case 'inactive': return 'outline';
            case 'out of stock': return 'destructive';
            default: return 'outline';
        }
    };

    // Obtener opciones de los filtros
    const getCategoryOptions = () => {
        const categoryFilter = filters.find(f => f.name === 'category_id');
        return categoryFilter?.options || [];
    };

    return (
        <TooltipProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Productos" />
                
                <div className="flex h-full flex-1 flex-col gap-4 p-4">
                    <Card>
                        {/* Header */}
                        <PageHeader
                            icon={Package}
                            title="Gestión de Productos"
                            description="Administra todos los productos del sistema"
                            createButton={{
                                url: products.create().url,
                                label: 'Nuevo Producto',
                            }}
                        />

                        {/* Content */}
                        <CardContent>
                            {/* Filtros de Busqueda*/}
                            <div className="mb-6 grid gap-4 md:grid-cols-4">
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
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-neutral-900 dark:text-neutral-100">
                                    {getCategoryOptions().map((option: any) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-neutral-900 dark:text-neutral-100">
                                    <option value="">Todos los estados</option>
                                    <option value="active">Activo</option>
                                    <option value="inactive">Inactivo</option>
                                    <option value="out of stock">Agotado</option>
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
                                        {productsData.data.length === 0 ? (
                                            <tr>
                                                <td 
                                                    colSpan={columns.filter(col => col.visible).length + 1}
                                                    className="px-4 py-8 text-center text-muted-foreground"
                                                >
                                                    No se encontraron productos
                                                </td>
                                            </tr>
                                        ) : (
                                            productsData.data.map((product) => (
                                                <tr key={product.id} className="hover:bg-muted/50">
                                                    <td className="px-4 py-3">{product.id}</td>
                                                    <td className="px-4 py-3 font-medium">{product.name}</td>
                                                    <td className="px-4 py-3">${parseFloat(product.price).toFixed(2)}</td>
                                                    <td className="px-4 py-3">{product.category_name || '-'}</td>
                                                    <td className="px-4 py-3">
                                                        <Badge variant={getStatusBadgeVariant(product.status)}>
                                                            {product.status_label}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3">{product.preparation_time} min</td>
                                                    
                                                    {/* Botones de acción */}
                                                    <td className="px-4 py-3 text-right">
                                                        <TableRowActions
                                                            id={product.id}
                                                            urls={{
                                                                show: products.show(product.id).url,
                                                                edit: products.edit(product.id).url,
                                                            }}
                                                            onDelete={handleDelete}
                                                            tooltips={{
                                                                show: 'Ver producto',
                                                                edit: 'Editar producto',
                                                                delete: 'Eliminar producto',
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
                                        Mostrando {pagination.from} a {pagination.to} de {pagination.total} productos
                                    </p>
                                    <div className="flex gap-2">
                                        {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                                            <Button
                                                key={page}
                                                variant={page === pagination.current_page ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => {
                                                    router.get(products.index().url, {
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

