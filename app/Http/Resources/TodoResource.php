<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TodoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'task_id' => $this->id,
            'task_name' => $this->task,
            'task_time' => $this->datetime->format('H:i:s'),
            'task_date' => $this->datetime->format('Y-m-d'),
            'task_completed' => $this->completed === 1,
            'task_datetime_fmt' => $this->datetime->toDayDateTimeString(),
            'task_created_at_fmt' => $this->created_at->diffForHumans(),
            'task_updated_at_fmt' => $this->updated_at->diffForHumans(),
        ];
    }
}
