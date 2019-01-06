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
			page => {
				page.content = twemoji.parse(page.content); // Twemoji
			},
			...Sphido.extenders
		);

		// Generate single pages...
		for await (const page of pages) {
			await page.save(page.dir.replace('content', 'public'));
		}

		// Generate sitemap.xml
		Sphido.template.toFile(
			'public/sitemap.xml',
			'theme/sitemap.xml',
			{pages, domain: 'https://sphido.org'}
		);

		// Copy static content
		const files = await await globby(['theme/**/*.*', 'content/**/*.*', '!**/*.{md,html,xml}']);
		for await (const file of files) {
			await fs.copy(file, file.replace(/^[\w]+/, 'public'));
		}
	} catch (error) {
		console.error(error);
	}
})();
