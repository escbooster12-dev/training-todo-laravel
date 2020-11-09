<?php

namespace App\Repositories;

use App\Models\Todo;
use App\Repositories\BaseRepository;

class TodoRepository extends BaseRepository 
{
    /**
	 * TagRepository constructor.
	 * 
	 * @param \App\Contact 
	 * @return void
	 */
	public function __construct(Todo $model) {
		parent::__construct($model);
    }
    
    public function addTodo(array $data) {
        $todo = new Todo;
        $todo->task = $data['task'];
        $todo->datetime = $data['date'] . ' ' . $data['time'];
        $todo->save();

        return $todo;
    }

    public function updateTodo(int $todo, array $data) {
        $todo = Todo::findOrFail($todo);
        $todo->task = $data['task'];
        $todo->datetime = $data['date'] . ' ' . $data['time'];
        $todo->save();

        return $todo;
    }
}