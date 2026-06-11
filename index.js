#!/usr/bin/env node
import { cp } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import slugify from "@sindresorhus/slugify";
import { allPages, copyFile, getPages, readFile, writeFile } from "@sphido/core";
import { renderSitemap, writeSitemap } from "@sphido/sitemap";
import { globby } from "globby";
import got from "got";

import { getPageHtml } from "./src/get-html-page.js";
import { getHomeHtml } from "./src/home.js";

const RAW = "https://raw.githubusercontent.com/sphido/sphido/main";

const PACKAGES = [
	{
		name: "create",
		npm: "create-sphido",
		title: "create-sphido",
		group: "Get started",
		description: "Scaffold a working blog with one command — content, layout, sitemap and dev server included.",
		readme: "packages/create-sphido/readme.md",
	},
	{
		name: "core",
		npm: "@sphido/core",
		title: "Sphido core",
		group: "Core",
		description: "getPages() and allPages() — the whole generator, with zero runtime dependencies.",
		readme: "packages/sphido-core/readme.md",
	},
	{
		name: "frontmatter",
		npm: "@sphido/frontmatter",
		title: "Frontmatter",
		group: "Extenders",
		description: "Reads YAML front matter into page.title, page.date, page.tags and friends.",
		readme: "packages/sphido-frontmatter/readme.md",
	},
	{
		name: "hashtags",
		npm: "@sphido/hashtags",
		title: "Hashtags",
		group: "Extenders",
		description: "Turns #hashtags in content into links and collects them in page.tags.",
		readme: "packages/sphido-hashtags/readme.md",
	},
	{
		name: "sitemap",
		npm: "@sphido/sitemap",
		title: "sitemap.xml",
		group: "Components",
		description: "Pure functions that render a protocol-correct sitemap.xml from your pages tree.",
		readme: "packages/sphido-sitemap/readme.md",
	},
	{
		name: "feed",
		npm: "@sphido/feed",
		title: "RSS feed",
		group: "Components",
		description: "Valid RSS 2.0 with RFC 822 dates and atom self-link, rendered from plain objects.",
		readme: "packages/sphido-feed/readme.md",
	},
	{
		name: "collections",
		npm: "@sphido/collections",
		title: "Collections",
		group: "Helpers",
		description: "Sorting, pagination, tag pages and prev/next navigation for blogs.",
		readme: "packages/sphido-collections/readme.md",
	},
	{
		name: "dev",
		npm: "@sphido/dev",
		title: "Dev server",
		group: "Helpers",
		description: "Watch mode, static server and browser live reload around your build function.",
		readme: "packages/sphido-dev/readme.md",
	},
];

/** Latest published version from the npm registry; empty string when offline */
async function npmVersion(name) {
	try {
		const { version } = await got(`https://registry.npmjs.org/${name}/latest`).json();
		return version;
	} catch {
		return "";
	}
}

async function content(page, dirent) {
	if (dirent.isFile()) {
		page.content = await readFile(page.path);
		page.title = page.content.match(/(?<=(^#)\s).*/gm)?.pop();
		page.name = page.name || page.title;
		page.group = "Guides";
	}
}

function slug(page, dirent, path) {
	if (dirent.isFile()) {
		if (path.startsWith("content")) {
			page.slug = join("/", relative("content", dirname(page.path)), `${slugify(page.name)}.html`).slice(1);
			page.output = join("public", page.slug);
		}

		page.url = new URL(page.slug, "https://sphido.cz/").toString();
	}
}

// Package documentation pages: readme + live npm version
const packagePages = await Promise.all(
	PACKAGES.map(async (pkg) => ({
		...pkg,
		slug: `${pkg.name}.html`,
		content: await got(`${RAW}/${pkg.readme}`).text(),
		url: `https://sphido.cz/${pkg.name}.html`,
		output: `public/${pkg.name}.html`,
		version: await npmVersion(pkg.npm),
	})),
);

const pages = [...packagePages, ...(await getPages({ path: "content" }, slug, content))];

// Generate HTML pages

const entries = [{ url: "https://sphido.cz/" }];

await writeFile("public/index.html", await getHomeHtml({ packages: packagePages, url: "https://sphido.cz/" }));

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
