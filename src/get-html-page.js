import { footer, head, header } from "./chrome.js";
import { getSidebar } from "./get-sidebar.js";
import { markdown } from "./markdown.js";

/** Docs page header with npm metadata — only for package pages */
function packageMeta({ npm, version }) {
	if (!npm) return "";
	return `<div class="not-prose mb-8 flex flex-wrap items-center gap-2 border-b border-border pb-6 font-mono text-xs">
		<a href="https://www.npmjs.com/package/${npm}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-muted-foreground transition-colors hover:border-flame/50 hover:text-foreground">
			<svg viewBox="0 0 24 24" class="h-3 w-3 fill-current" aria-hidden="true"><path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/></svg>
			${npm}${version ? ` <span class="text-flame">v${version}</span>` : ""}
		</a>
		<button type="button" onclick="navigator.clipboard.writeText('pnpm add ${npm}');this.dataset.copied='1';setTimeout(()=>delete this.dataset.copied,1600)" class="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-muted-foreground transition-colors hover:border-flame/50 hover:text-foreground" aria-label="Copy install command">
			<span class="text-flame" aria-hidden="true">$</span>pnpm add ${npm}
			<span class="group-data-[copied]:hidden" aria-hidden="true">⧉</span>
			<span class="hidden text-flame group-data-[copied]:inline" aria-hidden="true">✓</span>
		</button>
		<a href="https://github.com/sphido/sphido/tree/main/packages/${npm.startsWith("@sphido/") ? `sphido-${npm.slice(8)}` : npm}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-muted-foreground transition-colors hover:border-flame/50 hover:text-foreground">source</a>
	</div>`;
}

export async function getPageHtml(page, pages) {
	const { content, title, name, slug, url } = page;

	return `<!DOCTYPE html>
<html lang="en" dir="ltr" class="scroll-smooth">
<head>
	${head({ title: `Sphido / ${title || name}`, url })}
</head>
<body class="flex min-h-screen flex-col bg-background text-foreground">
	${header()}
	<div class="container flex min-h-0 flex-1 flex-col">
	<div class="flex min-h-0 flex-1 flex-col md:flex-row md:gap-0">
		<aside class="w-full shrink-0 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:w-56 md:overflow-y-auto lg:w-64">
			${getSidebar(pages, slug)}
		</aside>

		<div class="min-w-0 flex-1">
			<main class="w-full max-w-3xl px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
				${packageMeta(page)}
				${await markdown(content)}
			</main>
		</div>
	</div>
	</div>
	${footer()}
</body>
</html>`;
}
