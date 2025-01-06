import PrimaryButton from "@/Components/PrimaryButton";
import TempatKunjunganCard from "@/Components/TempatKunjunganCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SearchBox } from "@mapbox/search-js-react";
import { useState, useRef } from "react";
import axios from "axios";

export default function BuatPerjalanan() {
    const [tempatKunjunganList, setTempatKunjunganList] = useState([]);
    const [koordinatList, setKoordinatList] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const searchBoxRef = useRef(null); // Referensi untuk SearchBox

    const handleKonfirmasi = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post("/generateroute", {
                coordinates: koordinatList.coordinates,
            });

            localStorage.setItem(
                "optimizedRoute",
                JSON.stringify({
                    tempatKunjunganList:
                        response.data.optimized_route.route.map(
                            (index) => tempatKunjunganList[index]
                        ),
                    optimizedRoute: response.data.optimized_route.route.map(
                        (index) => koordinatList.coordinates[index]
                    ),
                })
            );

            window.location.href = "/reviewperjalanan";
        } catch (error) {
            console.error("Error fetching optimized route:", error);
            alert("Gagal memproses rute terbaik. Coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleHapus = (index) => {
        setTempatKunjunganList((prev) => {
            const newList = [...prev];
            newList.splice(index, 1);
            return newList;
        });

        setKoordinatList((prev) => {
            const currentList = prev?.coordinates || [];
            const newList = [...currentList];
            newList.splice(index, 1);
            return {
                coordinates: newList,
            };
        });
    };

    const handleRetrieve = (result) => {
        if (result.features && result.features.length > 0) {
            const coordinates = result.features[0].geometry.coordinates;
            setKoordinatList((prev) => {
                const currentList = prev?.coordinates || [];
                return {
                    coordinates: [...currentList, coordinates],
                };
            });

            setTempatKunjunganList((prev) => [
                ...prev,
                {
                    nama: result.features[0].properties.name,
                    alamat: result.features[0].properties.place_formatted,
                },
            ]);

            // Reset nilai input di SearchBox
            if (searchBoxRef.current) {
                const inputElement = searchBoxRef.current.querySelector(
                    "input.mapboxgl-ctrl-geocoder--input"
                );
                if (inputElement) {
                    inputElement.value = ""; // Kosongkan nilai input
                }
            }
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Buat Perjalanan
                </h2>
            }
        >
            <div className="px-6 py-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">
                    Buat Perjalananmu
                </h1>

                <div className="mb-8" aria-hidden="true">
                    <div ref={searchBoxRef}>
                        <SearchBox
                            accessToken={
                                import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
                            }
                            options={{
                                types: "poi",
                                limit: 10,
                            }}
                            onRetrieve={handleRetrieve}
                        />
                    </div>
                </div>

                <div className="bg-secondary-default p-6 rounded-xl shadow-lg">
                    <p className="text-lg font-medium text-gray-800 mb-4">
                        Daftar Tempat Kunjungan Kamu
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tempatKunjunganList.map((tempat, index) => (
                            <TempatKunjunganCard
                                key={index}
                                tempatKunjungan={tempat}
                                onClick={() => handleHapus(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                    <PrimaryButton
                        onClick={handleKonfirmasi}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                Memproses...
                            </div>
                        ) : (
                            "Konfirmasi Perjalanan Kamu"
                        )}
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
