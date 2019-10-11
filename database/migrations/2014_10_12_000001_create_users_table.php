<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function ($table) {
			$table->bigIncrements('id');
			$table->string('name');
			$table->string('email');
			$table->unsignedBigInteger('role_id')->default(1);
			$table->foreign('role_id')->references('id')->on('roles');
			$table->text('avatar');
			$table->string('provider');
			$table->string('provider_id');
			$table->rememberToken();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('users');
	}
}
