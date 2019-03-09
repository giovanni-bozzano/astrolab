<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;

use Request;

/**
 * The points controller handles all API requests that manage category data.
 */
class CategoriesController extends Controller
{
	/*
	|-------------------------------------------------------------------------------
	| Get All Categories
	|-------------------------------------------------------------------------------
	| URL:            /api/v1/categories
	| Method:         GET
	| Description:    Gets all of the categories in the application.
	*/
	public function getCategories()
	{
		$categories = Category::withCount('points')->get();
		return response()->json($categories);
	}
}
