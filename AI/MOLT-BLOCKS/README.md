# AI MOLT-BLOCKS

This directory contains machine-readable aggregate H4 source shelves, nine standalone H4-compatible draft candidates, and path-compatible Platform extension libraries. Directory placement alone does not establish H4 authority; `AI/MANIFESTS/h4-block-library-manifest.json` is the Block Library classification surface.

## Current H4 lanes

The only compiler-vNext H4 MOLT lanes are:

```text
trigger
directive
instruction
subject
primary
philosophy
blueprint
```

Aggregate source counts after BR-1:

| Lane | Records |
| --- | ---: |
| Trigger | 0 |
| Directive | 200 |
| Instruction | 330 |
| Subject | 200 |
| Primary | 200 |
| Philosophy | 270 |
| Blueprint | 170 |

The aggregate total remains 1,370. Nine standalone `BLK.*` records are draft H4 candidates and are counted separately.

## Instruction categories

- `language`: 30 reclassified programming-language records. Historical `BP.001` through `BP.030` IDs are retained. Compiler-facing text uses deterministic `language_fields_v1` projection.
- `persona`: 100 existing `PERS.*` records. Persona is not a compiler lane.

## Platform extensions retained in place

AIM, USE, and NEED contain 900 unique records. BR-1 classifies them as:

```text
classification: PLATFORM_EXTENSION
NOT_H4_MOLT: true
```

Their paths and IDs remain unchanged for Envoy and vendored-consumer compatibility. The copies under `blocks/molt/subjects/` are `DERIVED_EXPORT`, not an alternate canonical source.

## Trigger status

No direct aggregate Trigger source exists under this directory. Trigger canon remains `UNRESOLVED`; Governance gates and samples are not promoted as substitute Trigger records.

## Authority and lifecycle

Classification and lifecycle are separate:

- `H4_CANONICAL_MOLT` with `active` is promoted current library material.
- `H4_CANDIDATE_MOLT` with `draft` is source-backed but unpromoted.
- `PLATFORM_EXTENSION` is valuable Platform material outside H4 MOLT lanes.
- `DERIVED_EXPORT`, `LEGACY_COMPATIBILITY`, and `HISTORICAL_REFERENCE` do not become canonical through folder placement.

## Validation surfaces

- Manifest: `AI/MANIFESTS/h4-block-library-manifest.json`
- Normalized record schema: `AI/SCHEMAS/BR1_NORMALIZED_RECORD_SCHEMA.json`
- H4 projection schema: `AI/SCHEMAS/BR1_H4_PROJECTION_SCHEMA.json`
- Validator: `node scripts/br1/generate.mjs validate`
- Reports: `reports/BR1_*.md`
