<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::post('logout', function () {
        auth()->logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return redirect('/');
    })
        ->name('logout');
});
