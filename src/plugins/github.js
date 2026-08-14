import got from "got";
import { highlight } from "./shiki.js";

const buttonClass =
	"mt-4 inline-flex h-8 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground no-underline hover:no-underline";

/**
 * Sätteri mdast plugin: a link to a `*.js` file on GitHub becomes the file
 * itself — highlighted — followed by a button back to its folder.
 */
export const github = {
	name: "github-examples",
	async link(node, ctx) {
		if (!/https:\/\/github\.com.+\/blob\//i.test(node.url) || !/\.js$/i.test(node.url)) return;

		const code = await got(node.url.replace("blob", "raw")).text();
		const folder = node.url.replace(/\/[^/]+$/, "").replace(/\/blob\//, "/tree/");

		ctx.replaceNode(node, {
			rawHtml: `${highlight(code, "javascript")}<a href="${folder}" class="${buttonClass}" target="_blank" rel="noopener noreferrer">View on GitHub</a>`,
		});
	},
};
