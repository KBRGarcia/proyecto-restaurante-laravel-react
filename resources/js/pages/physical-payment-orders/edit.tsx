import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PhysicalPaymentOrder } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { dashboard } from '@/routes';
import physicalPaymentOrders from '@/routes/physical-payment-orders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, Save, Receipt } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
    validation?: string;
    grid_cols?: number;
    help_text?: string;
    options?: { value: string; label: string }[];
    default?: string;
}

interface PhysicalPaymentOrderEditProps {
    physicalPaymentOrder: PhysicalPaymentOrder;
    formFields: FormField[];
    orders: { value: number; label: string }[];
}

export default function PhysicalPaymentOrderEdit({ physicalPaymentOrder, formFields, orders }: PhysicalPaymentOrderEditProps) {
    // Verificar que physicalPaymentOrder existe y tiene id
    if (!physicalPaymentOrder || !physicalPaymentOrder.id) {
        return (
            <AppLayout breadcrumbs={[]}>
                <Head title="Error" />
                <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
                    <p className="text-lg text-muted-foreground">Orden de pago físico no encontrada</p>
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
            title: 'Órdenes de Pago Físico',
            href: physicalPaymentOrders.index().url,
        },
        {
            title: 'Editar Orden de Pago Físico',
            href: physicalPaymentOrders.edit(physicalPaymentOrder.id).url,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        order_id: physicalPaymentOrder.order_id.toString(),
        limit_date: physicalPaymentOrder.limit_date ? new Date(physicalPaymentOrder.limit_date).toISOString().slice(0, 16) : '',
        status: physicalPaymentOrder.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(physicalPaymentOrders.update(physicalPaymentOrder.id).url);
    };

    const renderField = (field: FormField) => {
        const gridColsMap: Record<number, string> = {
            1: 'col-span-1',
            2: 'col-span-2',
            3: 'col-span-3',
            4: 'col-span-4',
            5: 'col-span-5',
            6: 'col-span-6',
            7: 'col-span-7',
            8: 'col-span-8',
            9: 'col-span-9',
            10: 'col-span-10',
            11: 'col-span-11',
            12: 'col-span-12',
        };
        const gridClass = field.grid_cols ? gridColsMap[field.grid_cols] : 'col-span-12';
        const value = data[field.name as keyof typeof data] ?? '';

        switch (field.type) {
            case 'select':
                // Si es order_id, usar las órdenes del prop
                if (field.name === 'order_id') {
                    return (
                        <div key={field.name} className={gridClass}>
                            <Label htmlFor={field.name}>
                                {field.label}
                                {field.required && <span className="text-destructive ml-1">*</span>}
                            </Label>
                            <select
                                id={field.name}
                                value={value as string}
                                onChange={(e) => setData(field.name as any, e.target.value)}
                                className={`flex h-9 w-full rounded-md border ${
                                    errors[field.name as keyof typeof errors] ? 'border-destructive' : 'border-input'
                                } bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                                required={field.required}
                            >
                                <option value="">{field.placeholder}</option>
                                {orders.map((order) => (
                                    <option key={order.value} value={order.value}>
                                        {order.label}
                                    </option>
                                ))}
                            </select>
                            {errors[field.name as keyof typeof errors] && (
                                <p className="text-sm text-destructive mt-1">
                                    {errors[field.name as keyof typeof errors]}
                                </p>
                            )}
                            {field.help_text && !errors[field.name as keyof typeof errors] && (
                                <p className="text-sm text-muted-foreground mt-1">{field.help_text}</p>
                            )}
                        </div>
                    );
                }
                // Para otros selects, usar las opciones del field
                return (
                    <div key={field.name} className={gridClass}>
                        <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <select
                            id={field.name}
                            value={value as string}
                            onChange={(e) => setData(field.name as any, e.target.value)}
                            className={`flex h-9 w-full rounded-md border ${
                                errors[field.name as keyof typeof errors] ? 'border-destructive' : 'border-input'
                            } bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                            required={field.required}
                        >
                            {field.placeholder && (
                                <option value="">{field.placeholder}</option>
                            )}
                            {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {errors[field.name as keyof typeof errors] && (
                            <p className="text-sm text-destructive mt-1">
                                {errors[field.name as keyof typeof errors]}
                            </p>
                        )}
                        {field.help_text && !errors[field.name as keyof typeof errors] && (
                            <p className="text-sm text-muted-foreground mt-1">{field.help_text}</p>
                        )}
                    </div>
                );

            case 'datetime-local':
                return (
                    <div key={field.name} className={gridClass}>
                        <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Input
                            id={field.name}
                            type="datetime-local"
                            placeholder={field.placeholder}
                            value={value as string}
                            onChange={(e) => setData(field.name as any, e.target.value)}
                            className={errors[field.name as keyof typeof errors] ? 'border-destructive' : ''}
                            required={field.required}
                        />
                        {errors[field.name as keyof typeof errors] && (
                            <p className="text-sm text-destructive mt-1">
                                {errors[field.name as keyof typeof errors]}
                            </p>
                        )}
                        {field.help_text && !errors[field.name as keyof typeof errors] && (
                            <p className="text-sm text-muted-foreground mt-1">{field.help_text}</p>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Orden de Pago Físico - #${physicalPaymentOrder.order_number}`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Receipt className="size-8 text-primary" />
                                <div>
                                    <CardTitle>Editar Orden de Pago Físico</CardTitle>
                                    <CardDescription>
                                        Orden #{physicalPaymentOrder.order_number}
                                    </CardDescription>
                                </div>
                            </div>
                            <Link href={physicalPaymentOrders.index().url}>
                                <Button variant="outline">
                                    <ArrowLeft className="mr-2 size-4" />
                                    Volver
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {Object.keys(errors).length > 0 && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertCircle className="size-4" />
                                <AlertDescription>
                                    Por favor, corrige los errores en el formulario antes de continuar.
                                </AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-12 gap-4">
                                {formFields.map(field => renderField(field))}
                            </div>

                            <div className="flex justify-end gap-4 pt-6 border-t">
                                <Link href={physicalPaymentOrders.index().url}>
                                    <Button type="button" variant="outline">
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 size-4" />
                                    {processing ? 'Actualizando...' : 'Actualizar Orden'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

