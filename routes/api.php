<?php

use Illuminate\Support\Facades\Route;

Route::put('todo/completed/{todo}', 'TodoController@toggleCompleted');
Route::resource('todo', 'TodoController');

Route::group(['prefix' => 'auth'], function () {
  Route::post('login', 'Auth\AuthController@login')->middleware('throttle:3,1');

  Route::group(['middleware' => 'auth:api'], function () {
    Route::get('auth', 'Auth\AuthController@auth');
    Route::get('logout', 'Auth\AuthController@logout');
  });
});
