<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class MapboxService
{
    // BEFORE IMPLEMENT THIS CLASS, IMPLEMENT THE GEOLOCATION FETCHING FIRST
    
    // private $accessToken;
    
    // public function __construct()
    // {
    //     $this->accessToken = config('services.mapbox.access_token');
    // }

    // public function generateDistanceMatrix(array $coordinates): array
    // {
    //     $n = count($coordinates);
    //     $distances = array_fill(0, $n, array_fill(0, $n, 0));

    //     for ($i = 0; $i < $n; $i++) {
    //         for ($j = 0; $j < $n; $j++) {
    //             if ($i !== $j) {
    //                 $response = Http::get("https://api.mapbox.com/directions/v5/mapbox/driving/{$coordinates[$i][0]},{$coordinates[$i][1]};{$coordinates[$j][0]},{$coordinates[$j][1]}", [
    //                     'access_token' => $this->accessToken
    //                 ]);

    //                 $data = $response->json();
    //                 $distances[$i][$j] = $data['routes'][0]['legs'][0]['distance'];
    //             }
    //         }
    //     }

    //     return $distances;
    // }
}