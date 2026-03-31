// commands/sort-package-json.js

const { log, run } = require("../lib/helpers");

function registerSortPackageJson(program) {
	program
		.command("spj")
		.description(
			"Sort all package.json files in the current and child directories (omitting node_modules)",
		)
		.action(() => {
			log.info("Sorting package.json files...");
			log.dim(`  cwd: ${process.cwd()}`);
			console.log();
			try {
				run(
					`npx sort-package-json "**/package.json" --ignore "**/node_modules/**"`,
				);
				console.log();
				log.success("Sort package.json done.");
			} catch (err) {
				console.log();
				log.error("Sort package.json failed.");
				process.exit(err.status || 1);
			}
		});
}

module.exports = { registerSortPackageJson };
