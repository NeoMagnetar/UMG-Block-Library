# BL-6C Validation Matrix

## Purpose
This matrix records the BL-6C dual-path validation surface for compatibility-locked artifacts and related dependency lanes. It exists to prove canonical artifact identity before any folder movement is considered.

## Column meanings
- **canonical_id** — governed artifact or validation surface identifier
- **artifact_type** — sleeve, sleeve_contract, fixture, neostack_lane, neoblock_lane, molt_lane, docs_surface, tooling_surface, or related dependency type
- **current_path** — compatibility-locked current location or active dependency surface
- **proposed_path** — future canonical target or future design surface
- **current_path_exists** — expected current-state existence during BL-6C
- **proposed_path_exists** — whether the future path exists now; may be `planned` for design-only targets
- **alias_required** — whether compatibility aliasing or dual-resolution proof is required
- **fixture_dependency** — fixture dependency relevance
- **runtime_dependency** — runtime/Envoy relevance
- **compiler_dependency** — compiler/input-contract relevance
- **docs_dependency** — governance/docs/reference relevance
- **validation_method** — conceptual method for proving equivalence or dependency safety
- **pass_condition** — what must be true before the row is considered validated
- **fail_condition** — what blocks validation
- **move_allowed** — BL-6 gate output for this row

## Matrix

| canonical_id | artifact_type | current_path | proposed_path | current_path_exists | proposed_path_exists | alias_required | fixture_dependency | runtime_dependency | compiler_dependency | docs_dependency | validation_method | pass_condition | fail_condition | move_allowed |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `SLV.UMG.CORE_REFERENCE.v1` | sleeve | `AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1/sleeve.json` | `AI/SLEEVES/core/SLV.UMG.CORE_REFERENCE.v1/sleeve.json` | yes | planned | yes | yes | yes | yes | yes | Canonical ID resolution plus dual-path artifact identity check against sleeve contract and downstream dependencies | Current path resolves, proposed path target is governed, both path models map to the same sleeve identity, and all downstream dependency classes remain green | Canonical ID ambiguity, contract drift, dependency mismatch, or unresolved proposed target | no |
| `AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1/sleeve.json` | sleeve_contract | `AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1/sleeve.json` | `AI/SLEEVES/core/SLV.UMG.CORE_REFERENCE.v1/sleeve.json` | yes | planned | yes | yes | yes | yes | yes | Contract-level identity validation for `sleeve.json` semantics under current and proposed path interpretations | `sleeve.json` contract remains semantically identical for the canonical sleeve across both path models | Contract meaning changes, field semantics drift, or one path loses contract coverage | no |
| `AI.NEOSTACKS.CORE` | neostack_lane | `AI/NEOSTACKS/categories/core/` | `AI/NEOSTACKS/core/` | yes | planned | yes | indirect | indirect | yes | yes | Lane-level alias mapping plus dependency trace review for stack references tied to current core category placement | Current lane references can be mapped to canonical lane identity without breaking dependent interpretations | Category lane references become ambiguous or compiler/doc assumptions break | no |
| `AI.NEOBLOCKS.CORE` | neoblock_lane | `AI/NEOBLOCKS/categories/core/` | `AI/NEOBLOCKS/core/` | yes | planned | yes | indirect | indirect | yes | yes | Lane-level alias mapping plus reference audit for canonical block-lane equivalence | Current and proposed lane models can be interpreted as the same governed block lane with no dependency loss | Lane identity splits, doc contradictions emerge, or compiler assumptions diverge | no |
| `FIX.UMG.CORE_REFERENCE_SLEEVE.v1` | fixture | `AI/FIXTURES/umg-core-reference-sleeve/` | `AI/FIXTURES/umg-core-reference-sleeve/` | yes | yes | no | primary | indirect | yes | yes | Fixture continuity validation against canonical sleeve identity and dependent outputs | Fixture remains stable and continues validating the same intended reference sleeve contract | Fixture output no longer proves the intended artifact identity or breaks against downstream expectations | no |
| `SLV.UMG.CORE_REFERENCE.v1` | sleeve_contract | `sleeve.json contract` | `canonical sleeve contract for SLV.UMG.CORE_REFERENCE.v1` | yes | planned | yes | yes | yes | yes | yes | Contract-governance validation using canonical ID as the primary identity anchor | Contract definition is stable, path-agnostic, and usable across current and proposed resolution models | Contract cannot be expressed independent of current folder placement or loses dependency coverage | no |
| `AI.MOLT_BLOCKS` | molt_lane | `AI/MOLT-BLOCKS/` | `AI/MOLT-BLOCKS/` | yes | yes | no | indirect | indirect | indirect | yes | Governance-only dependency hold check; confirm lane remains outside BL-6C movement scope | Lane remains documented as an adjacent dependency surface with no forced restructuring in BL-6C | BL-6C incorrectly expands into lane deduplication or structural normalization for MOLT lanes | no |
| `HUMAN.MOLT_BLOCKS` | molt_lane | `HUMAN/MOLT-BLOCKS/` | `HUMAN/MOLT-BLOCKS/` | yes | yes | no | indirect | no | no | yes | Governance-only hold check for future mirror doctrine | Human lane remains documented as future-doctrine surface, not a current movement target | BL-6C implicitly authorizes HUMAN lane restructuring | no |
| `LEGACY.BLOCKS.MOLT.SUBJECTS` | docs_surface | `blocks/molt/subjects/` | `blocks/molt/subjects/` | yes | yes | no | indirect | indirect | indirect | yes | Legacy/export surface classification check with doctrine-only status | Surface remains explicitly classified as legacy/export/package-facing candidate pending approval | Surface is treated as canonical without approval or is moved during BL-6C | no |
| `TOOLS.FUTURE_LAYER` | tooling_surface | `TOOLS future layer` | `AI/TOOLS/` and `HUMAN/TOOLS/` future doctrine targets | design-only | planned | yes | indirect | indirect | indirect | yes | Future-layer doctrine validation only; no implementation permitted in BL-6C | TOOLS remains documented as future design surface with no runtime or structural activation | BL-6C accidentally implements or activates tooling-path behavior | no |

## Interpretation notes
- `planned` means the proposed path is intentionally modeled but is not required to exist during BL-6C.
- `indirect` means the row is not the primary dependency owner but can still influence safety gates.
- `move_allowed` should remain `no` for all rows during BL-6C because this phase does not authorize structural normalization.

## Gate reading
A future BL-6 movement review should only begin after:
- canonical IDs are stable
- alias mappings are unambiguous
- current-path safety is preserved
- fixture/runtime/compiler/docs checks are all green for affected rows
- maintainers explicitly approve transition from design to implementation review
