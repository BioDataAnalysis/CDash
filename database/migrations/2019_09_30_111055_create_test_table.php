<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTestTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('test', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('projectid')->index('projectid');
			$table->bigInteger('crc32')->index('crc32');
			$table->string('name')->default('')->index('name');
			$table->string('path')->default('');
			$table->text('command', 65535);
			$table->text('details', 65535);
			$table->binary('output', 16777215);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('test');
	}

}
