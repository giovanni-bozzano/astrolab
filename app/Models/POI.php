<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class POI extends Model
{
	protected $table = 'pois';

	public function category()
	{
		return $this->belongsTo('App\Models\Category', 'category_id');
	}
}
