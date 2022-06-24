import {readFile} from '@sphido/core';
import {getSidebar} from './get-sidebar.js';

const svg = {
	github: await readFile('content/img/github.svg'),
	sphido: await readFile('content/img/sphido.svg'),
	heart: await readFile('content/img/heart.svg'),
};


export async function getPageHtml({content, title, name, slug} = {}, pages) {
	return `<!DOCTYPE html>
<html lang="cs" dir="ltr" class="dark">
<head>
	<meta charset="UTF-8">	
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<link rel="shortcut icon" href="/favicon.ico"/>
	<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml"/>
	<meta name="google-site-verification" content="jr_C4Rk1HNubH1Szgotyz6diVKR6ZNZTetbMyWiTGOI"/>
	<link rel="stylesheet" href="/sphido.css"/>
	<title>Sphido | ${title || name}</title>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-G4BGB8KFGJ"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	  gtag('config', 'G-G4BGB8KFGJ');
	</script>
</head>
<body class="dark:bg-gray-900 dark:text-gray-100 container my-6">
	<div class="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,auto)] gap-6">
		<aside class="border-b dark:border-gray-700 pb-6 lg:border-0">
		
			<a href="/" title="Homepage" class="block dark:fill-gray-50 mb-6 max-w-[180px] mx-auto">${svg.sphido}</a>
		
		  <button type="button" class="hidden" data-toggle="collapse" data-target="#aside-menu" aria-expanded="false" aria-controls="aside-menu" aria-label="Toggle menu">
		    <img src="https://twemoji.maxcdn.com/v/13.0.1/72x72/1f354.png" alt="🍔" width="20" height="20">
		    <span>Show menu</span>
			</button>
			
			<div id="aside-menu">
				${getSidebar(pages, slug)}
				<a href="https://github.com/sphido/sphido" target="_blank" class="hidden lg:block dark:fill-gray-700 dark:hover:fill-lime-300 transition mx-auto w-32 mt-24">		
					${svg.github}
				</a>
			</div>
		</aside>
		<main class="max-w-full lg:dark:bg-gray-800 lg:rounded-xl lg:px-24 lg:py-16">${content}</main>
	</div>
	
	<footer class="dark:text-gray-500 dark:hover:text-gray-500 text-center lg:text-right my-12">
		<p class="dark:fill-rose-500">
			Made with ${svg.heart} by <a href="https://github.com/sphido/sphido.org" class="hover:underline">Sphido</a> and <a href="https://ozana.cz" target="_blank" class="hover:underline">Roman Ožana</a>
		</p>
	</footer>
</body>
</html>`;
}