<?php

/*
| URL:            /
| Controller:     Web\AppController@getApp
| Method:         GET
| Description:    Displays the homepage with the points listing. This kicks off
|                 the single page application.
*/
Route::get('/{view?}', 'Web\AppController@getApp')
	->where('view', '^(?!.*admin|login).*$')
	->name('app');

/*
| URL:            /login/{social}
| Controller:     Web\AuthenticationController@getSocialRedirect
| Method:         GET
| Description:    Initializes the social login defined by the user. Can be
|                 Facebook or Google.
*/
Route::get('/login/{social}', 'Web\AuthenticationController@getSocialRedirect')
	->middleware('guest');

/*
| URL:            /login/{social}
| Controller:     Web\AuthenticationController@getSocialCallback
| Method:         GET
| Description:    Handles the callback from a social login request
*/
Route::get('/login/{social}/callback', 'Web\AuthenticationController@getSocialCallback')
	->middleware('guest');

Route::group(['middleware' => 'auth'], function() {
	/*
	| URL:            /logout
	| Controller:     Web\AppController@logout
	| Method:         GET
	| Description:    Logs out the authenticated user.
	*/
	Route::post('/logout', 'Web\AppController@getLogout');

	/*
	| URL:            /
	| Controller:     Web\AppController@getAppAdmin
	| Method:         GET
	| Description:    Displays the admin panel. This kicks off
	|                 the single page application.
	*/
	Route::get('/admin/{view?}', 'Web\AppController@getAppAdmin')
		->where('view', '(.*)')
		->middleware('administrator_permission');
});