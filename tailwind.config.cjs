const colors = require('tailwindcss/colors')

module.exports = {
	content: [
		'./src/**/*.{html,svg,js}',
		'./public/**/*.html',
	],
	darkMode: 'class',
	theme: {
		container: {center: true, padding: '1rem'},
		extend: {
			colors: {
				gray: colors.zinc,
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
	],
};
