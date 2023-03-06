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
		if (href.includes('img.shields.io')) {
			return `<img src="${href}" class="inline my-2 mx-0.5 rounded-sm" title="${title ? title : ''}" alt="${text ? text : ''}"/>`;
		} else {
			const className = new URL(href, 'https://sphido.org').hash.slice(1).replace(/_/g, ' ');
			return `<div class="${className ? className : 'd-flex justify-content-center my-1'}"><figure class="text-center">
			<img src="${href}" class="max-w-full h-auto" title="${title ? title : ''}" alt="${text ? text : ''}"/>		
			<figcaption class="italic">${text}</figcaption></figure></div>`;
		}
	},
	link: (href, title, text) => {
		if (href.includes('sphido.org')) {
			return `<a href="${href}" title="${title ? title : ''}">${text}</a>`;
		}

		return `<a href="${href}" title="${title ? title : ''}" target="_blank">${text}</a>`;
	},
};


const extensions = [
	{
		name: 'note',
		level: 'block',
		start(src) {
			return src.match(/:::(.+)\s+(.+)\s+:::/)?.index;
		},
		tokenizer(src, tokens) {
			const rule = /^:::(.+)\s+(.+)\s+:::/gi;
			const match = rule.exec(src);

			if (match) {
				const token = {
					type: 'note',
					raw: match[0],
					text: match[2].trim(),
					note: match[1],
					tokens: [],
				};
				this.lexer.inline(token.text, token.tokens);
				return token;
			}
		},
		renderer(token) {
			return `<div class="${token.type} ${token.note}">${this.parser.parseInline(token.tokens)}</div>`; // parseInline to turn child tokens into HTML
		},
	},
];


marked.use({renderer, extensions});

export {marked};