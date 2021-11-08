<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerificationCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'expires_at'
    ];

    public function family() {
        return $this->belongsTo(User::class);
    }
}
