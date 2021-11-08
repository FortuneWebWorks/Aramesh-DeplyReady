<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Clinic;
use App\Models\Practitioner;
use App\Models\User;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function userExists(Request $request, $phoneNumber) 
    {
        $user = User::where('phone-number', $phoneNumber)->get();
        $practitioner = Practitioner::where('phone-number', $phoneNumber)->get();
        if(sizeof($user) > 0 || sizeof($practitioner) > 0) {
            return response()->json(true, 200);
        }
        return response()->json(false, 200);
    }

    public function clinics(Request $request, City $city) 
    {
        return $city->clinics()->get(['id', 'name']);
    }

    public function practitioners(Request $request, Clinic $clinic) 
    {
        return $clinic->practitioners()->get(['id', 'name']);
    }

    public function isAdmin(Request $request, $phoneNumber) 
    {
        $practitioner = Practitioner::where('phone-number', $phoneNumber)->get();
        if(sizeof($practitioner) > 0) {
            return response()->json(true, 200);
        }
        return response()->json(false, 200);
    }
}
