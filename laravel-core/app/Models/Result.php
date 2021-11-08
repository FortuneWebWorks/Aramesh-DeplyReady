<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'content', 'process', 'cs', 'ps', 'rfc', 'cstra', 'rb', 'je', 'tt', 'sr', 'ap', 'pp', 'ls', 'ef'
    ];

    public function member() {
        return $this->belongsTo(Member::class);
    }
}
