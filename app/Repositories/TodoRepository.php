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

    public function getAllTodos()
    {
        return $this->model
            ->orderBy('date')
            ->orderBy('time')
            ->get();
    }
    
    public function addTodo(array $data) {
        $todo = new Todo;
        $todo->task = $data['task'];
        $todo->time = $data['time'];
        $todo->date = $data['date'];
        $todo->save();

        return $todo;
    }

    public function updateTodo(int $todo, array $data) {
        $todo = Todo::findOrFail($todo);
        $todo->task = $data['task'];
        $todo->time = $data['time'];
        $todo->date = $data['date'];
        $todo->save();

        return $todo;
    }

    public function toggleCompletedOrFail(int $todo) {
        $todo = Todo::findOrFail($todo);
        $todo->completed = $todo->completed===0 ? 1 : 0;
        $todo->save(); 

        return $todo->completed;
    }
}