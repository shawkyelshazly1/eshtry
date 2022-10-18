/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
				bitter: ["Bitter", "serif"],
				lobster: ["Lobster", "cursive"],
			},
		},
		screens: {
			sm: "576px",
			// => @media (min-width: 576px) { ... }
			smd: "769px",
			// => @media (min-width: 769px) { ... }
			md: "960px",
			// => @media (min-width: 960px) { ... }

			lg: "1440px",
			// => @media (min-width: 1440px) { ... }
		},
	},
	plugins: [],
};
