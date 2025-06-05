import { visit } from "unist-util-visit";
import Prism from "prismjs";
import "prismjs/components/prism-json.js";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-textile.js";
import "prismjs/components/prism-markdown.js";

export default function prism(options = {}) {
	return (tree) =>
		visit(tree, "code", (node, index, parent) => {
			const lang = node.lang || "markdown";
			node.type = "html";
			node.value = `<pre><code class="language-${lang}">${Prism.highlight(node.value, Prism.languages[lang], lang)}</code></pre>`;

			// lang = lang || 'markdown';
			// return Prism.highlight(code, Prism.languages[lang], lang);
			// if (
			// 	parent.tagName === 'pre' &&
			// 	node.tagName === 'code'
			// ) {
			//
			// 	node.type = 'html';
			// 	node.value = Prism.highlight(node.children[0].value, Prism.languages[node.properties.className[0].replace('language-', '')], node.properties.className[0].replace('language-', ''));
			// }
		});
}
