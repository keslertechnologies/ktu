// commands/git-rebase.js

const { log, run } = require("../lib/helpers");

function registerGitRebase(program) {
	program
		.command("gr <branch> <onto>")
		.description(
			"Smart rebase: git fetch → checkout + pull <onto> → checkout + pull <branch> → git rebase <onto>",
		)
		.action((branch, onto) => {
			log.info(`Rebasing '${branch}' onto '${onto}'...`);
			log.dim(`  cwd: ${process.cwd()}`);
			console.log();
			try {
				run("git fetch origin");
				run(`git checkout ${onto}`);
				run(`git pull origin ${onto}`);
				run(`git checkout ${branch}`);
				run(`git pull origin ${branch}`);
				run(`git rebase ${onto}`);
				console.log();
				log.success(`'${branch}' is up-to-date and rebased onto '${onto}'.`);
			} catch (err) {
				console.log();
				log.error("gr failed.");
				process.exit(err.status || 1);
			}
		});
}

module.exports = { registerGitRebase };
