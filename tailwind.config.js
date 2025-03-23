// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        // sans: ["Poppins", "sans-serif"],
        //  // Set Poppins as default
        sans: ["Inter", "sans-serif"],
      }
    },
  plugins: [],
}}

