# blocks molt subjects

## What this section is
This section appears to be a machine-facing public/package/export lane for selected MOLT block artifacts, especially the AIM / USE / NEED family JSON that is useful for public-safe packaging and browsing.

## What this section is not
This should not currently be assumed to be the only canonical authoring shelf for MOLT blocks, and it is not the main human-readable explanation shelf.

## Who should use this
- package tooling
- AI agents
- maintainers
- future contributors
- humans who need to understand the public/export lane

## Canonical source rule
Current status: machine-facing secondary/export lane pending final canonical clarification.

## How this maps to nearby sections
- `AI/MOLT-BLOCKS/` is the canonical machine-readable source shelf.
- `HUMAN/MOLT-BLOCKS/` is the readable explanation shelf for people.
- `HUMAN/NEOBLOCKS/` and `HUMAN/NEOSTACKS/` are the intended bridge layers upward toward sleeves.

## Current status
- machine-facing
- package-facing
- secondary/export lane pending clarification

## AIM / USE / NEED note
AIM / USE / NEED JSON exists here because this lane appears to support public-facing packaging/export of selected MOLT block families.

For BL-1, the safest explanation is:
- `AI/MOLT-BLOCKS/*.json` = canonical machine-readable source libraries
- `HUMAN/MOLT-BLOCKS/aim`, `use`, `need` = readable browsing shelves for people
- `blocks/molt/subjects/*.json` = machine/package/export lane

Do not assume final canonical status here beyond that.

## MOLT chain
```text
MOLT Block
→ NeoBlock
→ NeoStack
→ Sleeve
```

## Where to go next
- `AI/MOLT-BLOCKS/README.md`
- `HUMAN/MOLT-BLOCKS/README.md`
- `HUMAN/NEOBLOCKS/README.md`
- `HUMAN/NEOSTACKS/README.md`
