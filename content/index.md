---
title: Sphido | A rocket fast, lightweight, static site generator
slug: .
---

# A rocket 🚀 fast, 💭 lightweight, static site 🤖 generator

## Install

```bash 
npm i @sphido/core @sphido/frontmatter @sphido/markdown @sphido/meta fs-extra esm globby
```

**Warning**: Sphido requires Node 12.x and newer. To load an ES module, set `"type": "module"` in the `package.json` or use the `.mjs` extension.

## Create `index.mjs`

```javascript
#!/usr/bin/env node

import path from "path";
import globby from "globby";
import fs from "fs-extra";
import {getPages} from "@sphido/core";
import {frontmatter} from "@sphido/frontmatter";
import {meta} from "@sphido/meta";
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
				page.toFile = path.join(
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

	pages.forEach(page => fs.outputFile(page.toFile, page.getHtml()))

})();
```

## Run script

```bash
node index.mjs
```