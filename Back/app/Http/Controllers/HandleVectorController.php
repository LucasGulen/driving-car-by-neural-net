<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Distance;
use Response;

class HandleVectorController extends Controller
{

    function postData (Request $request)   {
        $bodyValues = $request->input('userVectors');
        $distance = saveDataToDb($bodyValues);
        return Response::json(($distance), 201);
    }

    function postMultipleData (Request $request) {
        $allVectors =  $request->input('userVectors');
        $myArray = array();
        for($i = 0 ; $i<count($allVectors); $i++){
            $myArray = array_merge($myArray, array($this->saveDataToDb($allVectors[$i])));
        }
        return Response::json($myArray, 201);
    }

    function saveDataToDb (Array $array){
        $distance = new Distance;
        $distance->dist_vector_1 = $array[0];
        $distance->dist_vector_2 = $array[1];
        $distance->dist_vector_3 = $array[2];
        $distance->dist_vector_4 = $array[3];
        $distance->dist_vector_5 = $array[4];
        $distance->dist_label_left = $array[5][0];
        $distance->dist_label_straight = $array[5]{1};
        $distance->dist_label_right = $array[5][2];
        $distance->save();
        return $distance;
    }

    function getAllData () {
        return Distance::all();
    }
}
