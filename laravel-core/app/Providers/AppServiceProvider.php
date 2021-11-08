<?php

namespace App\Providers;

use App\Models\Practitioner;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind('path.public', function() {
            return realpath(base_path().'/../public_html');
          });

        Gate::define('is-admin', function (Practitioner $user) {
            $admin = Practitioner::where('phone-number', $user['phone-number']);
            if($admin) {
                return true;
            }
            return abort(401, 'Unauthorized');
        });
    }
}
