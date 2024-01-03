#!/usr/bin/env node
import {dirname, relative, join} from 'node:path';
import {getPages, allPages, readFile, writeFile, copyFile} from '@sphido/core';
import slugify from '@sindresorhus/slugify';
import {globby} from 'globby';
import {createSitemap} from '@sphido/sitemap';
import {cp} from 'node:fs/promises';
import got from 'got';

import {getPageHtml} from './src/get-html-page.js';

async function content(page, dirent) {
  if (dirent.isFile()) {
    page.content = await readFile(page.path);
    page.title = page.content.match(/(?<=(^#)\s).*/gm)?.pop();
    page.name = page.name || page.title;
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
    page.url = new URL(page.slug, 'https://sphido.cz/').toString();
  }
}


const pages = [
  {
    slug: '/index.html',
    content: await got('https://raw.githubusercontent.com/sphido/sphido/main/readme.md').text(),
    title: 'Home',
    name: 'A rocket 🚀 fast, 💭 light-weight and flexible static site 🤖 generator',
    output: 'public/index.html',
  },
  {
    slug: 'core.html',
    content: await got('https://raw.githubusercontent.com/sphido/sphido/main/packages/sphido-core/readme.md').text(),
    title: 'Sphido core',
    output: 'public/core.html',
  },
  ...await getPages({path: 'content'}, slug, content),
  {
    slug: 'frontmatter.html',
    content: await got('https://raw.githubusercontent.com/sphido/sphido/main/packages/sphido-frontmatter/readme.md').text(),
    title: 'Frontmatter',
    output: 'public/frontmatter.html',
  },
  {
    slug: 'hashtags.html',
    content: await got('https://raw.githubusercontent.com/sphido/sphido/main/packages/sphido-hashtags/readme.md').text(),
    title: 'Hashtags',
    output: 'public/hashtags.html',
  },
  {
    slug: 'sitemap.html',
    content: await got('https://raw.githubusercontent.com/sphido/sphido/main/packages/sphido-sitemap/readme.md').text(),
    title: 'sitemap.xml',
    output: 'public/sitemap.html',
  },
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

await cp('static', 'public', {recursive: true});
