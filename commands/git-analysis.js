// commands/git-analysis.js

const { execFileSync } = require("node:child_process");
const { log } = require("../lib/helpers");

const NUMSTAT = /^[0-9-]+\t[0-9-]+\t/;

/** Minimum column widths, matching the table's default look. */
const AUTHOR_WIDTH = 6;
const NUMBER_WIDTH = 12;

/** Format an integer with thousands separators. */
function sep(n) {
	return n.toLocaleString("en-US");
}

/**
 * Parse `git log --pretty=format:%aN --numstat --no-merges` output into
 * per-author totals.
 *
 * Each commit prints its author on a line of its own, followed by a numstat
 * block and a blank separator, so every non-numstat line is one commit.
 * Binary files report "-" instead of counts and contribute no lines.
 */
function parseLog(output) {
	const totals = new Map();
	let author = null;

	const entryFor = (name) => {
		let entry = totals.get(name);
		if (!entry) {
			entry = { author: name, commits: 0, added: 0, deleted: 0, lines: 0 };
			totals.set(name, entry);
		}
		return entry;
	};

	for (const line of output.split("\n")) {
		if (line === "") continue;

		if (!NUMSTAT.test(line)) {
			author = line;
			entryFor(author).commits += 1;
			continue;
		}

		const [addedStr, deletedStr] = line.split("\t");
		if (!/^[0-9]+$/.test(addedStr)) continue;

		const entry = entryFor(author);
		entry.added += parseInt(addedStr, 10);
		entry.deleted += parseInt(deletedStr, 10);
		entry.lines = entry.added + entry.deleted;
	}

	return [...totals.values()];
}

/** Print an aligned table; the first column is left-aligned, the rest right. */
function printTable(columns, rows) {
	const widths = columns.map((column, i) => {
		const cells = rows.map((row) => row[i].length);
		const min = i === 0 ? AUTHOR_WIDTH : NUMBER_WIDTH;
		return Math.max(min, column.length, ...cells);
	});

	const line = (cells) =>
		console.log(
			cells
				.map((cell, i) =>
					i === 0 ? cell.padEnd(widths[i]) : cell.padStart(widths[i]),
				)
				.join("  "),
		);

	const rule = () => line(columns.map((column) => "-".repeat(column.length)));

	line(columns);
	rule();
	for (const row of rows.slice(0, -1)) line(row);
	rule();
	line(rows[rows.length - 1]);
}

function registerGitAnalysis(program) {
	program
		.command("ga [branch]")
		.description(
			"Analyze authorship on a branch (defaults to 'main', merges excluded).\n" +
				"  Shows line changes by default; -c shows commit counts instead.",
		)
		.option("-l, --lines", "show lines added, deleted, and changed (default)")
		.option("-c, --commits", "show commit counts instead of lines")
		.option(
			"-s, --since <date>",
			"only count commits after this date (any git date, e.g. '3 months ago')",
			"1 year ago",
		)
		.option("-u, --until <date>", "only count commits before this date")
		.action((branch = "main", options) => {
			const showCommits = Boolean(options.commits);
			const showLines = Boolean(options.lines) || !showCommits;

			const range = [`--since=${options.since}`];
			if (options.until) range.push(`--until=${options.until}`);

			log.info(
				`${showLines ? "Line changes" : "Commits"} per author on '${branch}'...`,
			);
			log.dim(
				`  since: ${options.since}${options.until ? `  until: ${options.until}` : ""}`,
			);
			log.dim(`  cwd: ${process.cwd()}`);
			console.log();

			let output;
			try {
				output = execFileSync(
					"git",
					[
						"log",
						branch,
						...range,
						"--pretty=format:%aN",
						"--numstat",
						"--no-merges",
					],
					{
						encoding: "utf8",
						cwd: process.cwd(),
						stdio: ["ignore", "pipe", "inherit"],
					},
				);
			} catch (err) {
				console.log();
				log.error("ga failed.");
				process.exit(err.status || 1);
			}

			const entries = parseLog(output);
			if (entries.length === 0) {
				log.success(`No commits on '${branch}' since ${options.since}.`);
				return;
			}

			// Rank by whichever metric is on screen, lines first when both are.
			const rank = (entry) => (showLines ? entry.lines : entry.commits);
			entries.sort(
				(a, b) =>
					rank(b) - rank(a) ||
					b.commits - a.commits ||
					a.author.localeCompare(b.author),
			);

			const columns = ["Author"];
			const fields = [];
			if (showCommits) {
				columns.push("Commits");
				fields.push("commits");
			}
			if (showLines) {
				columns.push("Added", "Deleted", "Lines");
				fields.push("added", "deleted", "lines");
			}

			const sum = (field) =>
				entries.reduce((total, entry) => total + entry[field], 0);

			printTable(columns, [
				...entries.map((entry) => [
					entry.author,
					...fields.map((field) => sep(entry[field])),
				]),
				["Total", ...fields.map((field) => sep(sum(field)))],
			]);
		});
}

module.exports = { registerGitAnalysis };
