<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\CollectionHelper;
use App\Http\Resources\TodoResource;
use App\Repositories\TodoRepository;
use App\Http\Controllers\BaseController;

class TodoController extends BaseController
{
    protected $todoRepository;

    public function __construct(TodoRepository $todoRepository) {
        $this->todoRepository = $todoRepository;
    }

    public function index(Request $request) {
        $todos = $this->todoRepository->getAllTodos($request->overdued, $request->completed);
        $collectionHelper = new CollectionHelper;

        return response()->json($collectionHelper->paginate(TodoResource::collection($todos), 15), 200);
    }

    public function store(Request $request) {
        $todo = $this->todoRepository->addTodo($this->toValidate($request));
        
        return response()->json(new TodoResource($todo), 201);
    }

    public function destroy($id) {
        $this->todoRepository->deleteOrFail($id);

        return response()->json(201);
    }

    public function update($id, Request $request) {
        $todo = $this->todoRepository->updateTodo($id, $this->toValidate($request));

        return response()->json(new TodoResource($todo), 201);
    }

    public function toggleCompleted($id) {
        $isCompleted = $this->todoRepository->toggleCompletedOrFail($id);

        return response()->json($isCompleted, 201);
    }

    protected function toValidate(Request $request) {
        return $request->validate([
    		'task' => 'required|max:255',
            'date' => 'required',
            'time' => 'required'
        ]);
    }
}
