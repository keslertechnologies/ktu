// commands/update.js

const { log, run } = require("../lib/helpers");

function registerUpdate(program) {
	program
		.command("update")
		.description("Update ktu to the latest published version")
		.action(() => {
			log.info("Updating ktu...");
			console.log();
			try {
				run("npm install -g @keslers/ktu@latest");
				console.log();
				log.success("ktu updated to the latest version.");
			} catch (err) {
				console.log();
				log.error("Update failed.");
				process.exit(err.status || 1);
			}
		});
}

module.exports = { registerUpdate };
