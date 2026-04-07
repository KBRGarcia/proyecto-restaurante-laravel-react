<?php

namespace App\Mcp\Servers;

use Laravel\Mcp\Server;
use Laravel\Mcp\Server\Attributes\Instructions;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Attributes\Version;
use App\Mcp\Tools\GetAppRoutesTool;
use App\Mcp\Tools\GetDatabaseSchemaTool;
use App\Mcp\Tools\GetModelsInfoTool;

#[Name('IDE Server')]
#[Version('1.0.0')]
#[Instructions('This server provides AI agents with deep context about the Laravel application, including routes, database schema, and Eloquent models.')]
class IDEServer extends Server
{
    protected array $tools = [
        GetAppRoutesTool::class,
        GetDatabaseSchemaTool::class,
        GetModelsInfoTool::class,
    ];

    protected array $resources = [
        //
    ];

    protected array $prompts = [
        //
    ];
}
