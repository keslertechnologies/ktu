// commands/git-fixup.js

const { execSync } = require("node:child_process");
const { log } = require("../lib/helpers");

function registerGitFixup(program) {
	program
		.command("gf <n>")
		.description(
			"Fixup the last n commits into the one before them (non-interactive rebase).\n" +
				"  Equivalent to: git rebase -i HEAD~(n+1) with the last n commits set to fixup.",
		)
		.action((nStr) => {
			const n = parseInt(nStr, 10);
			if (Number.isNaN(n) || n < 1) {
				log.error("gf requires a positive integer.");
				process.exit(1);
			}

			log.info(`Fixing up last ${n} commit${n === 1 ? "" : "s"}...`);
			log.dim(`  cwd: ${process.cwd()}`);
			console.log();

			try {
				execSync(`git rebase -i HEAD~${n + 1}`, {
					stdio: "inherit",
					cwd: process.cwd(),
					env: {
						...process.env,
						GIT_SEQUENCE_EDITOR: `sed -i '2,${n + 1}s/^pick/fixup/'`,
					},
				});
				console.log();
				log.success(`Fixed up ${n} commit${n === 1 ? "" : "s"}.`);
			} catch (err) {
				console.log();
				log.error("gf failed.");
				process.exit(err.status || 1);
			}
		});
}

module.exports = { registerGitFixup };
