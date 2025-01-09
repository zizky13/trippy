<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Http;

class MapboxService
{
    // BEFORE IMPLEMENT THIS CLASS, IMPLEMENT THE GEOLOCATION FETCHING FIRST

    private $accessToken;


    public function __construct()
    {
        $this->accessToken = config('services.mapbox.access_token');
    }

    public function getDistance(array $coordinates)
    {
        $accessToken = env('MAPBOX_ACCESS_TOKEN');
        $coordinateString = '';
        $distanceArray = [];
        foreach ($coordinates as $coordinate) {
            $coordinateString .= "{$coordinate[0]},{$coordinate[1]};";
        }
        $coordinateString = rtrim($coordinateString, ';');
        $response = Http::get("https://api.mapbox.com/directions/v5/mapbox/driving/{$coordinateString}", [
            'access_token' => $accessToken
        ]);

        $directions = $response->json();
        foreach ($directions['routes'][0]['legs'] as $leg) {
            $distanceArray[] = $leg['distance'];
        }

        return $distanceArray;
    }

    public function generateDistanceMatrix(array $coordinates): array
    {
        $accessToken = env('MAPBOX_ACCESS_TOKEN');
        $n = count($coordinates);
        $distances = array_fill(0, $n, array_fill(0, $n, 0));

        for ($i = 0; $i < $n; $i++) {
            for ($j = 0; $j < $n; $j++) {
                if ($i !== $j) {
                    // Create coordinate string for just these two points
                    $fromCoord = "{$coordinates[$i][0]},{$coordinates[$i][1]}";
                    $toCoord = "{$coordinates[$j][0]},{$coordinates[$j][1]}";
                    $coordinateString = "{$fromCoord};{$toCoord}";

                    $response = Http::get("https://api.mapbox.com/directions/v5/mapbox/driving/{$coordinateString}", [
                        'access_token' => $accessToken
                    ]);

                    $data = $response->json();
                    if($data){
                        $distances[$i][$j] = $data['routes'][0]['legs'][0]['distance'];
                    }
                }
            }
        }

        return $distances;
    }
}