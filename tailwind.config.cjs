module.exports = {
	content: [
		'./src/**/*.{html,js}',
		'./public/**/*.html',
	],
	darkMode: 'class',
	theme: {
		container: {center: true, padding: '1rem'},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
	],
};
