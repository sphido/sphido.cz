#!/usr/bin/env node

const Sphido = require('sphido');
const fs = require('fs-extra');
const globby = require('globby');
const twemoji = require('twemoji');

(async () => {
	try {
		// Get pages from directory
		const pages = await Sphido.getPages(
			await globby('content/**/*.md'),
			page => {
				page.content = twemoji.parse(page.content); // Twemoji
			},
			...Sphido.extenders
		);

		// Generate single pages...
		for await (const page of pages) {
			await page.save(page.dir.replace('content', 'public'), 'content/page.html');
		}

		// Generate sitemap.xml
		Sphido.template.toFile(
			'public/sitemap.xml',
			'content/sitemap.xml',
			{pages, domain: 'https://sphido.org'}
		);

		// Copy static content
		const files = await await globby(['content/**/*.*', '!**/*.{md,html,xml}']);
		for await (const file of files) {
			await fs.copy(file, file.replace(/^[\w]+/, 'public'));
		}

		Sphido.template.toFile('public/404.html', 'content/404.html');

	} catch (error) {
		console.error(error);
	}
})();
