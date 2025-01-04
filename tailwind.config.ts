import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        bgWhite     : "#FFFFFF",
        bgGray      : "#D0D0D0",
        bgLightGray : "#F0F0F0",
        btnBlack    : "#171717",
        textBlack   : "#000000",
        textWhite   : "#FFFFFF"
      },
      screens: {
        'screen-1024':'1024px',
        // => @media (min-width: 1024px ) { ... }
        'screen-1280': '1280px',
        // => @media (min-width: 1280px ) { ... }
        'screen-1440': '1440px',
        // => @media (min-width: 1440px ) { ... }
        'screen-1512': '1522px',
        // => @media (min-width: 1512px ) { ... }
        'screen-1680':'1680px'
      
      },
    },
  },
  plugins: [],
} satisfies Config;
