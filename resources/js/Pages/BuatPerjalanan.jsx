import PrimaryButton from "@/Components/PrimaryButton";
import TempatKunjunganCard from "@/Components/TempatKunjunganCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SearchBox } from "@mapbox/search-js-react";
import { useState, useRef, useEffect } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";

export default function BuatPerjalanan() {
    const [tempatKunjunganList, setTempatKunjunganList] = useState([]);
    const [koordinatList, setKoordinatList] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const searchBoxRef = useRef(null); // Referensi untuk SearchBox
    const [itineraryName, setItineraryName] = useState(""); // State untuk menyimpan nama itinerary
    const [isEditingName, setIsEditingName] = useState(true); // State untuk mengontrol mode input nama itinerary

    useEffect(() => {
        // Ambil nama itinerary dari query string (opsional jika ingin mendukung query string)
        const queryParams = new URLSearchParams(window.location.search);
        const name = queryParams.get("name");

        if (name) {
            setItineraryName(name);
            setIsEditingName(false); // Nama itinerary sudah diisi, tampilkan halaman utama
        }
    }, []);

    useEffect(() => {
        // Reset nilai input di SearchBox ketika tempatKunjunganList atau koordinatList berubah
        if (searchBoxRef.current) {
            const inputElement = searchBoxRef.current.querySelector(
                "input.mapboxgl-ctrl-geocoder--input"
            );
            if (inputElement) {
                inputElement.value = ""; // Kosongkan nilai input
            }
        }
    }, [tempatKunjunganList, koordinatList]); // Trigger efek ketika salah satu berubah

    const handleSimpanNama = () => {
        if (itineraryName.trim() === "") {
            alert("Nama itinerary tidak boleh kosong.");
            return;
        }
        setIsEditingName(false); // Selesai mengedit, tampilkan halaman utama
    };

    const handleKonfirmasi = async () => {
        setIsLoading(true);
        try {
            const optimizeResponse = await axios.post("/generateroute", {
                coordinates: koordinatList.coordinates,
            });

            const optimizedRouteIndexes =
                optimizeResponse.data.optimized_route.route;

            const sortedTempatKunjunganList = optimizedRouteIndexes.map(
                (index) => tempatKunjunganList[index]
            );

            const sortedCoordinates = optimizedRouteIndexes.map(
                (index) => koordinatList.coordinates[index]
            );

            const createResponse = await axios.post("/create-itinerary", {
                itineraryName: itineraryName,
                userId: 1, // Ganti dengan ID pengguna
                optimizedRoute: sortedCoordinates,
                tempatKunjunganList: sortedTempatKunjunganList,
            });

            if (createResponse.status === 201) {
                const newItineraryId = createResponse.data.id;
                alert("Perjalanan berhasil dibuat!");
                window.location.href = `/detail-perjalanan/${newItineraryId}`;
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            alert("Gagal memproses perjalanan. Coba lagi.");
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

            if (searchBoxRef.current) {
                const inputElement = searchBoxRef.current.querySelector(
                    "input.mapboxgl-ctrl-geocoder--input"
                );
                if (inputElement) {
                    inputElement.value = "";
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
            <Head title="Buat Perjalanan" />
            {isEditingName ? (
                <div className="px-6 py-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">
                        Buat Nama Itinerary
                    </h1>
                    <div className="mb-6">
                        <label
                            htmlFor="itineraryName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nama Itinerary
                        </label>
                        <input
                            type="text"
                            id="itineraryName"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-default focus:border-primary-default sm:text-sm"
                            value={itineraryName}
                            onChange={(e) => setItineraryName(e.target.value)}
                        />
                    </div>
                    <PrimaryButton onClick={handleSimpanNama}>
                        Simpan Nama Itinerary
                    </PrimaryButton>
                </div>
            ) : (
                <div className="px-6 py-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">
                        {itineraryName}
                    </h1>

                    <div className="mb-8">
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
            )}
        </AuthenticatedLayout>
    );
}
