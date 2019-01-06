---
title: Sphido | A rocket fast, lightweight, static site generator
slug: '.' 
---

[<img src="/img/sphido.svg" alt="Sphido Logo" class="img-fluid w-75 my-5 d-block mx-auto">](https://github.com/sphido/sphido)


# A rocket 🚀 fast, lightweight, static site generator

## Installation

```bash 
$ npm i sphido # or
$ yarn add sphido
```

[![npm version](https://img.shields.io/npm/v/sphido.svg?style=flat)](https://npmjs.org/package/sphido "View this project on npm")



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

[![npm version](https://img.shields.io/npm/l/sphido.svg?style=flat)](https://npmjs.org/package/sphido "View this project on npm")