import { visit } from "unist-util-visit";
import got from "got";

export default function github(options = {}) {
	return async (tree) => {
		const promises = [];

		visit(tree, "link", async (node, index, parent) => {
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
									className: "text-base inline-flex items-center bg-green-600 hover:contrast-125 text-white font-semibold py-2 px-6 rounded-lg hover:no-underline",
									target: "_blank",
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
