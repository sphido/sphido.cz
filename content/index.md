# A rocket 🚀 fast, 💭 light-weight and flexible static site 🤖 generator.

- 🚀 rocket fast
- 💭️ light-weight
- 🤘 no dependencies
- ⚡️ flexible

## Install

```bash 
npm i @sphido/core
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

**Warning**: Sphido requires Node 14.x and newer. To load an ES module, set `"type": "module"` in the `package.json` or use the `.mjs` extension.