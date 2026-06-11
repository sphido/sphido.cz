# Cookbook

Package readmes tell you what each function does — this page shows how the packages
work together. Every recipe is a complete, runnable fragment of a build script.

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

## Typed pages in TypeScript

Extender packages export the types they contribute, so a fully typed page is one
intersection away:

```typescript
import {getPages, type Page} from '@sphido/core';
import {frontmatter, type WithFrontmatter} from '@sphido/frontmatter';
import {hashtags, type WithHashtags} from '@sphido/hashtags';

type BlogPage = Page & WithFrontmatter & WithHashtags & {slug: string};

const pages = await getPages<BlogPage>({path: 'content'}, frontmatter, hashtags, (page) => {
	page.slug = `${page.name}.html`;
});
```
