---
title: API Docs
template: theme/docs.html
slug: .
---
 
# 🚀 API Docs


### `Sphido.getPage(file, [...extenders])` 

Returns a `page` object generated from file.

### `Sphido.getPages(files, [...extenders])`

Returns array of `page` objects from list of files.  

### `Sphido.template.addFilter(name, func, [async])`

Allow [addFilter](https://mozilla.github.io/nunjucks/api.html#getfilter) to [nunjucks](https://mozilla.github.io/nunjucks) template engine.

### `Sphido.template.render(name, [context], [callback])`

Renders the template **named** name with the **context** hash. If **callback** is provided, 
it will be called when done with any possible error as the first argument and the 
result as the second. Otherwise, the result is returned from render and 
errors are thrown. [See nunjucks docs](https://mozilla.github.io/nunjucks/api.html#render) 

### `Sphido.template.renderString(str, context, [callback])`

Same as render, but renders a raw string instead of loading a template.

### `Sphido.template.toFile(file, template, vars)`

Async function renders file **from** using a template.  

### `Sphido.template.pagination(total, perpage)`

Generate array of pages from pagination e.g. `[1, 2, 3, 4, 5]`

### `Sphido.template.extenders`

Array of default Sphido extenders.

**Filters**

* `frontmatter` - process [front-matter](https://jekyllrb.com/docs/front-matter/) 
* `htmlize` - render html from `page.content`
* `meta` - add title, slug, date and tags to `page`  

**Functions**

* `save(dir, [template])` - add save function to page expect target directory
* `excerpt(length)` - generate excerpt as shorten plain text without `<h1>`
* `url()` - return valid url from directory (`content/dir/dir2/page.md` ==> `/dir/dir2/page/`)  

### Sphido dependencies

* [nunjucks](https://mozilla.github.io/nunjucks/) - a rich and powerful templating language for JavaScript from Mozilla.
* [marked](https://marked.js.org/) - A markdown parser and compiler. Built for speed.
* [globby](https://github.com/sindresorhus/globby) - User-friendly glob matching
* [js-yaml](https://github.com/nodeca/js-yaml) - YAML Parser 
* [slugify](https://github.com/sindresorhus/slugify) - Slugify a string

