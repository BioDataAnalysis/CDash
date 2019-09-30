<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTestdiffTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('testdiff', function(Blueprint $table)
		{
			$table->bigInteger('buildid')->index('buildid');
			$table->boolean('type')->index('type');
			$table->integer('difference_positive')->index('difference_positive');
			$table->integer('difference_negative')->index('difference_negative');
			$table->unique(['buildid','type'], 'unique_testdiff');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('testdiff');
	}

}
