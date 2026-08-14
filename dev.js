#!/usr/bin/env node

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { serve } from "@sphido/dev";

const run = promisify(execFile);

// The build is two steps — pages through index.js, CSS through the Tailwind CLI
await serve({
	watch: ["content", "src", "static"],
	output: "public",
	build: async () => {
		const { stdout } = await run("pnpm", ["run", "build"], { encoding: "utf8" });
		process.stdout.write(stdout);
	},
});
