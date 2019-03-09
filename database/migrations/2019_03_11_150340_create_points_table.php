<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePointsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('points', function($table) {
			$table->increments('id');
			$table->string('name');
			$table->text('address')->nullable();
			$table->text('description');
			$table->integer('category_id')->unsigned();
            $table->foreign('category_id')->references('id')->on('categories');
			$table->decimal('latitude', 11, 8);
			$table->decimal('longitude', 11, 8);
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
		Schema::drop('points');
	}
}
