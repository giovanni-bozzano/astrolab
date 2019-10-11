<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
	use HasApiTokens, Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name', 'email', 'avatar', 'provider', 'provider_id'
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'role_id', 'provider', 'provider_id', 'remember_token'
	];

	protected $appends = ['is_administrator'];

	public function getIsAdministratorAttribute()
	{
		return $this->role_id == 2;
	}

	public function suggestedPois()
	{
		return $this->hasMany('App\Models\SuggestedPOI');
	}
}
