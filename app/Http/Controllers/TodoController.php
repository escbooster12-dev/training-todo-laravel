<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Http\Resources\TodoResource;
use Illuminate\Http\Request;
use App\Helpers\CollectionHelper;

class TodoController extends Controller
{
    public function destroy($id) {
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return response()->json(201);
    }

    public function update(Request $request, $id) {
        $requestedData = $this->toValidate($request);
        
        $todo = Todo::findOrFail($id);
        $todo->task = $requestedData['task'];
        $todo->datetime = $requestedData['date'] . ' ' . $requestedData['time'] . ':00';
        $todo->save();

        return response()->json(new TodoResource($todo), 201);
    }

    public function index() {
        $todos = Todo::orderBy('datetime')->get();
        $collectionHelper = new CollectionHelper;

        return response()->json($collectionHelper->paginate(TodoResource::collection($todos), 3), 200);
    }

    public function store(Request $request) {
        $requestedData = $this->toValidate($request);

        $todo = new Todo;
        $todo->task = $requestedData['task'];
        $todo->datetime = $requestedData['date'] . ' ' . $requestedData['time'] . ':00';
        $todo->save();
        
        return response()->json(new TodoResource($todo), 201);
    }

    public function toValidate(Request $request) {
        return $request->validate([
    		'task' => 'required|max:255',
            'date' => 'required|date_format:Y-m-d|after_or_equal:today',
            'time' => 'required|date_format:H:i'
        ]);
    }
}
