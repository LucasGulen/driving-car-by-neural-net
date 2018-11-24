<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Distance extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'dist_vector_1', 'dist_vector_2', 'dist_vector_3','dist_vector_4','dist_vector_5','dist_label_left', 'dist_label_straight', 'dist_label_right',
    ];
	
	protected $hidden = array('dist_id');


    protected $table = 'car_sim_distance';

    public $timestamps = false;



}
