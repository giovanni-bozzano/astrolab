<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;

use Auth;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cookie;

/**
 * The users controller handles all API requests that manage user data.
 */
class UsersController extends Controller
{
	/*
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
		return User::with(['suggestedPois' => function($query) {
			$query->where('status', 'pending');
		}])->find($user)->first();
	}

	/*
	| URL:            /api/v1/cookies-consent
	| Method:         GET
	| Description:    Gets the cookies consent status.
	*/
	public function getCookiesConsent()
	{
		if (is_null(Cookie::get('cookies-consent'))) {
			return response()->json(false);
		}
		return Cookie::get('cookies-consent');
	}

	/*
	| URL:            /api/v1/cookies-consent/give
	| Method:         POST
	| Description:    Give cookies consent.
	*/
	public function giveCookiesConsent()
	{
		$response = new Response();
		$response->withCookie(Cookie::forever('cookies-consent', 1));
		return $response;
	}
}