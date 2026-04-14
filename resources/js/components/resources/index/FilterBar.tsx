import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export interface FilterOption {
    value: string;
    label: string;
}

export interface FilterDefinition {
    /** Nombre único del filtro (debe coincidir con el estado) */
    name: string;
    /** Tipo de control a renderizar */
    type: 'search' | 'select';
    /** Placeholder para el input de búsqueda */
    placeholder?: string;
    /** Opciones estáticas (si se conocen de antemano) */
    options?: FilterOption[];
    /** Texto por defecto cuando no hay selección */
    defaultOptionLabel?: string;
    /** Clases adicionales para el contenedor */
    className?: string;
}

export interface FilterBarProps {
    /** Configuración de los filtros a mostrar */
    filters: FilterDefinition[];
    /** Valores actuales de los filtros (objeto clave-valor) */
    values: Record<string, string>;
    /** Callback cuando cambia un valor de filtro */
    onFilterChange: (name: string, value: string) => void;
    /** Opciones dinámicas para filtros select (clave = nombre del filtro) */
    dynamicOptions?: Record<string, FilterOption[]>;
    /** Función que se ejecuta al hacer clic en "Buscar" o presionar Enter */
    onSearch: () => void;
    /** Texto del botón de búsqueda */
    searchButtonText?: string;
    /** Número de columnas en grid (por defecto: según cantidad de filtros + 1) */
    gridCols?: number;
}

/**
 * Componente de barra de filtros reutilizable.
 * Soporta inputs de búsqueda y selects con opciones estáticas o dinámicas.
 */
export function FilterBar({
    filters,
    values,
    onFilterChange,
    dynamicOptions = {},
    onSearch,
    searchButtonText = 'Buscar',
    gridCols,
}: FilterBarProps) {
    // Calculamos el número de columnas: cantidad de filtros + 1 para el botón
    const totalItems = filters.length + 1;
    const cols = gridCols ?? totalItems;
    const gridClass = `mb-6 grid gap-4 md:grid-cols-${cols}`;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className={gridClass}>
            {filters.map((filter) => {
                const value = values[filter.name] ?? '';

                if (filter.type === 'search') {
                    return (
                        <div key={filter.name} className="relative">
                            <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                            <Input
                                placeholder={filter.placeholder ?? 'Buscar...'}
                                value={value}
                                onChange={(e) => onFilterChange(filter.name, e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="pl-10"
                            />
                        </div>
                    );
                }

                // Tipo select
                const options =
                    dynamicOptions[filter.name] ?? filter.options ?? [];
                const defaultLabel = filter.defaultOptionLabel ?? 'Todos';

                return (
                    <select
                        key={filter.name}
                        value={value}
                        onChange={(e) => onFilterChange(filter.name, e.target.value)}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-neutral-900 dark:text-neutral-100"
                    >
                        <option value="">{defaultLabel}</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            })}

            <Button onClick={onSearch} className="w-full">
                <Search className="mr-2 size-4" />
                {searchButtonText}
            </Button>
        </div>
    );
}