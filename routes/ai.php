<?php

use Laravel\Mcp\Facades\Mcp;

use App\Mcp\Servers\IDEServer;

// Mcp::web('/mcp/demo', \App\Mcp\Servers\PublicServer::class);

Mcp::local('ide', IDEServer::class);
