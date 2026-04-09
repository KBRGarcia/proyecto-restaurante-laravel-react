import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Eye, Edit, Trash2, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

/**
 * Props para un botón individual con tooltip.
 */
export interface ActionButtonProps {
    /** URL o función a ejecutar */
    to?: string;
    onClick?: () => void;
    /** Variante del botón */
    variant?: 'default' | 'outline' | 'destructive' | 'ghost';
    /** Tamaño del botón */
    size?: 'default' | 'sm' | 'lg' | 'icon';
    /** Icono a mostrar */
    icon: LucideIcon;
    /** Texto del tooltip */
    tooltip: string;
    /** Clases adicionales para el icono */
    iconClassName?: string;
    /** Si es true, el botón se deshabilita */
    disabled?: boolean;
}

/**
 * Botón individual con tooltip integrado.
 * Puede funcionar como Link (si se proporciona 'to') o como Button normal (si se proporciona 'onClick').
 */
export function ActionButton({
    to,
    onClick,
    variant = 'outline',
    size = 'sm',
    icon: Icon,
    tooltip,
    iconClassName = 'size-4',
    disabled = false,
}: ActionButtonProps) {
    const buttonContent = (
        <Button
            variant={variant}
            size={size}
            onClick={onClick}
            disabled={disabled}
            asChild={Boolean(to)} // Si hay 'to', el botón actúa como hijo de Link
        >
            {to ? (
                <Link href={to}>
                    <Icon className={iconClassName} />
                </Link>
            ) : (
                <Icon className={iconClassName} />
            )}
        </Button>
    );

    return (
        <Tooltip>
            <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    );
}

/**
 * Props para el conjunto de acciones estándar (Ver, Editar, Eliminar).
 */
export interface TableRowActionsProps {
    /** ID del recurso */
    id: number;
    /** URLs base para las acciones (deben ser generadas con las rutas tipadas) */
    urls: {
        show: string;
        edit: string;
    };
    /** Callback para la acción de eliminar (recibe el id) */
    onDelete: (id: number) => void;
    /** Textos personalizables para los tooltips (opcional) */
    tooltips?: {
        show?: string;
        edit?: string;
        delete?: string;
    };
    /** Mostrar/ocultar botones específicos */
    showButtons?: {
        show?: boolean;
        edit?: boolean;
        delete?: boolean;
    };
}

/**
 * Componente que agrupa los tres botones de acción típicos en una fila de tabla (Ver, Editar, Eliminar)
 * con tooltips y comportamiento consistente.
 */
export function TableRowActions({
    id,
    urls,
    onDelete,
    tooltips = {
        show: 'Ver',
        edit: 'Editar',
        delete: 'Eliminar',
    },
    showButtons = { show: true, edit: true, delete: true },
}: TableRowActionsProps) {
    return (
        <div className="flex items-center justify-end gap-2">
            {showButtons.show && (
                <ActionButton
                    to={urls.show}
                    icon={Eye}
                    tooltip={tooltips.show ?? 'Ver'}
                    variant="outline"
                    size="sm"
                />
            )}
            {showButtons.edit && (
                <ActionButton
                    to={urls.edit}
                    icon={Edit}
                    tooltip={tooltips.edit ?? 'Editar'}
                    variant="outline"
                    size="sm"
                />
            )}
            {showButtons.delete && (
                <ActionButton
                    onClick={() => onDelete(id)}
                    icon={Trash2}
                    tooltip={tooltips.delete ?? 'Eliminar'}
                    variant="outline"
                    size="sm"
                    iconClassName="size-4 text-destructive"
                />
            )}
        </div>
    );
}