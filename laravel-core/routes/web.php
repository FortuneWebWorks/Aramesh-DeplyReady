<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\Auth\PractitionerController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\TestController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Inertia::setRootView('app');

Auth::routes();

Route::get('/', function () {
    
    return Inertia::render('HomeScreen', [
        'user' => request()->user()
    ]);
});

Route::get('/login', function() {
    return Inertia::render('auth/LoginScreen', [
        'message' => session()->get('message'),
        'phoneNumber' => session()->get('phone-number')
    ]);
})->name('login')->middleware('guest');

Route::get('/start', function (){
    return Inertia::render('auth/LandingScreen');
});

Route::get('/home', [HomeController::class, 'index'])->name('home');

Route::get('/user-confirm/{phoneNumber}', [RegisterController::class, 'confirmation']);

Route::prefix('/register')->group(function() {

    Route::get('/', [RegisterController::class, 'index']);

    Route::post('/', [RegisterController::class, 'create'])->name('register');

    Route::get('/form-1', [RegisterController::class, 'formOne'])->name('form-1');

    Route::get('/form-2', [RegisterController::class, 'formTwo']);

    Route::get('/dob', [RegisterController::class, 'dobTable']);

    Route::get('/test-taker', [RegisterController::class, 'testTaker']);

});

Route::middleware(['phone.verify', 'web'])->post('/login', [PractitionerController::class, 'login']);

Route::prefix('/admin')->group(function() {
    Route::post('/login', [PractitionerController::class, 'login'])->name('admin.login');
    Route::get('/logout', [PractitionerController::class, 'logout'])->name('admin.logout');
});

Route::prefix('/admin')->middleware(['auth:practitioner', 'can:is-admin'])->group(function() {

    Route::get('/dashboard', [AdminController::class, 'index'])->name('admin-panel');

    Route::get('files', [AdminController::class, 'files']);

    Route::get('charts/{id}', [AdminController::class, 'charts']);
});

Route::get('/dashboard', [MemberController::class, 'dashboard'])->name('dashboard')->middleware('auth');

Route::prefix('/test/{person}/{member}')->middleware('auth')->group(function() {

    Route::resource('/', TestController::class );

    Route::get('/incomplete', [TestController::class, 'incomplete']);

    Route::get('/retain', [TestController::class, 'retrain'])->name('test-retain');

    Route::get('/completed', [TestController::class, 'completed'])->name('test-completed');
});

Route::get('/result/{role}', [ResultController::class, 'results'])->middleware('auth')->name('result');

Route::get('/data', function () {

    $shiraz = App\Models\City::create([
        'name' => 'شیراز'
    ]);

    $marvdasht = App\Models\City::create([
        'name' => 'مرودشت'
    ]);

    $aramesh = $shiraz->clinics()->create([
        'name' => 'مرکز آرامش',
        'province' => 'فارس',
        'address' => 'خیابان فلسطین - بین هدایت و معدل - طبقه فوقانی اتومبیل بهادری',
        'phone-number' => '07132343435',
    ]);

    $aramesh->practitioners()->create([
        'name' => 'دکتر سیامک سامانی',
        'code' => '342',
        'phone-number' => '9173150780'
    ]);

    $aramesh->practitioners()->create([
        'name' => 'تست',
        'code' => '343',
        'phone-number' => '9332782917'
    ]);

    $aramesh->practitioners()->create([
        'name' => 'تست',
        'code' => '344',
        'phone-number' => '9172253052'
    ]);
    
    $aramesh->practitioners()->create([
        'name' => 'doctor',
        'code' => '345',
        'phone-number' => '9052409115'
    ]);
    

    $aramesh->practitioners()->create([
        'name' => 'دکتر نادره سهرابی',
        'code' => '3565',
        'phone-number' => '9176307130'
    ]);

    $hamgam = $shiraz->clinics()->create([
        'name' => 'مرکز مشاوره همگام',
        'province' => 'فارس',
        'address' => 'خیابان اردیبهشت - حد فاصل ملاصدرا و فلسطین - ساختمان آذر - طبقه پنجم - واحد 10',
        'phone-number' => '07132319099',
    ]);

    $hamgam->practitioners()->create([
        'name' => 'لیلا رشیدبیگی',
        'code' => '755',
        'phone-number' => '9909772805'
    ]);

    $raheZendegi = $shiraz->clinics()->create([
        'name' => 'مرکز مشاوره راه زندگی',
        'province' => 'فارس',
        'address' => 'خیابان ملاصدرا - نبش خیابان حکیمی - ساختمان حکیم - طبقه چهارم',
        'phone-number' => '07132346043',
    ]);

    $raheZendegi->practitioners()->create([
        'name' => 'سعید رحیمی خواه',
        'code' => '1730',
        'phone-number' => '9173017886'
    ]);

    $zendegiAgahane = $shiraz->clinics()->create([
        'name' => 'مرکز مشاوره زندگی آگاهانه',
        'province' => 'فارس',
        'address' => 'بیست متری سینما سعدی - نبش معدل - ساختمان سال - طبقه 4 - واحد 402',
        'phone-number' => '07132304774',
    ]);

    $zendegiAgahane->practitioners()->create([
        'name' => 'بهاره زارع',
        'code' => '7916',
        'phone-number' => '9308137354'
    ]);

    $aban = $shiraz->clinics()->create([
        'name' => 'مرکز مشاوره آبان',
        'province' => 'فارس',
        'address' => 'خیابان ارم - نبش سروناز - پلاک 2 - کلینیک آبان',
        'phone-number' => '07132291737',
    ]);

    $aban->practitioners()->create([
        'name' => 'فاطمه حسنی',
        'code' => '3487',
        'phone-number' => '9173131259'
    ]);

    $peyman = $marvdasht->clinics()->create([
        'name' => 'مرکز پیمان',
        'province' => 'فارس',
        'address' => 'خیابان سعدی - نبش خیابان فرهنگ - ساختمان فرهنگ - طبقه اول - مرکز مشاوره امید',
        'phone-number' => '07132291737',
    ]);

    $peyman->practitioners()->create([
        'name' => 'امید زارع نژاد',
        'code' => '2388',
        'phone-number' => '9019783535'
    ]);
});