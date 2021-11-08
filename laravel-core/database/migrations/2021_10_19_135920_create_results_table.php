<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->double('content', 3, 2);
            $table->double('process', 3, 2);
            $table->double('cs', 3, 2);
            $table->double('ps', 3, 2);
            $table->double('rfc', 3, 2);
            $table->double('cstra', 3, 2);
            $table->double('rb', 3, 2);
            $table->double('je', 3, 2);
            $table->double('tt', 3, 2);
            $table->double('fs', 3, 2);
            $table->double('ap', 3, 2);
            $table->double('pp', 3, 2);
            $table->double('ls', 3, 2);
            $table->double('ef', 3, 2);
            $table->timestamps();
            $table->foreignId('member_id')->references('id')->on('members')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('results');
    }
}
