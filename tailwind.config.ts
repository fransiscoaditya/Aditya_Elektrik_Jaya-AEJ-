/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        fg: "#F2F2F2",
        accent: "#E6FF00",
        muted: "#3a3a3a",
        border: "rgba(242,242,242,0.08)",
        // Legacy compat
        "surface-1": "#0a0a0a",
        "surface-2": "#121212",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
        "mono-tag": ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      // Allow arbitrary vw/vh font sizes to pass through
      fontSize: {
        "hero": "clamp(3rem, 15vw, 18rem)",
        "heading": "clamp(2rem, 8vw, 10rem)",
      },
      letterSpacing: {
        "ultra": "-0.05em",
        "tightest": "-0.04em",
      },
      lineHeight: {
        "editorial": "0.82",
        "tight-editorial": "0.88",
      },
      mixBlendMode: {
        difference: "difference",
      },
    },
  },
  plugins: [],
};
