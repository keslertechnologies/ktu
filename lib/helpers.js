// lib/helpers.js

const c = {
	reset: "\x1b[0m",
	bold: "\x1b[1m",
	green: "\x1b[32m",
	red: "\x1b[31m",
	cyan: "\x1b[36m",
	gray: "\x1b[90m",
};

const log = {
	info: (msg) => console.log(`${c.cyan}${c.bold}›${c.reset} ${msg}`),
	success: (msg) => console.log(`${c.green}${c.bold}✔${c.reset} ${msg}`),
	error: (msg) => console.error(`${c.red}${c.bold}✖${c.reset} ${msg}`),
	dim: (msg) => console.log(`${c.gray}${msg}${c.reset}`),
};

/**
 * Run a shell command synchronously with inherited stdio.
 * Throws on non-zero exit (caller handles process.exit).
 */
function run(cmd, cwd = process.cwd()) {
	const { execSync } = require("node:child_process");
	execSync(cmd, { stdio: "inherit", cwd });
}

module.exports = { log, run };
