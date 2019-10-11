<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePOIRequest;
use App\Http\Requests\StoreSuggestedPOIRequest;
use App\Models\POI;
use App\Models\SuggestedPOI;

use Auth;
use Request;
use Log;
/**
 * The POIs controller handles all API requests that manage POIs data.
 */
class POIsController extends Controller
{
	/*
	| URL:            /api/v1/pois
	| Method:         GET
	| Description:    Gets all of the POIs in the application.
	*/
	public function getPois()
	{
		$pois = POI::with('category')->get();
		return response()->json($pois);
	}

	/*
	| URL:            /api/v1/pois/{id}
	| Method:         GET
	| Description:    Gets an individual POI.
	| Parameters:
	| 	$id   -> Unique ID of the POI we are retrieving.
	*/
	public function getPoi($id)
	{
		$poi = POI::where('id', '=', $id)->first();
		return response()->json($poi);
	}

	/*
	| URL:            /api/v1/admin/pois/suggested
	| Method:         GET
	| Description:    Gets all of the suggested POIs in the application.
	*/
	public function getSuggestedPois()
	{
		$suggestedPois = SuggestedPOI::with('user')->get();
		return response()->json($suggestedPois);
	}

	/*
	| URL:            /api/v1/admin/pois/publish
	| Method:         POST
	| Description:    Adds a new POI to the application.
	*/
	public function publishNewPoi(StorePOIRequest $request)
	{
		Log::info($request);
		$suggestedPoi = SuggestedPOI::find($request->get('id'));
		if ($suggestedPoi) {
			$suggestedPoi->delete();
		}
		$poi = new POI();
		$poi->name = $request->get('name');
		$poi->address = $request->get('address');
		$poi->description = $request->get('description');
		$poi->category_id = $request->get('category_id');
		$poi->hashtag = $request->get('hashtag');
		$poi->latitude = $request->get('latitude');
		$poi->longitude = $request->get('longitude');
		$poi->save();
		return response()->json($poi, 201);
	}

	/*
	| URL:            /api/v1/pois
	| Method:         POST
	| Description:    Adds a new suggested POI to the application.
	*/
	public function suggestNewPoi(StoreSuggestedPOIRequest $request)
	{
		$suggestedPoi = new SuggestedPOI();
		$suggestedPoi->name = $request->get('name');
		$suggestedPoi->address = $request->get('address');
		$suggestedPoi->description = $request->get('description');
		$suggestedPoi->category_id = $request->get('category_id');
		$suggestedPoi->latitude = $request->get('latitude');
		$suggestedPoi->longitude = $request->get('longitude');
		$suggestedPoi->user_id = Auth::id();
		$suggestedPoi->save();
		return response()->json($suggestedPoi, 201);
	}
}
