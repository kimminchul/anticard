import type { Config } from "tailwindcss";

export default {
  content: [
    "./playground/**/*.{ts,tsx,html}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
