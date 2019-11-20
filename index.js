#!/usr/bin/env node

const {getPages} = require('@sphido/core');
const sitemap = require('@sphido/sitemap');
const {sep, normalize} = require('path');
const {renderToFile, save} = require('@sphido/nunjucks');
const {link} = require('@sphido/link');
const {copy, outputFile} = require('fs-extra');
const globby = require('globby');


(async () => {
	try {

		// 1. Get pages from directory

		const pages = await getPages(
			await globby('content/**/*.md'),
			...[
				require('@sphido/frontmatter'),
				require('@sphido/twemoji'),
				require('@sphido/marked'),
				require('@sphido/meta'),
				{save, link},
			],
		);

		// 2. Generate single pages...

		for await (const page of pages) {
			await page.save(page.dir.replace('content', 'public'), 'content/page.html');
		}


		// 3. generate sitemap.xml

		outputFile(
			'public/sitemap.xml',
			sitemap(pages, 'https://sphido.org/')
		);

		// 4. copy static content
		const files = await globby(['content/**/*.*', '!**/*.{md,html}']);
		for await (const file of files) {
			await copy(file, file.replace(/^[\w]+/, 'public'));
		}

		await renderToFile('public/404.html', 'content/404.html');

	} catch (error) {
		console.error(error);
	}
})();