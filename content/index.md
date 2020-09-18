---
title: Sphido | A rocket fast, lightweight, static site generator
slug: '.' 
---

[<img src="/img/sphido.svg" alt="Sphido Logo" class="img-fluid w-75 my-5 d-block mx-auto">](https://github.com/sphido/sphido)


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

Download this example here: https://github.com/sphido/examples/tree/master/basic

<div class="text-center"> 
    <a href="https://github.com/sphido/sphido" class="btn btn-lg btn-success" target="_blank">
        <img src="/img/github-white.svg" fill="#fff" width="18px" style="vertical-align: -.1em" alt="Github logo"> Get Source Code
    </a>
</div>


## Source codes

* [@sphido/core](https://github.com/sphido/sphido/tree/master/packages/sphido-core) - most important `getPage()` and `getPages()` functions.

## Extenders

* [@sphido/frontmatter](https://github.com/sphido/sphido/tree/master/packages/sphido-frontmatter) - `page` **extender** that process front matter block inside content
* [@sphido/markdown](https://github.com/sphido/sphido/tree/master/packages/sphido-markdown) - page **extender** that transform page.content markdown to HTML with [marked](https://github.com/markedjs/marked)
* [@sphido/meta](https://github.com/sphido/sphido/tree/master/packages/sphido-meta) - **extender** that add common properties to `pages`


### Templating

* [@sphido/nunjucks](https://github.com/sphido/sphido/tree/master/packages/sphido-nunjucks) - allow generate HTM with [nunjucks templates](https://mozilla.github.io/nunjucks/) a rich and powerful templating language for JavaScript from Mozilla

## Outputing 

* [@sphido/sitemap](https://github.com/sphido/sphido/tree/master/packages/sphido-sitemap) - allow generate `sitemap.xml` from `pages`
* [@sphido/feed](https://github.com/sphido/sphido/tree/master/packages/sphido-feed) - generate atom feed from `pages`
* [@sphido/link](https://github.com/sphido/sphido/tree/master/packages/sphido-link) - **extender function** `link()` allow create URL link to page
* [@sphido/pagination](https://github.com/sphido/sphido/tree/master/packages/sphido-pagination) - allow paginate over `pages`
* [@sphido/twemoji](https://github.com/sphido/sphido/tree/master/packages/sphido-twemoji) - transform content emoji to twemoji

View [Sphido API Docs](/docs/api) for more information about packages

## Examples

- https://github.com/sphido/examples - more examples like JSON generator
- https://github.com/sphido/sphido.org - source of [sphido.org](https://sphido.org) website