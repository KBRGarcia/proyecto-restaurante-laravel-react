import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { dashboard } from '@/routes';
import users from '@/routes/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, Save, UserPlus, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

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

interface UserCreateProps {
    fields: FormField[];
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
        title: 'Crear Usuario',
        href: users.create().url,
    },
];

export default function UserCreate({ fields }: UserCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
        address: '',
        role: 'client',
        status: 'active',
        profile_picture: null as File | null,
    });

    // State for password visibility toggles
    const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

    const togglePasswordVisibility = (fieldName: string) => {
        setShowPassword((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(users.store().url, {
            forceFormData: !!data.profile_picture,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('profile_picture', e.target.files[0]);
        }
    };

    const renderField = (field: FormField) => {
        // No mostrar campos con show_on_edit: false en modo creación
        if (field.show_on_edit === false) {
            // Pero sí mostrar password en creación
            if (field.name !== 'password' && field.name !== 'password_confirmation') {
                return null;
            }
        }

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
        const value = data[field.name as keyof typeof data] || '';
        const hasError = !!errors[field.name as keyof typeof errors];

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
                            className={hasError ? 'border-destructive' : ''}
                            required={field.required}
                        />
                        {hasError && (
                            <p className="text-sm text-destructive mt-1">
                                {errors[field.name as keyof typeof errors]}
                            </p>
                        )}
                        {field.help_text && !hasError && (
                            <p className="text-sm text-muted-foreground mt-1">{field.help_text}</p>
                        )}
                    </div>
                );

            case 'password':
                return (
                    <div key={field.name} className={gridClass}>
                        <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <div className="relative">
                            <Input
                                id={field.name}
                                type={showPassword[field.name] ? 'text' : 'password'}
                                placeholder={field.placeholder}
                                value={value as string}
                                onChange={(e) => setData(field.name as any, e.target.value)}
                                className={`pr-10 ${hasError ? 'border-destructive' : ''}`}
                                required={field.required}
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility(field.name)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors"
                                tabIndex={-1}
                            >
                                {showPassword[field.name] ? (
                                    <EyeOff className="size-4" />
                                ) : (
                                    <Eye className="size-4" />
                                )}
                            </button>
                        </div>
                        {hasError && (
                            <p className="text-sm text-destructive mt-1">
                                {errors[field.name as keyof typeof errors]}
                            </p>
                        )}
                        {field.help_text && !hasError && (
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
                            className={hasError ? 'border-destructive' : ''}
                            rows={field.rows || 3}
                            required={field.required}
                        />
                        {hasError && (
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
                                hasError ? 'border-destructive' : 'border-input'
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
                        {hasError && (
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
                        <Input
                            id={field.name}
                            type="file"
                            accept={field.accept}
                            onChange={handleFileChange}
                            className={hasError ? 'border-destructive' : ''}
                        />
                        {hasError && (
                            <p className="text-sm text-destructive mt-1">
                                {errors[field.name as keyof typeof errors]}
                            </p>
                        )}
                        {field.help_text && !hasError && (
                            <p className="text-sm text-muted-foreground mt-1">{field.help_text}</p>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    const errorCount = Object.keys(errors).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Usuario" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <UserPlus className="size-5" />
                                    Crear Nuevo Usuario
                                </CardTitle>
                                <CardDescription>
                                    Complete el formulario para crear un nuevo usuario en el sistema
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
                        {errorCount > 0 && (
                            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-800 dark:border-red-700 dark:bg-red-950 dark:text-red-300">
                                <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-600 dark:text-red-400" />
                                <div>
                                    <p className="font-semibold text-sm">
                                        Se encontraron {errorCount} error{errorCount > 1 ? 'es' : ''} en el formulario
                                    </p>
                                    <ul className="mt-1 list-disc list-inside text-sm space-y-0.5">
                                        {Object.values(errors).map((error, i) => (
                                            <li key={i}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
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
                                        <span className="mr-2">Creando...</span>
                                    ) : (
                                        <>
                                            <Save className="mr-2 size-4" />
                                            Crear Usuario
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
