<?php

namespace App\Mcp\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Support\Facades\Artisan;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tool;

#[Description('Gets details of a specific Eloquent model or lists all models if no model is provided. Use this to understand model relationships and attributes.')]
class GetModelsInfoTool extends Tool
{
    public function handle(Request $request): Response
    {
        $model = $request->argument('model');
        
        if ($model) {
            Artisan::call('model:show', ['model' => $model, '--json' => true]);
            return Response::text(Artisan::output());
        }

        $modelsPath = app_path('Models');
        if (!is_dir($modelsPath)) {
            return Response::text('No models directory found.');
        }

        $files = scandir($modelsPath);
        $models = [];
        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'php') {
                $models[] = pathinfo($file, PATHINFO_FILENAME);
            }
        }
        
        return Response::text(json_encode(['models' => $models], JSON_PRETTY_PRINT));
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'model' => $schema->string('The name of the model class (e.g. "User", "Order"). Leave empty to list all models.')->nullable(),
        ];
    }
}
