<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

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
            'task_time' => $this->time,
            'task_date' => $this->date,
            'task_completed' => $this->completed===1,
            'task_datetime' => $this->toDayDateTimeString($this->time, $this->date),
            'task_created_at_fmt' => $this->created_at->diffForHumans(),
            'task_updated_at_fmt' => $this->updated_at->diffForHumans()
        ];
    }

    protected function toDayDateTimeString($time, $date) {
        $datetime = new Carbon($this->time.' '.$this->date);

        return $datetime->toDayDateTimeString();
    }
}
