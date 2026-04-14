import { Button } from '@/components/ui/button';
import { type Pagination as PaginationType } from '@/types';

export interface PaginationNavProps {
    /** Información de paginación desde el backend */
    pagination: PaginationType;
    /** Callback cuando se cambia de página */
    onPageChange: (page: number) => void;
}

/**
 * Componente de paginación reutilizable.
 * Muestra información de registros y botones de página.
 */
export function PaginationNav({ pagination, onPageChange }: PaginationNavProps) {
    if (pagination.total === 0) {
        return null;
    }

    const { from, to, total, current_page, last_page } = pagination;

    return (
        <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
                Mostrando {from} a {to} de {total} registros
            </p>
            <div className="flex gap-2">
                {Array.from({ length: last_page }, (_, i) => i + 1).map((page) => (
                    <Button
                        key={page}
                        variant={page === current_page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </Button>
                ))}
            </div>
        </div>
    );
}