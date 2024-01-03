import {visit} from 'unist-util-visit';
import got from 'got';

export default function links(options = {}) {

	return tree => {
		visit(tree, 'link', (node) => {
			// external links
			if (!node.url.includes('sphido.cz')) {

				const hProperties = node.data?.hProperties ?? {};

				// add noopener and noreferrer to external links
				hProperties.target = '_blank';
				hProperties.rel = ['noopener', 'noreferrer'];

				node.data = {hProperties};
			}
		});
	};
}