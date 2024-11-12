/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   darkMode: "class",
   theme: {
      extend: {
         fontFamily: {
            sans: ["SF Pro", "Helvetica Neue", "Arial", "sans-serif"],
            porlane: ["Porlane", "sans-serif"],
            spaceGrotesk: ["Space Grotesk", "sans-serif"],
            jetbrainsMono: ["JetBrains Mono", "sans-serif"],
         },
         colors: {
            darkBackground: "#080808",
            lightBackground: "#FFFFFF",
            primaryWhite: "#CFCFCF",
            highlightWhite: "#FFFFFF",
            dullWhite: "#757575",
            primaryBlack: "#303030",
            highlightBlack: "#1A1A1A",
            dullBlack: "#4A4A4A",
         },
      },
   },
   plugins: [],
};
