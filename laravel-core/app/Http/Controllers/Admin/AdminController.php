<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{

    protected function index (): \Inertia\Response
    {
        return Inertia::render('admin/AdminPanel');
    }

    protected function files (): \Inertia\Response
    {
        return Inertia::render('admin/AdminPanelFiles', [
            'users' => request()->user()->users()->get()
        ]);
    }

    protected function charts (Request $request, $id): \Inertia\Response
    {
        $members = User::find($id)->members()->with('results')->get();
        $parents = array();
        $children = array();

        /*
         * pushing father to the parents array
         * father is sperated becuase we want it to be always the first member
         */

        foreach($members as $index => $member) {
            if(str_contains($member->role, 'پدر')) {
                array_push($parents, $member);
            }
        }

        //Pushing mother to the parents array and children to children array

        foreach($members as $index => $member) {
            if(str_contains($member->role, 'مادر')) {
                array_push($parents, $member);
            } else if(str_contains($member->role, 'فرزند')) {
                array_push($children, $member);
            }
        }

        //Check if the family test is not completed throw an alert

        foreach($members as $member) {
            if(sizeof($member->results) === 0) {
                return Inertia::render('ChartScreen', [
                    'testCompleted' => false
                ]);
            }
        }

        //If the test is completed send the props

        return Inertia::render('ChartScreen', [
            'family' => User::find($id), 
            'parents' => $parents,
            'children' => $children,
            'integration' => User::find($id)->integrations()->get(),
            'testCompleted' => true
        ]);
    }
}
