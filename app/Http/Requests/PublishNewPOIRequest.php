<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PublishNewPOIRequest extends FormRequest
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
			'image' => 'sometimes|image|mimes:jpeg,jpg,png',
			'description' => 'required',
			'address' => 'sometimes',
			'coordinates' => 'sometimes',
			'email_address' => 'sometimes',
			'phone_number' => 'sometimes',
			'website' => 'sometimes',
			'hashtag' => 'sometimes',
			'category_id' => 'required',
			'latitude' => 'required',
			'longitude' => 'required',
			'suggestion_id' => 'sometimes'
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
			'name.required' => 'Inserisci un nome per il luogo!',
			'description.required' => 'Inserisci una descrizione per il luogo!',
			'category_id.required' => 'Seleziona una categoria per il luogo!',
			'latitude.required' => 'Seleziona una posizione nella mappa per il luogo!',
			'longitude.required' => 'Seleziona una posizione nella mappa per il luogo!'
		];
	}
}
