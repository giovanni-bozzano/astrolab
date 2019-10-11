<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';

    public function pois()
    {
		return $this->hasMany('App\Models\POI');
	}

	public function suggestedPois()
	{
		return $this->hasMany('App\Models\SuggestedPOI');
	}
}
