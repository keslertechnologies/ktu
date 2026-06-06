[![GitLab](https://img.shields.io/badge/GitLab-FC6D26?logo=gitlab&logoColor=white)](https://gitlab.com/keslers/ktu)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/keslertechnologies/ktu)
[![npm version](https://img.shields.io/npm/v/@keslers/ktu.svg)](https://www.npmjs.com/package/@keslers/ktu)
[![npm downloads](https://img.shields.io/npm/dm/@keslers/ktu.svg)](https://www.npmjs.com/package/@keslers/ktu)
[![license](https://img.shields.io/npm/l/@keslers/ktu)](https://www.npmjs.com/package/@keslers/ktu)

# @keslers/ktu — Keslers Terminal Utility

A CLI tool for streamlining common development workflows.

- Standardized formatting and linting
- Git workflow shortcuts
- Wrangler / Cloudflare deployment shortcuts
- Project file utilities

## Requirements

- Node.js 18+

## Installation

```bash
npm install -g @keslers/ktu
ktu --help
```

## Commands

### Formatting

| Command | Description |
|---------|-------------|
| `ktu pf` | Format all supported files with Prettier (`--write --ignore-unknown`) |
| `ktu bf` | Format all supported files with Biome (VCS-aware, respects `.gitignore`) |
| `ktu bi` | Write a `biome.json` to the current directory (Tailwind CSS + organizeImports) |

### Git

| Command | Description |
|---------|-------------|
| `ktu gco <branch>` | Smart checkout: fetch → checkout → pull |
| `ktu gr <branch>` | Restore all files to match a branch without changing commits |
| `ktu gu` | Undo last commit, keep changes staged (`reset --soft HEAD~1`) |
| `ktu gn` | ⚠️ Nuke all uncommitted changes (`reset --hard` + `clean -fd`) |
| `ktu gn <branch>` | ⚠️ Nuke all uncommitted changes, then smart checkout branch |
| `ktu gf <n>` | Fixup last `n` commits into the one before them (non-interactive rebase) |

### Wrangler — Pages (`ktu wp`)

| Command | Description |
|---------|-------------|
| `ktu wp` | Build, deploy to Cloudflare Pages, then clean old deployments |
| `ktu wp build` | Build the project (`tsc -b && vite build`) |
| `ktu wp deploy` | Deploy `dist/` to Cloudflare Pages |
| `ktu wp clean` | Delete deployments older than one month |

> `ktu wp clean` requires `jq` to be installed.

### Utilities

| Command | Description |
|---------|-------------|
| `ktu spj` | Sort all `package.json` files in the current and child directories |
| `ktu fpc` | Add a relative file path comment to the top of all JS/TS(X) files |
| `ktu update` | Update ktu to the latest published version |

## Philosophy

Simplifying and standardizing repeatable tasks common to projects, teams, and development environments. Commands are intentionally terse — short aliases over long flags.

## Versioning

`ktu` uses **Semantic Versioning**:

- **MAJOR** → breaking changes (update scripts/CI if upgrading)
- **MINOR** → new commands/flags/features (backwards compatible)
- **PATCH** → bug fixes & small improvements (safe to upgrade)

## License

ISC
