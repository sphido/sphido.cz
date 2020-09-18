---
title: API Docs
slug: api
---
 
# 🚀 API Docs

## [@sphido/core](https://github.com/sphido/sphido/tree/master/packages/sphido-core)

* `getPage(file, [...extenders])` - returns a `page` object generated from file.
* `getPages(files, [...extenders])` - returns array of `page` objects from list of files. 

Basic page object looks like follow:

```json
{
  "file":"path to the file",
  "dir": " directory to the file",
  "base" : "file basename without extension",
  "content": "content of file"
}
```


Pages are merged inside `getPage()` function together with `extenders`. Extender can be object or function.    

### [@sphido/frontmatter](https://github.com/sphido/sphido/tree/master/packages/sphido-frontmatter) - extender

Page extender that process [front matter](https://jekyllrb.com/docs/front-matter/) block inside content.
Using fastest YAML Parser [js-yaml](https://github.com/nodeca/js-yaml). 

### [@sphido/markdown](https://github.com/sphido/sphido/tree/master/packages/sphido-markdown) - extender

Page extender that transform `page.content` markdown to HTML with [marked](https://marked.js.org/).

### [@sphido/meta](https://github.com/sphido/sphido/tree/master/packages/sphido-meta) - extender

Page extender that add follow properties to `page` object:

* `page.title` - try detect correct title from `page.content` 
* `page.date` - detect date if is not set by date of last change 
* `page.slug` - using [slugify](https://github.com/sindresorhus/slugify) to made url safe slug
* `page.tags` - create Set from tags

### [@sphido/nunjucks](https://github.com/sphido/sphido/tree/master/packages/sphido-nunjucks) - extender/renderer

This package allow use [nunjucks](https://mozilla.github.io/nunjucks/) - a rich and powerful templating language for JavaScript from Mozilla
for rendering HTML files from page object.

Functions:

- `env.addFilter(name, func, [async])` -  allow [addFilter](https://mozilla.github.io/nunjucks/api.html#getfilter) to [nunjucks](https://mozilla.github.io/nunjucks) template engine.
- `nunjucks.render(name, [context], [callback])` - render the template see [nunjucks docs](https://mozilla.github.io/nunjucks/api.html#render)
- `nunjucks.renderString(str, context, [callback])` - 
- `renderToFile(file, template, vars = undefined)` - render the template to file

Extenders: 

- `save(dir, template = 'theme/page.html')` - function extender allow save page to file

## [@sphido/pagination](https://github.com/sphido/sphido/tree/master/packages/sphido-pagination) - generator

* `pagination(posts, [perPage = 5])` - allow paginate over pages return follow structure:

```json
{
  "posts": [ "... array of pages" ],
  "current": "number of current page",
  "pages": ["... array of other pages"]
}
```  

## Others

- [@sphido/sitemap](https://github.com/sphido/sphido/tree/master/packages/sphido-sitemap) - generate XML sitemap from `pages`.
- [@sphido/feed](https://github.com/sphido/sphido/tree/master/packages/sphido-feed) - generate RSS atom feed from `pages`.
- [@sphido/twemoji](https://github.com/sphido/sphido/tree/master/packages/sphido-twemoji) - extender that add support for https://twemoji.twitter.com/
- [@sphido/link](https://github.com/sphido/sphido/tree/master/packages/sphido-link) - extender function allow create URL link to page `page.link(domain)`

## Recommended dependencies

* [globby](https://github.com/sindresorhus/globby) - User-friendly glob matching
* [fs-extra](https://www.npmjs.com/package/fs-extra) - Add promise support to native `fs`


