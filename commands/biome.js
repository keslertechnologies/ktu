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
				run("npx @biomejs/biome format --write .");
				console.log();
				log.success("Biome done.");
			} catch (err) {
				console.log();
				log.error("Biome failed.");
				process.exit(err.status || 1);
			}
		});
}

module.exports = { registerBiome };
