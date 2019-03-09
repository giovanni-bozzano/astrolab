<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePointRequest extends FormRequest
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
			'address' => 'sometimes',
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
			'name.required' => 'A name for the point is required.',
			'description.required' => 'A description is required to add this point.',
			'category_id.required' => 'A category is required to add this point.',
			'latitude.required' => 'A latitude for the point is required.',
			'longitude.required' => 'A longitude is required to add this point.'
		];
	}
}
