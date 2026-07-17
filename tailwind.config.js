/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],

  // Don't inject Tailwind's CSS reset — we keep our existing globals.css styles
  corePlugins: {
    preflight: false,
  },

  theme: {
    extend: {
      colors: {
        "neon-green":  "var(--green)",
        gold:          "var(--gold)",
        "panel-bg":    "var(--panel-bg)",
        "brand-pink":  "var(--brand-pink)",
        "brand-red":   "var(--brand-red)",
        "neon-cyan":   "var(--neon-cyan)",
        "neon-pink":   "var(--neon-pink)",
        white:         "var(--white)",
      },
      fontFamily: {
        pixel:   ['"Press Start 2P"', "cursive"],
        retro:   ['"VT323"', "monospace"],
        heading: ['"Barlow Condensed"', '"Bebas Neue"', "sans-serif"],
        display: ['"Barlow Condensed"', '"Bebas Neue"', "sans-serif"],
        logo:    ['"Barlow Condensed"', "sans-serif"],
        body:    ['"VT323"', "monospace"],
      },
      borderWidth: {
        DEFAULT: "2px",
      },
      boxShadow: {
        none: "none",
      },
    },
  },

  plugins: [],
};
