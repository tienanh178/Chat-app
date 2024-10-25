/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        smallest: "400px",
        tablet: "960px", // Thêm tablet breakpoint (960px)
        laptop: "1440px", // Thêm laptop breakpoint (1440px)
        desktop: "1920px", // Thêm desktop breakpoint (1920px)
        ultra: "2560px", // Thêm màn hình lớn hơn (2560px)
      },
    },
  },
  plugins: [],
};
