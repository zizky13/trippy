import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import TempatKunjunganCard from "@/Components/TempatKunjunganCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";

function ReviewPerjalanan() {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const [routeData, setRouteData] = useState(() => {
        const storedRoute = localStorage.getItem("optimizedRoute");
        return storedRoute ? JSON.parse(storedRoute) : null;
    });

    useEffect(() => {
        try {
            // Inisialisasi Mapbox
            mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [106.8956, -6.3024],
                zoom: 5,
            });

            mapRef.current.on("load", () => {
                console.log("Peta berhasil dimuat.");
                if (routeData?.optimizedRoute?.length > 0) {
                    const coordinates = routeData.optimizedRoute;

                    // Tambahkan marker dengan nomor urutan
                    coordinates.forEach((coordinate, index) => {
                        const tempat = routeData.tempatKunjunganList[index];
                        if (tempat) {
                            const markerElement = document.createElement("div");
                            markerElement.className = "custom-marker";
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
                }
            });
        } catch (error) {
            console.error("Error initializing Mapbox:", error);
        }

        // Cleanup saat komponen dilepas
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
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
                        <h3 className="text-lg font-medium text-gray-700 mb-4">
                            Tempat Kunjungan
                        </h3>
                        <div className="flex flex-col gap-4">
                            {routeData?.tempatKunjunganList?.map(
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
