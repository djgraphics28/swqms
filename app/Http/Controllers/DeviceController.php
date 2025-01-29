<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DeviceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $devices = Device::all();
        return Inertia::render('Devices/Index', ['devices' => $devices]);
    }

    /**
     * Display a listing of the resource.
     */
    public function create(): Response
    {
        return Inertia::render('Devices/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|unique:devices,code',
        ]);

        Device::create($request->only('code'));

        return redirect()->route('devices.index')->with('success', 'Device created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function edit(Device $device): Response
    {
        return Inertia::render('Devices/Edit', ['device' => $device]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Device $device): Response
    {
        return Inertia::render('Devices/Show', ['device' => $device]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Device $device)
    {
        $request->validate([
            'code' => 'required|string|unique:devices,code,' . $device->id,
        ]);

        $device->update($request->only('code'));

        return redirect()->route('devices.index')->with('success', 'Device updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Device $device)
    {
        $device->delete();
        return redirect()->route('devices.index')->with('success', 'Device deleted successfully.');
    }

    public function updateLocation($deviceId, $lat, $lng)
    {
        $device = Device::findOrFail($deviceId);
        $device->update([
            'lat' => $lat,
            'lng' => $lng
        ]);
        return redirect()->route('devices.index')->with('success', 'Device location updated successfully.');
    }
}
