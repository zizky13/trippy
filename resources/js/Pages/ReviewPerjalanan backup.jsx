import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import { useState } from "react";
import TempatKunjunganCard from "@/Components/TempatKunjunganCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";

const dummyData = [
    { nama: "Pantai Kuta", alamat: "Bali", coordinates: [115.1699, -8.7195] },
    {
        nama: "Candi Borobudur",
        alamat: "Magelang",
        coordinates: [110.2187, -7.6079],
    },
    {
        nama: "Gunung Bromo",
        alamat: "Jawa Timur",
        coordinates: [112.9533, -7.9425],
    },
    { nama: "Raja Ampat", alamat: "Papua", coordinates: [130.5123, -0.2312] },
    {
        nama: "Danau Toba",
        alamat: "Sumatera Utara",
        coordinates: [98.9306, 2.6874],
    },
    {
        nama: "Taman Mini Indonesia Indah",
        alamat: "Jakarta",
        coordinates: [106.8956, -6.3024],
    },
    {
        nama: "Pulau Komodo",
        alamat: "Nusa Tenggara Timur",
        coordinates: [119.4889, -8.5466],
    },
    {
        nama: "Tana Toraja",
        alamat: "Sulawesi Selatan",
        coordinates: [119.8576, -2.9707],
    },
    {
        nama: "Kawah Ijen",
        alamat: "Jawa Timur",
        coordinates: [114.2421, -8.0584],
    },
];

function ReviewPerjalanan() {
    const mapRef = useRef();
    const mapContainerRef = useRef();

    useEffect(() => {
        mapboxgl.accessToken =
            "pk.eyJ1Ijoieml6a3kxMyIsImEiOiJjbHk2cTJxb2UwYzV1MmtvbG85a2EzNjJhIn0.j9trVLB7KjGq70mruHsuRQ";

        // Inisialisasi peta dengan pengaturan dasar
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11", // Gaya default Mapbox
            center: [106.8956, -6.3024], // Koordinat Jakarta
            zoom: 5, // Tingkat zoom lebih cocok untuk Indonesia
        });

        // Menambahkan marker untuk setiap tempat
        dummyData.forEach((tempat, index) => {
            const markerElement = document.createElement("div");
            markerElement.className = "custom-marker";
            markerElement.style.backgroundColor = "red"; // Bisa disesuaikan
            markerElement.style.borderRadius = "50%";
            markerElement.style.width = "30px";
            markerElement.style.height = "30px";
            markerElement.style.display = "flex";
            markerElement.style.alignItems = "center";
            markerElement.style.justifyContent = "center";
            markerElement.style.color = "white";
            markerElement.style.fontWeight = "bold";
            markerElement.innerHTML = index + 1; // Menampilkan angka urutan

            // Menambahkan marker ke peta
            new mapboxgl.Marker(markerElement)
                .setLngLat(tempat.coordinates)
                .setPopup(
                    new mapboxgl.Popup().setHTML(
                        `<h3>${tempat.nama}</h3><p>${tempat.alamat}</p>`
                    )
                ) // Menambahkan popup
                .addTo(mapRef.current);
        });

        // Pembersihan map saat komponen dilepas
        return () => {
            mapRef.current.remove();
        };
    }, []);

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
                            {dummyData.map((tempat, index) => (
                                <TempatKunjunganCard
                                    key={index}
                                    tempatKunjungan={tempat}
                                />
                            ))}
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
