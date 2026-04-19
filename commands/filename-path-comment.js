// commands/filename-path-comment.js

const { log } = require("../lib/helpers");

function registerFilenamePathComment(program) {
	// ────────────────────────────────────────────────────────────────
	// NEW COMMAND: fpc → Add filename path comment
	// ────────────────────────────────────────────────────────────────
	program
		.command("fpc")
		.description(
			"Add relative file path comment at the top of all JS/TS(X) files",
		)
		.action(() => {
			log.info("Adding file path comments...");
			log.dim(`  cwd: ${process.cwd()}`);
			console.log();

			try {
				const fs = require("node:fs");
				const path = require("node:path");

				const extensions = new Set([".js", ".jsx", ".ts", ".tsx"]);
				const ignoreDirs = new Set([
					"node_modules",
					".git",
					"dist",
					"build",
					".next",
					"coverage",
					"tmp",
					"temp",
				]);

				let updated = 0;

				function walk(dir) {
					const entries = fs.readdirSync(dir, { withFileTypes: true });

					for (const entry of entries) {
						const fullPath = path.join(dir, entry.name);

						if (entry.isDirectory()) {
							if (ignoreDirs.has(entry.name) || entry.name.startsWith(".")) {
								continue;
							}
							walk(fullPath);
							continue;
						}

						if (!extensions.has(path.extname(entry.name).toLowerCase())) {
							continue;
						}

						// ── Process file ─────────────────────────────────────
						const relativePath = path
							.relative(process.cwd(), fullPath)
							.replace(/\\/g, "/");

						let content = fs.readFileSync(fullPath, "utf8");

						// Skip if we already added this exact header
						const headerLine = `// ${relativePath}`;
						if (content.includes(headerLine)) {
							// Quick check – most files will be skipped here
							continue;
						}

						const header = `${headerLine}\n\n`;

						// Handle shebang
						if (content.startsWith("#!")) {
							const firstNewline = content.indexOf("\n") + 1;
							content =
								content.slice(0, firstNewline) +
								header +
								content.slice(firstNewline);
						} else {
							content = header + content;
						}

						fs.writeFileSync(fullPath, content);
						updated++;
						log.dim(`  ✓ ${relativePath}`);
					}
				}

				walk(process.cwd());

				console.log();
				if (updated === 0) {
					log.success("All files already had the correct header.");
				} else {
					log.success(`Added path comments to ${updated} file(s).`);
				}
			} catch (err) {
				console.log(err);
				log.error("Adding file headers failed.");
				process.exit(1);
			}
		});
}

module.exports = { registerFilenamePathComment };
