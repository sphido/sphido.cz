import { allPages } from "@sphido/core";

export function getSidebar(pages, active) {
	const docs = [...allPages(pages)].filter((page) => page?.name !== "404");

	return `
		<ul>
			${docs
				.map(
					(page) => `
			<li>
				<a href="${page.slug}" title="${page.title}" class="flex px-3 py-3.5 hover:text-sky-600 dark:hover:text-sky-500 ${page.slug === active ? "font-semibold text-sky-600 dark:text-sky-500" : ""}" data-active="${page.slug === active}">
					${page.name === "index" ? "Home" : page.title}
				</a>
		</li>`,
				)
				.join("")}
		</ul>
	`;
}
