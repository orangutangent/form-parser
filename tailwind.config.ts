import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      disabled: "#E3DAF9",
      primary: "#6E41E2",
      hover: "#5835B0",
      active: " #472C8A",
      white: "#FFFFFF",
      whites: "rgba(255, 255, 255, 0.88)",
      graym: "#FAFAFA",
      grayl: "#F1F1F1",
      grays: "#D4D4D4",
      gray: "rgba(17, 17, 17, 0.48)",
      grayk: "#6B6B6B",
      black: "#111",
      redgirl: "#F9E3E3",
      redboy: "#F9E3E3",
      red: "#DB524E",
      superred: "#C7302B",
      green: "#27AE60",
      bluetest: "#428BF9",
    },
    extend: {
      boxShadow: {
        inputDefault: "0px 4px 16px 0px rgba(51, 51, 51, 0.08)",
        inputError: "0px 4px 40px 0px rgba(255, 195, 195, 0.5)",
        inputSuccess: " 0px 4px 40px 0px rgba(39, 174, 96, 0.24)",
        inputHover: " 0px 4px 56px 0px rgba(51, 51, 51, 0.16)",
        inputActive: "0px 4px 24px 0px rgba(51, 51, 51, 0.24)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
