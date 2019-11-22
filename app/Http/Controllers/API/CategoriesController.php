<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;

use Request;

/**
 * The categories controller handles all API requests that manage category data.
 */
class CategoriesController extends Controller
{
	/*
	| URL:            /api/v1/categories
	| Method:         GET
	| Description:    Gets all of the categories in the application.
	*/
	public function getCategories()
	{
		$categories = Category::withCount('pois')->get();
		return response()->json($categories);
	}
}