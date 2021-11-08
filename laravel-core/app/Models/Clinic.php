<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'province', 'address', 'serial', 'phone-number'
    ];

    public function practitioners()
    {
        return $this->hasMany(Practitioner::class);
    }

    public function city() {
        return $this->belongsTo(City::class);
    }
}
