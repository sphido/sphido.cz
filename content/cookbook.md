# Cookbook

Package readmes tell you what each function does — this page shows how the packages
work together. Every recipe is a complete, runnable fragment of a build script.

## Markdown with syntax highlighting

[`@sphido/markdown`](/markdown.html) renders `page.content` as the last extender, so
everything before it still works with the markdown source. Zero config gives you GFM,
escaped raw HTML and code blocks a highlighter can pick up.

```javascript
import {allPages, getPages, writeFile} from '@sphido/core';
import {frontmatter} from '@sphido/frontmatter';
import {markdown} from '@sphido/markdown';
import {createHighlighter} from 'shiki';

const highlighter = await createHighlighter({themes: ['github-light'], langs: ['javascript']});

// a Sätteri hast plugin: swap every <pre> for Shiki's highlighted markup
const shiki = {
	name: 'shiki',
	element: {
		filter: ['pre'],
		visit(node, ctx) {
			const code = node.children?.[0];
			if (code?.type !== 'element' || code.tagName !== 'code') return;
			const lang = (code.properties?.className ?? []).map(String)
				.find((name) => name.startsWith('language-'))?.slice(9);
			ctx.replaceNode(node, {
				type: 'raw',
				value: highlighter.codeToHtml(ctx.textContent(node), {
					lang: highlighter.getLoadedLanguages().includes(lang) ? lang : 'text',
					theme: 'github-light',
				}),
			});
		},
	},
};

const pages = await getPages({path: 'content'}, frontmatter, markdown({hastPlugins: [shiki]}));

for (const page of allPages(pages)) {
	await writeFile(`public/${page.name}.html`, page.content); // already HTML
}
```

The two safe defaults are hast plugins themselves and run **before** yours, which is why
the highlighter may emit raw HTML while the author's `<script>` stays escaped.

Prefer another engine? `render` takes over completely and the rest of the extender —
file loading, skipping directories and `*.html` pages, `sanitize` — keeps working:

```javascript
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

const processor = unified().use(remarkParse).use(remarkGfm).use(remarkRehype)
	.use(rehypeSanitize).use(rehypeStringify);

markdown({render: async (md) => String(await processor.process(md))})
```

## Blog with pagination and tag pages

[`@sphido/collections`](/collections.html) covers what nearly every blog re-implements
by hand: sorting by date, paginated index pages, tag pages from `page.tags` and
previous/next links.

```javascript
import {allPages, getPages, writeFile} from '@sphido/core';
import {frontmatter} from '@sphido/frontmatter';
import {groupByTag, paginate, siblings, sortBy} from '@sphido/collections';

const pages = await getPages({path: 'content'}, frontmatter, (page) => {
	page.slug = `${page.name}.html`;
});

// newest first; posts date their pages in the YAML front matter
const posts = sortBy([...allPages(pages)], (post) => post.date, 'desc');

// paginated index: /index.html, /page/2.html, ...
for (const {items, page, prev, next} of paginate(posts, 10)) {
	const file = page === 1 ? 'public/index.html' : `public/page/${page}.html`;
	await writeFile(file, renderIndex(items, {page, prev, next}));
}

// one page per tag: /tag/javascript.html, ...
for (const [tag, tagged] of groupByTag(posts)) {
	await writeFile(`public/tag/${tag}.html`, renderIndex(tagged, {tag}));
}

// article pages with previous / next navigation
for (const post of posts) {
	const {prev, next} = siblings(posts, post);
	await writeFile(`public/${post.slug}`, renderPost(post, {prev, next}));
}
```

`renderIndex` and `renderPost` are your template functions — a template literal is
all Sphido expects.

## RSS feed from front matter

[`@sphido/feed`](/feed.html) renders a valid RSS 2.0 feed from plain objects. Reuse
the sorted `posts` from the previous recipe:

```javascript
import {renderFeed, writeFeed} from '@sphido/feed';

const items = posts.slice(0, 20).map((post) => ({
	title: post.title,
	url: new URL(post.slug, 'https://example.com').href,
	date: new Date(post.date),
	description: post.description,
}));

const xml = renderFeed({
	title: 'My Blog',
	link: 'https://example.com',
	description: 'Notes about everything',
	feedUrl: 'https://example.com/rss.xml',
}, items);

await writeFeed('public/rss.xml', xml);
```

Dates come out as RFC 822, `lastBuildDate` is taken from the newest item and
`feedUrl` adds the `atom:link rel="self"` element that feed validators expect.

## Write your own extender

An extender is just a function that gets each page during `getPages()`. No plugin
API, no registration — reading time in five lines:

```javascript
const readingTime = (page, dirent) => {
	if (dirent.isFile() && page.content) {
		page.minutes = Math.ceil(page.content.split(/\s+/).length / 200);
	}
};

const pages = await getPages({path: 'content'}, frontmatter, readingTime);
```

Order matters: `frontmatter` loads `page.content` from disk, so `readingTime` runs
after it and gets the content for free. Extenders may be sync or async.

## Dev server with live reload

[`@sphido/dev`](/dev.html) wraps any build function with a watcher, a static server
and browser reload. Export your build as a function and add a `dev.js`:

```javascript
import {serve} from '@sphido/dev';
import {build} from './build.js';

await serve({watch: ['content'], output: 'public', build});
```

Every change in `content/` rebuilds the site and reloads the browser. New projects
scaffolded with `npm create sphido` ship this setup out of the box.

## Rebuild only what changed

[`@sphido/cache`](/cache.html) answers one question — *has this page changed since the
last build?* — so a rebuild costs what changed instead of what the site contains. On
1 000 pages a no-op rebuild drops from 153 ms to 21 ms, and the gap grows with the
page count.

```javascript
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {allPages, getPages, writeFile} from '@sphido/core';
import {frontmatter} from '@sphido/frontmatter';
import {markdown} from '@sphido/markdown';
import {changed, writeCache} from '@sphido/cache';
import {layout} from './layout.js';

// the cache tracks content, not your templates — fold them into a global key
const version = createHash('sha1')
	.update(await readFile('layout.js'))
	.digest('hex');

export async function build() {
	const pages = await getPages({path: 'content'}, frontmatter, markdown());

	for (const page of allPages(pages)) {
		page.output = `public/${page.name}.html`;

		if (!(await changed(page, {version}))) continue; // output is up to date

		await writeFile(page.output, layout(page));
	}

	await writeCache({version}); // only after the build got this far
}
```

Set `page.output` **before** calling `changed()` — then a deleted output brings the page
back, so `rm -rf public` regenerates the site instead of trusting a cache that is right
about sources and wrong about results. Change `layout.js` and the new `version` marks
every page as changed.

Pair it with the dev server above and the first rebuild after a save writes one page
instead of all of them; the state stays in memory between rebuilds, so there is no cache
file to re-read per keystroke. State lives in `.sphido/cache.json` — add it to
`.gitignore`.

## Typed pages in TypeScript

Extender packages export the types they contribute, so a fully typed page is one
intersection away:

```typescript
import {getPages, type Page} from '@sphido/core';
import {frontmatter, type WithFrontmatter} from '@sphido/frontmatter';
import {hashtags, type WithHashtags} from '@sphido/hashtags';
import {markdown} from '@sphido/markdown';

type BlogPage = Page & WithFrontmatter & WithHashtags & {slug: string};

const pages = await getPages<BlogPage>({path: 'content'}, frontmatter, hashtags, (page) => {
	page.slug = `${page.name}.html`;
}, markdown());
```
