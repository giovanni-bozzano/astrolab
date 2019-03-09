<?php

use Illuminate\Http\Request;

/*
	Public API Routes
*/
Route::group(['prefix' => 'v1'], function() {
	/*
	|-------------------------------------------------------------------------------
	| Get User
	|-------------------------------------------------------------------------------
	| URL:            /api/v1/user
	| Controller:     API\UsersController@getUser
	| Method:         GET
	| Description:    Gets the authenticated user.
	*/
	Route::get('/user', 'API\UsersController@getUser');

	/*
	|-------------------------------------------------------------------------------
	| Get All Points
	|-------------------------------------------------------------------------------
	| URL:            /api/v1/points
	| Controller:     API\PointsController@getPoints
	| Method:         GET
	| Description:    Gets all of the points in the application.
	*/
	Route::get('/points', 'API\PointsController@getPoints');

	/*
	|-------------------------------------------------------------------------------
	| Get An Individual Point
	|-------------------------------------------------------------------------------
	| URL:            /api/v1/points/{id}
	| Controller:     API\PointsController@getPoint
	| Method:         GET
	| Description:    Gets an individual points.
	*/
	Route::get('/points/{id}', 'API\PointsController@getPoint');

	/*
	|-------------------------------------------------------------------------------
	| Get All Categories
	|-------------------------------------------------------------------------------
	| URL:            /api/v1/categories
	| Controller:     API\CategoriesController@getCategories
	| Method:         GET
	| Description:    Gets all of the categories in the application.
	*/
	Route::get('/categories', 'API\CategoriesController@getCategories');
});

/*
	Authenticated API Routes.
*/
Route::group(['prefix' => 'v1', 'middleware' => 'auth:api'], function() {
	/*
	|-------------------------------------------------------------------------------
	| Adds a New Point
	|-------------------------------------------------------------------------------
	| URL:            /api/v1/points
	| Controller:     API\PointsController@postNewPoint
	| Method:         POST
	| Description:    Adds a new point to the application.
	*/
	Route::post('/points', 'API\PointsController@postNewPoint');
});
