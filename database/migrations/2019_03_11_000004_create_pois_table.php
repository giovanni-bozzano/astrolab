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
			$table->string('name');
			$table->text('address');
			$table->text('coordinates');
			$table->text('description');
			$table->unsignedBigInteger('category_id')->nullable();
			$table->foreign('category_id')->references('id')->on('categories');
			$table->decimal('latitude', 11, 8);
			$table->decimal('longitude', 11, 8);
			$table->text('hashtag')->nullable();
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
