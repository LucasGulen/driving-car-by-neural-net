<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
=============================================================
EXAMPLE FORM BODY FOR POST HTTP REQUEST
(An array containing multiple Array which each represents 5 distances and a label)
=============================================================
    {
        "userVectors" :
        [
            [
                [89,89,12,1,34],0
            ],
            [
                [9,8129,2212,22221,22222234],0
            ]
        ]
    }
*/
Route::post('/data', 'HandleVectorController@postData');

Route::post('/multipleData', 'HandleVectorController@postMultipleData');

Route::get('/data', 'HandleVectorController@getAllData');

