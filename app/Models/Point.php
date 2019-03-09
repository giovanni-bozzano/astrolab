<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Point extends Model
{
	protected $table = 'points';

	public function category()
	{
		return $this->belongsTo('App\Models\Category', 'category_id');
	}
}
