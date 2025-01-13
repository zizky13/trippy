import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children, pagesName }) {
    return (
        <div className="flex min-h-screen">
            {/* Left Section (Image) */}
            <div className="relative hidden w-3/4 bg-cover bg-center md:block">
                <img
                    src="images/unsplash2.jpg"
                    alt="Background"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative z-10 flex h-full flex-col items-start justify-between p-10 text-white">
                    <h1 className="text-5xl font-nunito font-semibold">
                        Trippy
                    </h1>
                    <div className="flex w-full justify-between items-end p-3">
                        <p className="text-xl font-nunito font-medium">
                            Your Personal Trip Planner
                        </p>
                        <p className="text-sm">
                            Photo by. Pupik on unsplash.com
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section (Form) */}
            <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2">
                <div className="w-full max-w-md">
                    {/* <ApplicationLogo className="mx-auto mb-6 h-20 w-20 fill-current text-gray-500" /> */}
                    <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
                        {pagesName}
                    </h2>
                    {children}
                </div>
            </div>
        </div>
    );
}
