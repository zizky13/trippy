<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\MapboxController;
use App\Http\Controllers\TSPController;

class RouteController extends Controller
{
    protected $mapboxController;
protected $tspController;

    public function __construct(MapboxController $mapboxController, TSPController $tspController)
    {
        $this->mapboxController = $mapboxController;
        $this->tspController = $tspController;
    }

    // Get optimized route between geo points
    public function getOptimizedRoute(Request $request)
    {
        $coordinates = $request->input('coordinates'); // "lat1,lon1;lat2,lon2;lat3,lon3"

        // Step 1: Get the distance matrix from Mapbox
        $distanceMatrix = $this->mapboxController->getDistanceMatrix($request)->getData();

        // Step 2: Solve TSP with the distance matrix
        $distances = $distanceMatrix->durations; // Assuming 'durations' holds the matrix
        $start = 0; // You can allow this to be dynamic
        $request->merge(['distances' => $distances, 'start' => $start]);

        $route = $this->tspController->solveTSP($request)->getData();

        // Step 3: Return the final route
        return response()->json([
            'optimized_route' => $route
        ]);
    }
}
