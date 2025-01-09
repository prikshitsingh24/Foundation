import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|dropdown|input|table|ripple|spinner|menu|divider|popover|form|checkbox|spacer).js"
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
        borderGray  : "#e5e7eb",
        borderHoverGray: "#9ca3af",
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
      animation: {
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-out-left': 'slideOutLeft 0.5s ease-out'
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
