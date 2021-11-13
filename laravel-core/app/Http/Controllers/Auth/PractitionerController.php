<?php

namespace App\Http\Controllers\Auth;

use App\Models\Practitioner;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class PractitionerController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    
    public function redirectTo() {
        $user = User::where('phone-number', Auth::user()['phone-number'])->first();
        $practitioner = Practitioner::where('phone-number', Auth::user()['phone-number'])->first();

        if(!$user && $practitioner) {
            $this->redirectTo = '/admin/dashboard';
            return '/admin/dashboard';
        }
        $this->redirectTo = '/dashboard';
        return '/dashboard';
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->json()->all();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Practitioner  $practitioner
     * @return \Illuminate\Http\Response
     */
    public function show(Practitioner $practitioner)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Practitioner  $practitioner
     * @return \Illuminate\Http\Response
     */
    public function edit(Practitioner $practitioner)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Practitioner  $practitioner
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Practitioner $practitioner)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Practitioner  $practitioner
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Practitioner $practitioner)
    {
        $practitioner->delete();
        return back();
    }

    public function login(Request $request) 
    {

        $this->validate($request, [
            'phone-number' => ['required', 'numeric', 'digits:10'],
        ]);

        $user = User::where('phone-number', request()->input('phone-number'))->first();
        $practitioner = Practitioner::where('phone-number', request()->input('phone-number'))->first();
        if($user) {
            Auth::loginUsingId($user->id);
            
            foreach($user->verificationCodes()->get() as $verificationCode) {
                $verificationCode->delete();
            }

            if($user->integrations()->first()) {
                return redirect('/test/person/member/completed');
            } else {
                return redirect()->route(request()->input('nextRoute') ? request()->input('nextRoute') : 'dashboard');
            }
            
        } else if(!$user && $practitioner) {
            Auth::guard('practitioner')->loginUsingId($practitioner->id);
            foreach($practitioner->verificationCodes()->get() as $verificationCode) {
                $verificationCode->delete();
            }
            return redirect()->route('admin-panel');
        } else {
            return redirect()->back()->withError('Credentials doesn\'t match.');
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
