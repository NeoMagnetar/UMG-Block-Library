# BL-5 Governance Decision Memo

## Purpose
This memo prepares maintainers to make explicit doctrine decisions before BL-6 or any later structural normalization work begins.

## Status
- governance decision-prep document
- public-safe review memo

## Authority class
- compatibility/reference

## Provenance
- direct governance summary based on current audit findings
- intended for human approval workflows

## Category maturity
- especially relevant to transitional and governance-required categories

## Navigation path
```text
CATEGORY → SLEEVE → NEOSTACK → NEOBLOCK → MOLT BLOCK
```

## Source path
- `META/BL-5-GOVERNANCE-DECISION-MEMO.md`
- companion registry: [UMG Governance Registry](./UMG-GOVERNANCE-REGISTRY.md)
- maintainer guide: [UMG Governance Maintainer Guide](./UMG-GOVERNANCE-MAINTAINER-GUIDE.md)

## Placeholder/deferred note
This memo is not a normalization approval. It exists to make future decisions explicit and reviewable.

## Unresolved blockers
1. final authority relationship between `AI/MOLT-BLOCKS/` and `blocks/molt/subjects/`
2. final doctrine for `AI/NEOSTACKS/categories/`
3. final doctrine for `AI/NEOBLOCKS/categories/`
4. category drift and placement sensitivity around `meta-random`
5. uneven HUMAN vs AI category parity
6. older internal-facing doctrine wording still present in some AI doctrine files

## Lane authority options
### Option A — keep current working model
- `AI/MANIFESTS` = canonical source
- `sleeves/manifests` = package-facing
- `AI/MOLT-BLOCKS` = canonical source
- `blocks/molt/subjects` = unresolved export-facing secondary
- AI middle layers = transitional

Consequence:
- safest short-term doctrine
- slower normalization

### Option B — elevate export/package lanes more aggressively later
- would require stronger evidence and explicit approval

Consequence:
- faster simplification possible
- higher risk of misclassifying source authority

## Category normalization options
### Conservative option
- normalize only business and finance first
- hold coders, research, creative, governance, and meta-random longer

### Aggressive option
- attempt broader category convergence sooner

Consequence:
- higher risk of forcing inference into doctrine

## Source/export policy choices
### Choice 1
Treat source and export as permanently distinct responsibilities.

### Choice 2
Aim to converge selected export lanes toward stronger canonical parity later.

### Choice 3
Leave unresolved until machine artifact review is complete.

## AI middle-layer policy choices
### Choice 1
Treat `AI/NEOSTACKS/categories/` and `AI/NEOBLOCKS/categories/` as transitional indefinitely until reauthored.

### Choice 2
Treat them as usable canonical machine-facing layers with explicit caveats.

### Choice 3
Split them later into canonical vs compatibility artifacts after deeper review.

## meta-random governance options
### Option A
Treat `meta-random` as an intentional doctrine bucket.

### Option B
Treat it as a transitional holding category pending reassignment.

### Option C
Freeze it as governance-required and block structural normalization there until evidence improves.

## Public/internal doctrine segmentation options
### Option A
Keep current AI doctrine docs in place and label them more explicitly.

### Option B
Separate clearly public-safe doctrine summaries from stronger internal/reference doctrine docs.

### Option C
Keep mixed docs but add review warnings and governance labels.

## Consequences of each choice
- conservative choices increase trust and reduce accidental canonization
- aggressive choices may reduce repo sprawl faster but increase governance risk
- mixed choices are workable if every unresolved lane remains explicitly labeled

## Required approvals before BL-6
Before BL-6, maintainers should explicitly approve:
1. lane authority model
2. source vs export policy
3. AI middle-layer policy
4. category normalization policy
5. meta-random handling policy
6. public/internal doctrine segmentation policy

## BL-6 readiness gates
BL-6 may only begin after approval confirms:
- no unresolved lane is being silently promoted to canonical
- no category is being moved based only on inference
- no machine-facing artifact change is hidden inside docs work
- normalization scope is documented and reviewable

## Backlinks
- [Governance registry](./UMG-GOVERNANCE-REGISTRY.md)
- [Maintainer guide](./UMG-GOVERNANCE-MAINTAINER-GUIDE.md)
- [Content status](./CONTENT-STATUS.md)

## Future normalization note
Normalization should begin only after maintainers choose a doctrine path and record it explicitly. Until then, continue governance hardening rather than restructuring.

