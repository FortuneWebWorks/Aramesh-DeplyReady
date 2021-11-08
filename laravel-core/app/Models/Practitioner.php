<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Practitioner extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guard = 'practitioner';

    protected $fillable = [
        'name', 'code', 'phone-number'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function verificationCodes() {
        return $this->hasMany(VerificationCode::class);
    }
}
