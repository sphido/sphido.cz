import {allPages} from '@sphido/core';


export function getSidebar(pages, active) {
	let docs = [...allPages(pages)].filter(page => page.path.startsWith('content') && page.name !== '404');
	let packages = [...allPages(pages)].filter(page => page.path.startsWith('node_modules'));

	return `
		<h2 class="font-semibold dark:text-gray-500 py-3 uppercase">Docs</h2>
		
		<ul class="space-y-2 transition-all">
			${docs.map(page => `
			<li>
				<a href="${page.slug}" title="${page.title}" class="block dark:hover:bg-gray-700 hover:text-lime-300 py-2.5 px-4 rounded-md transition" data-active="${page.slug == active}">
					${page.name === 'index' ? 'Home' : page.title}
				</a>
		</li>`).join('')}	
		</ul>
		
		<h2 class="font-semibold dark:text-gray-500 py-3 uppercase">Packages</h2>
		
		<ul class="space-y-2 transition-all">
			${packages.map(page => `
			<li>
				<a href="${page.slug}" title="${page.title}" class="block dark:hover:bg-gray-700 hover:text-lime-300 py-2.5 px-4 rounded-md transition" data-active="${page.slug == active}">
					${page.name === 'index' ? 'Home' : page.title}
				</a>
		</li>`).join('')}	
		</ul>
		
	`;
}