<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Itinerary extends Model
{
    //
    protected $primaryKey = 'id';
    protected $fillable = ['itinerary_name', 'user_id'];

    public function pois()
    {
        return $this->hasMany(Poi::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function casts(): array
    {
        return [
            'itinerary_name' => 'string',
            'user_id' => 'integer',
        ];
    }

}
