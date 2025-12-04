import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Order } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { dashboard } from '@/routes';
import orders from '@/routes/orders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, Save, ShoppingCart } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect } from 'react';

interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
    validation: string;
    grid_cols?: number;
    help_text?: string;
    show_on_edit?: boolean;
    options?: { value: string; label: string }[];
    default?: string;
    rows?: number;
    step?: string;
}

interface OrderEditProps {
    order: Order | null;
    fields: FormField[];
    users: { value: number; label: string }[];
    employees: { value: number; label: string }[];
}

export default function OrderEdit({ order, fields, users, employees }: OrderEditProps) {
    // Extraer los datos del objeto order (puede venir como {data: {...}} o directamente)
    // TypeScript: manejar ambos casos de estructura
    const orderData: Order = (order && typeof order === 'object' && 'data' in order && order.data) 
        ? (order.data as Order) 
        : (order as Order);
    
    // Verificar que orderData existe
    if (!orderData) {
        return (
            <AppLayout breadcrumbs={[]}>
                <Head title="Error" />
                <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
                    <p className="text-lg text-muted-foreground">Orden no encontrada</p>
                </div>
            </AppLayout>
        );
    }
    
    // Verificar que orderData tiene id
    if (orderData.id === undefined || orderData.id === null) {
        return (
            <AppLayout breadcrumbs={[]}>
                <Head title="Error" />
                <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
                    <p className="text-lg text-muted-foreground">Orden no encontrada: ID no válido</p>
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
            title: 'Órdenes',
            href: orders.index().url,
        },
        {
            title: 'Editar Orden',
            href: orderData.id ? orders.edit(orderData.id).url : '#',
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        user_id: orderData.user_id?.toString() || '',
        assigned_employee_id: orderData.assigned_employee_id?.toString() || '',
        status: orderData.status || 'pending',
        service_type: orderData.service_type || 'delivery',
        currency: orderData.currency || 'internacional',
        subtotal: orderData.subtotal?.toString() || '',
        taxes: orderData.taxes?.toString() || '0',
        total: orderData.total?.toString() || '',
        delivery_address: orderData.delivery_address || '',
        contact_phone: orderData.contact_phone || '',
        special_notes: orderData.special_notes || '',
        payment_method: orderData.payment_method || '',
        estimated_delivery_date: orderData.estimated_delivery_date 
            ? new Date(orderData.estimated_delivery_date).toISOString().slice(0, 16)
            : '',
    });

    // Auto-calcular el total cuando cambian subtotal o taxes
    useEffect(() => {
        const subtotal = parseFloat(data.subtotal) || 0;
        const taxes = parseFloat(data.taxes) || 0;
        const total = (subtotal + taxes).toFixed(2);
        setData('total', total);
    }, [data.subtotal, data.taxes]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderData.id) {
            return;
        }
        put(orders.update(orderData.id).url);
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

        // Agregar opciones dinámicas para user_id y assigned_employee_id
        if (field.name === 'user_id') {
            field.options = users.map(u => ({ value: u.value.toString(), label: u.label }));
        } else if (field.name === 'assigned_employee_id') {
            field.options = [
                { value: '', label: 'Sin asignar' },
                ...employees.map(e => ({ value: e.value.toString(), label: e.label }))
            ];
        }

        switch (field.type) {
            case 'text':
                return (
                    <div key={field.name} className={gridClass}>
                        <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Input
                            id={field.name}
                            type="text"
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

            case 'number':
                return (
                    <div key={field.name} className={gridClass}>
                        <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Input
                            id={field.name}
                            type="number"
                            placeholder={field.placeholder}
                            value={value as string | number}
                            onChange={(e) => setData(field.name as any, e.target.value)}
                            className={errors[field.name as keyof typeof errors] ? 'border-destructive' : ''}
                            step={field.step || '1'}
                            min="0"
                            required={field.required}
                            disabled={field.name === 'total'} // Total es calculado automáticamente
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

            case 'textarea':
                return (
                    <div key={field.name} className={gridClass}>
                        <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Textarea
                            id={field.name}
                            placeholder={field.placeholder}
                            value={value as string}
                            onChange={(e) => setData(field.name as any, e.target.value)}
                            className={errors[field.name as keyof typeof errors] ? 'border-destructive' : ''}
                            rows={field.rows || 3}
                            required={field.required}
                        />
                        {errors[field.name as keyof typeof errors] && (
                            <p className="text-sm text-destructive mt-1">
                                {errors[field.name as keyof typeof errors]}
                            </p>
                        )}
                    </div>
                );

            case 'select':
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
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Orden #${orderData.id}`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <ShoppingCart className="size-5" />
                                    Editar Orden #{orderData.id}
                                </CardTitle>
                                <CardDescription>
                                    Modifique los datos de la orden en el formulario
                                </CardDescription>
                            </div>
                            <Link href={orders.index().url}>
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
                                    Por favor, corrija los errores en el formulario antes de continuar.
                                </AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-12 gap-4">
                                {fields.map(renderField)}
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-3">
                                <Link href={orders.index().url}>
                                    <Button type="button" variant="outline">
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <>
                                            <span className="mr-2">Actualizando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 size-4" />
                                            Actualizar Orden
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

