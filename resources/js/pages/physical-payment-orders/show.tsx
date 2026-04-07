import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PhysicalPaymentOrder } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';
import physicalPaymentOrders from '@/routes/physical-payment-orders';
import orders from '@/routes/orders';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, Receipt, ShoppingCart, Clock, AlertTriangle } from 'lucide-react';

interface PhysicalPaymentOrderShowProps {
    physicalPaymentOrder: PhysicalPaymentOrder;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Órdenes de Pago Físico',
        href: physicalPaymentOrders.index().url,
    },
    {
        title: 'Ver Orden de Pago Físico',
        href: '#',
    },
];

export default function PhysicalPaymentOrderShow({ physicalPaymentOrder }: PhysicalPaymentOrderShowProps) {
    const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
        switch (status) {
            case 'pending':
                return 'default';
            case 'confirmed':
                return 'secondary';
            case 'canceled':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getStatusLabel = (status: string): string => {
        switch (status) {
            case 'pending':
                return 'Pendiente';
            case 'confirmed':
                return 'Confirmado';
            case 'canceled':
                return 'Cancelado';
            default:
                return status;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Orden de Pago Físico #${physicalPaymentOrder.id}`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Receipt className="size-8 text-primary" />
                                <div>
                                    <CardTitle>Orden de Pago Físico #{physicalPaymentOrder.id}</CardTitle>
                                    <CardDescription>
                                        Información completa de la orden de pago físico
                                    </CardDescription>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Link href={physicalPaymentOrders.edit(physicalPaymentOrder.id).url}>
                                    <Button variant="outline">
                                        <Edit className="mr-2 size-4" />
                                        Editar
                                    </Button>
                                </Link>
                                <Link href={physicalPaymentOrders.index().url}>
                                    <Button variant="outline">
                                        <ArrowLeft className="mr-2 size-4" />
                                        Volver
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Información de la Orden Relacionada */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <ShoppingCart className="size-5" />
                                        Información de la Orden
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Número de Orden</p>
                                        <Link href={orders.show(physicalPaymentOrder.order_id).url}>
                                            <p className="text-base font-semibold text-primary hover:underline">
                                                #{physicalPaymentOrder.order_number}
                                            </p>
                                        </Link>
                                    </div>
                                    {physicalPaymentOrder.order && (
                                        <>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Cliente</p>
                                                <p className="text-base">{physicalPaymentOrder.order.user_name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Estado de la Orden</p>
                                                <p className="text-base capitalize">{physicalPaymentOrder.order.status}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Tipo de Servicio</p>
                                                <p className="text-base capitalize">{physicalPaymentOrder.order.service_type}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Total</p>
                                                <p className="text-base font-semibold">
                                                    {physicalPaymentOrder.order.currency === 'nacional' ? 'Bs.' : '$'}
                                                    {typeof physicalPaymentOrder.order.total === 'number' 
                                                        ? physicalPaymentOrder.order.total.toFixed(2)
                                                        : physicalPaymentOrder.order.total}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Fecha de Orden</p>
                                                <p className="text-base">
                                                    {new Date(physicalPaymentOrder.order.order_date).toLocaleString('es-ES')}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Información de la Orden de Pago Físico */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Receipt className="size-5" />
                                        Información de Pago Físico
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Estado</p>
                                        <Badge variant={getStatusBadgeVariant(physicalPaymentOrder.status)} className="mt-1">
                                            {getStatusLabel(physicalPaymentOrder.status)}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Fecha Límite</p>
                                        <p className="text-base font-semibold">
                                            {physicalPaymentOrder.limit_date_formatted || '-'}
                                        </p>
                                        {physicalPaymentOrder.is_expired && (
                                            <div className="mt-2 flex items-center gap-2 text-destructive">
                                                <AlertTriangle className="size-4" />
                                                <span className="text-sm font-medium">Vencida</span>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Fecha de Creación</p>
                                        <p className="text-base">
                                            {physicalPaymentOrder.creation_date_formatted || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Última Actualización</p>
                                        <p className="text-base">
                                            {physicalPaymentOrder.update_date_formatted || '-'}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Información del Sistema */}
                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Clock className="size-5" />
                                        Información del Sistema
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">ID de la Orden de Pago Físico</p>
                                            <p className="text-base font-mono">#{physicalPaymentOrder.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Creado</p>
                                            <p className="text-base">
                                                {physicalPaymentOrder.created_at_formatted || '-'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Última Actualización</p>
                                            <p className="text-base">
                                                {physicalPaymentOrder.updated_at_formatted || '-'}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Alerta si está vencida */}
                        {physicalPaymentOrder.is_expired && physicalPaymentOrder.status === 'pending' && (
                            <Card className="mt-6 border-destructive bg-destructive/10">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3">
                                        <AlertTriangle className="size-5 text-destructive" />
                                        <div>
                                            <p className="font-semibold text-destructive">Orden Vencida</p>
                                            <p className="text-sm text-muted-foreground">
                                                La fecha límite de pago ha pasado. Considera actualizar el estado o la fecha límite.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

