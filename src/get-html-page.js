import {readFile} from '@sphido/core';
import {getSidebar} from './get-sidebar.js';
import {marked} from 'marked';

const logo = await readFile('content/img/sphido.svg');


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
	<title>Sphido / ${title || name}</title>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-G4BGB8KFGJ"></script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}

		gtag('js', new Date());
		gtag('config', 'G-G4BGB8KFGJ');
	</script>
</head>
<body class="antialiased leading-normal tracking-normal dark:bg-gray-800 dark:text-gray-100">

	<header class="flex flex-wrap items-center justify-between mx-auto bg-gray-50 dark:bg-gray-900 px-6 py-3 sticky top-0 z-50">
		<a href="/" title="Homepage" class="flex h-8 dark:fill-white">${logo}</a>
		<div>
			<ul class="flex flex-col md:flex-row gap-4">
				<li>
					<a href="https://github.com/sphido/sphido" target="_blank" class="hover:text-sky-300 hover:underline transition">GitHub</a>
				</li>
			</ul>
		</div>
	</header>
	
	<div class="grid grid-cols-1 lg:grid-cols-[340px,minmax(0,auto)] gap-4 lg:gap-6 min-h-screen">
		<aside class="border-r dark:border-gray-900">
			<div id="aside-menu">
				<button type="button" class="hidden" data-toggle="collapse" data-target="#aside-menu" aria-expanded="false" aria-controls="aside-menu" aria-label="Toggle menu">
					<img src="https://twemoji.maxcdn.com/v/13.0.1/72x72/1f354.png" alt="🍔" width="20" height="20">
					<span>Show menu</span>
				</button>
				${getSidebar(pages, slug)}
			</div>		
		</aside>
		<main>
			${marked(content)}
		</main>
	</div>

	<footer class="dark:text-gray-500 dark:hover:text-gray-500 text-center lg:text-right my-12"></footer>
</body>
</html>`;
}