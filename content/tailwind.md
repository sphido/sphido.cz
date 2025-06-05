# Tailwind

[Tailwind CSS](https://tailwindcss.com/) is utility first CSS framework which can be easily integrated with Sphido. 

## Install Required Packages

Install Tailwind CSS and the typography plugin:


```bash
yarn add tailwindcss @tailwindcss/cli @tailwindcss/typography
```

## Create the Entry CSS File

In the `src` directory, create a file named `style.css` with the following content:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Dark theme variant */
@custom-variant dark (&:where(.dark, .dark *));
```

Then add follow lines to the `package.json` under `"scripts"`:

```json
{
	"scripts": {
		"build": "yarn build.css && yarn build.html",
		"build.css": "tailwindcss -i ./src/style.css -o ./public/style.css",
		"build.html": "node index.js"
	}
}
```

## Build the Project

```bash
yarn build
```

This will generate the final CSS in the public folder.