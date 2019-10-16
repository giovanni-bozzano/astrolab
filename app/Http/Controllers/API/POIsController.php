<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePOIRequest;
use App\Http\Requests\StoreSuggestedPOIRequest;
use App\Models\POI;
use App\Models\SuggestedPOI;

use Auth;
use Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

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
	| URL:            /api/v1/pois/{id}/instagram
	| Method:         GET
	| Description:    Gets an individual POI's Instagram posts.
	| Parameters:
	| 	$id        -> Unique ID of the POI.
	| 	$endCursor -> Endpoint end cursor.
	*/
	public function getPoiInstagramPosts($id, $endCursor = null)
	{
		$client = New Client();
		if (!is_null($endCursor)) {
			try {
				$response = $client->get('https://www.instagram.com/explore/tags/landscape/?__a=1&max_id='.$endCursor);
			} catch (ClientException $e) {
				return response(null, 403);
			}
		} else {
			$response = $client->get('https://www.instagram.com/explore/tags/landscape/?__a=1');
		}
		$json = json_decode($response->getBody(), true);
		$response = new \stdClass();
		$response->endCursor = $json['graphql']['hashtag']['edge_hashtag_to_media']['page_info']['end_cursor'];
		$response->list = array();
		foreach($json['graphql']['hashtag']['edge_hashtag_to_media']['edges'] as $node) {
			$item = new \stdClass();
			$item->imageUrl = $node['node']['display_url'];
			$item->url = 'https://www.instagram.com/p/'.$node['node']['shortcode'];
			if (!empty($node['node']['edge_media_to_caption']['edges'])) {
				$item->title = $node['node']['edge_media_to_caption']['edges'][0]['node']['text'];
			} else {
				$item->title = null;
			}
			$item->date = $node['node']['taken_at_timestamp'];
			array_push($response->list, $item);
		}
		return response()->json($response);
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
		return response($request->get('name').' è stato pubblicato!', 201);
	}

	/*
	| URL:            /api/v1/admin/pois/delete-suggested/{id}
	| Method:         POST
	| Description:    Deletes a suggested POI in the application.
	| Parameters:
	| 	$id   -> Unique ID of the POI we are deleting.
	*/
	public function deleteSuggestedPoi($id)
	{
		$suggestedPoi = SuggestedPOI::find($id);
		if ($suggestedPoi) {
			$suggestedPoi->delete();
			return response($suggestedPoi->name.' è stato cancellato!', 201);
		}
		return response('Il suggerimento non esiste.', 403);
	}

	/*
	| URL:            /api/v1/pois/suggest
	| Method:         POST
	| Description:    Adds a new suggested POI to the application.
	*/
	public function suggestNewPoi(StoreSuggestedPOIRequest $request)
	{
		$suggestedPoi = SuggestedPOI::where('id', $request->get('id'))->where('user_id', Auth::guard('api')->user()->id)->first();
		if (!$suggestedPoi) {
			if (Auth::guard('api')->user()->suggestedPois()->count() >= 5) {
				return response('Hai raggiunto il numero massimo di suggerimenti.', 403);
			}
			$suggestedPoi = new SuggestedPOI();
		}
		$suggestedPoi->name = $request->get('name');
		$suggestedPoi->address = $request->get('address');
		$suggestedPoi->description = $request->get('description');
		$suggestedPoi->category_id = $request->get('category_id');
		$suggestedPoi->latitude = $request->get('latitude');
		$suggestedPoi->longitude = $request->get('longitude');
		$suggestedPoi->user_id = Auth::id();
		$suggestedPoi->save();
		return response($request->get('name').' è stato suggerito!', 201);
	}

	/*
	| URL:            /api/v1/pois/delete-suggested/{id}
	| Method:         POST
	| Description:    Deletes a suggested POI in the application.
	| Parameters:
	| 	$id   -> Unique ID of the POI we are deleting.
	*/
	public function deleteUserSuggestedPoi($id)
	{
		
		$suggestedPoi = SuggestedPOI::where('id', $id)->where('user_id', Auth::guard('api')->user()->id)->first();
		if ($suggestedPoi) {
			$suggestedPoi->delete();
			return response($suggestedPoi->name.' è stato cancellato!', 201);
		}
		return response('Il suggerimento non esiste.', 403);
	}
}
