import {allPages} from '@sphido/core';


export function getSidebar(pages, active) {
	let docs = [...allPages(pages)].filter(page => page?.name !== '404');

	return `
		<ul class="space-y-2 transition-all mx-2 my-4">
			${docs.map(page => `
			<li>
				<a href="${page.slug}" title="${page.title}" class="flex rounded-md px-4 py-3 font-semibold hover:bg-gray-900 ${page.slug === active ? 'dark:text-lime-300 dark:bg-gray-900' : ''}" data-active="${page.slug == active}">
					${page.name === 'index' ? 'Home' : page.title}
				</a>
		</li>`).join('')}	
		</ul>
	`;
}