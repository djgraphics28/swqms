<?php

namespace App\Events;

use App\Models\User;
use App\Models\Device;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class UpdateDashboardRequest implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Device $device;
    public User $user;

    public function __construct(Device $device, User $user)
    {
        $this->device = $device;
        $this->user = $user;
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('dashboard.{$this->user->id}'),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'device' => $this->device->load('latest_log'), // Send device with latest log
        ];
    }

    public function broadcastAs()
    {
        return 'UpdateDashboardRequest';
    }
}
