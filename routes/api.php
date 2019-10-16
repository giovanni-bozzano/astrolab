<?php

use Illuminate\Http\Request;

/*
	Public API Routes
*/
Route::group(['prefix' => 'v1'], function() {
	/*
	| URL:            /api/v1/user
	| Controller:     API\UsersController@getUser
	| Method:         GET
	| Description:    Gets the authenticated user.
	*/
	Route::get('/user', 'API\UsersController@getUser');

	/*
	| URL:            /api/v1/pois
	| Controller:     API\POIsController@getPois
	| Method:         GET
	| Description:    Gets all of the POIs in the application.
	*/
	Route::get('/pois', 'API\POIsController@getPois');

	/*
	| URL:            /api/v1/pois/{id}/instagram/{endCursor}
	| Controller:     API\POIsController@getPoiInstagramPosts
	| Method:         GET
	| Description:    Gets an individual POI's Instagram posts.
	*/
	Route::get('/pois/{id}/instagram/{endCursor?}', 'API\POIsController@getPoiInstagramPosts');

	/*
	| URL:            /api/v1/categories
	| Controller:     API\CategoriesController@getCategories
	| Method:         GET
	| Description:    Gets all of the categories in the application.
	*/
	Route::get('/categories', 'API\CategoriesController@getCategories');

	/*
		Authenticated API Routes.
	*/
	Route::group(['middleware' => 'auth:api'], function() {
		/*
		| URL:            /api/v1/pois/suggest
		| Controller:     API\POIsController@suggestNewPoi
		| Method:         POST
		| Description:    Adds a new suggested POI to the application.
		*/
		Route::post('/pois/suggest', 'API\POIsController@suggestNewPoi');

		/*
		| URL:            /api/v1/pois/delete-suggested/{id}
		| Controller:     API\POIsController@deleteUserSuggestedPoi
		| Method:         POST
		| Description:    Deletes a suggested POI in the application.
		*/
		Route::post('/pois/delete-suggested/{id}', 'API\POIsController@deleteUserSuggestedPoi');

		Route::group(['prefix' => 'admin', 'middleware' => 'administrator_permission:api'], function() {
			/*
			| URL:            /api/v1/admin/pois/suggested
			| Controller:     API\POIsController@getSuggestedPois
			| Method:         GET
			| Description:    Gets all of the suggested POIs in the application.
			*/
			Route::get('/pois/suggested', 'API\POIsController@getSuggestedPois');

			/*
			| URL:            /api/v1/admin/pois/publish
			| Controller:     API\POIsController@publishNewPoi
			| Method:         POST
			| Description:    Adds a new POI to the application.
			*/
			Route::post('/pois/publish', 'API\POIsController@publishNewPoi');

			/*
			| URL:            /api/v1/admin/pois/delete-suggested/{id}
			| Controller:     API\POIsController@deleteSuggestedPoi
			| Method:         POST
			| Description:    Deletes a suggested POI in the application.
			*/
			Route::post('/pois/delete-suggested/{id}', 'API\POIsController@deleteSuggestedPoi');
		});
	});
});