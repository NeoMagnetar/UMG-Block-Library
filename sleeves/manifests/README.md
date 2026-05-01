# sleeves manifests

## What this section is
This section is the public/package-facing sleeve catalog lane. It is the machine-facing curated shelf that downstream package consumers should use when they need the promoted public view rather than the full direct/source-oriented machine view.

## What this section is not
This is not the same as the direct/source-oriented AI manifest shelf, and it is not a promise that every sleeve discussed anywhere else in the repo is exposed here.

## Who should use this
- package tooling
- AI agents
- maintainers
- future contributors
- humans who want the curated public machine catalog

## Status
- package-facing
- machine-facing
- curated public catalog

## Authority class
- package-facing

## Provenance
- direct source-backed for public/package-facing catalog posture
- intentionally distinct from the direct/source-oriented machine manifest lane

## Category maturity
- not category-driven in the same way as HUMAN shelves; this lane is primarily catalog-oriented

## Navigation path
```text
CATEGORY → SLEEVE → NEOSTACK → NEOBLOCK → MOLT BLOCK
```

## Source path
- `sleeves/manifests/`
- governance definitions: [`META/UMG-GOVERNANCE-REGISTRY.md`](../../META/UMG-GOVERNANCE-REGISTRY.md)

## Placeholder/deferred note
This lane is curated and real, but some entries still carry compatibility or normalization posture rather than fully promoted success-path status.

## Canonical source rule
Current status: package-facing catalog.

## How this maps to nearby sections
- `AI/MANIFESTS/sleeve-catalog.json` is the direct/source-oriented machine catalog.
- `HUMAN/SLEEVES/` is the readable explanation shelf for people.
- top-level `sleeves/` is the public machine artifact lane.

## Catalog relationship
This folder contains `catalog.json`, which is the public/package-facing curated sleeve catalog.

It intentionally differs from `AI/MANIFESTS/sleeve-catalog.json` when needed.
Possible reasons include:
- public promotion state differs from source/reference state
- historical or testing sleeves are not meant to be public success-path entries
- compatibility references may remain visible for transition reasons
- some HUMAN sleeve summaries do not yet map to runnable public machine sleeves

## Promotion posture terms
When these terms appear, read them conservatively:
- `promoted_reference` = public success-path reference sleeve intended for normal public/runtime use
- `compatibility_reference` = kept visible for compatibility, comparison, or migration reasons
- `needs_normalization` = shape/metadata/packaging still needs cleanup before it should be treated as a stable public success path
- `historical_non_promoted` = historical/testing/reference material, not the promoted public lane

## Backlinks
- [Public sleeve catalog](./catalog.json)
- [AI MANIFESTS](../../AI/MANIFESTS/README.md)
- [HUMAN SLEEVES](../../HUMAN/SLEEVES/README.md)
- [Governance registry](../../META/UMG-GOVERNANCE-REGISTRY.md)

## Future normalization note
Do not treat this curated public lane as equivalent to the direct/source-oriented machine manifest lane.

## Where to go next
- `sleeves/manifests/catalog.json`
- `AI/MANIFESTS/README.md`
- `HUMAN/SLEEVES/README.md`
