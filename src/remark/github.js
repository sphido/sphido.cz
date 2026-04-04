import got from "got";
import { visit } from "unist-util-visit";

export default function github(_options = {}) {
	return async (tree) => {
		const promises = [];

		visit(tree, "link", async (node, _index, parent) => {
			if (node.url.match(/https:\/\/github\.com.+\/blob\//gi) && node.url.match(/\.js$/gi)) {
				const rawUrl = node.url.replace("blob", "raw");
				const folderUrl = node.url.replace(/\/[^/]+$/, "").replace(/\/blob\//, "/tree/");

				const promise = got(rawUrl)
					.text()
					.then((code) => {
						// change the link to a code block
						node.type = "code";
						node.value = code;
						node.children = [];
						node.lang = "javascript";

						node.data = {
							hProperties: {
								className: "language-js",
							},
						};

						parent.children.push({
							type: "link",
							url: folderUrl,
							data: {
								hProperties: {
									className:
										"mt-4 inline-flex h-8 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground no-underline hover:no-underline",
									target: "_blank",
									rel: ["noopener", "noreferrer"],
								},
							},
							children: [{ type: "text", value: "View on GitHub" }],
						});
					});

				promises.push(promise);
			}
		});

		await Promise.all(promises);
	};
}
