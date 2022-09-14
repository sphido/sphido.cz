module.exports = {
	content: [
		'./src/**/*.{html,js}',
		'./public/**/*.html',
	],
	darkMode: 'class',
	theme: {
		container: {center: true, padding: '1rem'},
		// extend: {
		// 	typography: ({theme}) => ({
		// 		invert: {
		// 			DEFAULT: {
		// 				css: {
		// 					'a': {textDecoration: 'none'},
		// 					'figcaption': {textAlign: 'center', fontStyle: 'italic'},
		// 				},
		// 			},
		// 			css: {
		// 				'--tw-prose-links': theme('colors.blue[400]'),
		// 				'--tw-prose-code': theme('colors.pink[400]'),
		// 			},
		// 		},
		// 		gray: {
		// 			css: {
		// 				'--tw-prose-links': theme('colors.blue[600]'),
		// 				'--tw-prose-code': theme('colors.pink[400]'),
		// 			},
		// 		},
		// 	}),
		//
		// },
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
	],
};
