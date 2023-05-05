/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },

  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.btn': {
          background: "#1646a0",
          color: "#fff",
          padding: "10px 45px",
          border: "1px solid #fff",
          borderRadius: "25px",
          textTransform: "uppercase",
          fontWeight: "bold",
          fontSize: "1.2em",
          cursor: "pointer",
          transitionDuration: ".4s",
          '&:hover': {
            backgroundColor: '#2779bd'
          },
        },

        '.space': {
          fontSize: "35px",
          lineHeight: "1.5",
          border: "3px solid #000",
          height: "60px",
          width: "60px",
          textTransform: "uppercase",
          backgroundColor: "#fff",
          color: "#000",
          fontWeight: "bold"
        },
        ".body": {
          background: "linear-gradient(180deg, rgba(9, 35, 175, 1) 0%, rgba(0, 0, 0, 1) 100%)",
          color: "#fff",
        }
      }
      )
    })
  ],
}



