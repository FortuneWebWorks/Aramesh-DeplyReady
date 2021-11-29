<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\Api\ApiController;

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

Route::get('user-exists/{phoneNumber}', [ApiController::class, 'isUser']);
Route::get('/cities/{city}', [ApiController::class, 'getClinics']);
Route::get('/clinics/{clinic}', [ApiController::class, 'getPractitioners']);
Route::post('/user-confirm', [ApiController::class, 'sendConfirmationCode']);
