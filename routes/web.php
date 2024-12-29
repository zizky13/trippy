<?php

use App\Http\Controllers\GetgeocodingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\MapboxController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/api/trips', function () {
    return response()->json([
        [
            'id' => 1,
            'namaTempat' => 'Bali Trip',
            'startDate' => '12 Jan',
            'tripUrl' => '/trips/1',
        ],
        [
            'id' => 2,
            'namaTempat' => 'Lombok Adventure',
            'startDate' => '20 Feb',
            'tripUrl' => '/trips/2',
        ],
        [
            'id' => 3,
            'namaTempat' => 'Jakarta Getaway',
            'startDate' => '5 Mar',
            'tripUrl' => '/trips/3',
        ],
    ]);
});

Route::post('/get-optimized-route', [RouteController::class, 'getOptimizedRoute']);
Route::post('/search', [GetgeocodingController::class, 'search']);

require __DIR__.'/auth.php';
