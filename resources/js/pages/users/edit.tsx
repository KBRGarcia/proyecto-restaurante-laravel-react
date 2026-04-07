import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { dashboard } from '@/routes';
import users from '@/routes/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, Save, UserCog } from 'lucide-react';
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
    default?: string;
    rows?: number;
    accept?: string;
}

interface UserEditProps {
    user: User;
    fields: FormField[];
}

export default function UserEdit({ user, fields }: UserEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: user?.name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        phone_number: user?.phone_number || '',
        password: '',
        password_confirmation: '',
        address: user?.address || '',
        role: user?.role || 'client',
        status: user?.status || 'active',
        profile_picture: null as File | null,
    });

    // Verificar que user existe
    if (!user) {
        return (
            <AppLayout breadcrumbs={[]}>
                <Head title="Error" />
                <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
                    <p className="text-lg text-muted-foreground">Usuario no encontrado</p>
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
            title: 'Usuarios',
            href: users.index().url,
        },
        {
            title: 'Editar Usuario',
            href: users.edit(user.id).url,
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Si hay una imagen, usar POST con _method=PUT
        if (data.profile_picture) {
            router.post(users.update(user.id).url, {
                ...data,
                _method: 'PUT',
            } as any, {
                forceFormData: true,
            });
        } else {
            put(users.update(user.id).url);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('profile_picture', e.target.files[0]);
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

        // En edición, no mostrar campos de password si show_on_edit es false
        if (field.show_on_edit === false && (field.name === 'password' || field.name === 'password_confirmation')) {
            // Mostrarlos pero como opcionales
            const passwordGridClass = field.grid_cols ? gridColsMap[field.grid_cols] : 'col-span-12';
            return (
                <div key={field.name} className={passwordGridClass}>
                    <Label htmlFor={field.name}>
                        {field.label}
                        <span className="text-muted-foreground ml-1">(Opcional - dejar en blanco para mantener la actual)</span>
                    </Label>
                    <Input
                        id={field.name}
                        type="password"
                        placeholder={field.placeholder}
                        value={data[field.name as keyof typeof data] as string}
                        onChange={(e) => setData(field.name as any, e.target.value)}
                        className={errors[field.name as keyof typeof errors] ? 'border-destructive' : ''}
                    />
                    {errors[field.name as keyof typeof errors] && (
                        <p className="text-sm text-destructive mt-1">
                            {errors[field.name as keyof typeof errors]}
                        </p>
                    )}
                </div>
            );
        }

        const gridClass = field.grid_cols ? gridColsMap[field.grid_cols] : 'col-span-12';
        const value = data[field.name as keyof typeof data] || '';

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

            case 'password':
                // Ya manejado arriba
                return null;

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

            case 'file':
                return (
                    <div key={field.name} className={gridClass}>
                        <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        {user.profile_picture && (
                            <div className="mb-2">
                                <img 
                                    src={user.profile_picture} 
                                    alt="Foto actual" 
                                    className="h-20 w-20 rounded-full object-cover"
                                />
                                <p className="text-xs text-muted-foreground mt-1">Foto actual</p>
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
            <Head title={`Editar Usuario - ${user.full_name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <UserCog className="size-5" />
                                    Editar Usuario: {user.full_name}
                                </CardTitle>
                                <CardDescription>
                                    Modifique los datos del usuario en el formulario
                                </CardDescription>
                            </div>
                            <Link href={users.index().url}>
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
                                <Link href={users.index().url}>
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
                                            Actualizar Usuario
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

