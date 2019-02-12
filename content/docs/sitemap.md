---
title: Generate sitemap.xml
slug: sitemap
---

# Generate `sitemap.xml`

Create an XML sitemap file that can be submitted to Google, Bing and other search engines to help them crawl your website better.


#### Main `index.js` file
 
```js
const Sphido = require('sphido');
const globby = require('globby');

(async () => {
  // 1. Get pages from directory
  const pages = await Sphido.getPages(await globby('content/**/*.md'), ...Sphido.extenders);
  
  // 2. save them (with default template)
  for await (const page of pages) {
      await page.save(
        page.dir.replace('content', 'public')
      );
  }
  
  // 3.  Generate sitemap.xml
  await Sphido.template.toFile(
      'public/sitemap.xml',
      'theme/sitemap.xml',
      {
        pages: pages,  
        domain: 'https://example.com'
      }
  );
})();
```

#### `theme/sitemap.xml` template

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	{% for page in pages %}
	<url>
		<loc>{{domain + page.url() | trim}}</loc>
		<lastmod>{{page.date.toISOString()}}</lastmod>
		<priority>{{ '1.00' if page.url() === '/' else '0.80'}}</priority>
	</url>
	{% endfor %}
</urlset>
```

Check out [your results](/sitemap.xml) in `public/sitemap.xml`.

#### Modify `theme/page.html` and `theme/pages.html`

Add follow code inside your `<head>` tag:
  
```html
<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
``` 


### Source code

https://github.com/sphido/sphido/tree/master/examples/sitemap

### Submit Your Sitemap

* [Google - Search console](https://search.google.com/search-console/about)
* [Bing - Webmaster Tools](https://www.bing.com/toolbox/webmaster)
