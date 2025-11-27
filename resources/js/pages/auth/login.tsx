import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { home, register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    // Inicializar el tema desde localStorage o preferencia del sistema
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return savedTheme || (prefersDark ? 'dark' : 'light');
        }
        return 'light';
    });

    // Estado para mostrar/ocultar contraseña
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Aplicar el tema al documento
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const goBack = () => {
        window.history.back();
    };

    return (
        <>
            <Head title="Iniciar sesión" />
            <div className="flex min-h-screen flex-col items-center bg-background p-6 text-foreground lg:justify-center lg:p-8">
                <header className="mb-6 w-full max-w-[500px] text-sm lg:max-w-xl">
                    <nav className="flex items-center justify-between gap-4">
                        {/* Back Button */}
                        <button
                            onClick={goBack}
                            className="group relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-input bg-card transition-all duration-300 hover:border-primary hover:shadow-md"
                            aria-label="Volver"
                            title="Volver a la página anterior"
                        >
                            <svg
                                className="h-5 w-5 text-foreground transition-colors duration-300 group-hover:text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                        </button>

                        {/* Navigation Links */}
                        <div className="flex items-center gap-4">
                            {/* Home Link */}
                            <Link
                                href={home()}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-foreground hover:border-input"
                            >
                                Inicio
                            </Link>

                            {/* Theme Toggle Button */}
                            <button
                                onClick={toggleTheme}
                                className="group relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-input bg-card transition-all duration-300 hover:border-primary hover:shadow-md"
                                aria-label="Cambiar tema"
                                title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
                            >
                                {/* Sun Icon (visible in dark mode) */}
                                <svg
                                    className="absolute h-5 w-5 rotate-0 scale-100 text-primary transition-all duration-300 dark:-rotate-90 dark:scale-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                                
                                {/* Moon Icon (visible in light mode) */}
                                <svg
                                    className="absolute h-5 w-5 rotate-90 scale-0 text-primary transition-all duration-300 dark:rotate-0 dark:scale-100"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="w-full max-w-[500px] lg:max-w-xl">
                        {/* Login Card */}
                        <div className="overflow-hidden rounded-2xl bg-card shadow-xl transition-all duration-300">
                            <div className="relative p-8 lg:p-12">
                                {/* Decorative Element */}
                                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary opacity-10" />
                                
                                <div className="relative">
                                    {/* Title Section */}
                                    <div className="mb-8 text-center">
                                        <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-4">
                                            <svg
                                                className="h-8 w-8 text-primary"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                />
                                            </svg>
                                        </div>
                                        <h1 className="mb-2 text-3xl font-bold text-foreground">
                                            Iniciar sesión
                                        </h1>
                                        <p className="text-sm text-muted-foreground">
                                            Ingresa tu correo y contraseña para acceder
                                        </p>
                                    </div>

                                    {/* Status Message */}
                                    {status && (
                                        <div className="mb-6 rounded-lg bg-green-50 p-4 text-center text-sm font-medium text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                            {status}
                                        </div>
                                    )}

                                    {/* Login Form */}
                                    <Form
                                        {...store.form()}
                                        resetOnSuccess={['password']}
                                        className="flex flex-col gap-6"
                                    >
                                        {({ processing, errors }) => (
                                            <>
                                                <div className="grid gap-6">
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="email">
                                                            Correo electrónico
                                                        </Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            name="email"
                                                            required
                                                            autoFocus
                                                            tabIndex={1}
                                                            autoComplete="email"
                                                            placeholder="correo@ejemplo.com"
                                                        />
                                                        <InputError message={errors.email} />
                                                    </div>

                                                    <div className="grid gap-2">
                                                        <div className="flex items-center">
                                                            <Label htmlFor="password">
                                                                Contraseña
                                                            </Label>
                                                            {canResetPassword && (
                                                                <TextLink
                                                                    href={request()}
                                                                    className="ml-auto text-sm text-primary hover:text-primary/80"
                                                                    tabIndex={5}
                                                                >
                                                                    ¿Olvidaste tu contraseña?
                                                                </TextLink>
                                                            )}
                                                        </div>
                                                        <div className="relative">
                                                            <Input
                                                                id="password"
                                                                type={showPassword ? 'text' : 'password'}
                                                                name="password"
                                                                required
                                                                tabIndex={2}
                                                                autoComplete="current-password"
                                                                placeholder="Contraseña"
                                                                className="pr-10"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                                                tabIndex={-1}
                                                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                                            >
                                                                {showPassword ? (
                                                                    <EyeOff className="h-4 w-4" />
                                                                ) : (
                                                                    <Eye className="h-4 w-4" />
                                                                )}
                                                            </button>
                                                        </div>
                                                        <InputError message={errors.password} />
                                                    </div>

                                                    <div className="flex items-center space-x-3">
                                                        <Checkbox
                                                            id="remember"
                                                            name="remember"
                                                            tabIndex={3}
                                                        />
                                                        <Label htmlFor="remember">
                                                            Recordarme
                                                        </Label>
                                                    </div>

                                                    <Button
                                                        type="submit"
                                                        className="mt-4 w-full"
                                                        tabIndex={4}
                                                        disabled={processing}
                                                        data-test="login-button"
                                                    >
                                                        {processing && <Spinner />}
                                                        Iniciar sesión
                                                    </Button>
                                                </div>

                                                {canRegister && (
                                                    <div className="text-center text-sm text-muted-foreground">
                                                        ¿No tienes una cuenta?{' '}
                                                        <TextLink 
                                                            href={register()} 
                                                            tabIndex={5}
                                                            className="font-semibold text-primary hover:text-primary/80"
                                                        >
                                                            Regístrate
                                                        </TextLink>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
