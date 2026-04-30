# AI SLEEVES

## What this section is
This section is the machine-readable sleeve shelf. Sleeves are configuration packages that choose stacks, blocks, and operating posture for a role, mode, or reference workflow.

## What this section is not
This is not the primary human reading shelf. These files should not be assumed to be the same as the richer readable sleeve summaries in `HUMAN/SLEEVES/`.

## Who should use this
- AI agents
- package tooling
- maintainers
- future contributors
- humans who need the direct machine-facing lane

## Canonical source rule
Current status: canonical machine source for direct sleeve data, subject to promotion and catalog rules.

## How this maps to nearby sections
- `AI/MANIFESTS/sleeve-catalog.json` is the direct/source-oriented machine catalog for this lane.
- `sleeves/manifests/catalog.json` is the public/package-facing curated catalog.
- `HUMAN/SLEEVES/` provides readable sleeve summaries for people.
- `HUMAN/NEOSTACKS/` and `HUMAN/NEOBLOCKS/` explain the intended middle layers between sleeves and MOLT blocks.

## Current status
- active/canonical
- machine-facing

## HUMAN vs machine sleeve note
Not every sleeve that is discussed in `HUMAN/SLEEVES/` should be assumed to be a public runnable machine sleeve.

Use the catalogs to determine promotion state and exposure:
- direct/source-oriented machine discovery: `AI/MANIFESTS/sleeve-catalog.json`
- public/package-facing curated discovery: `sleeves/manifests/catalog.json`

## MOLT chain
```text
MOLT Block
→ NeoBlock
→ NeoStack
→ Sleeve
```

## Where to go next
- `AI/MANIFESTS/README.md`
- `sleeves/manifests/README.md`
- `HUMAN/SLEEVES/README.md`
- `HUMAN/NEOSTACKS/README.md`
- `HUMAN/NEOBLOCKS/README.md`
