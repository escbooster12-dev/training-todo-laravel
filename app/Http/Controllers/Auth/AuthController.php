<?php

namespace App\Http\Controllers\Auth;

use App\Traits\AuthTrait;
use Illuminate\Http\Request;
use App\Repositories\UserRepository;
use App\Http\Controllers\BaseController;

class AuthController extends BaseController
{
    use AuthTrait;

    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
            'remember_me' => 'boolean',
        ]);

        $this->attempt($data);

        return response()->json($this->createRoleToken($request), 201);
    }

    public function auth(Request $request)
    {
        if (!$request->user()) {
            abort(419);
        }

        return response()->json($this->userRepository->getAuthenticatedUser(), 200);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json([], 200);
    }
}
