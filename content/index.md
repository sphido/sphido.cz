---
title: Sphido | A rocket fast, lightweight, static site generator
slug: '.' 
---

[<img src="/img/sphido.svg" alt="Sphido Logo" class="img-fluid w-75 my-5 d-block mx-auto">](https://github.com/sphido/sphido)


# A rocket 🚀 fast, lightweight, static site generator

## Installation

```bash 
$ npm i sphido
```
</section>

## 🥕 Quick Start

```javascript
const globby = require('globby');
const Sphido = require('sphido');

(async () => {

  // 1. get list of pages	
  const pages = await Sphido.getPages(
    await globby('content/**/*.{md,html}'),
    ...Sphido.extenders
  );

  // 2. save them (with default template)
  for await (const page of pages) {
    await page.save(
        page.dir.replace('content', 'public')
    );
  }
  
})();
```


## ⭐️ Source codes

https://github.com/sphido/sphido

## 🌵 License

MIT