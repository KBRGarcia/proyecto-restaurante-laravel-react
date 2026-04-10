import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Plus, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export interface PageHeaderProps {
  /** Componente de icono de Lucide React */
  icon: LucideIcon;
  /** Título principal del encabezado */
  title: string;
  /** Descripción opcional debajo del título */
  description?: string;
  /** Configuración del botón de creación (opcional) */
  createButton?: {
    /** URL de destino (puede venir de las rutas tipadas) */
    url: string;
    /** Texto del botón (por defecto "Nuevo") */
    label?: string;
    /** Si se debe mostrar el botón (por defecto true) */
    show?: boolean;
  };
  /** Contenido adicional a la derecha del botón de creación */
  children?: ReactNode;
}

/**
 * Componente reutilizable para el encabezado de las páginas de índice (listado).
 * Incluye un icono, título, descripción y un botón de creación opcional.
 */
export function PageHeader({
  icon: Icon,
  title,
  description,
  createButton,
  children,
}: PageHeaderProps) {
  const showCreate = createButton?.show !== false;
  const createLabel = createButton?.label ?? 'Nuevo';

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="size-8 text-primary" />
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {showCreate && createButton?.url && (
            <Link href={createButton.url}>
              <Button>
                <Plus className="mr-2 size-4" />
                {createLabel}
              </Button>
            </Link>
          )}
          {children}
        </div>
      </div>
    </CardHeader>
  );
}