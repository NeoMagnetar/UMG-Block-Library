# BL-6 Compatibility Migration Map

## Summary
BL-6 structural normalization is currently blocked because runtime, fixtures, docs, validation, and reference sleeves still depend on compatibility-locked paths.

This document defines a future-safe migration sequence without moving any folders yet.

## Why BL-6 is currently blocked
Current dependencies still rely on:
- `AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1/sleeve.json`
- `AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1/`
- `AI/NEOSTACKS/categories/core/`
- `AI/NEOBLOCKS/categories/core/`
- the `sleeve.json` contract
- `AI/FIXTURES/umg-core-reference-sleeve/`
- source_path references that currently point into these AI core lanes

Until aliases/redirects and validation exist, movement is not safe.

## No-move list
Do not move, rename, or delete these yet:
- `AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1/`
- `AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1/sleeve.json`
- `AI/NEOSTACKS/categories/core/`
- `AI/NEOBLOCKS/categories/core/`
- `AI/FIXTURES/umg-core-reference-sleeve/`
- relation-matrix fixture outputs tied to the current reference flow
- any fixture/source_path references pointing to current AI core lanes

## Future AI/HUMAN mirror target
Future doctrine target:

```text
AI/
  MOLT-BLOCKS/
  NEOBLOCKS/
  NEOSTACKS/
  SLEEVES/
  TOOLS/

HUMAN/
  MOLT-BLOCKS/
  NEOBLOCKS/
  NEOSTACKS/
  SLEEVES/
  TOOLS/
```

Important constraints:
- `TOOLS` remains future-design-only for now
- `blocks/molt/subjects/` remains a legacy/export/package-facing candidate pending approval
- current AI core category paths remain compatibility-stable until aliases exist

## Compatibility bridge strategy
The bridge strategy should prioritize:
1. canonical IDs over raw paths
2. alias/redirect planning before movement
3. fixture stability before lane cleanup
4. dual-path validation before any deprecation

Compatibility assumptions should be recorded in:
- `META/UMG-PATH-ALIAS-REGISTRY.md`
- `META/UMG-GOVERNANCE-REGISTRY.md`

## Phase 0: Compatibility lock only
- do not move anything
- document compatibility-locked paths
- define no-move list
- define canonical candidates vs legacy/export candidates

## Phase 1: Registry and doctrine prep
- create and maintain the path alias registry
- record current path → proposed path relationships
- document movement policy and validation requirements
- keep governance approval separate from movement approval

## Phase 2: Alias design
- design alias/redirect strategy while preserving old paths
- possible strategies may include:
  - dual path manifests
  - alias maps
  - loader-level indirection
  - doc-level compatibility references
- do not implement yet without explicit approval

## Phase 3: Validation shift
- update validation strategy so canonical IDs become primary
- preserve old raw path compatibility during transition
- verify fixtures, runtime, and docs under dual-path expectations

## Phase 4: Controlled dual-path era
- old and new path models coexist
- aliases/redirects remain active
- fixtures and docs validate both worlds intentionally
- no legacy deprecation until stability is demonstrated

## Phase 5: Structural normalization review
Only after all prior phases succeed:
- review whether folder movement is still necessary
- review whether legacy/export lanes can be deprecated
- review whether category restructuring is actually safe

## Rollback policy
Any future migration must be reversible.

Required rollback properties:
- old paths remain restorable
- aliases can be re-enabled quickly
- fixtures continue to resolve current reference sleeves
- source_path provenance can still be interpreted after rollback

## Maintainer approval gates
Before any movement:
1. lane authority approved
2. source vs export doctrine approved
3. category placement doctrine approved
4. compatibility registry reviewed
5. alias strategy reviewed
6. rollback policy reviewed
7. validation plan reviewed

## Required validation before movement
At minimum:
- installed Envoy plugin remains loadable
- core reference sleeve still resolves
- `sleeve.json` contract still works
- fixture/resolved.ir/trace/relation outputs remain valid
- compiler input contract remains stable
- docs/reference examples remain intentionally updated

## Backlinks
- [UMG Governance Registry](./UMG-GOVERNANCE-REGISTRY.md)
- [UMG Path Alias Registry](./UMG-PATH-ALIAS-REGISTRY.md)
- [BL-5 Governance Decision Memo](./BL-5-GOVERNANCE-DECISION-MEMO.md)

## Future normalization note
This migration map enables future BL-6 work, but it does not authorize movement. Structural normalization should begin only after maintainers approve doctrine, compatibility handling, and validation gates explicitly.
