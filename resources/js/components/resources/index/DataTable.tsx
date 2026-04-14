import { type TableColumn } from '@/types';
import { ReactNode } from 'react';

export interface DataTableProps<T> {
    /** Datos a mostrar */
    data: T[];
    /** Columnas definidas desde el backend */
    columns: TableColumn[];
    /** Función que renderiza una fila completa (incluye las celdas de datos y las acciones) */
    renderRow: (item: T) => ReactNode;
    /** Texto a mostrar cuando no hay datos */
    emptyMessage?: string;
    /** Parámetros de ordenamiento actuales */
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    /** Callback para cambiar el ordenamiento */
    onSort?: (columnKey: string) => void;
    /** Indica si se debe mostrar la columna de acciones (por defecto true) */
    showActionsColumn?: boolean;
}

/**
 * Componente de tabla reutilizable para vistas de índice.
 * Soporta ordenamiento por columnas y personalización completa de filas.
 */
export function DataTable<T>({
    data,
    columns,
    renderRow,
    emptyMessage = 'No se encontraron registros',
    sortBy,
    sortOrder,
    onSort,
    showActionsColumn = true,
}: DataTableProps<T>) {
    const visibleColumns = columns.filter((col) => col.visible);

    const handleSortClick = (columnKey: string) => {
        if (onSort) {
            onSort(columnKey);
        }
    };

    return (
        <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm">
                <thead className="border-b bg-muted/50">
                    <tr>
                        {visibleColumns.map((column) => (
                            <th
                                key={column.key}
                                className="px-4 py-3 text-left font-medium text-muted-foreground"
                            >
                                {column.sortable ? (
                                    <button
                                        onClick={() => handleSortClick(column.key)}
                                        className="flex items-center gap-1 hover:text-foreground"
                                    >
                                        {column.label}
                                        {sortBy === column.key && (
                                            <span className="text-xs">
                                                {sortOrder === 'asc' ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </button>
                                ) : (
                                    column.label
                                )}
                            </th>
                        ))}
                        {showActionsColumn && (
                            <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                                Acciones
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={
                                    visibleColumns.length + (showActionsColumn ? 1 : 0)
                                }
                                className="px-4 py-8 text-center text-muted-foreground"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => renderRow(item))
                    )}
                </tbody>
            </table>
        </div>
    );
}