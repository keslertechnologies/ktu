#!/usr/bin/env node
// bin/ktu.js

const { Command } = require("commander");
const packageJson = require("../package.json");

const { registerPrettier } = require("../commands/prettier");
const { registerBiome } = require("../commands/biome");
const { registerGitCheckout } = require("../commands/git-checkout");
const { registerGitRestore } = require("../commands/git-restore");
const { registerGitUndo } = require("../commands/git-undo");
const { registerGitNuke } = require("../commands/git-nuke");
const { registerSortPackageJson } = require("../commands/sort-package-json");
const {
	registerFilenamePathComment,
} = require("../commands/filename-path-comment");

const program = new Command();

program
	.name("ktu")
	.description(packageJson.description)
	.version(packageJson.version);

registerPrettier(program);
registerBiome(program);
registerGitCheckout(program);
registerGitRestore(program);
registerGitUndo(program);
registerGitNuke(program);
registerSortPackageJson(program);
registerFilenamePathComment(program);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
	program.outputHelp({ error: true });
	process.exit(1);
}
