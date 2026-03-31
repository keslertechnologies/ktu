// commands/prettier.js

const { log, run } = require("../lib/helpers");

function registerPrettier(program) {
	program
		.command("pf")
		.description(
			"Format all supported files in the current directory with Prettier",
		)
		.action(() => {
			log.info("Formatting with Prettier...");
			log.dim(`  cwd: ${process.cwd()}`);
			console.log();
			try {
				run("npx prettier . --write --ignore-unknown");
				console.log();
				log.success("Prettier done.");
			} catch (err) {
				console.log();
				log.error("Prettier failed.");
				process.exit(err.status || 1);
			}
		});
}

module.exports = { registerPrettier };
