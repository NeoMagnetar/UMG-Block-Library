# UMG Governance Registry

## Purpose
This registry defines the documentation governance model for the public UMG Block Library.

It exists so maintainers, contributors, and future agents can classify lanes consistently before any structural normalization happens.

This file is a governance layer, not a machine/runtime authority file.

## Status
- public-safe governance registry
- doctrine/reference layer
- intended to guide review before normalization

## Authority class definitions
Use these labels conservatively.

### Canonical source
The primary source-of-truth lane for a machine-readable artifact family.

### Package-facing
A curated public machine-facing lane intended for packaging, distribution, or promoted public consumption.

### Export-facing
A machine-facing lane that appears to support packaging/export/mirroring, but is not automatically the canonical authoring shelf.

### Compatibility/reference
A readable or transitional reference lane that helps humans or downstream systems interpret structure, compare states, or preserve compatibility context.

### Transitional
A real lane with meaningful content, but not yet stable enough to treat as final public doctrine or final authoring structure.

### Unresolved
A lane whose long-term authority cannot be safely declared yet without governance approval.

## Provenance classes
Use these provenance labels in README and INDEX docs.

### Direct source-backed
The statement is backed by an explicit machine-facing source file or authoritative public catalog entry.

### Inferred
The statement is a careful interpretation drawn from file naming, category structure, or matching artifact patterns, but not directly declared as doctrine.

### Placeholder/deferred
The lane or category exists intentionally, but does not yet have enough public-safe content to claim stronger maturity.

### Compatibility/reference
The lane or item is carried for interpretive, migration, comparison, or public explanation value.

### Historical/non-promoted
The lane or item is retained for historical/testing/reference reasons and should not be confused with the promoted public success path.

### Unresolved
Authority or provenance cannot be safely finalized yet.

## Promotion posture definitions
These terms currently appear in the public sleeve lane and should be read consistently.

- `promoted_reference`
- `compatibility_reference`
- `needs_normalization`
- `historical_non_promoted`

Recommended reading:
- `promoted_reference` = public success-path reference sleeve
- `compatibility_reference` = public-visible for compatibility/reference value
- `needs_normalization` = meaningful candidate that still needs naming/style/packaging cleanup
- `historical_non_promoted` = historical/testing/reference entry, not a promoted public path

## Inference policy
Never silently promote inferred continuity into doctrine.

If a HUMAN bridge page links a sleeve to a stack or a stack to a block using pattern evidence rather than an explicit source declaration, label it as inferred.

## Normalization policy
Do not normalize structure until governance approval exists for:
- lane authority
- category placement policy
- source vs export distinction
- public vs compatibility posture

## Doctrine approval gates
Require human governance approval before:
- lane deduplication
- folder renaming or moving
- category reassignment
- declaring a transitional lane canonical
- declaring an unresolved lane resolved in machine structure

## Category maturity definitions
Use these labels consistently.

### Mature
Public human and machine-facing structure are both strong enough to browse with low ambiguity.

### Transitional
Meaningful structure exists, but parity, placement, or authority is not yet fully normalized.

### Placeholder
The category exists intentionally but public-safe content remains sparse.

### Governance-required
The category contains real signal but also enough mismatch or ambiguity that normalization should wait for human review.

### Unresolved
The category cannot be safely matured without doctrine decisions first.

## Current lane registry
| Lane | Current working class |
|---|---|
| `AI/MANIFESTS/sleeve-catalog.json` | canonical source |
| `sleeves/manifests/catalog.json` | package-facing |
| `AI/SLEEVES/` | canonical source (working assumption; reviewable) |
| `HUMAN/SLEEVES/` | compatibility/reference |
| `sleeves/` | package-facing |
| `AI/MOLT-BLOCKS/` | canonical source (working assumption; reviewable) |
| `blocks/molt/subjects/` | unresolved / export-facing secondary |
| `HUMAN/MOLT-BLOCKS/` | compatibility/reference |
| `AI/NEOSTACKS/categories/` | transitional |
| `AI/NEOBLOCKS/categories/` | transitional |
| `HUMAN/NEOSTACKS/` | compatibility/reference |
| `HUMAN/NEOBLOCKS/` | compatibility/reference |

## Current category maturity registry
| Category | Current working maturity |
|---|---|
| business | transitional / near-mature |
| finance | transitional / near-mature |
| coders | transitional |
| meta-random | governance-required |
| research | transitional / placeholder |
| creative | placeholder |
| governance | placeholder / unresolved |
| social-communication | transitional / lightly populated |

## Future normalization note
This registry is meant to make BL-5 and later normalization safer.
It does not itself approve structural changes.

## Backlinks
- [README](../README.md)
- [START-HERE](../START-HERE.md)
- [CONTENT-STATUS](./CONTENT-STATUS.md)
- [UMG Path Alias Registry](./UMG-PATH-ALIAS-REGISTRY.md)
- [BL-6 Compatibility Migration Map](./BL-6-COMPATIBILITY-MIGRATION-MAP.md)
