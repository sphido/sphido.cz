import { footer, head, header } from "./chrome.js";
import { markdown } from "./markdown.js";

const QUICKSTART = `import {getPages, allPages, readFile, writeFile} from '@sphido/core';
import {marked} from 'marked';

const pages = await getPages({path: 'content'}, (page) => {
	page.slug = \`\${page.name}.html\`;
});

for (const page of allPages(pages)) {
	await writeFile(\`public/\${page.slug}\`, marked(await readFile(page.path)));
}`;

const FEATURES = [
	{
		icon: "λ",
		title: "Pure functions, no framework",
		text: "Two functions and a few helpers. No config files, no plugin registry, no magic folders — your build is a script you can read in one sitting.",
	},
	{
		icon: "0",
		title: "Zero-dependency core",
		text: "@sphido/core ships with no runtime dependencies. Everything else — markdown renderer included — is your choice, not ours.",
	},
	{
		icon: "TS",
		title: "Typed pages",
		text: "Extenders export the types they contribute. Compose Page & WithFrontmatter & WithHashtags and your templates stop guessing.",
	},
	{
		icon: "⟳",
		title: "Dev server included",
		text: "@sphido/dev wraps your build with a watcher, a static server and live reload — zero dependencies, one function call.",
	},
];

function packageCard({ slug, npm, title, description, version }) {
	return `<a href="/${slug}.html" class="group relative flex flex-col gap-2 rounded-lg border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-flame/50 hover:shadow-[0_4px_24px_-8px_var(--flame-shadow)]">
		<div class="flex items-center justify-between gap-2">
			<span class="font-mono text-sm font-medium text-foreground">${npm}</span>
			${version ? `<span class="rounded-full border border-border bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">v${version}</span>` : ""}
		</div>
		<p class="text-sm leading-6 text-muted-foreground">${description}</p>
		<span class="mt-auto inline-flex items-center gap-1 pt-1 text-xs font-medium text-flame opacity-0 transition-opacity group-hover:opacity-100">${title} docs <span aria-hidden="true">→</span></span>
	</a>`;
}

export async function getHomeHtml({ packages, url }) {
	const quickstart = await markdown(`\`\`\`javascript\n${QUICKSTART}\n\`\`\``);

	return `<!DOCTYPE html>
<html lang="en" dir="ltr" class="scroll-smooth">
<head>
	${head({ title: "Sphido / A rocket fast, lightweight static site generator", url })}
</head>
<body class="flex min-h-screen flex-col bg-background text-foreground">
	${header()}

	<div class="relative overflow-hidden">
		<div class="bg-grid pointer-events-none absolute inset-0" aria-hidden="true"></div>
		<div class="glow pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[42rem] -translate-x-1/2" aria-hidden="true"></div>

		<section class="container relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
			<div class="flex max-w-xl flex-col items-start gap-6">
				<p class="reveal font-mono text-xs uppercase tracking-[0.2em] text-flame" style="--d:0s">static site generator</p>
				<h1 class="reveal font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl" style="--d:.08s">
					It&rsquo;s just <span class="text-flame">two functions</span>.
				</h1>
				<p class="reveal text-lg leading-8 text-muted-foreground" style="--d:.16s">
					<code class="font-mono text-foreground">getPages()</code> reads your content tree,
					<code class="font-mono text-foreground">allPages()</code> walks it. Everything else is
					plain JavaScript you already know. Rocket&nbsp;fast, lightweight, no&nbsp;framework.
				</p>
				<div class="reveal flex w-full flex-col gap-3 sm:flex-row sm:items-center" style="--d:.24s">
					<button type="button" onclick="navigator.clipboard.writeText('npm create sphido my-blog');this.dataset.copied='1';setTimeout(()=>delete this.dataset.copied,1600)" class="group inline-flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-flame/60" aria-label="Copy npm create sphido command">
					<span class="text-flame" aria-hidden="true">$</span>npm create sphido my-blog
					<span class="text-muted-foreground transition-colors group-hover:text-flame group-data-[copied]:hidden" aria-hidden="true">⧉</span>
					<span class="hidden text-flame group-data-[copied]:inline" aria-hidden="true">✓</span>
					</button>
					<a href="/create.html" class="inline-flex items-center justify-center rounded-lg bg-flame px-4 py-2.5 text-sm font-semibold text-flame-foreground transition-transform hover:-translate-y-px">Get started</a>
				</div>
				<div class="reveal flex items-center gap-6 font-mono text-xs text-muted-foreground" style="--d:.32s">
					<span><strong class="text-foreground">${packages.length}</strong> packages</span>
					<span><strong class="text-foreground">0</strong> deps in core</span>
					<span>Node <strong class="text-foreground">≥22</strong>, pure ESM</span>
				</div>
			</div>

			<div class="reveal code-window relative" style="--d:.2s">
				<div class="rounded-xl border border-border bg-[#1e1e1e] shadow-[0_24px_64px_-24px_rgb(0_0_0/0.5)]">
					<div class="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
						<span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
						<span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
						<span class="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
						<span class="ml-3 font-mono text-xs text-white/40">index.js — the whole build</span>
					</div>
					${quickstart}
				</div>
			</div>
		</section>
	</div>

	<section class="border-t border-border bg-muted/40">
		<div class="container grid gap-px overflow-hidden py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
			${FEATURES.map(
				({ icon, title, text }) => `<div class="flex flex-col gap-3 p-2">
				<span class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-flame/30 bg-flame/10 font-mono text-sm font-semibold text-flame">${icon}</span>
				<h3 class="font-display text-base font-semibold">${title}</h3>
				<p class="text-sm leading-6 text-muted-foreground">${text}</p>
			</div>`,
			).join("")}
		</div>
	</section>

	<section class="container py-16 sm:py-20">
		<div class="mb-8 flex items-end justify-between gap-4">
			<div>
				<h2 class="font-display text-2xl font-bold tracking-tight sm:text-3xl">Pick what you need</h2>
				<p class="mt-2 max-w-xl text-muted-foreground">A tiny core and small, single-purpose packages around it. Versions are live from the npm registry.</p>
			</div>
			<a href="/core.html" class="hidden shrink-0 text-sm font-medium text-flame hover:underline sm:block">Browse the docs →</a>
		</div>
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			${packages.map(packageCard).join("")}
		</div>
	</section>

	<section class="border-t border-border">
		<div class="container flex flex-col items-center gap-5 py-16 text-center sm:py-20">
			<h2 class="font-display text-2xl font-bold tracking-tight sm:text-3xl">Start a blog before your coffee cools down</h2>
			<p class="max-w-lg text-muted-foreground">The scaffolder sets up content, layout, hashtags, sitemap and a live-reload dev server. One command, no questions asked.</p>
			<button type="button" onclick="navigator.clipboard.writeText('npm create sphido my-blog');this.dataset.copied='1';setTimeout(()=>delete this.dataset.copied,1600)" class="group inline-flex items-center gap-3 rounded-lg border border-flame/40 bg-card px-5 py-3 font-mono text-sm transition-colors hover:border-flame" aria-label="Copy npm create sphido command">
				<span class="text-flame" aria-hidden="true">$</span>npm create sphido my-blog
				<span class="text-muted-foreground transition-colors group-hover:text-flame group-data-[copied]:hidden" aria-hidden="true">⧉</span>
				<span class="hidden text-flame group-data-[copied]:inline" aria-hidden="true">✓</span>
			</button>
			<p class="text-sm text-muted-foreground">…or follow the <a href="/cookbook.html" class="font-medium text-flame hover:underline">cookbook</a> for pagination, tags and RSS recipes.</p>
		</div>
	</section>

	${footer()}
</body>
</html>`;
}
