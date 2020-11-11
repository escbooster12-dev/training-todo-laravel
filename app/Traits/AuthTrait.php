<?php

namespace App\Traits;

use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

trait AuthTrait
{
    public function createRoleToken($request)
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

    public function attempt(array $credentials)
    {
        if (!Auth::attempt(Arr::except($credentials, 'remember_me'))) {
            abort(403);
        }
    }
}
