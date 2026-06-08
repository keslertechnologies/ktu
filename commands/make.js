// commands/make.js

const path = require("node:path");
const { log, run } = require("../lib/helpers");

function registerMake(program) {
	program
		.command("mit")
		.description("Run make integration-test")
		.argument("[folder]", "folder to run in (default: cwd)")
		.action((folder) => {
			const cwd = folder ? path.resolve(process.cwd(), folder) : process.cwd();
			log.info("Running integration tests...");
			log.dim(`  cwd: ${cwd}`);
			console.log();
			try {
				run("make integration-test", cwd);
				console.log();
				log.success("Integration tests passed.");
			} catch (err) {
				console.log();
				log.error("Integration tests failed.");
				process.exit(err.status || 1);
			}
		});

	program
		.command("mut")
		.description("Run make unit-test")
		.argument("[folder]", "folder to run in (default: cwd)")
		.action((folder) => {
			const cwd = folder ? path.resolve(process.cwd(), folder) : process.cwd();
			log.info("Running unit tests...");
			log.dim(`  cwd: ${cwd}`);
			console.log();
			try {
				run("make unit-test", cwd);
				console.log();
				log.success("Unit tests passed.");
			} catch (err) {
				console.log();
				log.error("Unit tests failed.");
				process.exit(err.status || 1);
			}
		});
}

module.exports = { registerMake };
