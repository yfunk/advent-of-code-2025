# 🎄 Advent of Code 2025

My solutions for Advent of Code 2025, implemented in TypeScript.

## Getting started

Ensure [`bun`](https://bun.sh/) is installed:

```
bun -v

# if not installed, run this:
curl -fsSL https://bun.sh/install | bash
```

Install dependencies and submodule:

```bash
bun bootstrap
```

Set up a new day:

```bash
bun setup 1
```

Run day solutions:

```bash
bun day 1
```

Run day solutions in dev mode (without clearing console outputs):

```bash
bun day 1 --dev
```

For automatic puzzle input retrieval, define `.env` file with `session` cookie from [adventofcode.com](https://adventofcode.com):

```env
SESSION=
YEAR=2025
```
