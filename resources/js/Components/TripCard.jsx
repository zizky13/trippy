import { Link } from "@inertiajs/react";

export default function TripCard({
    namaTempat = "Bali Trip",
    startDate = "12 Jan",
    link = "dashboard",
    className = "",
}) {
    return (
        // Di bawah pake route("link"), link dari props
        <Link
            to=""
            className={`my-10 mx-7 inline-block relative w-full h-32 overflow-hidden rounded-lg shadow-lg  ${className} lg:w-5/12`}
        >
            <img
                src="images/bg-card.png" // Ganti dengan path gambar Anda
                alt={namaTempat}
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative z-10 p-4">
                <h2 className="text-white text-lg font-semibold">
                    {namaTempat}
                </h2>
                <p className="text-white text-sm">{startDate}</p>
            </div>
        </Link>
    );
}
