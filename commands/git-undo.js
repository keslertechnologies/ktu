// commands/git-undo.js

const { log, run } = require("../lib/helpers");

function registerGitUndo(program) {
	program
		.command("gu")
		.description(
			"Undo the last commit but keep all changes staged (git reset --soft HEAD~1)",
		)
		.action(() => {
			log.info("Undoing last commit (keeping changes)...");
			log.dim(`  cwd: ${process.cwd()}`);
			console.log();
			try {
				run("git reset --soft HEAD~1");
				console.log();
				log.success("Last commit undone — changes are back in staging.");
			} catch (err) {
				console.log();
				log.error("gu failed.");
				process.exit(err.status || 1);
			}
		});
}

module.exports = { registerGitUndo };
