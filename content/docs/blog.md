---
title: Blog
template: theme/docs.html
---

# How to generate blog with Sphido

## Prepare new project

Install [Sphido](https://www.npmjs.com/package/sphido) package and create `theme` and `content` folders:  

```bash
$ npm i sphido
$ mkdir theme content
```

## ☔️ Javascript

Create `index.js` with following code:

```javascript
const globby = require('globby');
const Sphido = require('sphido');
  
(async () => {
  // ...
  // following code goes here
  // ...
})();  	  
```

1. load all html/md pages from `content` dir: 

   ```
    const pages = await Sphido.getPages(
     await globby('content/**/*.{md,html}'),
     ...Sphido.extenders
   );
   ```

2. save pages one by one to `public` folder:
   
   ```javascript
   for await (const page of pages) {
     await page.save(
       page.dir.replace('content', 'public')
     );
   }
   ```

3. sort all pages by date:

   ```javascript       
   pages.sort((a, b) => new Date(b.date) - new Date(a.date));
   ```

4. Prepare pagination for posts: 
 
   ```javascript
   const postPerPage = 5; // 5 posts per page
   const pagination = Sphido.pagination(pages.length, postPerPage);
   ```

5. generate individual pages - first page will be save to `public/index.html`, all others goes to the `page` folder:

   ```javascript
   for await (let current of pagination) {
     await Sphido.render.toFile(    
       current === 1 ? 'public/index.html' : join('public/page/', current.toString(), 'index.html'),
       'theme/pages.html',
         {
           pages: posts.slice(postPerPage * (current - 1), current * postPerPage),
           pagination: pagination,
           current: current,
         }
     )
   }
   ``` 

## 💄 Template

[Sphido](https://sphido.org) using [nunjucks](https://mozilla.github.io/nunjucks/) - a rich and powerful templating language for JavaScript from Mozilla.

First create empty templates `theme/page.html` and `theme/pages.html`:

```bash
$ echo "{{page | dump(1)}}" > theme/page.html 
$ echo "{{pages | dump(1)}}" > theme/pages.html
``` 


```html
{% for page in pages %}
  <article class="{{page.slug}}">
   <h2><a href="{{ page.url() }}">{{ page.title }}</a></h2>
   {{ page.content | h1strip | safe }}
  </article>
{% endfor %}
```

Add follow code to `theme/pages.html` to generate page navigation:
 
```html
{% if pagination %}
<nav>
  <ul>
    {% for page in pagination %}
    <li class="{{'active' if page === current}}">
      <a href="/{{'page/' + page if page > 1 }}">{{page}}</a>
    </li>
   {% endfor %}
  </ul>
</nav>
{% endif %}

```

## 🦄 run... 

`node index.js` and view `public` folder

## 🔗 Links &amp; code

* [index.js](https://github.com/OzzyCzech/blog.omdesign.cz/blob/master/index.js)
* [theme/page.html](https://github.com/OzzyCzech/blog.omdesign.cz/blob/master/theme/page.html)
* [theme/pages.html](https://github.com/OzzyCzech/blog.omdesign.cz/blob/master/theme/pages.html)
* [Nunjucks docs](https://mozilla.github.io/nunjucks/templating.html)

or follow pages 

* [blog.omdesign.cz](https://github.com/OzzyCzech/blog.omdesign.cz)
* [sphido.org](https://github.com/sphido/sphido.org)

