<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = [
            [
                'user_email' => 'admin@restaurante.com',
                'first_name' => 'Mariana',
                'last_name' => 'Rodriguez',
                'identity_document' => 'V-10101010',
                'email' => 'mariana.rodriguez@restaurante.com',
                'phone' => '+58 414-2000001',
                'address' => 'Caracas, Distrito Capital',
                'birth_date' => '1985-04-12',
                'hire_date' => '2020-01-15',
                'status' => 'active',
                'notes' => 'Responsable de la operacion general.',
                'assignments' => [
                    ['branch_name' => 'Sabor & Tradición - Centro', 'position' => 'general_manager', 'start_date' => '2020-01-15'],
                ],
            ],
            [
                'user_email' => null,
                'first_name' => 'Carlos',
                'last_name' => 'Mendez',
                'identity_document' => 'V-20202020',
                'email' => 'carlos.mendez@restaurante.com',
                'phone' => '+58 424-2000002',
                'address' => 'Las Mercedes, Caracas',
                'birth_date' => '1982-08-03',
                'hire_date' => '2021-03-20',
                'status' => 'active',
                'notes' => 'Gerente operativo de Las Mercedes.',
                'assignments' => [
                    ['branch_name' => 'Sabor & Tradición - Las Mercedes', 'position' => 'branch_manager', 'start_date' => '2021-03-20'],
                ],
            ],
            [
                'user_email' => null,
                'first_name' => 'Valentina',
                'last_name' => 'Suarez',
                'identity_document' => 'V-30303030',
                'email' => 'valentina.suarez@restaurante.com',
                'phone' => '+58 412-2000003',
                'address' => 'Altamira, Caracas',
                'birth_date' => '1991-01-28',
                'hire_date' => '2021-07-10',
                'status' => 'active',
                'notes' => 'Chef principal con experiencia en cocina venezolana.',
                'assignments' => [
                    ['branch_name' => 'Sabor & Tradición - Altamira', 'position' => 'chef', 'start_date' => '2021-07-10'],
                    ['branch_name' => 'Sabor & Tradición - Las Mercedes', 'position' => 'sous_chef', 'start_date' => '2022-02-01'],
                ],
            ],
            [
                'user_email' => null,
                'first_name' => 'Jose',
                'last_name' => 'Ramirez',
                'identity_document' => 'V-40404040',
                'email' => 'jose.ramirez@restaurante.com',
                'phone' => '+58 414-2000004',
                'address' => 'Valencia, Carabobo',
                'birth_date' => '1987-12-02',
                'hire_date' => '2022-05-15',
                'status' => 'active',
                'notes' => 'Gerente de sucursal Valencia.',
                'assignments' => [
                    ['branch_name' => 'Sabor & Tradición - Valencia', 'position' => 'branch_manager', 'start_date' => '2022-05-15'],
                ],
            ],
            [
                'user_email' => null,
                'first_name' => 'Luis',
                'last_name' => 'Perez',
                'identity_document' => 'V-50505050',
                'email' => 'luis.perez@restaurante.com',
                'phone' => '+58 426-2000005',
                'address' => 'Maracaibo, Zulia',
                'birth_date' => '1993-06-17',
                'hire_date' => '2023-02-28',
                'status' => 'active',
                'notes' => 'Encargado de caja y coordinacion diaria.',
                'assignments' => [
                    ['branch_name' => 'Sabor & Tradición - Maracaibo', 'position' => 'cashier', 'start_date' => '2023-02-28'],
                    ['branch_name' => 'Sabor & Tradición - Maracaibo', 'position' => 'inventory_manager', 'start_date' => '2023-07-01'],
                ],
            ],
        ];

        foreach ($employees as $employeeData) {
            $assignments = $employeeData['assignments'];
            $userEmail = $employeeData['user_email'];
            unset($employeeData['assignments'], $employeeData['user_email']);

            $employeeData['user_id'] = $userEmail
                ? User::where('email', $userEmail)->value('id')
                : null;

            $employee = Employee::updateOrCreate(
                ['identity_document' => $employeeData['identity_document']],
                $employeeData
            );

            $employee->assignments()->delete();

            foreach ($assignments as $assignment) {
                $branchId = Branch::where('name', $assignment['branch_name'])->value('id');

                if (!$branchId) {
                    continue;
                }

                $employee->assignments()->create([
                    'branch_id' => $branchId,
                    'position' => $assignment['position'],
                    'start_date' => $assignment['start_date'],
                    'active' => true,
                ]);
            }
        }
    }
}
