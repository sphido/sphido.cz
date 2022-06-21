import Prism from 'prismjs';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-textile.js';
import 'prismjs/components/prism-markdown.js';

import {marked} from 'marked';

marked.setOptions({
	highlight: (code, lang) => {
		lang = lang || 'markdown';
		return Prism.highlight(code, Prism.languages[lang], lang);
	},
});

const renderer = {
	image: (href, title, text) => {
		const className = new URL(href, domain).hash.slice(1).replace(/_/g, ' ');
		return `<div class=" ${className ? className : 'd-flex justify-content-center my-1'}"><figure class="figure text-center w-75">
			<img src="${href}" class="figure-img img-fluid rounded" title="${title ? title : ''}" alt="${text ? text : ''}"/>		
			<figcaption class="figure-caption text-center">${text}</figcaption></figure></div>`;
	},
	link: (href, title, text) => {
		if (href.includes('sphido.org')) {
			return `<a href="${href}" title="${title ? title : ''}">${text}</a>`;
		}

		return `<a href="${href}" title="${title ? title : ''}" target="_blank">${text}</a>`;
	},
};

marked.use({renderer});

export function makdown(content) {
	return marked(content);
}