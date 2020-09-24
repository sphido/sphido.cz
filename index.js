#!/usr/bin/env npx babel-node


import {join} from 'path';
import {getPages} from '@sphido/core';
import sitemap from '@sphido/sitemap';
import {link} from '@sphido/link';
import frontmatter from '@sphido/frontmatter';
import twemoji from '@sphido/twemoji';
import {markdown, renderer} from '@sphido/markdown';
import meta from '@sphido/meta';
import {copy, outputFile} from 'fs-extra';
import globby from 'globby';
import getPageHtml from './content/page'

const domain = new URL('https://sphido.org/');

renderer(
	{
		table: (header, body) => `<table class="table table-bordered table-striped bg-white m-1">${header}${body}</table>`,

		image: (href, title, text) => {
			const className = new URL(href, domain).hash.slice(1).replace(/_/g, ' ');
			return `<div class=" ${className ? className : 'd-flex justify-content-center my-1'}"><figure class="figure text-center w-75">
			<img src="${href}" class="figure-img img-fluid rounded" title="${title ? title : ''}" alt="${text ? text : ''}"/>		
			<figcaption class="figure-caption text-center">${text}</figcaption></figure></div>`;
		},

		link: (href, title, text) => {
			if (href.includes(domain.hostname)) {
				return `<a href="${href}" title="${title ? title : ''}">${text}</a>`;
			}

			return `<a href="${href}" title="${title ? title : ''}" target="_blank">${text}</a>`;
		}
	}
);


(async () => {
	try {

		// 1. Get pages from directory

		const pages = await getPages(
			await globby(['content/**/*.md', 'node_modules/@sphido/**/readme.md']),
			...[
				frontmatter,
				twemoji,
				markdown,
				meta,
				(page) => {
					page.content = getPageHtml(page);
				}
			]
		);

		// 2. Generate single pages...

		for await (const page of pages) {

			if (page.dir.includes('node_modules/@sphido')) {
				await outputFile(
					join('public/packages', page.slug, 'index.html'),
					page.content
				);

			} else {
				await outputFile(
					join(page.dir.replace('content', 'public'), page.slug, 'index.html'),
					page.content
				);
			}
		}

		// 3. generate sitemap.xml

		outputFile(
			join(__dirname, 'public/sitemap.xml'),
			sitemap(pages, domain)
		);

		// 4. copy static content

		const files = await globby(['content/**/*.*', '!**/*.{md,html}']);
		for await (const file of files) {
			await copy(file, file.replace(/^\w+/, 'public'));
		}

		// 5. copy 404 page
		await copy('content/404.html', 'public/404.html')


	} catch (error) {
		console.error(error);
	}
})();
