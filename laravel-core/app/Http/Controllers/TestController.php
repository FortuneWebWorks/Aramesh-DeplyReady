<?php

namespace App\Http\Controllers;

use App\Models\Family;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TestController extends Controller
{
    public function index(Request $request, $person, $member): \Inertia\Response
    {
        return Inertia::render('TestScreen', [
            'testTaker' => $member,
        ]);
    }

    public function incomplete(): \Inertia\Response
    {
        return Inertia::render('FamilyTestIncompleted' , [
            'person' => request()->input('person')
        ]);
    }

    public function retrain(): \Inertia\Response
    {
        include('data.php');
        return Inertia::render('FamilyTestRetainScreen' , [
            'data' => $questionsCollection,
            'family' => request()->user()->members()->get()
        ]);
    }

    public function completed(): \Inertia\Response
    {
        Auth::logout();
        return Inertia::render('FamilyTestCompleteScreen');
    }

    public function store(Request $request) 
    {

        $member = request()->user()->members()->where('role', request()->input('testTaker'))->first();
        if(sizeof($member->answers()->get()) <= 0) {
            $member->answers()->create(request()->input('data'));
            $member->tested = true;
            $member->save();
        } 

        $users = request()->user();
        foreach($users->members()->get() as $user) {
            if($user->tested == false) {
                return redirect()->action([ResultController::class, 'results'], [
                    'role' => request()->input('testTaker')
                ]);
            }
        }
        
        $users['tests-taken'] = true;
        $users->save();
        return redirect()->action([ResultController::class, 'results'], [
            'role' => request()->input('testTaker'),
        ]);
    }

}
