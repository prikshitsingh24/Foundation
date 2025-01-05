import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(table|checkbox|form|spacer).js"
  ],
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
        textWhite   : "#FFFFFF",
        'scrollbar-thumb': '#888',
        'scrollbar-thumb-hover': '#555',
        'scrollbar-track': '#F0F0F0',
      },
      screens: {
        'screen-1280': '1280px',
        'screen-1366': '1366px',
        'screen-1440': '1440px',
        'screen-1536': '1536px',
        'screen-1920': '1900px'
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
