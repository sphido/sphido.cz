# A rocket 🚀 fast, 💭 light-weight and flexible static site 🤖 generator.

I know, another [static site generator](https://github.com/collections/static-site-generators)! This one is different - it's totally minimalistic.
Basically, it's just two functions. The first, the `getPages()` function, allows you to retrieve a list of pages, and the `allPages()` function allows 
you to iterate through them.

You get a static site generator that is:

- 🚀 rocket fast
- 💭️ light-weight
- 🤘 no dependencies
- ⚡️ flexible

## Install package

```bash 
yarn add @sphido/core # that's all
```

## Create `index.js`

```javascript
#!/usr/bin/env node

import {dirname, relative, join} from 'node:path';
import {getPages, allPages, readFile, writeFile} from '@sphido/core';
import slugify from '@sindresorhus/slugify';
import {marked} from 'marked';

function getHtml({name, content, path}) {
	return `<!DOCTYPE html>
<html lang="cs" dir="ltr">
<head>
	<meta charset="UTF-8">
	<script src="https://cdn.tailwindcss.com?plugins=typography"></script>
	<title>${name} | Sphido Example page</title>	
</head>
<body class="prose mx-auto my-6">${content}</body>
<!-- Generated with Sphido from ${path} -->
</html>`;
}

const pages = await getPages({path: 'content'});

for (const page of allPages(pages)) {
	page.slug = slugify(page.name) + '.html';
	page.output = join('public', relative('content', dirname(page.path)), page.slug);

	// read content and process markdown
	page.content = marked(await readFile(page.path));

	// save HTML file
	await writeFile(page.output, getHtml(page));
}
```

## Run script

```bash
node index.js
```

Check [website source code](https://github.com/sphido/sphido.org) to getting deeper idea how Sphido works.


:::py-6 px-8 border-l-4 border-l-amber-500 dark:bg-gray-900/50
Sphido requires Node 14.x and newer. To load an ES module, set `"type": "module"` in the `package.json` or use the `.mjs` extension.
:::