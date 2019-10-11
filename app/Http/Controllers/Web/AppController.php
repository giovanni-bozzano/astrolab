<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;

use Auth;
use Request;

class AppController extends Controller
{
	/**
	 * Gets the view that displays the app.
	 */
	public function getApp()
	{
		/*
			If the request has a ref variable, redirect to the
			homepage. This is so the SPA doesn't break.
		*/
		if (Request::has('ref')) {
			return redirect('/');
		}
		/*
			Return the view
		*/
		return view('app');
	}

	/**
	 * Gets the view that displays the admin panel.
	 */
	public function getAppAdmin()
	{
		/*
			If the request has a ref variable, redirect to the
			homepage. This is so the SPA doesn't break.
		*/
		if (Request::has('ref')) {
			return redirect('/admin');
		}
		/*
			Return the view
		*/
		return view('app-admin');
	}

	/**
	 * Logs out the user.
	 */
	public function getLogout()
	{
		Auth::logout();
	}
}
