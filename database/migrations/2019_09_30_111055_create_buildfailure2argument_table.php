<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBuildfailure2argumentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('buildfailure2argument', function(Blueprint $table)
		{
			$table->bigInteger('buildfailureid')->index('buildfailureid');
			$table->bigInteger('argumentid')->index('argumentid');
			$table->integer('place')->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('buildfailure2argument');
	}

}
