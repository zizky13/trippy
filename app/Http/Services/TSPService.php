<?php

namespace App\Http\Services;

class TSPService
{
    public function calculateDistance(array $route, array $distances): int
    {
        $totalDistance = 0;
        for ($i = 0; $i < count($route) - 1; $i++) {
            $totalDistance += $distances[$route[$i]][$route[$i + 1]];
        }
        $totalDistance += $distances[end($route)][reset($route)];
        return $totalDistance;
    }

    public function generatePermutations(array $list): array
    {
        if (empty($list)) {
            return [[]];
        }

        $result = [];
        $firstElement = array_shift($list);
        $recursiveReturn = $this->generatePermutations($list);

        foreach ($recursiveReturn as $li) {
            for ($i = 0; $i <= count($li); $i++) {
                $temp = $li;
                array_splice($temp, $i, 0, [$firstElement]);
                $result[] = $temp;
            }
        }

        return $result;
    }

    public function solveTsp(array $distances): array
    {
        $n = count($distances);
        $cities = range(1, $n - 1);
        $shortestRoute = [];
        $minDistance = PHP_INT_MAX;

        $allPerms = $this->generatePermutations($cities);
        foreach ($allPerms as $perm) {
            $currentRoute = array_merge([0], $perm);
            $currentDistance = $this->calculateDistance($currentRoute, $distances);

            if ($currentDistance < $minDistance) {
                $minDistance = $currentDistance;
                $shortestRoute = $currentRoute;
            }
        }

        return [
            'route' => $shortestRoute,
            'distance' => $minDistance
        ];
    }
}