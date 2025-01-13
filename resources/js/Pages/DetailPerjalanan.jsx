import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import TempatKunjunganCard from "@/Components/TempatKunjunganCard";
import axios from "axios";
import { usePage } from "@inertiajs/react";

export default function DetailPerjalanan({ id }) {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchItinerary() {
            try {
                const response = await fetch(
                    `/trippy/public/api/detail-perjalanan/${id}`
                );
                if (!response.ok) {
                    throw new Error("Gagal mengambil data itinerary");
                }
                const data = await response.json();
                setItinerary(data.itinerary);
                console.log(data.itinerary);
            } catch (error) {
                console.error("Error fetching itinerary:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchItinerary();
    }, [id]);

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
        if (!itinerary || !itinerary.pois) return;

        try {
            mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [106.8956, -6.3024],
                zoom: 5,
            });

            mapRef.current.on("load", () => {
                const coordinates = itinerary.pois.map((poi) => [
                    poi.longitude,
                    poi.latitude,
                ]);

                coordinates.forEach((coordinate, index) => {
                    const tempat = itinerary.pois[index];
                    if (tempat) {
                        const markerElement = document.createElement("div");
                        markerElement.className = "custom-marker";
                        markerElement.innerHTML = index + 1;

                        new mapboxgl.Marker(markerElement)
                            .setLngLat(coordinate)
                            .setPopup(
                                new mapboxgl.Popup().setHTML(
                                    `<h3>${tempat.name}</h3><p>${tempat.address}</p>`
                                )
                            )
                            .addTo(mapRef.current);
                    }
                });

                const bounds = coordinates.reduce(
                    (bounds, coord) => bounds.extend(coord),
                    new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
                );

                mapRef.current.fitBounds(bounds, {
                    padding: 50,
                    maxZoom: 15,
                    duration: 2000,
                });
            });
        } catch (error) {
            console.error("Error initializing Mapbox:", error);
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, [itinerary]);

    if (loading) {
        return (
            <AuthenticatedLayout>
                <div className="text-center py-8">
                    Memuat data perjalanan...
                </div>
            </AuthenticatedLayout>
        );
    }

    if (!itinerary) {
        return (
            <AuthenticatedLayout>
                <div className="text-center py-8">
                    Perjalanan tidak ditemukan.
                </div>
            </AuthenticatedLayout>
        );
    }

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
                    {itinerary.itinerary_name}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="h-[500px] overflow-y-auto">
                        <h3 className="text-lg font-medium text-gray-700 mb-4">
                            Tempat Kunjungan
                        </h3>
                        <div className="flex flex-col gap-4">
                            {itinerary.pois.map((tempat, index) => (
                                <TempatKunjunganCard
                                    key={index}
                                    tempatKunjungan={{
                                        nama: tempat.name,
                                        alamat: tempat.address,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
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
