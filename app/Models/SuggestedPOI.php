<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SuggestedPOI extends Model
{
	protected $table = 'suggested_pois';

	public function category()
	{
		return $this->belongsTo('App\Models\Category', 'category_id');
	}

	public function user()
	{
		return $this->belongsTo('App\Models\User', 'user_id');
	}
}
