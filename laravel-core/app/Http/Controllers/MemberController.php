<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    protected function dashboard (): \Inertia\Response
    {
        include('data.php');
        return Inertia::render('UserPanelScreen', [
            'data' => $questionsCollection,
            'family' => request()->user()->members()->get()
        ]);
    }
}
