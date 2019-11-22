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

Need more **examples or tutorials**? [View API docs](/docs/api) or
 explore [sphido.org source codes](https://github.com/sphido/sphido.org).

## <img src="/img/github.svg" fill="#fff" width="32px" style="vertical-align: -.1em" alt="Github logo"> Source codes

- https://github.com/sphido/sphido