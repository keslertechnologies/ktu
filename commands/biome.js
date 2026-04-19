// commands/biome.js

const { log, run } = require("../lib/helpers");

function registerBiome(program) {
	program
		.command("bf")
		.description(
			"Format all supported files in the current directory with Biome",
		)
		.action(() => {
			log.info("Formatting with Biome...");
			log.dim(`  cwd: ${process.cwd()}`);
			console.log();
			try {
				run(
					"npx @biomejs/biome check --write . \
					--vcs-enabled true \
					--vcs-client-kind git \
					--vcs-use-ignore-file true",
				);
				console.log();
				log.success("Biome formatting done.");
			} catch (err) {
				console.log();
				log.error("Biome formatting failed.");
				process.exit(err.status || 1);
			}
		});

	program
		.command("bi")
		.description("Initialize Biome configuration in the current directory")
		.action(() => {
			log.info("Initializing Biome...");
			log.dim(`  cwd: ${process.cwd()}`);
			console.log();

			const config = {
				root: false,
				css: {
					parser: {
						tailwindDirectives: true,
					},
				},
				assist: {
					actions: {
						source: {
							organizeImports: "on",
						},
					},
				},
			};

			try {
				const fs = require("node:fs");
				const path = require("node:path");

				const filePath = path.join(process.cwd(), "biome.json");
				fs.writeFileSync(filePath, `${JSON.stringify(config, null, 2)}\n`);

				console.log();
				log.success("Biome initialized.");
				log.dim("→ Created biome.json (Tailwind + organizeImports)");
			} catch (err) {
				console.log();
				log.error("Biome initialization failed.");
				process.exit(err.status || 1);
			}
		});
}

module.exports = { registerBiome };
