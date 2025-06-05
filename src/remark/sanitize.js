import { defaultSchema } from "hast-util-sanitize";

// @see https://github.com/syntax-tree/hast-util-sanitize/blob/main/lib/schema.js

const schema = structuredClone(defaultSchema);

// Allow video and audio elements
schema.tagNames.push("audio");
schema.tagNames.push("video");

// Allow attributes
schema.attributes.a = ["href", "target", "rel", "className"];
schema.attributes.img = ["src", "alt", "className"];
schema.attributes.code = ["className"];
schema.attributes.span = ["className"];

export default schema;
