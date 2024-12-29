import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                nunito: ['"Nunito Sans"', "sans-serif"],
            },
            colors: {
                // customBlue: "#1E40AF", // Custom color name and value
                primary: {
                    default: "#4D8E92",
                    hover: "#3D7275",
                    active: "#2E5759",
                },
            },
        },
    },

    plugins: [forms],
};
