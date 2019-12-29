<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class POI extends Model
{
	protected $table = 'pois';

	public function category()
	{
		return $this->belongsTo('App\Models\Category', 'category_id');
	}

	public function getNextId() 
	{
		$statement = DB::select("show table status like 'pois'");
		return $statement[0]->Auto_increment;
	}
}
