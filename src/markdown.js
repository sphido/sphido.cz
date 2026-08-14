import { createRenderer } from "@sphido/markdown";
import { github } from "./plugins/github.js";
import { images } from "./plugins/images.js";
import { links } from "./plugins/links.js";
import { shiki } from "./plugins/shiki.js";

// The site renders its own readmes, so raw HTML passes through the way it did
// under remark-html({sanitize: false}).
const render = createRenderer({
	allowHtml: true,
	mdastPlugins: [github, shiki],
	hastPlugins: [links, images],
});

export async function markdown(content) {
	return render(content);
}
