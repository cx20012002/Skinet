/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            container:{
                screens: {
                    sm: "640px",
                    md: "768px",
                    lg: "1024px",
                    xl: "1280px"
                }
            }
        },
    },
    plugins: [],
}

