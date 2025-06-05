#!/usr/bin/env node
import { cp } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import slugify from "@sindresorhus/slugify";
import { allPages, copyFile, getPages, readFile, writeFile } from "@sphido/core";
import { createSitemap } from "@sphido/sitemap";
import { globby } from "globby";
import got from "got";

import { getPageHtml } from "./src/get-html-page.js";

async function content(page, dirent) {
	if (dirent.isFile()) {
		page.content = await readFile(page.path);
		page.title = page.content.match(/(?<=(^#)\s).*/gm)?.pop();
		page.name = page.name || page.title;
	}
}

function slug(page, dirent, path) {
	if (dirent.isFile()) {
		// Content
		if (path.startsWith("content")) {
			page.slug = join("/", relative("content", dirname(page.path)), `${slugify(page.name)}.html`);
			page.output = join("public", page.slug);
		}

		// read file content
		page.url = new URL(page.slug, "https://sphido.cz/").toString();
	}
}

const pages = [
	{
		slug: "index.html",
		content: await got("https://raw.githubusercontent.com/sphido/sphido/main/readme.md").text(),
		title: "Home",
		name: "A rocket 🚀 fast, 💭 light-weight and flexible static site 🤖 generator",
		url: "https://sphido.cz/",
		output: "public/index.html",
	},
	{
		slug: "core.html",
		content: await got("https://raw.githubusercontent.com/sphido/sphido/main/packages/sphido-core/readme.md").text(),
		title: "Sphido core",
		url: "https://sphido.cz/core.html",
		output: "public/core.html",
	},
	...(await getPages({ path: "content" }, slug, content)),
	{
		slug: "frontmatter.html",
		content: await got("https://raw.githubusercontent.com/sphido/sphido/main/packages/sphido-frontmatter/readme.md").text(),
		title: "Frontmatter",
		url: "https://sphido.cz/frontmatter.html",
		output: "public/frontmatter.html",
	},
	{
		slug: "hashtags.html",
		content: await got("https://raw.githubusercontent.com/sphido/sphido/main/packages/sphido-hashtags/readme.md").text(),
		title: "Hashtags",
		url: "https://sphido.cz/hashtags.html",
		output: "public/hashtags.html",
	},
	{
		slug: "sitemap.html",
		content: await got("https://raw.githubusercontent.com/sphido/sphido/main/packages/sphido-sitemap/readme.md").text(),
		title: "sitemap.xml",
		url: "https://sphido.cz/sitemap.html",
		output: "public/sitemap.html",
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

const files = await globby(["content/**/*.*", "!**/*.{md,html}"]);
for await (const file of files) {
	await copyFile(file, join("public", relative("content", file)));
}

await cp("static", "public", { recursive: true });
