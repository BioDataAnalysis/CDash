<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateClientJobschedule2submissionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('client_jobschedule2submission', function(Blueprint $table)
		{
			$table->bigInteger('scheduleid')->unique('scheduleid');
			$table->bigInteger('submissionid')->primary();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('client_jobschedule2submission');
	}

}
