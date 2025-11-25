import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Branch } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';
import branches from '@/routes/branches';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, Mail, MapPin, Phone, Building2, Calendar, Clock, Navigation, Users, Car, Truck } from 'lucide-react';

interface BranchShowProps {
    branch: Branch;
}

export default function BranchShow({ branch }: BranchShowProps) {
    if (!branch) {
        return (
            <AppLayout breadcrumbs={[]}>
                <Head title="Error" />
                <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
                    <p className="text-lg text-muted-foreground">Sucursal no encontrada</p>
                </div>
            </AppLayout>
        );
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
        {
            title: 'Ver Sucursal',
            href: branches.show(branch.id).url,
        },
    ];

    const getActiveBadgeVariant = (active: boolean): "default" | "secondary" | "destructive" | "outline" => {
        return active ? 'default' : 'outline';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Sucursal - ${branch.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {branch.image ? (
                                    <img 
                                        src={branch.image} 
                                        alt={branch.name}
                                        className="size-20 rounded-lg object-cover border-2 border-muted"
                                    />
                                ) : (
                                    <div className="size-20 rounded-lg bg-muted flex items-center justify-center">
                                        <Building2 className="size-10 text-muted-foreground" />
                                    </div>
                                )}
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        {branch.name}
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-2 mt-1">
                                        <Badge variant={branch.is_main ? 'default' : 'outline'}>
                                            {branch.is_main ? 'Sucursal Principal' : 'Sucursal Secundaria'}
                                        </Badge>
                                        <Badge variant={getActiveBadgeVariant(branch.active)}>
                                            {branch.active_label}
                                        </Badge>
                                    </CardDescription>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Link href={branches.edit(branch.id).url}>
                                    <Button variant="default">
                                        <Edit className="mr-2 size-4" />
                                        Editar
                                    </Button>
                                </Link>
                                <Link href={branches.index().url}>
                                    <Button variant="outline">
                                        <ArrowLeft className="mr-2 size-4" />
                                        Volver
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Información de Contacto */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold border-b pb-2">Información de Contacto</h3>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <Phone className="size-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                                            <p className="text-base">{branch.phone}</p>
                                        </div>
                                    </div>

                                    {branch.email && (
                                        <div className="flex items-start gap-3">
                                            <Mail className="size-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Correo Electrónico</p>
                                                <p className="text-base">{branch.email}</p>
                                            </div>
                                        </div>
                                    )}

                                    {branch.manager && (
                                        <div className="flex items-start gap-3">
                                            <Users className="size-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Gerente</p>
                                                <p className="text-base">{branch.manager}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3">
                                        <MapPin className="size-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Dirección Completa</p>
                                            <p className="text-base">{branch.full_address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Información de Operación */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold border-b pb-2">Información de Operación</h3>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <Clock className="size-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Horario</p>
                                            <p className="text-base">
                                                {branch.opening_time_formatted || branch.opening_time || '-'} - {branch.closing_time_formatted || branch.closing_time || '-'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Calendar className="size-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Días de Operación</p>
                                            <p className="text-base">{branch.operation_days}</p>
                                        </div>
                                    </div>

                                    {branch.opening_date && (
                                        <div className="flex items-start gap-3">
                                            <Calendar className="size-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Fecha de Apertura</p>
                                                <p className="text-base">{branch.opening_date_formatted}</p>
                                            </div>
                                        </div>
                                    )}

                                    {branch.capacity_people && (
                                        <div className="flex items-start gap-3">
                                            <Users className="size-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Capacidad</p>
                                                <p className="text-base">{branch.capacity_people} personas</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Características */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold border-b pb-2">Características</h3>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Truck className="size-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Servicio de Delivery</p>
                                            <Badge variant={branch.has_delivery ? 'default' : 'outline'}>
                                                {branch.has_delivery_label}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Car className="size-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Estacionamiento</p>
                                            <Badge variant={branch.has_parking ? 'default' : 'outline'}>
                                                {branch.has_parking_label}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ubicación GPS */}
                            {(branch.latitude && branch.longitude) && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold border-b pb-2">Ubicación GPS</h3>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <Navigation className="size-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Coordenadas</p>
                                                <p className="text-base font-mono">
                                                    {branch.latitude}, {branch.longitude}
                                                </p>
                                                <a
                                                    href={`https://www.google.com/maps?q=${branch.latitude},${branch.longitude}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-primary hover:underline mt-1 inline-block"
                                                >
                                                    Ver en Google Maps
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Descripción */}
                            {branch.description && (
                                <div className="md:col-span-2 space-y-4">
                                    <h3 className="text-lg font-semibold border-b pb-2">Descripción</h3>
                                    <p className="text-base text-muted-foreground">{branch.description}</p>
                                </div>
                            )}

                            {/* Información del Sistema */}
                            <div className="md:col-span-2 space-y-4">
                                <h3 className="text-lg font-semibold border-b pb-2">Información del Sistema</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="size-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Fecha de Creación</p>
                                            <p className="text-base">
                                                {branch.creation_date_formatted || '-'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Calendar className="size-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Última Actualización</p>
                                            <p className="text-base">
                                                {branch.update_date_formatted || '-'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

