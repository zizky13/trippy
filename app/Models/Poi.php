<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Poi extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = ['itinerary_id', 'name', 'address', 'latitude', 'longitude'];

    public function itinerary()
    {
        return $this->belongsTo(Itinerary::class);
    }

    public function casts(): array
    {
        return [
            'itinerary_id' => 'integer',
            'address' => 'string',
            'latitude' => 'float',
            'longitude' => 'float',
        ];
    }
}
