<?php

use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KpiController;
use App\Http\Controllers\StrategyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
});

Route::get('/login', fn () => redirect()->route('auth.google'))->name('login');
Route::get('/auth/google', [GoogleAuthController::class, 'redirect'])->name('auth.google');
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::get('/strategy', [StrategyController::class, 'show'])->name('strategy');
    Route::post('/strategy', [StrategyController::class, 'store'])->name('strategy.store');
    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar');
    Route::post('/calendar', [CalendarController::class, 'store'])->name('calendar.store');
    Route::put('/calendar/{calendar}', [CalendarController::class, 'update'])->name('calendar.update');
    Route::delete('/calendar/{calendar}', [CalendarController::class, 'destroy'])->name('calendar.destroy');
    Route::get('/kpis', [KpiController::class, 'index'])->name('kpis');
    Route::post('/kpis', [KpiController::class, 'store'])->name('kpis.store');
});

require __DIR__.'/auth.php';
