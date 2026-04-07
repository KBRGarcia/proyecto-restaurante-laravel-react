import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Product } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { dashboard } from '@/routes';
import products from '@/routes/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, Save, Edit as EditIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
    default?: string | number | boolean;
    rows?: number;
    accept?: string;
    step?: string;
}

interface ProductEditProps {
    product: Product;
    fields: FormField[];
}

export default function ProductEdit({ product, fields }: ProductEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        category_id: product?.category_id || '',
        image: null as File | null,
        status: product?.status || 'active',
        preparation_time: product?.preparation_time || 15,
        ingredients: product?.ingredients || '',
        is_special: product?.is_special || false,
    });

    // Verificar que product existe
    if (!product) {
        return (
            <AppLayout breadcrumbs={[]}>
                <Head title="Error" />
                <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
                    <p className="text-lg text-muted-foreground">Producto no encontrado</p>
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
            title: 'Productos',
            href: products.index().url,
        },
        {
            title: 'Editar Producto',
            href: products.edit(product.id).url,
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Si hay una imagen, usar POST con _method=PUT
        if (data.image) {
            router.post(products.update(product.id).url, {
                ...data,
                _method: 'PUT',
            } as any, {
                forceFormData: true,
            });
        } else {
            put(products.update(product.id).url);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('image', e.target.files[0]);
        }
    };

    const renderField = (field: FormField) => {
        // Mapear grid_cols a clases completas de Tailwind para que funcionen correctamente
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
                            onChange={(e) => {
                                setData(field.name as any, e.target.value);
                            }}
                            className={errors[field.name as keyof typeof errors] ? 'border-destructive' : ''}
                            required={field.required}
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

            case 'checkbox':
                return (
                    <div key={field.name} className={gridClass}>
                        <div className="flex items-center space-x-2">
                            <input
                                id={field.name}
                                type="checkbox"
                                checked={value as boolean}
                                onChange={(e) => setData(field.name as any, e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <Label htmlFor={field.name} className="font-normal">
                                {field.label}
                            </Label>
                        </div>
                        {errors[field.name as keyof typeof errors] && (
                            <p className="text-sm text-destructive mt-1">
                                {errors[field.name as keyof typeof errors]}
                            </p>
                        )}
                    </div>
                );

            case 'file':
                return (
                    <div key={field.name} className={gridClass}>
                        <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        {product.image && (
                            <div className="mb-2">
                                <img 
                                    src={product.image} 
                                    alt="Imagen actual" 
                                    className="h-20 w-20 rounded object-cover"
                                />
                                <p className="text-xs text-muted-foreground mt-1">Imagen actual</p>
                            </div>
                        )}
                        <Input
                            id={field.name}
                            type="file"
                            accept={field.accept}
                            onChange={handleFileChange}
                            className={errors[field.name as keyof typeof errors] ? 'border-destructive' : ''}
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
            <Head title={`Editar Producto - ${product.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <EditIcon className="size-5" />
                                    Editar Producto: {product.name}
                                </CardTitle>
                                <CardDescription>
                                    Modifique los datos del producto en el formulario
                                </CardDescription>
                            </div>
                            <Link href={products.index().url}>
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
                                <Link href={products.index().url}>
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
                                            Actualizar Producto
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

