import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f8f9ff",
        "on-background": "#0b1c30",
        surface: "#f8f9ff",
        "surface-container": "#e5eeff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#eff4ff",
        "surface-container-high": "#dce9ff",
        "surface-tint": "#494bd6",
        "on-surface": "#0b1c30",
        "on-surface-variant": "#464554",
        "outline-variant": "#c7c4d7",
        outline: "#767586",
        primary: "#4648d4",
        "primary-container": "#6063ee",
        "on-primary": "#ffffff",
        secondary: "#006591",
        "secondary-container": "#39b8fd",
        "tertiary-container": "#b55d00",
        ink: "#172026",
        mint: "#1f9d7a",
        coral: "#e25b45"
      },
      spacing: {
        "container-max": "1280px"
      }
    }
  },
  plugins: []
};

export default config;
