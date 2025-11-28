/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'shadowed-green': '#151C1F',
                'mint-green': '#A1D1B1',
                'light-bg': '#ECF39E',
                'leafy-dark': '#132A13',
                'leafy-medium': '#31572C',
                'leafy-accent': '#4F772D',
                'leafy-light': '#90A955',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
