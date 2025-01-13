import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import TempatKunjunganCard from "@/Components/TempatKunjunganCard";
import axios from "axios";
import { usePage } from "@inertiajs/react";
export default function DetailPerjalanan({}) {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const [routeData, setRouteData] = useState(() => {
        const storedRoute = localStorage.getItem("optimizedRoute");
        return storedRoute ? JSON.parse(storedRoute) : null;
    });
    const { id } = usePage().props;
    const handleHapus = async (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus perjalanan ini?")) {
            try {
                const response = await axios.delete(`/delete-itinerary/${id}`);
                if (response.status === 200) {
                    alert("Perjalanan berhasil dihapus!");
                } else {
                    alert("Terjadi kesalahan saat menghapus perjalanan.");
                }
            } catch (error) {
                console.error("Error saat menghapus perjalanan:", error);
                alert("Gagal menghapus perjalanan. Silakan coba lagi.");
            }
        }
    };

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

                    // Hitung bounds berdasarkan semua koordinat
                    const bounds = coordinates.reduce(
                        (bounds, coord) => bounds.extend(coord),
                        new mapboxgl.LngLatBounds(
                            coordinates[0],
                            coordinates[0]
                        )
                    );

                    // Terapkan fitBounds untuk animasi zoom dinamis
                    mapRef.current.fitBounds(bounds, {
                        padding: 50, // Tambahkan padding di sekitar bounds
                        maxZoom: 15, // Maksimal zoom level
                        duration: 2000, // Durasi animasi dalam milidetik
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
                    Detail Perjalanan
                </h2>
            }
        >
            <div>
                <h1>Detail Perjalanan</h1>
                <p>ID Perjalanan: {id}</p>
            </div>
            <div className="px-6 py-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">
                    Detail Perjalananmu
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
                    <PrimaryButton onClick={() => handleHapus(id)}>
                        Selesaikan Perjalanan
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
