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
// gco command (smart git checkout + pull)
// ────────────────────────────────────────────────

program
	.command("gco <branch>")
	.description(
		"Smart checkout: git fetch → checkout branch (creates local tracking if needed) → git pull origin/branch",
	)
	.action((branch) => {
		log.info(`Smart checkout to branch '${branch}'...`);
		log.dim(`  cwd: ${process.cwd()}`);
		console.log();

		try {
			execSync("git fetch origin", {
				stdio: "inherit",
				cwd: process.cwd(),
			});
			execSync(`git checkout ${branch}`, {
				stdio: "inherit",
				cwd: process.cwd(),
			});
			execSync(`git pull origin ${branch}`, {
				stdio: "inherit",
				cwd: process.cwd(),
			});
			console.log();
			log.success(`Now on '${branch}' and fully up-to-date.`);
		} catch (err) {
			console.log();
			log.error("gco failed.");
			process.exit(err.status || 1);
		}
	});

// ────────────────────────────────────────────────
// gr command (git restore to branch)
// ────────────────────────────────────────────────

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
			execSync(`git restore --source=${branch} .`, {
				stdio: "inherit",
				cwd: process.cwd(),
			});
			console.log();
			log.success(`All files restored to match '${branch}'.`);
		} catch (err) {
			console.log();
			log.error("gr failed.");
			process.exit(err.status || 1);
		}
	});

// ────────────────────────────────────────────────
// gu command (undo last commit, keep changes)
// ────────────────────────────────────────────────

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
			execSync("git reset --soft HEAD~1", {
				stdio: "inherit",
				cwd: process.cwd(),
			});
			console.log();
			log.success("Last commit undone — changes are back in staging.");
		} catch (err) {
			console.log();
			log.error("gu failed.");
			process.exit(err.status || 1);
		}
	});

// ────────────────────────────────────────────────
// gn command (nuke all uncommitted changes)
// ────────────────────────────────────────────────

program
	.command("gn")
	.description(
		"⚠️  Nuke ALL uncommitted changes (git reset --hard + git clean -fd)",
	)
	.action(() => {
		log.info("⚠️  Nuking ALL uncommitted changes...");
		log.dim(`  This is destructive and cannot be undone!`);
		log.dim(`  cwd: ${process.cwd()}`);
		console.log();

		try {
			execSync("git reset --hard HEAD", {
				stdio: "inherit",
				cwd: process.cwd(),
			});
			execSync("git clean -fd", {
				stdio: "inherit",
				cwd: process.cwd(),
			});
			console.log();
			log.success("Repository is now completely clean.");
		} catch (err) {
			console.log();
			log.error("gn failed.");
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
