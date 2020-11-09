<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Http\Resources\TodoResource;
use Illuminate\Http\Request;
use App\Helpers\CollectionHelper;

class TodoController extends Controller
{
    public function index() {
        $todos = Todo::orderBy('datetime')->get();
        $collectionHelper = new CollectionHelper;

        return response()->json($collectionHelper->paginate(TodoResource::collection($todos), 3), 200);
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
    		'task' => 'required|max:255',
            'date' => 'required|date_format:Y-m-d|after_or_equal:today',
            'time' => 'required|date_format:H:i'
        ]);

        $todo = new Todo;
        $todo->task = $validatedData['task'];
        $todo->datetime = $validatedData['date'] . ' ' . $validatedData['time'] . ':00';
        $todo->save();
        
        return response()->json($todo, 201);
    }
}
