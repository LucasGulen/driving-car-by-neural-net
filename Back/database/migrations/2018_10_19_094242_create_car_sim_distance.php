<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCarSimDistance extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('car_sim_distance', function (Blueprint $table) {
            $table->increments('dist_id');
            $table->integer('dist_vector_1');
            $table->integer('dist_vector_2');
            $table->integer('dist_vector_3');
            $table->integer('dist_vector_4');
            $table->integer('dist_vector_5');
            $table->integer('dist_label_left');
            $table->integer('dist_label_straight');
            $table->integer('dist_label_right');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
