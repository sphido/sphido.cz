import { readFile } from "@sphido/core";

const logo = await readFile("static/sphido.svg");

/** Shared <head> content: meta, fonts, css, theme bootstrap */
export function head({ title, url, description = "A rocket fast, lightweight and flexible static site generator" }) {
	return `<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<meta name="description" content="${description}">
	<link rel="icon" href="/favicon.svg" type="image/svg+xml">
	<link rel="icon" href="/favicon.png" type="image/png">
	<script src="/theme.js"></script>
	<link rel="canonical" href="${url}" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="/sphido.css"/>
	<title>${title}</title>
	<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml"/>`;
}

/** Shared site header */
export function header() {
	return `<header class="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
		<div class="container flex h-14 items-center justify-between">
			<nav aria-label="Main" class="flex items-center gap-6">
				<a href="/" title="Homepage" class="inline-flex items-center text-foreground transition-opacity hover:opacity-80 [&_svg]:h-6 [&_svg]:w-auto">${logo}</a>
				<div class="hidden items-center gap-5 text-sm sm:flex">
					<a href="/core.html" class="text-muted-foreground transition-colors hover:text-foreground">Docs</a>
					<a href="/cookbook.html" class="text-muted-foreground transition-colors hover:text-foreground">Cookbook</a>
					<a href="/examples.html" class="text-muted-foreground transition-colors hover:text-foreground">Examples</a>
				</div>
			</nav>
			<div class="flex items-center gap-1">
				<button type="button" onclick="theme.toggle()" aria-label="Toggle light and dark theme" class="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden h-4 w-4 dark:block" aria-hidden="true" focusable="false">
						<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 dark:hidden" aria-hidden="true" focusable="false">
						<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
					</svg>
				</button>
				<a href="https://github.com/sphido/sphido" target="_blank" rel="noopener noreferrer" class="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground" aria-label="GitHub">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="h-4 w-4" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
						<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
					</svg>
				</a>
			</div>
		</div>
	</header>`;
}

/** Shared site footer */
export function footer() {
	return `<footer class="border-t border-border">
		<div class="container flex flex-col items-center justify-between gap-3 py-8 text-sm text-muted-foreground sm:flex-row">
			<p>Released under the <a href="https://github.com/sphido/sphido/blob/main/LICENSE" class="underline underline-offset-4 hover:text-foreground">MIT License</a>.</p>
			<p class="font-mono text-xs">built with sphido, obviously 🚀</p>
		</div>
	</footer>`;
}
