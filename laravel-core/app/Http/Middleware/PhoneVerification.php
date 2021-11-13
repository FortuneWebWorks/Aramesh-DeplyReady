<?php

namespace App\Http\Middleware;

use App\Models\Practitioner;
use App\Models\User;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Middleware;

class PhoneVerification extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = User::where('phone-number', $request['phone-number'])->first();
        $practitioner = Practitioner::where('phone-number', $request['phone-number'])->first();
        if($user) {
            $userCode = $user->verificationCodes()->where('expires_at', '>', Carbon::now())->first();
            if($userCode) {
                if($userCode->code == $request->code) {
                    return $next($request);
                } else {
                    return Inertia::render('auth/UserConfirm', [
                        'phoneNumber'=> $request['phone-number'],
                        'nextRoute' => $request['nextRoute'],
                    ])->with(['errors'=> array("رمز وارد شده نادرست می باشد")]);
                }
            } else {
                return Inertia::render('auth/UserConfirm', [
                    'phoneNumber'=> $request['phone-number'],
                    'nextRoute' => $request['nextRoute'],
                ])->with(['errors'=> array("رمز ارسال شده منقضی شده است لطفا درخواست رمز جدید نمایید")]);
            }
        } else if(!$user && $practitioner) {
            $userCode = $practitioner->verificationCodes()->where('expires_at', '>', Carbon::now())->first();
            if($userCode) {
                if($userCode->code == $request->code) {
                    return $next($request);
                } else {
                    return Inertia::render('auth/UserConfirm', [
                        'phoneNumber'=> $request['phone-number'],
                        'nextRoute' => $request['nextRoute'],
                    ])->with(['errors'=> array("رمز وارد شده نادرست می باشد")]);
                }
            } else {
                return Inertia::render('auth/UserConfirm', [
                    'phoneNumber'=> $request['phone-number'],
                    'nextRoute' => $request['nextRoute'],
                ])->with(['errors'=> array("رمز ارسال شده منقضی شده است لطفا درخواست رمز جدید نمایید")]);
            }
        }
        return Inertia::render('auth/UserConfirm', [
            'phoneNumber'=> $request['phone-number'],
            'nextRoute' => $request['nextRoute'],
        ])->with(['errors'=> array("کاربری با این شماره تلفن یافت نشد لطفا دوباره وارد شوید")]);
    }
}
