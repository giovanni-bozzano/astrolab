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
	| URL:            /api/v1/instagram/{endCursor}
	| Controller:     API\POIsController@getInstagramPosts
	| Method:         GET
	| Description:    Gets Instagram posts.
	*/
	Route::get('/instagram/{endCursor?}', 'API\POIsController@getInstagramPosts');

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
			| URL:            /api/v1/admin/pois/edit/{id}
			| Controller:     API\POIsController@editPoi
			| Method:         POST
			| Description:    Edits a POI in the application.
			*/
			Route::post('/pois/edit', 'API\POIsController@editPoi');

			/*
			| URL:            /api/v1/admin/pois/show/{id}
			| Controller:     API\POIsController@showPoi
			| Method:         POST
			| Description:    Shows a POI in the application.
			*/
			Route::post('/pois/show/{id}', 'API\POIsController@showPoi');

			/*
			| URL:            /api/v1/admin/pois/hide/{id}
			| Controller:     API\POIsController@hidePoi
			| Method:         POST
			| Description:    Hides a POI in the application.
			*/
			Route::post('/pois/hide/{id}', 'API\POIsController@hidePoi');

			/*
			| URL:            /api/v1/admin/pois/delete/{id}
			| Controller:     API\POIsController@deletePoi
			| Method:         POST
			| Description:    Deletes a POI in the application.
			*/
			Route::post('/pois/delete/{id}', 'API\POIsController@deletePoi');

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
			| URL:            /api/v1/admin/pois/reject-suggested/{id}
			| Controller:     API\POIsController@rejectSuggestedPoi
			| Method:         POST
			| Description:    Rejects a suggested POI in the application.
			*/
			Route::post('/pois/reject-suggested/{id}', 'API\POIsController@rejectSuggestedPoi');
		});
	});
});