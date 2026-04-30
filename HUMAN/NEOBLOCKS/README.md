# HUMAN NEOBLOCKS

## What this section is
This section is the human-readable bridge shelf for NeoBlocks. A NeoBlock is a useful bundle of MOLT blocks that groups several small ideas into a larger reusable unit.

## What this section is not
This is not the canonical machine-readable source lane, and it is not yet a full end-user walkthrough library for every NeoBlock in the system.

## Who should use this
- Humans
- maintainers
- future contributors
- AI agents that need conceptual explanation rather than direct machine source

## Canonical source rule
Current status: human-readable explanation and structured-reference bridge.

## How this maps to nearby sections
- `HUMAN/MOLT-BLOCKS/` explains the smaller block families that feed NeoBlocks.
- `HUMAN/NEOSTACKS/` assembles NeoBlocks into workflow lanes.
- `HUMAN/SLEEVES/` uses stacks and blocks to describe role or mode configurations.
- `AI/NEOBLOCKS/` is the machine-facing companion lane when populated.

## Current status
- public-readable
- structured-reference first
- richer walkthroughs deferred

## NeoBlock chain
A NeoBlock sits between raw MOLT blocks and larger workflow stacks.

```text
MOLT Block
→ NeoBlock
→ NeoStack
→ Sleeve
```

## Middle-layer gap note
This section exists to bridge sleeves to MOLT blocks.
Current state is structured-reference first.
Richer human walkthroughs are deferred until they can be written honestly and kept accurate.

The intended future path is:

```text
Sleeve README → NeoStack page → NeoBlock page → MOLT block pages
```

## Where to go next
- `HUMAN/MOLT-BLOCKS/README.md`
- `HUMAN/NEOSTACKS/README.md`
- `HUMAN/SLEEVES/SLEEVE-INDEX.md`
