import { createHighlighter } from "shiki";

// Dark Plus is the palette the site already used when the token colours were
// hand-maintained in sphido.css — same #1E1E1E / #D4D4D4 base.
const theme = "dark-plus";

const highlighter = await createHighlighter({
	themes: [theme],
	langs: ["javascript", "typescript", "json", "bash", "shell", "markdown", "css", "html", "yaml"],
});

/**
 * Keep the `language-*` class on `<code>` (Shiki drops it) and let sphido.css
 * own the frame instead of Shiki's inline `<pre>` colours.
 */
const conventions = {
	name: "sphido-conventions",
	code(node) {
		this.addClassToHast(node, `language-${this.options.lang}`);
	},
	pre(node) {
		delete node.properties.style;
	},
};

/** Highlight a code block; an unknown language stays plain text */
export function highlight(code, lang) {
	const language = lang && highlighter.getLoadedLanguages().includes(lang) ? lang : "text";
	return highlighter.codeToHtml(code, { lang: language, theme, transformers: [conventions] });
}

/** Sätteri mdast plugin: replace fenced code blocks with highlighted markup */
export const shiki = {
	name: "shiki",
	code(node, ctx) {
		ctx.replaceNode(node, { rawHtml: highlight(node.value, node.lang) });
	},
};
