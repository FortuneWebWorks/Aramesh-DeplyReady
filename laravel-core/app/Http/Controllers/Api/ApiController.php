<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Clinic;
use App\Models\Practitioner;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
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

    public function sendConfirmationCode(Request $request) {
        $user = User::where('phone-number', $request['phone-number'])->first();
        $practitioner = Practitioner::where('phone-number', $request['phone-number'])->first();
        
        if($user) {
            $prevCode = $user->verificationCodes()->where('expires_at', '>', Carbon::now())->first();
            
            if(!$prevCode) {
                $code = $this->makeVerificationCode($user);
                $req = curl_init();
                curl_setopt_array($req, [
                    CURLOPT_URL => "https://api.ghasedak.me/v2/verification/send/simple",
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => "",
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 60,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => "POST",
                    CURLOPT_POSTFIELDS => "receptor=0".$request['phone-number']."&template=aramesh&type=1&param1=".$code,
                    CURLOPT_HTTPHEADER => array(
                    "apikey: ". env("GHASEDAKAPI_KEY"),
                    "cache-control: no-cache",
                    "content-type: application/x-www-form-urlencoded",
                    )
                ]);
                $userResponse = curl_exec($req);
                curl_close($req);
                if(json_decode($userResponse)->result->code !== 200) {
                    return [
                        "success" => false,
                        "message" => json_decode($userResponse)->result->message
                    ];
                } else {
                    return [
                        "success" => true,
                        "message" => "رمز عبور برای شما ارسال شد"
                    ];
                }
            } else {
                return [
                    "success" => false,
                    "message" => "کد فعالسازی قبلا برای شما ارسال شده است لطفا دو دقیقه ی دیگر دوباره تلاش کنید"
                ];
            }
        } else if (!$user && $practitioner) {
            $prevCode = $practitioner->verificationCodes()->where('expires_at', '>', Carbon::now())->first();
            if(!$prevCode) {
                $code = $this->makeVerificationCode($practitioner);
                $req = curl_init();
                curl_setopt_array($req, [
                    CURLOPT_URL => "https://api.ghasedak.me/v2/verification/send/simple",
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => "",
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 60,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => "POST",
                    CURLOPT_POSTFIELDS => "receptor=0".$request['phone-number']."&template=aramesh&type=1&param1=".$code,
                    CURLOPT_HTTPHEADER => array(
                    "apikey: ". env("GHASEDAKAPI_KEY"),
                    "cache-control: no-cache",
                    "content-type: application/x-www-form-urlencoded",
                    )
                ]);
                $adminResponse = curl_exec($req);
                curl_close($req);
                if(json_decode($adminResponse)->result->code !== 200) {
                    return [
                        "success" => false,
                        "message" => json_decode($adminResponse)->result->message
                    ];
                } else {
                    return [
                        "success" => true,
                        "message" => "رمز عبور برای شما ارسال شد"
                    ];
                }
            } else {
                return [
                    "success" => false,
                    "message" => "کد فعالسازی قبلا برای شما ارسال شده است لطفا دو دقیقه ی دیگر دوباره تلاش کنید"
                ];
            }
        }
    }

    
    public function makeVerificationCode(Model $model) {
        $code = $this->codeGenerator($model);
        $model->verificationCodes()->create([
            'code' => $code,
            'expires_at' => Carbon::now()->addMinute(1)
        ]);
        return $code;
    }

    public function codeGenerator(Model $model) {
        $randomNumber = rand(100000, 999999);
        $codeExists = $model->verificationCodes()->where('code', $randomNumber)->where('expires_at', '>', Carbon::now())->get();
        if(sizeof($codeExists) > 0) {
            $this->codeGenerator($model);
        } else {
            return $randomNumber;
        }
    }
}
