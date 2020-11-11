<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Repositories\UserRepository;
use App\Traits\AuthTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisterController extends BaseController
{
    use AuthTrait;

    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(Request $request)
    {
        $data = $this->validate(request(), [
            'name' => 'required|string|min:5|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|max:255|confirmed',
        ]);

        $user = $this->userRepository->addUser($data);

        \Auth::login($user);

        return response()->json($this->createRoleToken($request), 201);
    }
}
