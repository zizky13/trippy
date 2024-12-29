<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Web Middleware Configuration
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        // CSRF Middleware Configuration: Add exception for /get-optimized-route
        $middleware->validateCsrfTokens(except: [
            '/search', // Correct path format
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Handle exceptions here if needed
    })
    ->create();
