<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodoResource;
use Illuminate\Http\Request;
use App\Helpers\CollectionHelper;
use App\Repositories\TodoRepository;

class TodoController extends Controller
{
    protected $todoRepository;

    public function __construct(TodoRepository $todoRepository) {
        $this->todoRepository = $todoRepository;
    }

    public function index() {
        $todos = $this->todoRepository->all(null, 'datetime');
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

    protected function toValidate(Request $request) {
        return $request->validate([
    		'task' => 'required|max:255',
            'date' => 'required|date_format:Y-m-d|after_or_equal:today',
            'time' => 'required|date_format:H:i'
        ]);
    }
}
