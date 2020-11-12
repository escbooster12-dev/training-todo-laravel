<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'Auth\AuthController@login')->middleware('throttle:3,1');
    Route::post('register', 'Auth\RegisterController@register');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('auth', 'Auth\AuthController@auth');
        Route::get('logout', 'Auth\AuthController@logout');
    });
});

Route::group(['middleware' => 'auth:api'], function () {
    Route::put('todo/completed/{todo}', 'TodoController@toggleCompleted');
    Route::resource('todo', 'TodoController');
});