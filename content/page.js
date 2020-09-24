const isActive = (page, current) => page.slug === current ? 'active' : '';

module.exports = (page) => `<!DOCTYPE html>
<html lang="cs" dir="ltr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	
	<link rel="shortcut icon" href="/favicon.ico"/>
	<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml"/>
	<meta name="google-site-verification" content="jr_C4Rk1HNubH1Szgotyz6diVKR6ZNZTetbMyWiTGOI"/>

	<!-- Google Fonts -->
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"/>

	<!-- Boostrap 5 -->
	<link rel="stylesheet" href="//stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css" integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js" integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/" crossorigin="anonymous"></script>

	<!-- highlight.js -->
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/monokai-sublime.min.css">
	<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js"></script>
	<script>hljs.initHighlightingOnLoad();</script>

	<link rel="stylesheet" href="/css/style.css"/>

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


	<title>${page.title}</title>
</head>
<body class="${page.base}">

	<aside>
		
		<div class="d-flex justify-content-center my-1">
			<figure class="figure text-center w-75"><a href="https://github.com/sphido/sphido" title="" target="_blank">
				<img src="/img/sphido.svg" class="figure-img text-center img-fluid rounded" title="Sphido logo" alt="Sphido logo">		
			</figure>
		</div>
		
		
		<section class="list-group my-3">
			<a class="list-group-item list-group-item-action ${isActive(page, '.')}" href="/">🏠 Home</a>
			<a class="list-group-item list-group-item-action ${isActive(page, 'sphido-core')}" href="/packages/sphido-core">🔥 Sphido core </a>
		</section>
		
		<h4>Extenders</h4>
		
		<section class="list-group my-3">
			<a class="list-group-item list-group-item-action ${isActive(page, 'sphido-frontmatter')}" href="/packages/sphido-frontmatter">Front matter</a>
			<a class="list-group-item list-group-item-action ${isActive(page, 'sphido-markdown')}" href="/packages/sphido-markdown">Markdown content</a>
			<a class="list-group-item list-group-item-action ${isActive(page, 'sphido-meta')}" href="/packages/sphido-meta">Page meta</a>
		</section>
		
		<h4>Templating</h4>
		
		<section class="list-group my-3">
			<a class="list-group-item list-group-item-action ${isActive(page, 'sphido-nunjucks')}" href="/packages/sphido-nunjucks">Nunjucks templates</a>
		</section>
		
		<h4>Outputing</h4>
		
		<section class="list-group my-3">
			<a class="list-group-item list-group-item-action ${isActive(page, 'sphido-sitemap')}" href="/packages/sphido-sitemap">XML Sitemap</a>
			<a class="list-group-item list-group-item-action ${isActive(page, 'sphido-feed')}" href="/packages/sphido-feed">Atom feed</a>
			<a class="list-group-item list-group-item-action ${isActive(page, 'sphido-link')}" href="/packages/sphido-link">Add <code>link()</code> function</a>
			<a class="list-group-item list-group-item-action ${isActive(page, 'sphido-pagination')}" href="/packages/sphido-pagination">Pagination</a>
			<a class="list-group-item list-group-item-action ${isActive(page, 'sphido-twemoji')}" href="/packages/sphido-twemoji">Twemoji</a>
		</section>

		<h4>Examples</h4>
		<section class="list-group my-3">
			<a class="list-group-item list-group-item-action" href="https://github.com/sphido/examples/tree/master/basic">Basics</a>
			<a class="list-group-item list-group-item-action" href="https://github.com/sphido/examples/tree/master/custom-extenders">Custom extenders</a>
			<a class="list-group-item list-group-item-action" href="https://github.com/sphido/examples/tree/master/custom-extenders">Markdown to JSON</a>
		</section>
				
		<section class="github text-center mt-5">
			<a href="https://github.com/sphido/sphido" class="btn btn-lg btn-success" target="_blank">
				<img src="/img/github-white.svg" fill="#fff" width="18px" style="vertical-align: -.1em" alt="Github logo"> Get Source Code
			</a>
		</section>
	</aside>
	
	<main>${page.content}</main>
	
	<footer class="mt-5 p-5 text-center">
		<p>
			Made with
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 86 70" xml:space="preserve">
				<path fill="#D2322D" d="M78.947,5.753c-8.359-7.671-21.91-7.671-30.271,0L43,10.963l-5.678-5.21c-8.357-7.671-21.91-7.671-30.27,0c-9.404,8.631-9.404,22.624,0,31.255L43,70l35.947-32.991C88.352,28.377,88.352,14.385,78.947,5.753z"></path>
			</svg>
			on Mac by <a href="https://omdesign.cz">Roman Ožana</a>
		</p>
	</footer>
</body>
</html>`;