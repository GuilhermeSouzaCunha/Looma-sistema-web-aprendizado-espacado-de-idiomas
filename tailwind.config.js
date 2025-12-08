/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    safelist: [
        "text-primary",
        "text-green-500",
        "text-yellow-500",
        "text-red-500",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}