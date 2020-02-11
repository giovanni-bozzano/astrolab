<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePOIsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('pois', function($table) {
			$table->bigIncrements('id');
			$table->text('name');
			$table->text('image_url')->nullable();
			$table->text('description');
			$table->text('address')->nullable();
			$table->text('coordinates')->nullable();
			$table->text('email_address')->nullable();
			$table->text('phone_number')->nullable();
			$table->text('website')->nullable();
			$table->text('hashtag')->nullable();
			$table->unsignedBigInteger('category_id')->nullable();
			$table->foreign('category_id')->references('id')->on('categories');
			$table->decimal('latitude', 11, 8);
			$table->decimal('longitude', 11, 8);
			$table->boolean('is_hidden')->default(false);
			$table->unsignedBigInteger('suggestion_id')->nullable();
			$table->foreign('suggestion_id')->references('id')->on('suggested_poi');
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
		Schema::drop('pois');
	}
}
