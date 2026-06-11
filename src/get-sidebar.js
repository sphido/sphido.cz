import { allPages } from "@sphido/core";

const GROUP_ORDER = ["Get started", "Core", "Extenders", "Components", "Helpers", "Guides"];

export function getSidebar(pages, active) {
	const docs = [...allPages(pages)].filter((page) => page?.name !== "404");

	const groups = new Map(GROUP_ORDER.map((group) => [group, []]));
	for (const page of docs) {
		(groups.get(page.group) ?? groups.get("Guides")).push(page);
	}

	return `
		<nav aria-label="Documentation" class="py-6 pr-4 md:py-8">
		${[...groups]
			.filter(([, items]) => items.length > 0)
			.map(
				([group, items]) => `
			<div class="mb-6">
				<h5 class="mb-2 px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">${group}</h5>
				<div class="flex flex-col gap-0.5 border-l border-border">
					${items
						.map(
							(page) => `
					<a href="${page.slug === "index.html" ? "/" : `/${page.slug}`}" title="${page.title}" class="-ml-px flex items-center border-l px-3 py-1.5 text-sm transition-colors ${page.slug === active ? "border-flame font-medium text-foreground" : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"}" data-active="${page.slug === active}">
						${page.name === "index" ? "Home" : page.title}
					</a>`,
						)
						.join("")}
				</div>
			</div>`,
			)
			.join("")}
		</nav>
	`;
}
