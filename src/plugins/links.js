/** Sätteri hast plugin: open links that leave sphido.cz in a new tab */
export const links = {
	name: "external-links",
	element: {
		filter: ["a"],
		visit(node, ctx) {
			const href = node.properties?.href;
			if (typeof href !== "string" || href.includes("sphido.cz")) return;

			ctx.setProperty(node, "target", "_blank");
			ctx.setProperty(node, "rel", ["noopener", "noreferrer"]);
		},
	},
};
