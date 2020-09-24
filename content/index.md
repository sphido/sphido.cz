---
title: Sphido | A rocket fast, lightweight, static site generator
slug: .
---

# A rocket 🚀 fast, lightweight, static site generator

## Install

```bash 
npm i @sphido/core @sphido/frontmatter @sphido/markdown @sphido/meta fs-extra esm globby
```

## Create `index.js`

```javascript
import {join} from "path";
import globby from "globby";
import {getPages} from "@sphido/core";
import frontmatter from "@sphido/frontmatter";
import meta from "@sphido/meta";
import {outputFile} from "fs-extra";
import {markdown} from "@sphido/markdown";

(async () => {

	// 1. get list of pages

	const pages = await getPages(
		await globby('content/**/*.{md,html}'),
		...[

			frontmatter,
			markdown,
			meta,

			// add custom page extender
			(page) => {
				page.toFile = join(
					page.dir.replace('content', 'public'),
					page.slug,
					'index.html'
				);
			},

			// add custom page function
			{
                head: function() {
                  return `<head><meta charset="UTF-8"><title>${this.title}</title></head>`
                },

				getHtml: function () {
					return `<!DOCTYPE html>` + 
                           `<html lang="en" dir="ltr">` + this.head() + 
                           `<body>${this.content}</body></html>`
				}
			}
		],
	);

	// 2. save pages

	pages.forEach(page => outputFile(page.toFile, page.getHtml()))

})();
```

## Run script

```bash
node -r esm index.js
```