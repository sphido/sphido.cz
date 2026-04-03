import { allPages } from "@sphido/core";

export function getSidebar(pages, active) {
	const docs = [...allPages(pages)].filter((page) => page?.name !== "404");

	return `
		<nav aria-label="Documentation" class="py-6 pr-4 md:py-8">
		<div class="flex flex-col gap-1">
			${docs
				.map(
					(page) => `
				<a href="${page.slug === "index.html" ? "/" : page.slug}" title="${page.title}" class="group flex items-center rounded-md px-3 py-1.5 text-sm transition-colors ${page.slug === active ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"}" data-active="${page.slug === active}">
					${page.name === "index" ? "Home" : page.title}
				</a>`,
				)
				.join("")}
		</div>
		</nav>
	`;
}
