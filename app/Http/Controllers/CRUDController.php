<?php

namespace App\Http\Controllers;

use App\Models\Itinerary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CRUDController extends Controller
{
    public function create(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'itineraryName' => 'required|string|max:255',
            'userId' => 'required|integer',
            'optimizedRoute' => 'required|array',
            'optimizedRoute.*' => 'array|min:2', // Longitude, Latitude
            'optimizedRoute.*.0' => 'required|numeric', // Longitude
            'optimizedRoute.*.1' => 'required|numeric', // Latitude
            'tempatKunjunganList' => 'required|array',
            'tempatKunjunganList.*.nama' => 'required|string|max:255',
            'tempatKunjunganList.*.alamat' => 'required|string|max:255',
        ]);

        // Create the Itinerary
        $itinerary = Itinerary::create([
            'itinerary_name' => $validated['itineraryName'],
            'user_id' => Auth::id()  // Assuming the user is authenticated
        ]);

        // Ensure both arrays are of the same length before looping
        $optimizedRoutes = $validated['optimizedRoute'];
        $tempatKunjunganList = $validated['tempatKunjunganList'];

        if (count($optimizedRoutes) !== count($tempatKunjunganList)) {
            return response()->json(['error' => 'Mismatched array lengths'], 422);
        }

        // Loop through and create POI records using the relationship
        for ($i = 0; $i < count($optimizedRoutes); $i++) {
            $itinerary->pois()->create([
                'name' => $tempatKunjunganList[$i]['nama'],
                'address' => $tempatKunjunganList[$i]['alamat'],
                'latitude' => $optimizedRoutes[$i][1], // Latitude
                'longitude' => $optimizedRoutes[$i][0] // Longitude
            ]);
        }

        return response()->json([
            'itinerary' => $itinerary->load('pois')  // Load related POIs to return
        ], 201);  // 201 Created status code
    }

    public function read($id)
    {
        $itinerary = Itinerary::with('pois')->find($id);

        if (!$itinerary) {
            return response()->json(['error' => 'Itinerary not found'], 404);
        }

        return response()->json(['itinerary' => $itinerary], 200);
    }

    public function getAll()
    {
        // Ambil userId dari pengguna yang sedang login
        $userId = Auth::id();

        // Ambil semua itinerary milik user dengan relasi POIs
        $itineraries = Itinerary::with('pois')->where('user_id', $userId)->get();

        // Jika tidak ada data, kembalikan respons 404
        if ($itineraries->isEmpty()) {
            return response()->json(['error' => 'No itineraries found for this user'], 404);
        }

        // Kembalikan data itinerary beserta POI
        return response()->json(['itineraries' => $itineraries], 200);
    }

    public function delete($id)
    {
        $itinerary = Itinerary::find($id);

        if (!$itinerary) {
            return response()->json(['error' => 'Itinerary not found'], 404);
        }

        $itinerary->delete();

        return response()->json(['message' => 'Itinerary deleted'], 200);
    }

    public function update(Request $request, $id)
    {
        $itinerary = Itinerary::find($id);

        if (!$itinerary) {
            return response()->json(['error' => 'Itinerary not found'], 404);
        }

        $validated = $request->validate([
            'itineraryName' => 'required|string|max:255',
            'userId' => 'required|integer',
            'optimizedRoute' => 'required|array',
            'optimizedRoute.*' => 'array|min:2', // Longitude, Latitude
            'optimizedRoute.*.0' => 'required|numeric', // Longitude
            'optimizedRoute.*.1' => 'required|numeric', // Latitude
            'tempatKunjunganList' => 'required|array',
            'tempatKunjunganList.*.nama' => 'required|string|max:255',
            'tempatKunjunganList.*.alamat' => 'required|string|max:255',
        ]);

        $itinerary->update([
            'itinerary_name' => $validated['itineraryName'],
            'user_id' => $validated['userId']
        ]);

        // Ensure both arrays are of the same length before looping
        $optimizedRoutes = $validated['optimizedRoute'];
        $tempatKunjunganList = $validated['tempatKunjunganList'];

        if (count($optimizedRoutes) !== count($tempatKunjunganList)) {
            return response()->json(['error' => 'Mismatched array lengths'], 422);
        }

        // Delete all existing POIs and recreate them
        $itinerary->pois()->delete();

        // Loop through and create POI records using the relationship
        for ($i = 0; $i < count($optimizedRoutes); $i++) {
            $itinerary->pois()->create([
                'name' => $tempatKunjunganList[$i]['nama'],
                'address' => $tempatKunjunganList[$i]['alamat'],
                'latitude' => $optimizedRoutes[$i][1], // Latitude
                'longitude' => $optimizedRoutes[$i][0] // Longitude
            ]);
        }

        return response()->json([
            'itinerary' => $itinerary->load('pois')  // Load related POIs to return
        ], 200);
    }
}
