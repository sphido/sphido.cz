---
title: Generate RSS
slug: rss
---

# Generate `RSS`

#### Main `index.js` file
 
```js
#!/usr/bin/env node

const globby = require('globby');
const Sphido = require('../../index');

(async () => {

	// 1. Get pages from directory
	const pages = await Sphido.getPages(
		await globby('content/**/*.{md,html}'),
		...Sphido.extenders
	);

	// 2. Save them (with default template)
	for await (const page of pages) {
		await page.save(
				page.dir.replace('content', 'public')
		);
	}

	// 2.1 sort pages by date
	pages.sort((a, b) => new Date(b.date) - new Date(a.date));


	// 3. Generate RSS
	await Sphido.template.toFile(
			'public/rss.xml',
			'theme/rss.xml',
			{
				title: 'RSS Title',
				description: 'RSS Description',
				domain: 'https://example.com',
				pages: pages.slice(0, 15),
			}
	);

})();
```

#### `theme/rss.xml` template

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
	<channel>
		<title>{{title}}</title>
		<link>{{domain}}</link>
		<description>{{description}}</description>
		{% for page in pages %}
		<item>
			<title>{{page.title}}</title>
			<link>{{domain + page.url() | trim}}</link>
			<pubDate>{{page.date.toISOString()}}</pubDate>
			<description><![CDATA[{{page.content | h1strip | safe}}]]></description>
		</item>
		{% endfor %}
	</channel>
</rss>
```

Check out your results in `public/rss.xml`.

#### Modify `theme/page.html` and `theme/pages.html`

Add follow code inside your `<head>` tag:
  
```html
<link rel="alternate" type="application/rss+xml" href="/rss.xml" />
``` 

### Source code

https://github.com/sphido/sphido/tree/master/examples/rss