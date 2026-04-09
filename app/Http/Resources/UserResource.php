<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'last_name' => $this->last_name,
            'full_name' => $this->name . ' ' . $this->last_name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at?->format('Y-m-d H:i:s'),
            'phone_number' => $this->phone_number,
            'address' => $this->address,
            'profile_picture' => $this->profile_picture,
            'role' => $this->role,
            'role_label' => $this->getRoleLabel(),
            'status' => $this->status,
            'status_label' => $this->getStatusLabel(),
            'registration_date' => $this->registration_date?->format('Y-m-d H:i:s'),
            'last_connection' => $this->last_connection?->format('Y-m-d H:i:s'),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }

    /**
     * Get the role label in Spanish.
     *
     * @return string
     */
    private function getRoleLabel(): string
    {
        return match ($this->role) {
            'admin' => 'Administrador',
            'employee' => 'Empleado',
            'client' => 'Cliente',
            default => 'Desconocido',
        };
    }

    /**
     * Get the status label in Spanish.
     *
     * @return string
     */
    private function getStatusLabel(): string
    {
        return match ($this->status) {
            'active' => 'Activo',
            'inactive' => 'Inactivo',
            default => 'Desconocido',
        };
    }

    /**
     * Get table columns configuration for frontend.
     *
     * @return array<string, mixed>
     */
    public static function tableColumns(): array
    {
        return [
            [
                'key' => 'id',
                'label' => 'ID',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'full_name',
                'label' => 'Nombre Completo',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'email',
                'label' => 'Correo Electrónico',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'phone_number',
                'label' => 'Teléfono',
                'sortable' => false,
                'visible' => true,
            ],
            [
                'key' => 'role_label',
                'label' => 'Rol',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'status_label',
                'label' => 'Estado',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'registration_date',
                'label' => 'Fecha de Registro',
                'sortable' => true,
                'visible' => true,
            ],
            [
                'key' => 'last_connection',
                'label' => 'Última Conexión',
                'sortable' => true,
                'visible' => false,
            ],
        ];
    }

    /**
     * Get form fields configuration for frontend.
     *
     * @return array<string, mixed>
     */
    public static function formFields(): array
    {
        return [
            [
                'name' => 'name',
                'label' => 'Nombre',
                'type' => 'text',
                'placeholder' => 'Ingrese el nombre',
                'required' => true,
                'validation' => 'required|string|max:255',
                'grid_cols' => 6,
            ],
            [
                'name' => 'last_name',
                'label' => 'Apellido',
                'type' => 'text',
                'placeholder' => 'Ingrese el apellido',
                'required' => true,
                'validation' => 'required|string|max:255',
                'grid_cols' => 6,
            ],
            [
                'name' => 'email',
                'label' => 'Correo Electrónico',
                'type' => 'email',
                'placeholder' => 'ejemplo@correo.com',
                'required' => true,
                'validation' => 'required|email|max:255',
                'grid_cols' => 6,
            ],
            [
                'name' => 'phone_number',
                'label' => 'Número de Teléfono',
                'type' => 'text',
                'placeholder' => '+58 414 1234567',
                'required' => false,
                'validation' => 'nullable|string|max:20',
                'grid_cols' => 6,
            ],
            [
                'name' => 'password',
                'label' => 'Contraseña',
                'type' => 'password',
                'placeholder' => '••••••••',
                'required' => true,
                'validation' => 'required|string|min:8|max:16',
                'help_text' => 'Mínimo 8 caracteres, máximo 16. Debe contener al menos una mayúscula, un número y un carácter especial (@$!%*?&#-_.)',
                'grid_cols' => 6,
                'show_on_edit' => false,
            ],
            [
                'name' => 'password_confirmation',
                'label' => 'Confirmar Contraseña',
                'type' => 'password',
                'placeholder' => '••••••••',
                'required' => true,
                'validation' => 'required|same:password',
                'grid_cols' => 6,
                'show_on_edit' => false,
            ],
            [
                'name' => 'address',
                'label' => 'Dirección',
                'type' => 'textarea',
                'placeholder' => 'Ingrese la dirección completa',
                'required' => false,
                'validation' => 'nullable|string',
                'grid_cols' => 12,
                'rows' => 3,
            ],
            [
                'name' => 'role',
                'label' => 'Rol',
                'type' => 'select',
                'placeholder' => 'Seleccione un rol',
                'required' => true,
                'validation' => 'required|in:admin,employee,client',
                'options' => [
                    ['value' => 'client', 'label' => 'Cliente'],
                    ['value' => 'employee', 'label' => 'Empleado'],
                    ['value' => 'admin', 'label' => 'Administrador'],
                ],
                'default' => 'client',
                'grid_cols' => 6,
            ],
            [
                'name' => 'status',
                'label' => 'Estado',
                'type' => 'select',
                'placeholder' => 'Seleccione un estado',
                'required' => true,
                'validation' => 'required|in:active,inactive',
                'options' => [
                    ['value' => 'active', 'label' => 'Activo'],
                    ['value' => 'inactive', 'label' => 'Inactivo'],
                ],
                'default' => 'active',
                'grid_cols' => 6,
            ],
            [
                'name' => 'profile_picture',
                'label' => 'Foto de Perfil',
                'type' => 'file',
                'placeholder' => 'Seleccione una imagen',
                'required' => false,
                'validation' => 'nullable|image|max:2048',
                'help_text' => 'Formatos permitidos: JPG, PNG, GIF. Tamaño máximo: 2MB',
                'accept' => 'image/*',
                'grid_cols' => 12,
            ],
        ];
    }

    /**
     * Get filter fields configuration for frontend.
     *
     * @return array<string, mixed>
     */
    public static function filterFields(): array
    {
        return [
            [
                'name' => 'search',
                'label' => 'Buscar',
                'type' => 'text',
                'placeholder' => 'Buscar por nombre, apellido o email...',
            ],
            [
                'name' => 'role',
                'label' => 'Rol',
                'type' => 'select',
                'placeholder' => 'Todos los roles',
                'options' => [
                    ['value' => '', 'label' => 'Todos'],
                    ['value' => 'client', 'label' => 'Cliente'],
                    ['value' => 'employee', 'label' => 'Empleado'],
                    ['value' => 'admin', 'label' => 'Administrador'],
                ],
            ],
            [
                'name' => 'status',
                'label' => 'Estado',
                'type' => 'select',
                'placeholder' => 'Todos los estados',
                'options' => [
                    ['value' => '', 'label' => 'Todos'],
                    ['value' => 'active', 'label' => 'Activo'],
                    ['value' => 'inactive', 'label' => 'Inactivo'],
                ],
            ],
        ];
    }
}
