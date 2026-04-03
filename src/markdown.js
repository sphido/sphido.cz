import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import github from "./remark/github.js";
import images from "./remark/images.js";
import links from "./remark/links.js";
import prism from "./remark/prism.js";

export async function markdown(content) {
	const file = await remark()
		.use(remarkHtml, { sanitize: false })
		.use(remarkGfm)
		.use(github) // github examples
		.use(links) // external links
		.use(images) // images
		.use(prism) // syntax highlighting
		.process(content);

	return String(file);
}
