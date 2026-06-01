<?php

namespace App\Enums;

enum EmployeePosition: string
{
    case GeneralManager = 'general_manager';
    case BranchManager = 'branch_manager';
    case Chef = 'chef';
    case SousChef = 'sous_chef';
    case Cook = 'cook';
    case KitchenAssistant = 'kitchen_assistant';
    case Waiter = 'waiter';
    case Cashier = 'cashier';
    case DeliveryDriver = 'delivery_driver';
    case Host = 'host';
    case Cleaner = 'cleaner';
    case InventoryManager = 'inventory_manager';

    public function label(): string
    {
        return match ($this) {
            self::GeneralManager => 'Gerente General',
            self::BranchManager => 'Gerente de Sucursal',
            self::Chef => 'Chef',
            self::SousChef => 'Sous Chef',
            self::Cook => 'Cocinero',
            self::KitchenAssistant => 'Ayudante de Cocina',
            self::Waiter => 'Mesero',
            self::Cashier => 'Cajero',
            self::DeliveryDriver => 'Repartidor',
            self::Host => 'Anfitrion',
            self::Cleaner => 'Personal de Limpieza',
            self::InventoryManager => 'Encargado de Inventario',
        };
    }

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * @return list<array{value: string, label: string}>
     */
    public static function options(): array
    {
        return array_map(
            fn (self $position): array => [
                'value' => $position->value,
                'label' => $position->label(),
            ],
            self::cases()
        );
    }
}
