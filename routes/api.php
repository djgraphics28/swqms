<?php

use App\Http\Controllers\API\UpdateDashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/update-dashboard', [UpdateDashboardController::class, 'store']);
