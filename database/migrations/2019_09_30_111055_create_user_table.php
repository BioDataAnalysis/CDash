<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUserTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('user', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('email')->default('')->index('email');
			$table->string('password')->default('');
			$table->string('firstname', 40)->default('');
			$table->string('lastname', 40)->default('');
			$table->string('institution')->default('');
			$table->boolean('admin')->default(0);
			$table->dateTime('email_verified_at')->nullable();
			$table->string('remember_token', 100)->nullable();
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
		Schema::drop('user');
	}

}
