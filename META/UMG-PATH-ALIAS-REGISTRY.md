# UMG Path Alias Registry

## Purpose
This registry records compatibility-locked paths, proposed future canonical paths, alias requirements, movement permissions, and validation obligations for the UMG Block Library.

It exists so future structural normalization can be planned without breaking runtime, fixtures, docs, validation, or reference sleeves.

## Stability levels
- `compatibility_locked`
- `canonical_candidate`
- `legacy_export`
- `human_browse_stable`
- `future_design_only`

## Migration status values
- `not_started`
- `documented_only`
- `aliased`
- `validated`
- `migrated`
- `deprecated`

## Registry schema
Each entry should include:
- `canonical_id`
- `artifact_type`
- `current_path`
- `proposed_path`
- `owner_lane`
- `stability_level`
- `migration_status`
- `alias_required`
- `redirect_strategy`
- `validation_required`
- `move_allowed`
- `risk_level`
- `notes`

## Compatibility-locked entries

### SLV.UMG.CORE_REFERENCE.v1
- `canonical_id`: `SLV.UMG.CORE_REFERENCE.v1`
- `artifact_type`: sleeve
- `current_path`: `AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1/sleeve.json`
- `proposed_path`: `AI/SLEEVES/core/SLV.UMG.CORE_REFERENCE.v1/sleeve.json` (future candidate only)
- `owner_lane`: `AI/SLEEVES`
- `stability_level`: `compatibility_locked`
- `migration_status`: `documented_only`
- `alias_required`: yes
- `redirect_strategy`: preserve current path until aliases/ID-first resolution and validation exist
- `validation_required`: yes
- `move_allowed`: no
- `risk_level`: high
- `notes`: current runtime/docs/fixtures treat this as the strongest reference sleeve anchor

### AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1/
- `canonical_id`: `DIR.SLV.UMG.CORE_REFERENCE.v1`
- `artifact_type`: sleeve_directory
- `current_path`: `AI/SLEEVES/categories/core/SLV.UMG.CORE_REFERENCE.v1/`
- `proposed_path`: `AI/SLEEVES/core/SLV.UMG.CORE_REFERENCE.v1/` (future candidate only)
- `owner_lane`: `AI/SLEEVES`
- `stability_level`: `compatibility_locked`
- `migration_status`: `documented_only`
- `alias_required`: yes
- `redirect_strategy`: preserve directory path until all fixture/source_path references are migrated
- `validation_required`: yes
- `move_allowed`: no
- `risk_level`: high
- `notes`: directory-level path is referenced in doctrine and reference validation examples

### AI/NEOSTACKS/categories/core/
- `canonical_id`: `DIR.AI.NEOSTACKS.CORE`
- `artifact_type`: neostack_lane_directory
- `current_path`: `AI/NEOSTACKS/categories/core/`
- `proposed_path`: `AI/NEOSTACKS/core/` (future candidate only)
- `owner_lane`: `AI/NEOSTACKS`
- `stability_level`: `compatibility_locked`
- `migration_status`: `documented_only`
- `alias_required`: yes
- `redirect_strategy`: preserve current path until fixture/source-path provenance is migrated
- `validation_required`: yes
- `move_allowed`: no
- `risk_level`: high
- `notes`: current reference flow points into core stack artifacts under this path family

### AI/NEOBLOCKS/categories/core/
- `canonical_id`: `DIR.AI.NEOBLOCKS.CORE`
- `artifact_type`: neoblock_lane_directory
- `current_path`: `AI/NEOBLOCKS/categories/core/`
- `proposed_path`: `AI/NEOBLOCKS/core/` (future candidate only)
- `owner_lane`: `AI/NEOBLOCKS`
- `stability_level`: `compatibility_locked`
- `migration_status`: `documented_only`
- `alias_required`: yes
- `redirect_strategy`: preserve current path until fixture/source-path provenance is migrated
- `validation_required`: yes
- `move_allowed`: no
- `risk_level`: high
- `notes`: current trace and resolved-ir fixture references point into this path family

### sleeve.json contract
- `canonical_id`: `CONTRACT.SLEEVE_JSON`
- `artifact_type`: file_contract
- `current_path`: `sleeve.json` as input contract and artifact filename convention
- `proposed_path`: unchanged contract; path-independent support required
- `owner_lane`: cross-lane contract
- `stability_level`: `compatibility_locked`
- `migration_status`: `documented_only`
- `alias_required`: no
- `redirect_strategy`: preserve contract regardless of future folder topology
- `validation_required`: yes
- `move_allowed`: no
- `risk_level`: high
- `notes`: compiler and runtime ecosystem already expect this file contract

### AI/FIXTURES/umg-core-reference-sleeve/
- `canonical_id`: `FIXTURE.UMG.CORE_REFERENCE`
- `artifact_type`: fixture_pack
- `current_path`: `AI/FIXTURES/umg-core-reference-sleeve/`
- `proposed_path`: unchanged until path/provenance migration is validated
- `owner_lane`: `AI/FIXTURES`
- `stability_level`: `compatibility_locked`
- `migration_status`: `documented_only`
- `alias_required`: yes
- `redirect_strategy`: preserve fixture path and source-path references until dual-path validation passes
- `validation_required`: yes
- `move_allowed`: no
- `risk_level`: high
- `notes`: resolved.ir, trace, diagnostics, and relation outputs depend on current source-path story

## Canonical candidate entries

### AI/MOLT-BLOCKS/
- `canonical_id`: `LANE.AI.MOLT_BLOCKS`
- `artifact_type`: machine_lane
- `current_path`: `AI/MOLT-BLOCKS/`
- `proposed_path`: `AI/MOLT-BLOCKS/`
- `owner_lane`: `AI/MOLT-BLOCKS`
- `stability_level`: `canonical_candidate`
- `migration_status`: `documented_only`
- `alias_required`: maybe
- `redirect_strategy`: preserve current path until source/export policy is approved
- `validation_required`: yes
- `move_allowed`: no
- `risk_level`: medium_high
- `notes`: strongest current candidate for canonical machine MOLT source

### HUMAN/MOLT-BLOCKS/
- `canonical_id`: `LANE.HUMAN.MOLT_BLOCKS`
- `artifact_type`: human_lane
- `current_path`: `HUMAN/MOLT-BLOCKS/`
- `proposed_path`: `HUMAN/MOLT-BLOCKS/`
- `owner_lane`: `HUMAN/MOLT-BLOCKS`
- `stability_level`: `human_browse_stable`
- `migration_status`: `documented_only`
- `alias_required`: no
- `redirect_strategy`: preserve as stable human browse lane
- `validation_required`: low
- `move_allowed`: no
- `risk_level`: low
- `notes`: strongest current candidate for canonical human browse MOLT lane

## Legacy/export candidate entries

### blocks/molt/subjects/
- `canonical_id`: `LANE.BLOCKS.MOLT.SUBJECTS`
- `artifact_type`: export_lane
- `current_path`: `blocks/molt/subjects/`
- `proposed_path`: unchanged until source/export doctrine is approved
- `owner_lane`: `blocks/molt/subjects`
- `stability_level`: `legacy_export`
- `migration_status`: `documented_only`
- `alias_required`: maybe
- `redirect_strategy`: preserve until downstream package/export dependency review completes
- `validation_required`: yes
- `move_allowed`: no
- `risk_level`: medium
- `notes`: likely legacy/export/package-facing secondary lane; not safe to deduplicate yet

## Future-design-only entries

### TOOLS future layer
- `canonical_id`: `LANE.TOOLS.FUTURE`
- `artifact_type`: future_lane
- `current_path`: not yet first-class in current runtime layout
- `proposed_path`: `AI/TOOLS/` and `HUMAN/TOOLS/`
- `owner_lane`: future mirrored doctrine
- `stability_level`: `future_design_only`
- `migration_status`: `not_started`
- `alias_required`: not yet applicable
- `redirect_strategy`: none until doctrine and dependency review approve introduction
- `validation_required`: yes
- `move_allowed`: no
- `risk_level`: medium
- `notes`: future design layer only; do not promote to runtime-canonical dependency yet

## Validation requirements
Before any path movement or lane deduplication:
- installed Envoy runtime must remain healthy
- compiler `sleeve.json` contract must remain valid
- reference fixtures must pass
- source_path provenance must either stay valid or be explicitly aliased
- docs and validation examples must be updated intentionally, not implicitly

## Movement policy
- compatibility-locked entries are no-move until alias/redirect strategy exists and passes validation
- canonical candidates are not auto-movable; they still require doctrine approval
- legacy/export entries are preserved until dependency review completes
- future-design-only entries must not be introduced as runtime dependencies prematurely

## Stop conditions
Stop migration planning escalation if:
- runtime or fixture dependencies are still path-bound
- source/export doctrine is not approved
- category placement doctrine is unresolved
- alias strategy is unspecified
- rollback path is absent
