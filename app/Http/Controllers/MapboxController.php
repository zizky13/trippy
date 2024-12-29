<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MapboxService;

class MapboxController extends Controller
{
    protected $mapboxService;

    public function __construct(MapboxService $mapboxService)
    {
        $this->mapboxService = $mapboxService;
    }

    // Fetch the distance matrix between coordinates
    public function getDistanceMatrix(Request $request)
    {
        $coordinates = $request->input('coordinates'); // "lat1,lon1;lat2,lon2;lat3,lon3"
        $accessToken = env('MAPBOX_ACCESS_TOKEN');

        $distanceMatrix = $this->mapboxService->fetchDistanceMatrix($coordinates, $accessToken);

        return response()->json($distanceMatrix);
    }
}

