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
        gray: {
          '50': '#f6f7f9',
          '100': '#ebedf3',
          '200': '#d3d7e4',
          '300': '#acb4cd',
          '400': '#7f8cb1',
          '500': '#5f6d98',
          '600': '#4b577e',
          '700': '#3e4766',
          '800': '#363d56',
          '900': '#30354a',
          '950': '#171923', // https://uicolors.app/create
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
