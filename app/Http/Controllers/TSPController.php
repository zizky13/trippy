<?php

namespace App\Http\Controllers;

use App\Http\Services\MapboxService;
use Illuminate\Http\Request;
use App\Http\Services\TSPService;

class TSPController extends Controller
{
    protected $tspService;
    protected $mapboxService;

    public function __construct(TSPService $tspService, MapboxService $mapboxService)
    {
        $this->tspService = $tspService;
        $this->mapboxService = $mapboxService;
    }

    // Solve the TSP given the distance matrix
    // Assumes request has data array of places to go, in the form of lat,lon
    public function getOptimizedRoute(Request $request)
    {
        $coordinates = $request->input('coordinates'); // "lat1,lon1;lat2,lon2;lat3,lon3"

        // Step 1: Get the distance matrix from Mapbox
        $distanceMatrix = $this->mapboxService->generateDistanceMatrix($coordinates);

        // Step 2: Solve TSP with the distance matrix
        $route = $this->tspService->solveTSP($distanceMatrix);

        // Step 3: Return the final route
        return response()->json([
            'optimized_route' => $route
        ]);
    }
}
