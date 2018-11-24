<?php

use Illuminate\Database\Seeder;

class CarSimDistanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($j=0; $j < 1000; $j++) {
            DB::table('car_sim_distance')->insert([
                'dist_vector_1' => random_int(1,200),
                'dist_vector_2' => random_int(1,200),
                'dist_vector_3' => random_int(1,200),
                'dist_vector_4' => random_int(1,200),
                'dist_vector_5' => random_int(1,200),
                'dist_label' => random_int(0,2)
            ]);
        }
    }
}
