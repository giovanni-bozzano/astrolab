<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;

use Auth;

/**
 * The users controller handles all API requests that manage user data.
 */
class UsersController extends Controller
{
	/*
	|-------------------------------------------------------------------------------
	| Get User
	|-------------------------------------------------------------------------------
	| URL:            /api/v1/user
	| Method:         GET
	| Description:    Gets the authenticated user.
	*/
	public function getUser()
	{
		$user = Auth::guard('api')->user();
		if (!$user) {
			return null;
		}
		return User::with('suggestedPois')->find($user)->first();
	}
}
