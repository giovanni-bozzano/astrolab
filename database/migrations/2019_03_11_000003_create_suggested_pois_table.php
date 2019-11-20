<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSuggestedPOIsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('suggested_pois', function($table) {
			$table->bigIncrements('id');
			$table->string('name');
			$table->text('address');
			$table->text('description');
			$table->unsignedBigInteger('category_id')->nullable();
            $table->foreign('category_id')->references('id')->on('categories');
			$table->decimal('latitude', 11, 8);
			$table->decimal('longitude', 11, 8);
			$table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
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
		Schema::drop('suggested_pois');
	}
}
