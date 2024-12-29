import PrimaryButton from "@/Components/PrimaryButton";
import TempatKunjunganCard from "@/Components/TempatKunjunganCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

// Notes untuk backend:
// - Buat API endpoint untuk mengambil data tempat kunjungan
// - Data yang diambil: nama tempat, alamat, dan koordinat (latitude, longitude)
// - Buat proses untuk mengolah data tempat kunjungan yang diinput user (implementasi algoritma TSP)
// - Nanti hasil olahan data tempat kunjungan akan dijadikan rute perjalanan dan ditampilkan di ReviewPerjalanan Page
export default function BuatPerjalanan() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]); // Taro data hasil pencarian dari api disini
    const [tanggal, setTanggal] = useState("");
    const [tempatKunjunganList, setTempatKunjunganList] = useState([]); // Variabel buat nampung daftar tempat kunjungan

    // Contoh data tempat kunjungan
    const dummyData = [
        { nama: "Pantai Kuta", alamat: "Bali" },
        { nama: "Candi Borobudur", alamat: "Magelang" },
        { nama: "Gunung Bromo", alamat: "Jawa Timur" },
        { nama: "Raja Ampat", alamat: "Papua" },
        { nama: "Danau Toba", alamat: "Sumatera Utara" },
    ];

    // Fungsi untuk memfilter hasil pencarian dan menampilkan di search dropdown
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === "") {
            setFilteredResults([]);
        } else {
            // nanti disini query ke database atau API
            const results = dummyData.filter(
                (tempat) =>
                    tempat.nama.toLowerCase().includes(query.toLowerCase()) ||
                    tempat.alamat.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredResults(results);
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

                {/* Input Form */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Input Tanggal */}
                    <input
                        type="date"
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
                        placeholder="Tanggal Berangkat"
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                    />

                    {/* Input Search */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Cari Destinasi yang Ingin Kamu Kunjungi"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            value={searchQuery} // Keyword pencarian buat query ke database atau API
                            onChange={handleSearch}
                        />

                        {/* Dropdown Recommendations */}
                        {filteredResults.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg mt-1">
                                {filteredResults.map((tempat, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setSearchQuery(tempat.nama); // buat naro value di search bar
                                            setFilteredResults([]); // buat reset fileteredResults
                                            setTempatKunjunganList([
                                                ...tempatKunjunganList,
                                                tempat,
                                            ]); // tambahkan tempat ke array tempatKunjunganList
                                        }}
                                    >
                                        {tempat.nama} - {tempat.alamat}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
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
                    <PrimaryButton>Konfirmasi Perjalanan Kamu</PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
