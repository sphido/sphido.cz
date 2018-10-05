#!/usr/bin/env node

const Sphido = require('sphido');
const fs = require('fs-extra');
const globby = require('globby');
const twemoji = require('twemoji');

(async () => {

	try {

		// Get pages from directory
		const pages = await Sphido.getPages(
				await globby('content/**/*.{md,html}'),
				...Sphido.extenders,
				(page) => {
					page.content = twemoji.parse(page.content); // twemoji
				}
		);

		// Generate single pages...
		for await (let page of pages) {
			await page.save(page.dir.replace('content', 'public'));
		}

		// Generate sitemap.xml
		Sphido.template.toFile(
				'public/sitemap.xml',
				'theme/sitemap.xml',
				{pages: pages,  date: new Date().toISOString(), domain: 'https://sphido.org'}
		);

		// Copy static content
		let files = await await globby(['theme/**/*.*', 'content/**/*.*', '!**/*.{md,html,xml}']);
		for await (let file of files) {
			await fs.copy(file, file.replace(/^[\w]+/, 'public'))
		}

	} catch (e) {
		console.error(e);
	}
})();