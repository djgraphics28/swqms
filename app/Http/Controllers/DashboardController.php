<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Device;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $device = Device::with('latest_log')->find(1);
        return Inertia::render('Dashboard', compact('device'));
    }

}
