module.exports = {
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "1fr 180px",
      },
      height: {
        "25": "6.25rem",
      },
      backgroundColor: {
        "white-transparent": "rgba(255,255,255,0.75)",
      },
      animationDuration: {
        "200ms": "200ms",
      },
      colors: {
        indigo: {
          lighter: "#6f40ff",
          default: "#3f00ff",
          darker: "#3700db",
        },
      },
    },
    animations: {
      "fade-in": {
        from: {
          opacity: 0,
        },
      },
    },
  },
  variants: {},
  plugins: [require("tailwindcss-animations")],
};
