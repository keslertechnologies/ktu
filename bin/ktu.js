#!/usr/bin/env node
// bin/ktu.js

const { Command } = require("commander");
const { execSync } = require("child_process");
const packageJson = require("../package.json");

// ────────────────────────────────────────────────
// Logging helpers
// ────────────────────────────────────────────────

const c = {
	reset: "\x1b[0m",
	bold: "\x1b[1m",
	dim: "\x1b[2m",
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

// ────────────────────────────────────────────────
// Program
// ────────────────────────────────────────────────

const program = new Command();

program
	.name("ktu")
	.description(packageJson.description)
	.version(packageJson.version);

// ────────────────────────────────────────────────
// pf command (Prettier)
// ────────────────────────────────────────────────

program
	.command("pf")
	.description(
		"Format all supported files in the current directory with Prettier",
	)
	.action(() => {
		log.info("Formatting with Prettier...");
		log.dim(`  cwd: ${process.cwd()}`);
		console.log();

		try {
			execSync("npx prettier . --write --ignore-unknown", {
				stdio: "inherit",
				cwd: process.cwd(),
			});
			console.log();
			log.success("Prettier done.");
		} catch (err) {
			console.log();
			log.error("Prettier failed.");
			process.exit(err.status || 1);
		}
	});

// ────────────────────────────────────────────────
// bf command (Biome)
// ────────────────────────────────────────────────

program
	.command("bf")
	.description("Format all supported files in the current directory with Biome")
	.action(() => {
		log.info("Formatting with Biome...");
		log.dim(`  cwd: ${process.cwd()}`);
		console.log();

		try {
			execSync("npx @biomejs/biome format --write .", {
				stdio: "inherit",
				cwd: process.cwd(),
			});
			console.log();
			log.success("Biome done.");
		} catch (err) {
			console.log();
			log.error("Biome failed.");
			process.exit(err.status || 1);
		}
	});

// ────────────────────────────────────────────────
// Catch-all for unknown commands
// ────────────────────────────────────────────────

program.parse(process.argv);

if (!process.argv.slice(2).length) {
	program.outputHelp({ error: true });
	process.exit(1);
}
