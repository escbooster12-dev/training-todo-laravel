<?php

use Illuminate\Support\Facades\Route;

Route::put('todo/completed/{todo}', 'TodoController@toggleCompleted');
Route::resource('todo', 'TodoController');

Route::group(['prefix' => 'auth'], function () {
	Route::post('login', 'Auth\LoginController@login')->middleware('throttle:3,1');
});