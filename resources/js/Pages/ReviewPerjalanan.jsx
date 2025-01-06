import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import { useState } from "react";
import TempatKunjunganCard from "@/Components/TempatKunjunganCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";

function ReviewPerjalanan() {
    const mapRef = useRef();
    const mapContainerRef = useRef();
    const [routeData, setRouteData] = useState(null); // Buat nyimpen rute terbaik
    console.log(localStorage);

    useEffect(() => {
        // Ambil data dari localStorage
        const storedRoute = localStorage.getItem("optimizedRoute");
        if (storedRoute) {
            setRouteData(JSON.parse(storedRoute));
        }

        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

        // Inisialisasi peta
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [106.8956, -6.3024],
            zoom: 5,
        });

        return () => mapRef.current.remove();
    }, []);

    useEffect(() => {
        // Inisialisasi peta
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [106.8956, -6.3024],
            zoom: 5,
        });

        // Tunggu hingga peta selesai dimuat
        mapRef.current.on("load", () => {
            console.log("Peta selesai dimuat");

            // Jika terdapat routeData, tambahkan polyline dan marker
            if (routeData && Array.isArray(routeData.optimizedRoute)) {
                const coordinates = routeData.optimizedRoute;

                // Tambahkan marker dengan nomor urutan
                coordinates.forEach((coordinate, index) => {
                    const tempat = routeData.tempatKunjunganList[index];
                    if (tempat) {
                        const markerElement = document.createElement("div");
                        markerElement.className = "custom-marker";
                        markerElement.style.backgroundColor = "red";
                        markerElement.style.borderRadius = "50%";
                        markerElement.style.width = "30px";
                        markerElement.style.height = "30px";
                        markerElement.style.display = "flex";
                        markerElement.style.alignItems = "center";
                        markerElement.style.justifyContent = "center";
                        markerElement.style.color = "white";
                        markerElement.style.fontWeight = "bold";
                        markerElement.innerHTML = index + 1;

                        new mapboxgl.Marker(markerElement)
                            .setLngLat(coordinate)
                            .setPopup(
                                new mapboxgl.Popup().setHTML(
                                    `<h3>${tempat.nama}</h3><p>${tempat.alamat}</p>`
                                )
                            )
                            .addTo(mapRef.current);
                    }
                });

                // Tambahkan polyline
                const routeLine = {
                    type: "Feature",
                    geometry: { type: "LineString", coordinates },
                };

                mapRef.current.addSource("route", {
                    type: "geojson",
                    data: routeLine,
                });

                mapRef.current.addLayer({
                    id: "route",
                    type: "line",
                    source: "route",
                    layout: { "line-join": "round", "line-cap": "round" },
                    paint: { "line-color": "#FF5733", "line-width": 4 },
                });
            }
        });

        // Pembersihan peta saat komponen dilepas
        return () => {
            mapRef.current.remove();
        };
    }, [routeData]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Review Perjalanan
                </h2>
            }
        >
            <div className="px-6 py-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">
                    Review Perjalananmu
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Bagian Kiri */}
                    <div className="h-[500px] overflow-y-auto">
                        {" "}
                        {/* Menambahkan scroll */}
                        <h3 className="text-lg font-medium text-gray-700 mb-4">
                            Tempat Kunjungan
                        </h3>
                        <div className="flex flex-col gap-4">
                            {routeData &&
                                routeData.tempatKunjunganList.map(
                                    (tempat, index) => (
                                        <TempatKunjunganCard
                                            key={index}
                                            tempatKunjungan={tempat}
                                        />
                                    )
                                )}
                        </div>
                    </div>

                    {/* Bagian Kanan (Map) */}
                    <div>
                        <div
                            ref={mapContainerRef}
                            style={{ width: "100%", height: "500px" }}
                        />
                    </div>
                </div>
                <div className="text-center mt-8">
                    <PrimaryButton>Selesai</PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default ReviewPerjalanan;
