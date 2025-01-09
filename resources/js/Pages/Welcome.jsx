import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { BiTrip } from "react-icons/bi";
import Footer from "@/Components/Footer";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <header>
                <nav className="bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            <h1 className="font-nunito font-semibold text-3xl">
                                Trippy
                            </h1>
                            {auth.user ? (
                                <a
                                    href={route("dashboard")}
                                    className="decoration-solid font-nunito font-medium text-base"
                                >
                                    Dashboard
                                </a>
                            ) : (
                                <div className="flex gap-5 justify-center items-center">
                                    <a
                                        href={route("register")}
                                        className="decoration-solid font-nunito font-medium text-base"
                                    >
                                        Register
                                    </a>

                                    <PrimaryButton className="font-nunito font-medium h-10">
                                        <a
                                            href={route("login")}
                                            className="text-base"
                                        >
                                            Login
                                        </a>
                                    </PrimaryButton>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <div className="relative isolate px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl py-32 sm:pt-48 lg:pt-56 sm:pb-40 lg:pb-48">
                        <div className="text-center">
                            <h1 className="text-5xl font-nunito font-bold tracking-tight text-gray-900 sm:text-8xl">
                                Your Next Journey, Optimized
                            </h1>
                            <p className="mt-8 text-nunito text-sm font-medium text-gray-500 sm:text-xl">
                                Effortlessly design and optimize your travel
                                itineraries. Input your destinations, and let
                                Trippy craft the best route for unforgettable
                                adventures. Perfect for vacations, business
                                trips, and daily escapes."
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <PrimaryButton className="font-nunito font-medium h-15">
                                    <a
                                        href={route("login")}
                                        className="text-lg flex items-center gap-3"
                                    >
                                        <BiTrip /> Optimized Trip
                                    </a>
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto max-w-4xl text-center pb-48">
                        <h2 className="text-3xl font-nunito font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Your Trip
                        </h2>
                        <div className="flex items-center mt-14 justify-between">
                            <div className="flex flex-col items-start gap-3 w-1/2">
                                <h3 className="font-nunito font-bold text-2xl sm:text-3xl">
                                    The most optimal
                                </h3>
                                <p className="text-left text-lg text-gray-600">
                                    Plan your ultimate adventure with Trippy.
                                    Simply input your desired destinations, and
                                    our smart algorithms will create the most
                                    efficient travel route, perfectly tailored
                                    to your preferences whether for sightseeing,
                                    dining, or relaxing.
                                </p>
                            </div>
                            <img
                                className="max-w-48"
                                src="images/optimal-trip.png"
                                alt="optimal trip vector"
                            />
                        </div>

                        <div className="flex items-center mt-24 justify-between">
                            <img
                                className="max-w-56"
                                src="images/effortless.png"
                                alt="optimal trip vector"
                            />
                            <div className="flex flex-col items-end gap-3 w-1/2">
                                <h3 className="font-nunito font-bold text-2xl sm:text-3xl">
                                    Effortless Planning
                                </h3>
                                <p className="text-right text-lg text-gray-600">
                                    Simply enter your desired destinations, and
                                    let Trippy’s algorithm craft the best route
                                    for you. No more complex itineraries just a
                                    seamless travel experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <hr />
            <Footer />
        </>
    );
}
