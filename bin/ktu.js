#!/usr/bin/env node
// bin/ktu.js

const { Command } = require("commander");
const { execSync } = require("child_process");

const program = new Command();

program
  .name("ktu")
  .description("Kesler Technologies (CLI) Utility")
  .version("0.1.0"); // ← update this as you release

// ────────────────────────────────────────────────
// fmt command
// ────────────────────────────────────────────────

program
  .command("fmt")
  .description(
    "Format all supported files in the current directory with Prettier",
  )
  .action(() => {
    console.log("ktu fmt - formatting current directory...");

    try {
      execSync("npx prettier . --write --ignore-unknown", {
        stdio: "inherit",
        cwd: process.cwd(),
      });
      console.log("\nktu fmt - Completed.");
    } catch (err) {
      console.error("\nktu fmt - Failed.");
      // Let the original exit code bubble up if available
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
