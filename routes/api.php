<?php

use Illuminate\Support\Facades\Route;

Route::put('todo/completed/{todo}', 'TodoController@toggleCompleted');
Route::resource('todo', 'TodoController');