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
- `AI/DOCTRINE/H4_BLOCK_LIBRARY_CLASSIFICATION.v1.md`
- `AI/MANIFESTS/h4-block-library-manifest.json`
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

Naming convention:
- RuntimeSpec is the canonical type and schema concept.
- `runtime-spec.json` is the canonical artifact filename form.
- Trace is the canonical type and schema concept.
- `trace.json` is the canonical artifact filename form.
- NeoStack is the canonical typed structural layer above NeoBlock and below Sleeve.
- Use `stack` only for informal human-facing prose when no typed schema object is implied.

Plain-language meaning:
- MOLT Block = one small idea, rule, purpose, or constraint
- NeoBlock = useful bundle of MOLT blocks
- NeoStack = workflow lane made from NeoBlocks
- Sleeve = configuration package that chooses stacks/blocks for a role or operating mode

## Current H4 compiler lanes

The compiler-vNext H4 authority defines exactly seven MOLT lanes:

```text
Trigger
Directive
Instruction
Subject
Primary
Philosophy
Blueprint
```

- Language is an `Instruction` category. The historical `BP.001` through `BP.030` IDs are retained for compatibility.
- Persona is an `Instruction` category, not an eighth compiler lane.
- AIM, USE, and NEED are Platform extensions retained at compatibility paths; they are not H4 MOLT lanes.
- OFF is a Governance prohibition, not a MOLT type.
- Priority and compiler-v0 material are legacy/historical unless an artifact explicitly declares compatibility use.

The machine-readable classification and record hashes are published in `AI/MANIFESTS/h4-block-library-manifest.json`.

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
- `AI/MOLT-BLOCKS/` = aggregate H4 source shelves plus path-compatible Platform extension sources; consult the H4 manifest for authority classification
- `HUMAN/MOLT-BLOCKS/` = readable browsing shelf for people
- `blocks/molt/subjects/` = derived/export Platform-extension mirrors, not H4 canonical records
