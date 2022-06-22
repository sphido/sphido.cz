# Sphido & Tailwind

[Tailwind CSS](https://tailwindcss.com/) is utility first CSS framework which can be easily integrated with Sphido. 
First you have to add following packages:

```bash
npm i tailwind @tailwindcss/typography  
```

Create `tailwind.config.cjs` file in project root:

```javascript
module.exports = {
	content: [
		'./src/**/*.{html,js}',
		'./public/**/*.html',
	],
	theme: {},
	plugins: [
		require('@tailwindcss/typography'),
	],
};
```

Then add follow lines to the `package.json` under `"scripts"`:

```json
{
  "scripts": {
    "build.css": "tailwindcss -i ./src/style.css -o ./public/style.css",
    "build.html": "node --experimental-modules index.js"
  }
}
```

Then run:

```bash
npm run build.html && npm run build.css
```