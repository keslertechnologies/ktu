[![GitLab](https://img.shields.io/badge/GitLab-FC6D26?logo=gitlab&logoColor=white)](https://gitlab.com/keslers/ktu)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/keslertechnologies/ktu)
[![npm version](https://img.shields.io/npm/v/@keslers/ktu.svg)](https://www.npmjs.com/package/@keslers/ktu)
[![npm downloads](https://img.shields.io/npm/dm/@keslers/ktu.svg)](https://www.npmjs.com/package/@keslers/ktu)
[![license](https://img.shields.io/npm/l/@keslers/ktu)](https://www.npmjs.com/package/@keslers/ktu)

# @keslers/ktu Terminal Utilitty

A CLI tool for streamlining common development workflows.

- Standardized formatting/linting
- Git workflow shortcuts

## Status

Early development - more commands are being added as needed.

Features being considered now:

- Boilerplate scaffolding (React + Tailwind starters)
- Editor & tool setup helpers

## Installation

```bash
npm install -g @kesler/ktu
ktu --help
```

## Commands

### Formatting

| Command | Description |
|---------|-------------|
| `ktu pf` | Format all supported files with Prettier |
| `ktu bf` | Format all supported files with Biome |
| `ktu bi` | Initialize Biome |

### Git

| Command | Description |
|---------|-------------|
| `ktu gco <branch>` | Smart checkout: fetch → checkout → pull |
| `ktu gr <branch>` | Restore all files to match a branch (no commit change) |
| `ktu gu` | Undo last commit, keep changes staged |
| `ktu gn` | ⚠️ Nuke all uncommitted changes (reset --hard + clean) |
| `ktu gn <branch>` | ⚠️ Nuke all uncommitted changes, then smart checkout branch |

## Philosophy

Simplifying and standardizing repeatable tasks common to projects, teams, and development environments.

## Versioning

`ktu` uses **Semantic Versioning**:

- **MAJOR** → breaking changes (update scripts/CI if upgrading)
- **MINOR** → new commands/flags/features (backwards compatible)
- **PATCH** → bug fixes & small improvements (safe to upgrade)

## License

MIT