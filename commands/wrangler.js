// commands/wrangler.js

const { log, run } = require("../lib/helpers");

const BUILD_CMD =
	"npx tsc -b && npx vite build && rm -f dist/mockServiceWorker.js";
const DEPLOY_CMD = "wrangler pages deploy dist/";
const CLEAN_CMD =
	"wrangler pages deployment list --json | jq -r '[.[] | select(.Id != null and (.Status | test(\"month|year\")))] | .[].Id' | xargs -r -I {} wrangler pages deployment delete {} --force";

function registerWranglerPages(program) {
	program
		.command("wp [subcommand]")
		.description(
			"Wrangler Pages commands. Subcommands: build, deploy, clean (default: all three in order)",
		)
		.action((subcommand) => {
			try {
				switch (subcommand) {
					case undefined:
						log.info(
							"Running wrangler pages pipeline: build → deploy → clean...",
						);
						log.dim(`  cwd: ${process.cwd()}`);
						console.log();
						run(BUILD_CMD);
						run(DEPLOY_CMD);
						run(CLEAN_CMD);
						console.log();
						log.success("Build, deploy, and clean completed.");
						break;
					case "build":
						log.info("Building...");
						log.dim(`  cwd: ${process.cwd()}`);
						console.log();
						run(BUILD_CMD);
						console.log();
						log.success("Build completed.");
						break;
					case "deploy":
						log.info("Deploying to Cloudflare Pages...");
						log.dim(`  cwd: ${process.cwd()}`);
						console.log();
						run(DEPLOY_CMD);
						console.log();
						log.success("Deployed successfully.");
						break;
					case "clean":
						log.info("Cleaning old deployments...");
						log.dim(`  cwd: ${process.cwd()}`);
						console.log();
						run(CLEAN_CMD);
						console.log();
						log.success("Old deployments cleaned.");
						break;
					default:
						log.error(
							`Unknown subcommand "${subcommand}". Valid options: build, deploy, clean`,
						);
						process.exit(1);
				}
			} catch (err) {
				console.log();
				log.error("wp failed.");
				process.exit(err.status || 1);
			}
		});
}

module.exports = { registerWranglerPages };
