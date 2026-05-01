# BL-6C Alias Validation Design

## Summary
BL-6C defines a non-moving alias validation layer that proves canonical artifact identity before any folder movement is considered. The design keeps all compatibility-locked paths intact and treats canonical IDs as the primary validation surface. Current paths remain authoritative for runtime safety until a future dual-path validation model demonstrates that current and proposed paths resolve to the same intended artifacts, fixtures still pass, and downstream Envoy/compiler compatibility checks remain clean.

## Purpose
The purpose of this design is to make future BL-6 structural normalization testable without performing structural normalization now.

This layer should answer a narrower question first:

> Can the system prove that a canonical artifact ID resolves consistently across the current compatibility-locked path model and a future proposed path model?

If the answer is not provable, movement remains blocked.

## Non-movement rule
BL-6C is documentation and validation-design only.

Under this design stage:
- no folders move
- no folders are renamed
- no folders are deleted
- no fixtures are rewritten
- no runtime paths are rewritten
- no JSON artifacts are rewritten
- no Envoy plugin code changes are made
- no compiler code changes are made
- no alias loader behavior is implemented yet

Canonical validation must be designed before structural normalization is even considered.

## Current compatibility locks
The following surfaces remain compatibility-locked and must continue to resolve as-is during BL-6C:

- `AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1/sleeve.json`
- `AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1/`
- `AI/NEOSTACKS/categories/core/`
- `AI/NEOBLOCKS/categories/core/`
- `AI/FIXTURES/umg-core-reference-sleeve/`
- the `sleeve.json` contract
- reference and provenance material tied to current source paths
- docs that intentionally describe the current compatibility-locked layout

These paths are not legacy garbage to be cleaned up opportunistically. They are active compatibility anchors.

## Canonical ID resolution model
The canonical ID resolution model separates artifact identity from folder placement.

Core rule:
- **artifact identity is defined by `canonical_id`, not by raw folder position**

Example canonical artifact:
- `canonical_id: SLV.UMG.CORE_REFERENCE.v1`

Example resolution surfaces:
- current path: `AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1/sleeve.json`
- proposed path: `AI/SLEEVES/core/SLV.UMG.CORE_REFERENCE.v1/sleeve.json`

Canonical resolution expectations:
1. a canonical ID must identify one intended artifact contract
2. current compatibility-locked resolution must remain valid
3. proposed future resolution may be modeled, but not activated, during BL-6C
4. both paths must resolve to the same artifact identity before movement is allowed
5. path agreement alone is insufficient; content contract and dependency agreement must also hold

Conceptual resolution tuple:

```text
canonical_id
  -> artifact_type
  -> current_path
  -> proposed_path
  -> identity_contract
  -> dependency_set
  -> validation_state
```

Where:
- `artifact_type` distinguishes sleeves, stacks, blocks, fixtures, docs, or future tooling surfaces
- `identity_contract` defines what it means for two paths to represent the same artifact
- `dependency_set` captures fixture/runtime/compiler/doc obligations
- `validation_state` records whether dual-path equivalence has been proven

## Alias validation model
The alias validation model is intentionally stricter than path existence.

An alias is valid only when all of the following are true:
1. the canonical ID resolves to a known intended artifact
2. the current path remains valid
3. the proposed path either already resolves or is fully specifiable as the future canonical target
4. artifact identity checks pass across both path interpretations
5. fixture dependencies remain satisfied
6. runtime compatibility expectations remain satisfied
7. compiler compatibility expectations remain satisfied
8. documentation dependencies are accounted for

This means alias validation is not just:
- “does the new path exist?”

It is:
- “can we prove that current and proposed path models refer to the same governed artifact with the same required downstream behavior?”

Conceptual alias record:

```text
canonical_id: SLV.UMG.CORE_REFERENCE.v1
artifact_type: sleeve
current_path: AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1/sleeve.json
proposed_path: AI/SLEEVES/core/SLV.UMG.CORE_REFERENCE.v1/sleeve.json
alias_required: true
move_allowed: false until all validation gates pass
```

## Dual-path validation strategy
BL-6C assumes a future dual-path era before any deprecation or movement.

Dual-path validation should work in this order:
1. identify the artifact by canonical ID
2. resolve the current compatibility-locked path
3. resolve the proposed future path conceptually or materially
4. compare artifact identity and required contracts
5. verify dependencies against both path interpretations
6. mark movement blocked unless dual-path validation is fully green

Validation precedence:
- canonical ID validation comes first
- dual-path equivalence comes second
- movement authorization comes last

Operationally, this means the old path stays valid until:
- proposed path resolution is proven
- fixture validation passes
- Envoy/runtime compatibility checks pass
- compiler compatibility checks pass
- documentation references are intentionally reconciled
- maintainers explicitly approve the gate transition

## Artifact identity checks
Artifact identity checks must prove sameness of intent, not just sameness of names.

Minimum conceptual identity checks:
- **canonical ID match** — current and proposed paths map to the same canonical ID
- **artifact type match** — sleeve vs fixture vs stack vs block vs docs vs tools surface is consistent
- **contract match** — required contract such as `sleeve.json` semantics remains the same
- **dependency match** — fixture/runtime/compiler/docs dependencies remain attached to the same intended artifact
- **provenance match** — source references and governance references still point to the intended governed artifact
- **collision check** — no second artifact claims the same canonical ID through a conflicting proposed path

Examples:
- A path with the same folder name but different `artifact_type` is not equivalent
- A path with the same canonical ID but a changed `sleeve.json` contract is not equivalent
- A proposed path that resolves but drops fixture or runtime dependency coverage is not equivalent

## Validation matrix
BL-6C should maintain a matrix that records, per canonical artifact or dependent surface:
- current path
- proposed path
- whether aliasing is required
- what dependencies apply
- how validation will be performed
- what constitutes pass/fail
- whether movement is allowed

The matrix is the operational ledger for future BL-6 execution. It should show which surfaces are merely documented, which are dual-path candidates, and which remain hard-blocked.

See:
- [BL-6C Validation Matrix](./BL-6C-VALIDATION-MATRIX.md)

## Failure conditions
Any of the following should block movement:

- canonical ID cannot be assigned unambiguously
- current path cannot be resolved cleanly
- proposed path cannot be resolved or specified cleanly
- current and proposed paths do not map to the same artifact identity
- `sleeve.json` contract equivalence fails
- fixture dependency coverage is incomplete
- runtime dependency coverage is incomplete
- compiler dependency coverage is incomplete
- documentation references become contradictory or stale
- alias mapping introduces ambiguity, collision, or split-brain interpretation
- rollback assumptions are missing
- maintainers have not approved the transition gate

Failure effect:
- current compatibility-locked path remains authoritative
- movement remains prohibited
- BL-6 structural normalization remains gated

## BL-6 execution gates
BL-6 structural work remains blocked until all of the following are true:

1. canonical IDs are defined for targeted artifacts
2. alias relationships are documented in a validation matrix
3. current path validity remains intact
4. proposed path targets are specified clearly
5. artifact identity checks are defined and pass
6. fixture dependencies are validated
7. runtime dependencies are validated
8. compiler dependencies are validated
9. docs dependencies are validated
10. rollback expectations are defined
11. maintainers explicitly approve movement after review

Important governance rule:
- **validation success is a prerequisite for movement review, not movement authorization by itself**

## Future implementation notes
Future implementation may add scriptable validation, but BL-6C does not authorize implementation yet.

Potential future layers:
- a canonical ID registry for governed artifacts
- an alias registry mapping current paths to proposed canonical targets
- validation scripts that compare current/proposed resolution
- dependency probes for fixtures, runtime surfaces, compiler assumptions, and docs references
- a move gate that stays false until all dependency classes are green

Future validation script concepts may include checks for:
- current path existence
- proposed path existence or explicit future-target declaration
- canonical ID collision detection
- `sleeve.json` contract identity checks
- fixture dependency presence
- runtime dependency declaration coverage
- compiler dependency declaration coverage
- docs backlink coverage

Until those future layers exist and are approved, BL-6C remains a design-stage guardrail that prevents premature structural normalization.
