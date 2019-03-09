<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePointRequest;
use App\Models\Point;

use Request;

/**
 * The points controller handles all API requests that manage point data.
 */
class PointsController extends Controller
{
	/*
	|-------------------------------------------------------------------------------
	| Get All Points
	|-------------------------------------------------------------------------------
	| URL:            /api/v1/points
	| Method:         GET
	| Description:    Gets all of the points in the application.
	*/
	public function getPoints()
	{
		$points = Point::with('category')->get();
		return response()->json($points);
	}

	/*
	|-------------------------------------------------------------------------------
	| Get An Individual Point
	|-------------------------------------------------------------------------------
	| URL:            /api/v1/points/{id}
	| Method:         GET
	| Description:    Gets an individual point.
	| Parameters:
	| 	$id   -> Unique ID of the point we are retrieving.
	*/
	public function getPoint($id)
	{
		$point = Point::where('id', '=', $id)->first();
		return response()->json($point);
	}

	/*
	|-------------------------------------------------------------------------------
	| Adds a New Point
	|-------------------------------------------------------------------------------
	| URL:            /api/v1/points
	| Method:         POST
	| Description:    Adds a new point to the application.
	*/
	public function postNewPoint(StorePointRequest $request)
	{
		/*
			Get the Latitude and Longitude returned from the Google Maps Address.
		*/
		$point = new Point();
		$point->name = $request->get('name');
		$point->address = $request->get('address');
		$point->description = $request->get('description');
		$point->category_id = $request->get('category_id');
		$point->latitude = $request->get('latitude');
		$point->longitude = $request->get('longitude');
		$point->save();
		return response()->json($point, 201);
	}
}
