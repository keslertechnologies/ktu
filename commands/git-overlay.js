// commands/git-restore.js

const { log, run } = require("../lib/helpers");

function registerGitRestore(program) {
	program
		.command("gr <branch>")
		.description(
			"Reset all files (working tree + index) to match the state of <branch> without changing commits",
		)
		.action((branch) => {
			log.info(`Restoring all files to branch '${branch}'...`);
			log.dim(`  cwd: ${process.cwd()}`);
			console.log();
			try {
				run(`git restore --source=${branch} .`);
				console.log();
				log.success(`All files restored to match '${branch}'.`);
			} catch (err) {
				console.log();
				log.error("gr failed.");
				process.exit(err.status || 1);
			}
		});
}

module.exports = { registerGitRestore };
