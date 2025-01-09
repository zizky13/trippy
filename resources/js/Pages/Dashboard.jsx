import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TripCard from "@/Components/TripCard";
import { useEffect, useState } from "react";

export default function Dashboard({ auth }) {
    const [allTrip, setAllTrip] = useState([]); // State buat nyimpen seluruh data perjalanan user
    const [loading, setLoading] = useState(true); // State untuk loading

    useEffect(() => {
        async function fetchTrips() {
            try {
                const response = await fetch("/api/trips"); // Nanti ganti endpoint fetch data dari database
                const data = await response.json();
                setAllTrip(data); // simpen ke state biar pagenya rerender
            } catch (error) {
                console.error("Error fetching trips:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchTrips();
    }, []);

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
                        <PrimaryButton className="font-nunito font-medium  h-15">
                            <a
                                href="/buatperjalanan"
                                className="text-lg flex items-center gap-3"
                            >
                                Buat Perjalanan Baru
                            </a>
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
                                    namaTempat={trip.namaTempat}
                                    startDate={trip.startDate}
                                    endDate={trip.endDate}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="mt-12 text-left font-nunito text-base font-semibold text-gray-500">
                            Kamu belum membuat rencana perjalanan apapun.{" "}
                            <a href="" className="text-primary-default">
                                Buat rencana perjalanan.
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
