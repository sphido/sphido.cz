#!/usr/bin/env node
import {dirname, relative, join} from 'node:path';
import {getPages, allPages, readFile, writeFile, copyFile} from '@sphido/core';
import slugify from '@sindresorhus/slugify';
import {globby} from 'globby';
import {createSitemap} from '@sphido/sitemap';

import {marked} from './src/marked.js'; // custom marked
import {getPageHtml} from './src/get-html-page.js';

async function content(page, dirent) {
	if (dirent.isFile()) {
		page.content = marked(await readFile(page.path));
		page.title = page.content.match(/(?<=<h[12][^>]*?>)([^<>]+?)(?=<\/h[12]>)/i)?.pop();
	}
}

function slug(page, dirent, path) {
	if (dirent.isFile()) {

		// Packages
		if (path.startsWith('node_modules')) {
			page.name = relative('node_modules', path);
			page.slug = join('/', slugify(page.name) + '.html');
			page.output = join('public', page.slug);
		}

		// Content
		if (path.startsWith('content')) {
			page.slug = join('/', relative('content', dirname(page.path)), slugify(page.name) + '.html');
			page.output = join('public', page.slug);
		}

		// read file content
		page.url = new URL(page.slug, 'https://sphido.org/').toString();
	}
}

// Get pages to process

const pages = [
	...await getPages({path: 'content'}, slug, content),
	...await getPages({
		path: 'node_modules/@sphido',
		include: (dirent, path) => {
			if (dirent.isDirectory()) {
				return path.includes('@sphido');
			} else {
				return dirent.name.endsWith('readme.md');
			}
		},
	}, slug, content),
];


const sitemap = await createSitemap();

// Generate HTML pages

for (const page of allPages(pages)) {
	await writeFile(page.output, await getPageHtml(page, pages));
	sitemap.add(page);
}

sitemap.end();

// Copy static files

const files = await globby(['content/**/*.*', '!**/*.{md,html}']);
for await (const file of files) {
	await copyFile(file, join('public', relative('content', file)));
}
