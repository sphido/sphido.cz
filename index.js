#!/usr/bin/env node
import { cp } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import slugify from "@sindresorhus/slugify";
import { allPages, copyFile, getPages, readFile, writeFile } from "@sphido/core";
import { renderSitemap, writeSitemap } from "@sphido/sitemap";
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

const [
	homeReadme,
	coreReadme,
	frontmatterReadme,
	hashtagsReadme,
	sitemapReadme,
	feedReadme,
	collectionsReadme,
	devReadme,
	createReadme,
] = await Promise.all([
	got("https://raw.githubusercontent.com/sphido/sphido/main/readme.md").text(),
	got("https://raw.githubusercontent.com/sphido/sphido/main/packages/sphido-core/readme.md").text(),
	got("https://raw.githubusercontent.com/sphido/sphido/main/packages/sphido-frontmatter/readme.md").text(),
	got("https://raw.githubusercontent.com/sphido/sphido/main/packages/sphido-hashtags/readme.md").text(),
	got("https://raw.githubusercontent.com/sphido/sphido/main/packages/sphido-sitemap/readme.md").text(),
	got("https://raw.githubusercontent.com/sphido/sphido/main/packages/sphido-feed/readme.md").text(),
	got("https://raw.githubusercontent.com/sphido/sphido/main/packages/sphido-collections/readme.md").text(),
	got("https://raw.githubusercontent.com/sphido/sphido/main/packages/sphido-dev/readme.md").text(),
	got("https://raw.githubusercontent.com/sphido/sphido/main/packages/create-sphido/readme.md").text(),
]);

const pages = [
	{
		slug: "index.html",
		content: homeReadme,
		title: "Home",
		name: "A rocket 🚀 fast, 💭 lightweight and flexible static site 🤖 generator",
		url: "https://sphido.cz/",
		output: "public/index.html",
	},
	{
		slug: "core.html",
		content: coreReadme,
		title: "Sphido core",
		url: "https://sphido.cz/core.html",
		output: "public/core.html",
	},
	...(await getPages({ path: "content" }, slug, content)),
	{
		slug: "frontmatter.html",
		content: frontmatterReadme,
		title: "Frontmatter",
		url: "https://sphido.cz/frontmatter.html",
		output: "public/frontmatter.html",
	},
	{
		slug: "hashtags.html",
		content: hashtagsReadme,
		title: "Hashtags",
		url: "https://sphido.cz/hashtags.html",
		output: "public/hashtags.html",
	},
	{
		slug: "sitemap.html",
		content: sitemapReadme,
		title: "sitemap.xml",
		url: "https://sphido.cz/sitemap.html",
		output: "public/sitemap.html",
	},
	{
		slug: "feed.html",
		content: feedReadme,
		title: "RSS feed",
		url: "https://sphido.cz/feed.html",
		output: "public/feed.html",
	},
	{
		slug: "collections.html",
		content: collectionsReadme,
		title: "Collections",
		url: "https://sphido.cz/collections.html",
		output: "public/collections.html",
	},
	{
		slug: "dev.html",
		content: devReadme,
		title: "Dev server",
		url: "https://sphido.cz/dev.html",
		output: "public/dev.html",
	},
	{
		slug: "create.html",
		content: createReadme,
		title: "create-sphido",
		url: "https://sphido.cz/create.html",
		output: "public/create.html",
	},
];

// Generate HTML pages

const entries = [];

for (const page of allPages(pages)) {
	await writeFile(page.output, await getPageHtml(page, pages));
	entries.push({ url: page.url });
}

await writeSitemap("public/sitemap.xml", renderSitemap(entries));

// Copy static files

const files = await globby(["content/**/*.*", "!**/*.{md,html}"]);
for await (const file of files) {
	await copyFile(file, join("public", relative("content", file)));
}

await cp("static", "public", { recursive: true });
