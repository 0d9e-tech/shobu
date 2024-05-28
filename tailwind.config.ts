import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        old: ["xenippa"],
      },
      colors: {
        gold: "#ffd700",
      },
    },
  },
  plugins: [],
} satisfies Config;
