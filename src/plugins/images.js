/** Sätteri hast plugin: shields.io badges belong inline, not on their own line */
export const images = {
	name: "shields-images",
	element: {
		filter: ["img"],
		visit(node, ctx) {
			const src = node.properties?.src;
			if (typeof src !== "string" || !src.includes("img.shields.io")) return;

			ctx.setProperty(node, "className", ["inline", "my-2", "mx-0.5", "rounded-sm"]);
		},
	},
};
