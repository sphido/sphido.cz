import {readFile} from '@sphido/core';

const isActive = (page, current) => page.slug === current ? 'active' : '';

const svg = {
	github: await readFile('content/img/github.svg'),
	sphido: await readFile('content/img/sphido.svg'),
	heart: await readFile('content/img/heart.svg'),
};

export const getPageHtml = async ({content, title, name, slug} = {}) => `<!DOCTYPE html>
<html lang="cs" dir="ltr" class="dark">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	
	<link rel="shortcut icon" href="/favicon.ico"/>
	<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml"/>
	<meta name="google-site-verification" content="jr_C4Rk1HNubH1Szgotyz6diVKR6ZNZTetbMyWiTGOI"/>

	<!-- Google Fonts -->
	<link href="//fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"/>

	<!-- highlight.js -->	
<!--	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/monokai-sublime.min.css" integrity="sha512-/l4iViNMhxR5MhSlak3Yw/L/7qUBifVy7MpLjeJTc8BPMRFbGplGN0xqufCDwhSdxSnVgy+e/OYsNnU75K3yyQ==" crossorigin="anonymous" />-->
<!--	<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/highlight.min.js" integrity="sha512-9GIHU4rPKUMvNOHFOer5Zm2zHnZOjayOO3lZpokhhCtgt8FNlNiW/bb7kl0R5ZXfCDVPcQ8S4oBdNs92p5Nm2w==" crossorigin="anonymous"></script>	-->
<!--	<script>hljs.initHighlightingOnLoad();</script>-->

	<link rel="stylesheet" href="/sphido.css"/>

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="//www.googletagmanager.com/gtag/js?id=UA-59247808-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}

		gtag('js', new Date());
		gtag('config', 'UA-59247808-1');
	</script>

	<title>Sphido | ${title || name}</title>
</head>
<body class="dark:bg-gray-900 dark:text-gray-100">

	<header class="block container mx-auto p-4">
		<div class="flex justify-between items-center">
			<a href="/" title="Homepage" class="inline-block w-28 dark:fill-gray-50">${svg.sphido}</a>
			<ul class="flex items-center space-x-4 text-gray-300">
				<li><a href="/">Home</a></li>
				<li><a href="https://github.com/sphido/sphido" target="_blank">GitHub</a></li>
			</ul>
		</div>
	</header>

	<div class="container mx-auto grid gtid-cols-1 lg:grid-cols-[minmax(0,auto)_320px] gap-6">
		<aside class="lg:order-last">
		
		  <button type="button" class="hidden" data-toggle="collapse" data-target="#aside-menu" aria-expanded="false" aria-controls="aside-menu" aria-label="Toggle menu">
		    <img src="https://twemoji.maxcdn.com/v/13.0.1/72x72/1f354.png" alt="🍔" width="20" height="20">
		    <span>Show menu</span>
			</button>
			
			${slug}
			<div id="aside-menu">
				<ul class="space-y-2 transition-all">
					<li><a href="/" class="block dark:hover:bg-gray-700 hover:text-lime-300 py-2.5 px-4 rounded-md">Home</a></li>
					<li><a href="/sphido-core.html" class="block dark:hover:bg-gray-700 hover:text-lime-300 py-2.5 px-4 rounded-md ">Core</a></li>
					<li><a href="/sphido-frontmatter.html" class="block dark:hover:bg-gray-700 hover:text-lime-300 py-2.5 px-4 rounded-md">Frontmatter</a></li>
					<li><a href="/sphido-hashtags.html" class="block dark:hover:bg-gray-700 hover:text-lime-300 py-2.5 px-4 rounded-md">Hashtags</a></li>
					<li><a href="/sphido-hashtags.html" class="block dark:hover:bg-gray-700 hover:text-lime-300 py-2.5 px-4 rounded-md">Sitemap</a></li>
				</ul>
				
				<a href="https://github.com/sphido/sphido" target="_blank" class="block dark:fill-gray-700 dark:hover:fill-lime-300 transition mx-auto w-32 mt-24">		
					${svg.github}
				</a>
			</div>
		</aside>
		<main class="prose lg:prose-xl dark:prose-invert prose-h1:text-lime-300 prose-a:no-underline hover:prose-a:underline max-w-full dark:bg-gray-800 rounded-xl p-12">${content}</main>
	</div>
	
	<footer class="dark:text-gray-300 text-center my-12">
		<p class="fill-rose-500">
			Made with ${svg.heart} <a href="https://github.com/sphido/sphido.org" class="hover:underline">Sphido</a> by <a href="https://ozana.cz" target="_blank" class="text-reset">Roman Ožana</a>
		</p>
	</footer>
</body>
</html>`;