import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Nunito", "ui-rounded", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
