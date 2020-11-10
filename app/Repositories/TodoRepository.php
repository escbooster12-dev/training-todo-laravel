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

    public function getAllTodos($overdued = null, $completed = null)
    {
        return $this->model
            ->when($completed, function($query) use($completed) {
                if($completed==='true') {
                    return $query->where('completed', 1);
                }else {
                    return $query->where('completed', 0);
                }
            })
            ->when($overdued, function($query) use($overdued) {
                if($overdued==='true') {
                    return $query->where('datetime', '<=', now()->format('Y-m-d H:i:s'));
                }else {
                    return $query->where('datetime', '>=', now()->format('Y-m-d H:i:s'));
                }
            }) 
            ->orderBy('datetime')
            ->get();
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

    public function toggleCompletedOrFail(int $todo) {
        $todo = Todo::findOrFail($todo);
        $todo->completed = $todo->completed===0 ? 1 : 0;
        $todo->save(); 

        return $todo->completed;
    }
}