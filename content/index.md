---
title: Sphido | A rocket fast, lightweight, static site generator
slug: '.' 
---

[<img src="/img/sphido.svg" alt="Sphido Logo" class="img-fluid w-75 my-5 d-block mx-auto">](https://github.com/sphido/sphido)


# A rocket 🚀 fast, lightweight, static site generator

## Installation

```bash 
$ npm i @sphido/core @sphido/frontmatter @sphido/marked @sphido/meta @sphido/nunjucks
```

## Quick Start

```javascript
const globby = require('globby');
const {getPages} = require('@sphido/core');
const {save} = require('@sphido/nunjucks');

(async () => {

	// 1. get list of pages
	const pages = await getPages(
		await globby('content/**/*.md'),
		...[
			require('@sphido/frontmatter'),
			require('@sphido/marked'),
			require('@sphido/meta'),
			{save},
		],
	);

	// 2. save them (with default template)
	for await (const page of pages) {
		await page.save(
			page.dir.replace('content', 'public')
		);
	}

})();
```

<div class="text-center"> 
    <a href="https://github.com/sphido/sphido" class="btn btn-lg btn-success" target="_blank">
        <img src="/img/github-white.svg" fill="#fff" width="18px" style="vertical-align: -.1em" alt="Github logo"> Get Source Code
    </a>
</div>


## Source codes

* [@sphido/code](https://github.com/sphido/sphido/tree/master/packages/sphido-core) - most important `getPage()` and `getPages()` functions.
* [@sphido/feed](https://github.com/sphido/sphido/tree/master/packages/sphido-feed) - generate atom feed from `pages`.
* [@sphido/frontmatter](https://github.com/sphido/sphido/tree/master/packages/sphido-frontmatter) - `page` **extender** that process front matter block inside content.
* [@sphido/link](https://github.com/sphido/sphido/tree/master/packages/sphido-link) - **extender function** `link()` allow create URL link to page.
* [@sphido/marked](https://github.com/sphido/sphido/tree/master/packages/sphido-marked) - page **extender** that transform page.content markdown to HTML with marked.
* [@sphido/meta](https://github.com/sphido/sphido/tree/master/packages/sphido-meta) - **extender** that add common properties to `pages`. 
* [@sphido/nunjucks](https://github.com/sphido/sphido/tree/master/packages/sphido-nunjucks) - allow generate HTM with nunjucks templates a rich and powerful templating language for JavaScript from Mozilla.
* [@sphido/pagination](https://github.com/sphido/sphido/tree/master/packages/sphido-pagination) - allow paginate over `pages`.
* [@sphido/sitemap](https://github.com/sphido/sphido/tree/master/packages/sphido-sitemap) - allow generate `sitemap.xml` from `pages`.
* [@sphido/twemoji](https://github.com/sphido/sphido/tree/master/packages/sphido-twemoji) - transform content emoji to twemoji.

View [Sphido API Docs](/docs/api) for more information about packages.

## Examples

- https://github.com/sphido/examples - more examples like JSON generator
- https://github.com/sphido/sphido.org - source of [sphido.org](https://sphido.org) website.