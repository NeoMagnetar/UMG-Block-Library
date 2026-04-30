# UMG Block Library

A curated public UMG block-library surface for readable doctrine, baseline block libraries, public schemas, and selected examples.

This repository is intentionally partial.
It is meant to be real on day one, not falsely complete.

## What this repo is
- a public-facing UMG block-library repo
- a curated AI/HUMAN split surface
- a home for doctrine, schemas, baseline block libraries, and selected examples

## What this repo is not
- not a live private runtime homebase
- not a dump of every private sleeve or extracted artifact
- not a mirror of runtime backups, traces, or staging history
- not a promise that every designed folder is fully populated yet

## Start here
- `START-HERE.md`
- `META/PUBLIC-SCOPE.md`
- `META/CONTENT-STATUS.md`
- `AI/README.md`
- `HUMAN/README.md`
- `AI/MANIFESTS/README.md`
- `sleeves/manifests/README.md`
- `HUMAN/SLEEVES/categories/README.md`

## Navigation model
Read this repository as a layered system rather than a flat bucket of folders.

```text
MOLT Block
→ NeoBlock
→ NeoStack
→ Sleeve
```

Plain-language meaning:
- MOLT Block = one small idea, rule, purpose, or constraint
- NeoBlock = useful bundle of MOLT blocks
- NeoStack = workflow lane made from NeoBlocks
- Sleeve = configuration package that chooses stacks/blocks for a role or operating mode

## AI vs HUMAN
- `AI/` is the machine-readable shelf.
- `HUMAN/` is the human-readable shelf.
- AI files are the source/reference data machines can load.
- HUMAN files explain those ideas for people.
- HUMAN docs may summarize things that are not yet runnable public machine sleeves.
- HUMAN docs must not be treated as automatic machine JSON payloads.

## Sleeve lanes at a glance
Two sleeve lanes exist on purpose:
- `HUMAN/SLEEVES/` = readable sleeve summaries for people
- top-level `sleeves/` = public/package-facing machine sleeve artifact lane

Not every human sleeve page is automatically a runnable public machine sleeve. Use the catalogs to confirm what is direct/source-oriented versus publicly promoted.

## Duplicate-looking lanes at a glance
Some lanes look duplicated because they serve different audiences:
- `AI/MOLT-BLOCKS/` = canonical machine-readable source block libraries
- `HUMAN/MOLT-BLOCKS/` = readable browsing shelf for people
- `blocks/molt/subjects/` = machine-facing secondary/export lane pending final canonical clarification
