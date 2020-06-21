const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "1fr 180px",
      },
      height: {
        "25": "6.25rem",
      },
      width: {
        "25": "6.25rem",
      },
      backgroundColor: {
        "white-transparent": "rgba(255,255,255,0.75)",
      },
      animationDuration: {
        "200ms": "200ms",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      shadowOutline: {
        shadow: "0 0 0 3px",
        alpha: "0.7",
      },
      borderWidth: {
        default: "1px",
        "0": "0",
        "2": "2px",
        "3": "3px",
        "4": "4px",
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
      spin: {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },
    },
  },
  variants: {
    shadowOutline: ["focus"],
  },
  plugins: [
    require("tailwindcss-animations"),
    require("tailwindcss-font-inter")(),
    require("tailwindcss-shadow-outline-colors")(),
  ],
};
