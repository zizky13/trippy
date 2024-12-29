<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GetgeocodingController extends Controller
{
    public function search(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'query' => 'required|string',
            'access_token' => 'required|string'
        ]);

        try {
            // Correct Mapbox Geocoding API URL
            $url = "https://api.mapbox.com/geocoding/v5/mapbox.places/{$validated['query']}.json?access_token={$validated['access_token']}";

            // Make the GET request to Mapbox API
            $response = Http::get($url);

            if ($response->successful()) {
                return response()->json($response->json());
            }

            return response()->json([
                'error' => 'Mapbox API error',
                'message' => $response->body()
            ], $response->status());

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Request failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
