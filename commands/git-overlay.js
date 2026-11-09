// commands/git-overlay.js

const { log, run } = require("../lib/helpers");

function registerGitOverlay(program) {
	program
		.command("go <branch>")
		.description(
			"Git overlay: reset all files (working tree + index) to match the state of <branch> without changing commits",
		)
		.action((branch) => {
			log.info(`Overlaying all files from branch '${branch}'...`);
			log.dim(`  cwd: ${process.cwd()}`);
			console.log();
			try {
				run(`git restore --source=${branch} .`);
				console.log();
				log.success(`All files overlaid to match '${branch}'.`);
			} catch (err) {
				console.log();
				log.error("go failed.");
				process.exit(err.status || 1);
			}
		});
}

module.exports = { registerGitOverlay };
