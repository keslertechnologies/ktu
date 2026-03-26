#!/usr/bin/env node
// bin/ktu.js

const { Command } = require("commander");
const packageJson = require("../package.json");

const { registerFormat } = require("../commands/format");
const { registerGitCheckout } = require("../commands/git-checkout");
const { registerGitRestore } = require("../commands/git-restore");
const { registerGitUndo } = require("../commands/git-undo");
const { registerGitNuke } = require("../commands/git-nuke");

const program = new Command();

program
	.name("ktu")
	.description(packageJson.description)
	.version(packageJson.version);

registerFormat(program);
registerGitCheckout(program);
registerGitRestore(program);
registerGitUndo(program);
registerGitNuke(program);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
	program.outputHelp({ error: true });
	process.exit(1);
}
