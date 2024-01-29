import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "f4e-green": "#84cc16",
        "f4e-orange": "#eab308",
      },
      backgroundColor: (theme) => ({
        // @ts-ignore
        ...theme("colors"),
        cover: "cover",
        center: "center",
      }),
    },
  },
  plugins: [],
};
export default config;
