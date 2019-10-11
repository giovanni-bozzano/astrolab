<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSuggestedPOIRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			'name' => 'required',
			'address' => 'required',
			'description' => 'required',
			'category_id' => 'required',
			'latitude' => 'required',
			'longitude' => 'required'
		];
	}

	/**
	 * Get the error messages for the defined validation rules.
	 *
	 * @return array
	 */
	public function messages()
	{
		return [
			'name.required' => 'A name is required to add this POI.',
			'address.required' => 'An address is required to add this POI.',
			'description.required' => 'A description is required to add this POI.',
			'category_id.required' => 'A category is required to add this POI.',
			'latitude.required' => 'A latitude is required to add this POI.',
			'longitude.required' => 'A longitude is required to add this POI.'
		];
	}
}
