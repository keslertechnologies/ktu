// commands/git-nuke.js

const { log, run } = require("../lib/helpers");

function registerGitNuke(program) {
	program
		.command("gn [branch]")
		.description(
			"⚠️  Nuke ALL uncommitted changes (reset --hard + clean -fd).\n" +
				"  If [branch] is provided: also fetch origin, checkout that branch, and pull — " +
				"the most destructive form of gco.",
		)
		.action((branch) => {
			if (branch) {
				log.info(
					`⚠️  Nuking ALL uncommitted changes and switching to '${branch}'...`,
				);
				log.dim(
					`  This will discard every local change and replace your working tree.`,
				);
			} else {
				log.info("⚠️  Nuking ALL uncommitted changes...");
				log.dim(`  This is destructive and cannot be undone!`);
			}
			log.dim(`  cwd: ${process.cwd()}`);
			console.log();

			try {
				// Always: wipe the working tree
				run("git reset --hard HEAD");
				run("git clean -fd");

				if (branch) {
					// Destructive gco: fetch, checkout, pull
					run("git fetch origin");
					run(`git checkout ${branch}`);
					run(`git pull origin ${branch}`);
					console.log();
					log.success(
						`Repository nuked and now on '${branch}', fully up-to-date.`,
					);
				} else {
					console.log();
					log.success("Repository is now completely clean.");
				}
			} catch (err) {
				console.log();
				log.error("gn failed.");
				process.exit(err.status || 1);
			}
		});
}

module.exports = { registerGitNuke };
