import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Branch } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { dashboard } from '@/routes';
import branches from '@/routes/branches';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, Save, Building2 } from 'lucide-react';
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
    rows?: number;
    min?: number;
    step?: number;
}

interface BranchEditProps {
    branch: Branch;
    formFields: FormField[];
}

export default function BranchEdit({ branch, formFields }: BranchEditProps) {
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
            title: 'Editar Sucursal',
            href: branches.edit(branch.id).url,
        },
    ];

    // Formatear hora para input time (HH:mm)
    const formatTimeForInput = (time: string | null | undefined): string => {
        if (!time) return '';
        const timeStr = String(time);
        if (timeStr.includes(':')) {
            const parts = timeStr.split(':');
            return `${parts[0]}:${parts[1]}`;
        }
        return timeStr;
    };

    const { data, setData, put, processing, errors } = useForm({
        name: branch?.name || '',
        phone: branch?.phone || '',
        email: branch?.email || '',
        manager: branch?.manager || '',
        address: branch?.address || '',
        city: branch?.city || '',
        state: branch?.state || '',
        postal_code: branch?.postal_code || '',
        opening_time: formatTimeForInput(branch?.opening_time_formatted || branch?.opening_time),
        closing_time: formatTimeForInput(branch?.closing_time_formatted || branch?.closing_time),
        operation_days: branch?.operation_days || 'Monday to Sunday',
        capacity_people: branch?.capacity_people?.toString() || '',
        opening_date: branch?.opening_date ? new Date(branch.opening_date).toISOString().split('T')[0] : '',
        latitude: branch?.latitude?.toString() || '',
        longitude: branch?.longitude?.toString() || '',
        is_main: branch?.is_main ? '1' : '0',
        has_delivery: branch?.has_delivery ? '1' : '0',
        has_parking: branch?.has_parking ? '1' : '0',
        active: branch?.active ? '1' : '0',
        image: branch?.image || '',
        description: branch?.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(branches.update(branch.id).url);
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
            case 'text':
            case 'email':
                return (
                    <div key={field.name} className={gridClass}>
                        <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Input
                            id={field.name}
                            type={field.type}
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
                            required={field.required}
                            min={field.min}
                            step={field.step}
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

            case 'time':
                return (
                    <div key={field.name} className={gridClass}>
                        <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Input
                            id={field.name}
                            type="time"
                            placeholder={field.placeholder}
                            value={value as string}
                            onChange={(e) => setData(field.name as any, e.target.value + ':00')}
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

            case 'date':
                return (
                    <div key={field.name} className={gridClass}>
                        <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Input
                            id={field.name}
                            type="date"
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
                        {field.help_text && !errors[field.name as keyof typeof errors] && (
                            <p className="text-sm text-muted-foreground mt-1">{field.help_text}</p>
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
            <Head title={`Editar Sucursal - ${branch?.name || ''}`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="size-5" />
                                    Editar Sucursal: {branch?.name || ''}
                                </CardTitle>
                                <CardDescription>
                                    Modifique los datos de la sucursal en el formulario
                                </CardDescription>
                            </div>
                            <Link href={branches.index().url}>
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
                                {formFields.map(renderField)}
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-3">
                                <Link href={branches.index().url}>
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
                                            Actualizar Sucursal
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

