<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Repositories\UserRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class AuthController extends BaseController
{
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

    /** Protected Functions */

    protected function createRoleToken(Request $request)
    {
        $user = $request->user();

        $tokenData = $user->createToken('Personal Access Tokens', ['user']);

        return [
            'user' => $request->user(),
            'access_token' => $tokenData->accessToken,
            'token_type' => 'Bearer',
            'token_scope' => $tokenData->token->scopes[0],
            'expires_at' => Carbon::parse($tokenData->token->expires_at)->toDateTimeString(),
            'status_code' => 200,
        ];
    }

    protected function attempt(array $credentials)
    {
        if (!Auth::attempt(Arr::except($credentials, 'remember_me'))) {
            abort(403);
        }
    }
}
