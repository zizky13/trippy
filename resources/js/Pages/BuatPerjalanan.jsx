import PrimaryButton from "@/Components/PrimaryButton";
import TempatKunjunganCard from "@/Components/TempatKunjunganCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SearchBox } from "@mapbox/search-js-react";
import { useState } from "react";

// Notes untuk backend:
// - Buat API endpoint untuk mengambil data tempat kunjungan
// - Data yang diambil: nama tempat, alamat, dan koordinat (latitude, longitude)
// - Buat proses untuk mengolah data tempat kunjungan yang diinput user (implementasi algoritma TSP)
// - Nanti hasil olahan data tempat kunjungan akan dijadikan rute perjalanan dan ditampilkan di ReviewPerjalanan Page
export default function BuatPerjalanan() {
    const [tempatKunjunganList, setTempatKunjunganList] = useState([]); // Variabel buat nampung daftar tempat kunjungan
    const [koordinatList, setKoordinatList] = useState(); // Variabel buat nampung daftar koordinat tempat kunjungan

    console.log(koordinatList);
    console.log(tempatKunjunganList);
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

                {/* Input Form */}
                <div className="mb-8" aria-hidden="true">
                    {/* Input Search */}
                    <SearchBox
                        accessToken="pk.eyJ1Ijoieml6a3kxMyIsImEiOiJjbHk2cTJxb2UwYzV1MmtvbG85a2EzNjJhIn0.j9trVLB7KjGq70mruHsuRQ"
                        options={{
                            types: "place",
                        }}
                        // Fungsi untuk menampilkan data hasil pencarian
                        onRetrieve={(result) => {
                            if (result.features && result.features.length > 0) {
                                const coordinates =
                                    result.features[0].geometry.coordinates;
                                setKoordinatList((prev) => {
                                    // Jika prev belum ada, inisialisasi dengan objek kosong
                                    const currentList = prev?.coordinates || [];
                                    return {
                                        coordinates: [
                                            ...currentList,
                                            coordinates,
                                        ],
                                    };
                                });

                                setTempatKunjunganList((prev) => [
                                    ...prev,
                                    {
                                        nama: result.features[0].properties
                                            .name,
                                        alamat: result.features[0].properties
                                            .place_formatted,
                                    },
                                ]);
                            }
                        }}
                    />
                </div>

                {/* Daftar Tempat Kunjungan */}
                <div className="bg-secondary-default p-6 rounded-xl shadow-lg">
                    <p className="text-lg font-medium text-gray-800 mb-4">
                        Daftar Tempat Kunjungan Kamu
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tempatKunjunganList.map((tempat, index) => (
                            <TempatKunjunganCard
                                key={index}
                                tempatKunjungan={tempat}
                            />
                        ))}
                    </div>
                </div>

                {/* Tombol Konfirmasi */}
                <div className="flex justify-center mt-8">
                    <PrimaryButton
                        onClick={() => {
                            // Nanti disini akan diarahkan ke halaman ReviewPerjalanan
                            console.log("Konfirmasi Perjalanan");
                        }}
                    >
                        Konfirmasi Perjalanan Kamu
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
