# Tailwind

[Tailwind CSS](https://tailwindcss.com/) is a utility-first CSS framework which can be easily integrated with Sphido. 

## Install Required Packages

Install Tailwind CSS and the typography plugin:


```bash
pnpm add tailwindcss @tailwindcss/cli @tailwindcss/typography
```

## Create the Entry CSS File

In the `src` directory, create a file named `style.css` with the following content:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Dark theme variant */
@custom-variant dark (&:where(.dark, .dark *));
```

Then add the following lines to the `package.json` under `"scripts"`:

```json
{
	"scripts": {
		"build": "pnpm run build.css && pnpm run build.html",
		"build.css": "tailwindcss -i ./src/style.css -o ./public/style.css",
		"build.html": "node index.js"
	}
}
```

## Build the Project

```bash
pnpm build
```

This will generate the final CSS in the public folder.