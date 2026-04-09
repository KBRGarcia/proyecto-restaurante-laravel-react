import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Evaluation, type TableColumn, type FilterField, type Pagination } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import evaluations from '@/routes/evaluations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Eye, Plus, Search, Trash2, Star } from 'lucide-react';
import { useState } from 'react';

interface EvaluationsIndexProps {
    evaluations: {
        data: Evaluation[];
    };
    columns: TableColumn[];
    filters: FilterField[];
    queryParams: {
        search?: string;
        rating?: string;
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
        title: 'Evaluaciones',
        href: evaluations.index().url,
    },
];

export default function EvaluationsIndex({ 
    evaluations: evaluationsData, 
    columns, 
    queryParams = {}, 
    pagination 
}: EvaluationsIndexProps) {
    const [search, setSearch] = useState(queryParams.search || '');
    const [ratingFilter, setRatingFilter] = useState(queryParams.rating || '');

    const handleSearch = () => {
        router.get(evaluations.index().url, {
            search,
            rating: ratingFilter,
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

        router.get(evaluations.index().url, {
            ...queryParams,
            sort_by: column,
            sort_order: sortOrder,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (evaluationId: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar esta evaluación?')) {
            router.delete(evaluations.destroy(evaluationId).url, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const renderRating = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                    <Star
                        key={i}
                        className={`size-4 ${
                            i < rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                        }`}
                    />
                ))}
                <span className="ml-1 text-sm font-medium">{rating}/5</span>
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Evaluaciones" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Star className="size-5" />
                                Gestión de Evaluaciones
                            </CardTitle>
                            <CardDescription>
                                Administra todas las evaluaciones y comentarios del sistema
                            </CardDescription>
                        </div>
                        <Link href={evaluations.create().url}>
                            <Button>
                                <Plus className="mr-2 size-4" />
                                Nueva Evaluación
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
                                        placeholder="Buscar por usuario, producto o comentario..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            
                            <div className="w-full md:w-48">
                                <label className="mb-1.5 block text-sm font-medium text-foreground">
                                    Calificación
                                </label>
                                <select
                                    value={ratingFilter}
                                    onChange={(e) => setRatingFilter(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-neutral-900 dark:text-neutral-100"
                                >
                                    <option value="">Todas las calificaciones</option>
                                    <option value="5">⭐⭐⭐⭐⭐ (5 estrellas)</option>
                                    <option value="4">⭐⭐⭐⭐ (4 estrellas)</option>
                                    <option value="3">⭐⭐⭐ (3 estrellas)</option>
                                    <option value="2">⭐⭐ (2 estrellas)</option>
                                    <option value="1">⭐ (1 estrella)</option>
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
                                    {evaluationsData.data.length === 0 ? (
                                        <tr>
                                            <td 
                                                colSpan={columns.filter(col => col.visible).length + 1}
                                                className="px-4 py-8 text-center text-muted-foreground"
                                            >
                                                No se encontraron evaluaciones
                                            </td>
                                        </tr>
                                    ) : (
                                        evaluationsData.data.map((evaluation) => (
                                            <tr key={evaluation.id} className="hover:bg-muted/50">
                                                <td className="px-4 py-3">{evaluation.id}</td>
                                                <td className="px-4 py-3 font-medium">{evaluation.user_name || '-'}</td>
                                                <td className="px-4 py-3">{evaluation.product_name || '-'}</td>
                                                <td className="px-4 py-3">{evaluation.order_number ? `#${evaluation.order_number}` : '-'}</td>
                                                <td className="px-4 py-3">
                                                    {renderRating(evaluation.rating)}
                                                </td>
                                                <td className="px-4 py-3 max-w-xs truncate">
                                                    {evaluation.comment || '-'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {evaluation.evaluation_date_formatted}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={evaluations.show(evaluation.id).url}>
                                                            <Button variant="outline" size="sm">
                                                                <Eye className="size-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={evaluations.edit(evaluation.id).url}>
                                                            <Button variant="outline" size="sm">
                                                                <Edit className="size-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDelete(evaluation.id)}
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
                                    Mostrando {pagination.from} a {pagination.to} de {pagination.total} evaluaciones
                                </p>
                                <div className="flex gap-2">
                                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                                        <Button
                                            key={page}
                                            variant={page === pagination.current_page ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => {
                                                router.get(evaluations.index().url, {
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

