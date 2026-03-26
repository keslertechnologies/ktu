// commands/git-checkout.js

const { log, run } = require("../lib/helpers");

function registerGitCheckout(program) {
	program
		.command("gco <branch>")
		.description(
			"Smart checkout: git fetch → checkout branch (creates local tracking if needed) → git pull",
		)
		.action((branch) => {
			log.info(`Smart checkout to branch '${branch}'...`);
			log.dim(`  cwd: ${process.cwd()}`);
			console.log();
			try {
				run("git fetch origin");
				run(`git checkout ${branch}`);
				run(`git pull origin ${branch}`);
				console.log();
				log.success(`Now on '${branch}' and fully up-to-date.`);
			} catch (err) {
				console.log();
				log.error("gco failed.");
				process.exit(err.status || 1);
			}
		});
}

module.exports = { registerGitCheckout };
