import {readFile} from '@sphido/core';
import {getSidebar} from './get-sidebar.js';
import {markdown} from './markdown.js';

const logo = await readFile('static/sphido.svg');

export async function getPageHtml({content, title, name, slug, url} = {}, pages) {
  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<link rel="shortcut icon" href="/favicon.ico"/>
	<script src="/theme.js"></script>
	<link rel="canonical" href="${url}" />
	<link rel="stylesheet" href="/sphido.css"/>
	<title>Sphido / ${title || name}</title>
	<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml"/>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-YXS0BVJ766"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-YXS0BVJ766');
	</script>
</head>
<body class="antialiased leading-normal tracking-normal dark:bg-gray-950 dark:text-gray-200 dark:selection:bg-sky-950">
	<header class="sticky top-0 z-40 backdrop-blur">
		<div class="container p-4 flex flex-wrap items-center justify-between mx-auto">
			<nav>
				<a href="/" title="Homepage" class="flex h-10 text-gray-950 dark:text-gray-100">${logo}</a>
			</nav>
			<div class="flex gap-4 items-center">
				<button type="button" onclick="theme.toggle()">
					 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hidden dark:block">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:hidden">
						<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
					</svg>
				</button>
				<a href="https://github.com/sphido/sphido" target="_blank" class="inline-flex items-center bg-green-600 hover:contrast-125 text-white font-semibold py-2 px-6 rounded-lg">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-5 h-5 mr-2" viewBox="0 0 16 16">
						<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
					</svg>
					<span class="hidden md:inline">GitHub</span>
				</a>
			</div>
		</div>
	</header>
	
	<div class="container px-4 mx-auto min-h-screen">
		<div class="grid grid-cols-1 lg:grid-cols-[320px,minmax(0,auto)] gap-4 lg:gap-6 min-h-screen">
			<aside class="">
				${getSidebar(pages, slug)}
			</aside>
			<main>
				${await markdown(content, title)}
			</main>
		</div>
	</div>	
</body>
</html>`;
}