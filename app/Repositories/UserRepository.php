<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\UserRepository;

class UserRepository extends BaseRepository 
{
    /**
	 * UserRepository constructor.
	 * 
	 * @param \App\Contact 
	 * @return void
	 */
	public function __construct(User $model) {
		parent::__construct($model);
    }

    public function addUser(array $fields) {
        $user = new User;
        $user->email = $fields['email'];
        $user->name = $fields['name'];
        $user->password = bcrypt($fields['password']);
        $user->save();

        return $user;
    }

    public function getAuthenticatedUser() {
        return auth()->user();
    }
}