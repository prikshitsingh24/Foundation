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
        'screen-1280': '1280px',
        'screen-1366': '1366px',
        'screen-1440': '1440px',
        'screen-1536': '1536px',
      },
    },
  },
  plugins: [],
} satisfies Config;
