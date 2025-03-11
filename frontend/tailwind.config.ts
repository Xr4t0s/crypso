/** @type {import('tailwindcss').Config} */
export default {
	content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--vt-font-family-base)',
        mono: 'var(--vt-font-family-mono)',
				custom: ['beverage', 'sans-serif']
      }
    },
		keyframes: {
			'border-spin': {
				'100%': {
					transform: 'rotate(-360deg)',
				},
			},
		},
		animation: {
			'border-spin': 'border-spin 7s linear infinite',
		}
  },
  plugins: []
};
