<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClinicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clinics', function (Blueprint $table)
        {
            $table->id();
            $table->string('name');
            $table->string('province');
            $table->foreignId('city_id')->references('id')->on('cities')->onDelete('cascade');
            $table->text('address');
            $table->bigInteger('serial')->nullable();
            $table->bigInteger('phone-number')->nullable();
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
        Schema::dropIfExists('clinics');
    }
}
