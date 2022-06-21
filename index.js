#!/usr/bin/env node
import {dirname, relative, join} from 'node:path';
import {getPages, allPages, readFile, writeFile, copyFile} from '@sphido/core';
import slugify from '@sindresorhus/slugify';
import {getPageHtml} from './src/page.js';
import {makdown} from './src/makdown.js';
import {globby} from 'globby';
import {marked} from 'marked';
import {createSitemap} from '@sphido/sitemap';

const sitemap = await createSitemap();

// process content pages

const pages = await getPages({path: 'content'}, (page) => {
	page.slug = slugify(page.name) + '.html';
});

for (const page of allPages(pages)) {
	page.content = marked(await readFile(page.path));
	page.title = page.content.match(/(?<=<h[12][^>]*?>)([^<>]+?)(?=<\/h[12]>)/i)?.pop();
	page.url = join(relative('content', dirname(page.path)), page.slug);
	await writeFile(join('public', page.url), await getPageHtml(page));

	sitemap.add({url: `https://sphido.org/${page.url}`});
}

// Process readme.md from packages

const readme = await getPages({
	path: 'node_modules/@sphido', include: (dirent, path) => {
		if (dirent.isDirectory()) {
			return path.includes('@sphido');
		} else {
			return dirent.name.endsWith('readme.md');
		}
	},
}, (page, dirent, path) => {
	page.name = relative('node_modules', path);
	page.slug = slugify(page.name) + '.html';
});

for (const page of allPages(readme)) {
	page.content = makdown(await readFile(page.path));
	await writeFile(join('public', page.slug), await getPageHtml(page));

	sitemap.add({url: `https://sphido.org/${page.slug}`});
}

// Copy static files

const files = await globby(['content/**/*.*', '!**/*.{md,html}']);
for await (const file of files) {
	await copyFile(file, join('public', relative('content', file)));
}

sitemap.end();