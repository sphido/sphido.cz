import { visit } from "unist-util-visit";

export default function images(options = {}) {
	return (tree) => {
		visit(tree, "image", (node) => {
			// shields.io images should be inline
			if (node.url.includes("img.shields.io")) {
				const hProperties = node.data?.hProperties ?? {};
				hProperties.className = "inline my-2 mx-0.5 rounded-sm";
				node.data = { hProperties };
			}
		});
	};
}
