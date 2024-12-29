<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TSPService;

class TSPController extends Controller
{
    protected $tspService;

    public function __construct(TSPService $tspService)
    {
        $this->tspService = $tspService;
    }

    // Solve the TSP given the distance matrix
    public function solveTSP(Request $request)
    {
        $distances = $request->input('distances'); // Distance matrix array
        $start = $request->input('start', 0); // Default to start at point 0

        $route = $this->tspService->solveNearestNeighbor($distances, $start);

        return response()->json($route);
    }
}
