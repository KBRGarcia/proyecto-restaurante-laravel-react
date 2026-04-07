<?php

namespace App\Mcp\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Support\Facades\Schema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tool;

#[Description('Gets the complete database schema including all tables and columns. Useful for writing queries or predicting relationships.')]
class GetDatabaseSchemaTool extends Tool
{
    public function handle(Request $request): Response
    {
        $tables = Schema::getTables();
        $schemaData = [];
        
        foreach ($tables as $table) {
            $tableName = is_array($table) ? $table['name'] : $table->name;
            if (str_contains($tableName, 'pma_') || str_contains($tableName, 'libreria_')) {
                continue; // Skip external tables
            }
            $columns = Schema::getColumns($tableName);
            $schemaData[$tableName] = $columns;
        }

        return Response::text(json_encode($schemaData, JSON_PRETTY_PRINT));
    }

    public function schema(JsonSchema $schema): array
    {
        return [];
    }
}
