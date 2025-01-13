import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TripCard from "@/Components/TripCard";
import { useEffect, useState } from "react";

export default function Dashboard({ auth }) {
    const [allTrip, setAllTrip] = useState([]); // State buat nyimpen seluruh data perjalanan user
    const [loading, setLoading] = useState(true); // State untuk loading
    const [showModal, setShowModal] = useState(false); // State untuk kontrol modal
    const [itineraryName, setItineraryName] = useState(""); // State untuk nama itinerary

    useEffect(() => {
        async function fetchTrips() {
            try {
                const response = await fetch("getAll-Itinerary"); // Nanti ganti endpoint fetch data dari database
                const data = await response.json();
                setAllTrip(
                    Array.isArray(data.itineraries) ? data.itineraries : []
                ); // simpen ke state biar pagenya rerender
            } catch (error) {
                console.error("Error fetching trips:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchTrips();
    }, []);

    // Event handler untuk buka modal
    const handleOpenModal = () => {
        setShowModal(true);
    };

    // Event handler untuk tombol cancel
    const handleCancel = () => {
        setShowModal(false); // Tutup modal
    };

    // Event handler untuk tombol next
    const handleNext = () => {
        if (itineraryName.trim() === "") {
            alert("Nama itinerary tidak boleh kosong.");
            return;
        }
        // Arahkan ke halaman buat perjalanan dengan parameter nama itinerary
        window.location.href = `buatperjalanan?name=${encodeURIComponent(
            itineraryName
        )}`;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Selamat Datang, {auth.user.name}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-4xl font-nunito font-bold">
                            Perjalanan yang kamu buat
                        </h2>
                        <PrimaryButton
                            className="font-nunito font-medium h-15"
                            onClick={handleOpenModal}
                        >
                            <span className="text-lg flex items-center gap-3">
                                Buat Perjalanan Baru
                            </span>
                        </PrimaryButton>
                    </div>
                    {loading ? (
                        <p className="font-nunito text-center text-gray-500">
                            Memuat perjalanan...
                        </p>
                    ) : allTrip.length > 0 ? (
                        <div>
                            {allTrip.map((trip) => (
                                <TripCard
                                    key={trip.id}
                                    namaTempat={trip.itinerary_name}
                                    link={`detail-perjalanan/${trip.id}`} // Tambahkan rute dinamis
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="mt-12 text-left font-nunito text-base font-semibold text-gray-500">
                            Kamu belum membuat rencana perjalanan apapun.{" "}
                            <button
                                onClick={handleOpenModal}
                                className="text-primary-default"
                            >
                                Buat rencana perjalanan.
                            </button>
                        </p>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
                        <h2 className="text-lg font-bold mb-4">
                            Buat Perjalanan Baru
                        </h2>
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
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleNext}
                                className="px-4 py-2 bg-primary-default text-white rounded-md hover:bg-primary-dark"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
