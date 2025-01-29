<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\Device;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Events\UpdateDashboardRequest;

class UpdateDashboardController extends Controller
{
    // public function _invoke(Request $request)
    // {
    //     $device = Device::where('code', $request->code)->first();

    //     if (!$device) {
    //         return response()->json([
    //             'message' => 'Device not found'
    //         ], 404);
    //     }

    //     $device->logs()->create([
    //         'temperature' => $request->temperature,
    //         'voltage' => $request->voltage,
    //         'ph_level' => $request->ph_level,
    //         'turbidity' => $request->turbidity,
    //         'conductivity' => $request->conductivity
    //     ]);

    //     $device = Device::where('code', $request->code)->with('latest_log')->first();

    //     broadcast(new UpdateDashboardRequest($device));

    //     // return response()->json([
    //     //     'message' => 'Dashboard updated successfully'
    //     // ]);
    // }

    public function store(Request $request)
    {
        // Assuming 'code' is the column you're searching by
        $device = Device::where('code', $request->code)->first();

        // Check if the device exists
        if (!$device) {
            return response()->json([
                'message' => 'Device not found'
            ], 404);
        }

        // Create the log entry
        $device->logs()->create([
            'temperature' => $request->temperature,
            'voltage' => $request->voltage,
            'ph_level' => $request->ph_level,
            'turbidity' => $request->turbidity,
            'conductivity' => $request->conductivity
        ]);

        $user = User::find(1);

        $device = Device::where('code', $request->code)->with('latest_log')->first();

        broadcast(new UpdateDashboardRequest($device, $user));

        return response()->json([
            'message' => 'Dashboard updated successfully'
        ]);
    }
}
