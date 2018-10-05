---
title: Generate sitemap.xml
template: theme/docs.html
slug: sitemap
---

# Generate `sitemap.xml`

Create an XML sitemap file that can be submitted to Google, Bing and other search engines to help them crawl your website better.


#### Main `index.js` file
 
```js
const Sphido = require('sphido');
const globby = require('globby');

(async () => {

  try {
    
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
          date: new Date().toISOString(), 
          domain: 'https://example.com'
        }
    );

  } catch (e) {
    console.error(e);
  }
  
})();
```

#### `theme/sitemap.xml` template

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>{{domain}}</loc>
    <lastmod>{{date}}</lastmod>
    <priority>1.0</priority>
  </url>
  {% for page in pages %}
  <url>
    <loc>{{domain + page.url() | trim}}</loc>
    <lastmod>{{page.date.toISOString()}}</lastmod>
    <priority>0.80</priority>
  </url>
  {% endfor %}
</urlset>
```

Check out your [results](/sitemap.xml)...

#### Modify `theme/page.html` and `theme/pages.html`

Add follow code inside your `<head>` tag:
  
```html
<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
``` 

### Submit Your Sitemap

* [Google - Search console](https://search.google.com/search-console/about)
* [Bing - Webmaster Tools](https://www.bing.com/toolbox/webmaster)
