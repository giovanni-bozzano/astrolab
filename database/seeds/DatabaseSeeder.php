<?php

use Illuminate\Database\Seeder;
use App\Models\Role;

class DatabaseSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();
        Role::create([
            'name' => 'User'
        ]);
        Role::create([
            'name' => 'Administrator'
        ]);
	}
}